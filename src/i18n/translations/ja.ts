import { TranslationType } from './en';

export const ja: TranslationType = {
  nav: {
    home: "ホーム",
    medicines: "お薬",
    ayurbook: "アーユルブック",
    timeline: "タイムライン",
    profile: "プロフィール",
    login: "ログイン",
    signup: "アカウント作成",
    logout: "ログアウト",
    subtitle: "退院後リカバリーパートナー"
  },
  home: {
    title: "ケアダッシュボード",
    subtitle: "毎日の回復状況、服薬スケジュール、安全チェック",
    welcome: "おかえりなさい",
    recoveryStatus: "回復状況",
    activeCondition: "現在の状態",
    todaysMedicines: "本日服用予定のお薬",
    takeDose: "服用する",
    taken: "服用済み",
    skipped: "スキップ",
    snoozed: "後で",
    logSymptom: "症状を記録",
    checkAyurbook: "アーユルブック安全チェック",
    recentTimeline: "最近の回復タイムライン",
    viewAll: "すべて見る",
    noMedicines: "まだ登録されたお薬はありません。"
  },
  medicines: {
    title: "服用中のお薬",
    subtitle: "処方薬、服用時間、リマインダーの管理",
    addMedicine: "お薬を追加",
    scanPrescription: "処方箋をスキャン",
    doseSchedule: "服薬スケジュール",
    frequency: "頻度",
    instructions: "指示",
    reminderTime: "リマインダー時間",
    delete: "削除"
  },
  ayurbook: {
    title: "アーユルブックライブラリ",
    subtitle: "伝統的なハーブ療法と医薬品相互作用チェッカー",
    searchPlaceholder: "ハーブ療法や症状を検索...",
    checkInteraction: "相互作用チェック",
    safe: "安全に使用できます",
    caution: "注意が必要",
    avoid: "併用を避けてください",
    viewRemedy: "詳細を見る"
  },
  timeline: {
    title: "回復タイムライン",
    subtitle: "ケアのマイルストーン、症状記録、服薬履歴",
    allEvents: "すべてのイベント",
    medications: "お薬",
    symptoms: "症状",
    remedies: "ハーブ療法",
    today: "今日"
  },
  profile: {
    title: "プロフィール＆設定",
    subtitle: "アカウント情報、アプリ言語、テーマ、データ設定の管理",
    userAccount: "ユーザーアカウント",
    authenticated: "認証済みアカウント",
    rlsActive: "行レベルセキュリティ有効",
    settings: "アプリ設定",
    changeLanguage: "表示言語",
    selectLanguage: "言語を選択",
    theme: "外観テーマ",
    lightMode: "ライトモード",
    darkMode: "ダークモード",
    dangerZone: "デンジャーゾーン",
    deleteAccount: "アカウントを削除",
    deleteAccountDesc: "アカウントとお薬・健康データを永久に削除します。",
    patientCarePlan: "患者ケアプラン",
    myMedicines: "マイお薬",
    myRecovery: "マイリカバリー",
    privacySecurity: "プライバシーとデータセキュリティ"
  },
  auth: {
    loginTitle: "おかえりなさい 👋",
    loginSubtitle: "ログインしてリカバリーパートナーを利用",
    signupTitle: "CareConnectアカウントを作成",
    signupSubtitle: "退院後ケアプラットフォームに参加",
    email: "メールアドレス",
    password: "パスワード",
    fullName: "氏名",
    age: "年齢",
    confirmPassword: "パスワード（確認）",
    continueGoogle: "Googleで継続",
    orEmail: "またはメールアドレスで",
    noAccount: "アカウントをお持ちでないですか？",
    alreadyAccount: "すでにアカウントをお持ちですか？",
    forgotPassword: "パスワードをお忘れですか？"
  },
  deleteModal: {
    title: "アカウントを削除しますか？",
    warning: "この操作は取り消せません。保存されたすべてのお薬や健康データが永久に削除されます。",
    confirmText: '確認のために "DELETE" と入力してください:',
    cancel: "キャンセル",
    confirmDelete: "アカウントを永久削除"
  }
};
