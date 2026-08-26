import { TranslationType } from './en';

export const mr: TranslationType = {
  nav: {
    home: "मुख्यपृष्ठ",
    medicines: "औषधे",
    ayurbook: "आयुर्वेद ज्ञान",
    timeline: "टाइमलाइन",
    profile: "प्रोफाइल",
    login: "लॉग इन",
    signup: "खाते तयार करा",
    logout: "लॉग आउट",
    subtitle: "डिस्चार्ज नंतरचा रिकव्हरी साथी"
  },
  home: {
    title: "केअर डॅशबोर्ड",
    subtitle: "तुमची दैनंदिन रिकव्हरी स्थिती, औषधे आणि सुरक्षितता तपासणी",
    welcome: "पुन्हा स्वागत आहे",
    recoveryStatus: "रिकव्हरी स्थिती",
    activeCondition: "सक्रिय स्थिती",
    todaysMedicines: "आजची निर्धारित औषधे",
    takeDose: "डोस घ्या",
    taken: "घेतले",
    skipped: "वगळले",
    snoozed: "पुढे ढकलले",
    logSymptom: "लक्षण नोंदवा",
    checkAyurbook: "आयुर्वेद सुरक्षा तपासणी",
    recentTimeline: "अलीकडील रिकव्हरी टाइमलाइन",
    viewAll: "सर्व पहा",
    noMedicines: "अद्याप कोणतीही औषधे जोडलेली नाहीत."
  },
  medicines: {
    title: "सक्रिय औषधे",
    subtitle: "तुमच्या औषधांचे वेळापत्रक आणि स्मरणपत्रे व्यवस्थापित करा",
    addMedicine: "औषध जोडा",
    scanPrescription: "प्रिस्क्रिप्शन स्कॅन करा",
    doseSchedule: "डोस वेळापत्रक",
    frequency: "वारंवारता",
    instructions: "सूचना",
    reminderTime: "स्मरणपत्र वेळ",
    delete: "काढून टाका"
  },
  ayurbook: {
    title: "आयुर्वेद ग्रंथ",
    subtitle: "पारंपारिक आयुर्वेदिक उपाय आणि औषध-वनस्पती सुरक्षितता",
    searchPlaceholder: "वनस्पती किंवा उपाय शोधा...",
    checkInteraction: "औषध आणि वनस्पती परस्परसंवाद तपासा",
    safe: "वापरासाठी सुरक्षित",
    caution: "काळजी घ्या",
    avoid: "एकत्र घेणे टाळा",
    viewRemedy: "तपशील पहा"
  },
  timeline: {
    title: "रिकव्हरी टाइमलाइन",
    subtitle: "तुमच्या आरोग्याचा इतिहास आणि औषधांची नोंद पहा",
    allEvents: "सर्व नोंदी",
    medications: "औषधे",
    symptoms: "लक्षणे",
    remedies: "उपाय",
    today: "आज"
  },
  profile: {
    title: "प्रोफाइल आणि सेटिंग्ज",
    subtitle: "तुमचे खाते, ॲपची भाषा, थीम आणि डेटा सेटिंग्ज व्यवस्थापित करा",
    userAccount: "वापरकर्ता खाते",
    authenticated: "प्रमाणित खाते",
    rlsActive: "रो-लेव्हल सुरक्षा सक्रिय",
    settings: "ॲप सेटिंग्ज",
    changeLanguage: "ॲपची भाषा",
    selectLanguage: "भाषा निवडा",
    theme: "थीम आणि स्वरूप",
    lightMode: "लाइट मोड",
    darkMode: "डार्क मोड",
    dangerZone: "धोकादायक क्षेत्र",
    deleteAccount: "खाते हटवा",
    deleteAccountDesc: "तुमचे खाते आणि सर्व औषधांची माहिती कायमची हटवा.",
    patientCarePlan: "रुग्ण काळजी योजना",
    myMedicines: "माझी औषधे",
    myRecovery: "माझी रिकव्हरी",
    privacySecurity: "गोपनीयता आणि डेटा सुरक्षा"
  },
  auth: {
    loginTitle: "पुन्हा स्वागत आहे 👋",
    loginSubtitle: "तुमच्या खात्यात लॉग इन करा",
    signupTitle: "CareConnect खाते तयार करा",
    signupSubtitle: "आरोग्य रिकव्हरी प्लॅटफॉर्मवर सामील व्हा",
    email: "ईमेल पत्ता",
    password: "पासवर्ड",
    fullName: "पूर्ण नाव",
    age: "वय",
    confirmPassword: "पासवर्डची पुष्टी करा",
    continueGoogle: "गूगलसह सुरू ठेवा",
    orEmail: "किंवा ईमेलद्वारे",
    noAccount: "खाते नाही?",
    alreadyAccount: "आधीपासून खाते आहे?",
    forgotPassword: "पासवर्ड विसरलात?"
  },
  deleteModal: {
    title: "खाते हटवायचे?",
    warning: "ही कृती कायमस्वरूपी आहे. तुमची सर्व औषधे आणि आरोग्य नोंदी हटवल्या जातील.",
    confirmText: 'पुष्टीसाठी "DELETE" टाइप करा:',
    cancel: "रद्द करा",
    confirmDelete: "खाते कायमचे हटवा"
  }
};
