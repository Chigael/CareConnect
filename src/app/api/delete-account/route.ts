import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseAnonKey || !serviceRoleKey) {
      return NextResponse.json(
        { error: 'Server configuration error: SUPABASE_SERVICE_ROLE_KEY environment variable is not set.' },
        { status: 500 }
      );
    }

    // 1. Verify Authorization Bearer Header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Missing or malformed Authorization header.' },
        { status: 401 }
      );
    }

    const token = authHeader.replace('Bearer ', '').trim();
    if (!token) {
      return NextResponse.json(
        { error: 'Empty bearer access token.' },
        { status: 401 }
      );
    }

    // 2. Create user Supabase client & verify token
    const userSupabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: `Bearer ${token}` } },
      auth: { persistSession: false }
    });

    const { data: { user }, error: authError } = await userSupabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Invalid or expired user session. Authentication failed.' },
        { status: 401 }
      );
    }

    const userId = user.id;

    // 3. Create Admin Supabase client with service role key
    const adminSupabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    });

    // 4. Delete user records from associated database tables
    const tablesToClean = ['prescriptions', 'patient_profiles', 'symptom_logs', 'profiles'];
    for (const table of tablesToClean) {
      try {
        await adminSupabase.from(table).delete().eq('user_id', userId);
      } catch (_err) {
        // Table might not exist or schema differs, ignore gracefully
      }
    }

    // 5. Permanently delete user from Supabase Auth admin
    const { error: deleteError } = await adminSupabase.auth.admin.deleteUser(userId);

    if (deleteError) {
      return NextResponse.json(
        { error: `Failed to delete user account: ${deleteError.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Account and associated data deleted successfully.'
    });

  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'An unexpected error occurred during account deletion.' },
      { status: 500 }
    );
  }
}
