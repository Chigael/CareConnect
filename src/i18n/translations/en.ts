export const en = {
  nav: {
    home: "Home",
    medicines: "Medicines",
    ayurbook: "AyurBook",
    timeline: "Timeline",
    profile: "Profile",
    login: "Log In",
    signup: "Create Account",
    logout: "Log Out",
    subtitle: "Post-Discharge Recovery Companion"
  },
  home: {
    title: "Care Dashboard",
    subtitle: "Your daily recovery status, medications, and safety checks",
    welcome: "Welcome back",
    recoveryStatus: "Recovery Status",
    activeCondition: "Active Condition",
    todaysMedicines: "Today's Scheduled Medicines",
    takeDose: "Take Dose",
    taken: "Taken",
    skipped: "Skipped",
    snoozed: "Snoozed",
    logSymptom: "Log Symptom",
    checkAyurbook: "AyurBook Safety Check",
    recentTimeline: "Recent Recovery Timeline",
    viewAll: "View All",
    noMedicines: "No active prescription medicines added yet."
  },
  medicines: {
    title: "Active Medicines",
    subtitle: "Manage your prescription medications, dosage schedules, and reminders",
    addMedicine: "Add Medicine",
    scanPrescription: "Scan Prescription",
    doseSchedule: "Dosage Schedule",
    frequency: "Frequency",
    instructions: "Instructions",
    reminderTime: "Reminder Time",
    delete: "Delete"
  },
  ayurbook: {
    title: "AyurBook Library",
    subtitle: "Traditional herbal remedies & herb-drug interaction safety checker",
    searchPlaceholder: "Search herbal remedies, conditions, or herbs...",
    checkInteraction: "Check Herb-Drug Interaction",
    safe: "Safe to use",
    caution: "Exercise caution",
    avoid: "Avoid combination",
    viewRemedy: "View Details"
  },
  timeline: {
    title: "Recovery Timeline",
    subtitle: "Track your care milestones, logged symptoms, and medication history",
    allEvents: "All Events",
    medications: "Medications",
    symptoms: "Symptoms",
    remedies: "Remedies",
    today: "Today"
  },
  profile: {
    title: "Profile & Settings",
    subtitle: "Manage your user account, app language, theme, and data settings",
    userAccount: "User Account",
    authenticated: "Authenticated Account",
    rlsActive: "Row-Level Security Active",
    settings: "App Settings",
    changeLanguage: "App Language",
    selectLanguage: "Select Language",
    theme: "Appearance Theme",
    lightMode: "Light Mode",
    darkMode: "Dark Mode",
    dangerZone: "Danger Zone",
    deleteAccount: "Delete Account",
    deleteAccountDesc: "Permanently delete your user account and all saved prescription and health data.",
    patientCarePlan: "Patient Care Plan",
    myMedicines: "My Medicines",
    myRecovery: "My Recovery",
    privacySecurity: "Privacy & Data Security"
  },
  auth: {
    loginTitle: "Welcome back 👋",
    loginSubtitle: "Log in to manage your post-discharge recovery companion",
    signupTitle: "Create your CareConnect account",
    signupSubtitle: "Join the post-discharge safety companion platform",
    email: "Email Address",
    password: "Password",
    fullName: "Full Name",
    age: "Age",
    confirmPassword: "Confirm Password",
    continueGoogle: "Continue with Google",
    orEmail: "Or with email",
    noAccount: "Don't have an account?",
    alreadyAccount: "Already have an account?",
    forgotPassword: "Forgot password?"
  },
  deleteModal: {
    title: "Delete User Account?",
    warning: "This action is permanent and cannot be undone. All your saved prescription medicines, health check-ins, and account details will be permanently removed.",
    confirmText: 'Type "DELETE" to confirm:',
    cancel: "Cancel",
    confirmDelete: "Permanently Delete Account"
  }
};

export type TranslationType = typeof en;
