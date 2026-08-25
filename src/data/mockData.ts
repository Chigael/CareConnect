export interface Medication {
  id: string;
  name: string;
  genericName: string;
  category: string;
  dosage: string;
  frequency: string;
  purpose: string;
  instructions: string;
  status: string;
  color: string;
  nextDose: string;
  pillsRemaining: number;
  reminderTime?: string; // e.g. "08:00 AM", "02:00 PM"
  reminderStatus?: 'PENDING' | 'TAKEN' | 'SKIPPED' | 'SNOOZED';
  snoozedUntil?: string;
}

export interface Remedy {
  id: string;
  name: string;
  botanicalName: string;
  sanskritName: string;
  category: string;
  summary: string;
  traditionalUses: string[];
  preparation: string;
  activeCompounds: string[];
  safetyRating: 'Safe' | 'Caution' | 'Avoid';
  recommendedFor: string[];
  iconName: string;
}

export interface InteractionDetail {
  medicineId: string;
  medicineName: string;
  remedyId: string;
  remedyName: string;
  riskLevel: 'LOW_RISK' | 'MODERATE_CAUTION' | 'HIGH_RISK';
  summary: string;
  mechanism: string;
  actionableAdvice: string;
}

export interface SymptomLog {
  id: string;
  symptom: string;
  severity: number; // 1 to 10
  onsetTime: string;
  notes: string;
  timestamp: string;
  isRedFlag: boolean;
}

export interface TimelineEvent {
  id: string;
  day: number;
  date: string;
  title: string;
  description: string;
  category: 'MEDICATION' | 'SYMPTOM' | 'REMEDY' | 'MILESTONE' | 'DISCHARGE';
  status: 'COMPLETED' | 'CURRENT' | 'UPCOMING';
  badgeColor: string;
}

export interface PatientProfile {
  name: string;
  age: number;
  gender: string;
  condition: string;
  dischargeDate: string;
  doctorName: string;
  hospitalName: string;
}

export const DEMO_PATIENT: PatientProfile = {
  name: "Patient",
  age: 30,
  gender: "User",
  condition: "General Care",
  dischargeDate: "Today",
  doctorName: "Attending Physician",
  hospitalName: "CareConnect Health"
};

export const DEMO_MEDICATIONS: Medication[] = [
  {
    id: "med-a",
    name: "Amoxicillin",
    genericName: "Amoxicillin / Clavulanate 500mg",
    category: "Antibiotic",
    dosage: "1 capsule (500mg)",
    frequency: "3 times daily after meals (8:00 AM, 2:00 PM, 8:00 PM)",
    purpose: "Bacterial infection prevention",
    instructions: "Finish the complete 7-day prescription course.",
    status: "Active (Day 4/7)",
    color: "teal",
    nextDose: "8:00 PM Today",
    pillsRemaining: 9
  },
  {
    id: "med-b",
    name: "Paracetamol",
    genericName: "Paracetamol 500mg",
    category: "Analgesic & Antipyretic",
    dosage: "1 tablet (500mg)",
    frequency: "Every 6 hours as needed",
    purpose: "Pain management and fever control",
    instructions: "Do not exceed 4 tablets (2000mg) in 24 hours.",
    status: "Active (As needed)",
    color: "indigo",
    nextDose: "As Needed",
    pillsRemaining: 14
  }
];

export const DEMO_SYMPTOM: SymptomLog = {
  id: "",
  symptom: "",
  severity: 0,
  onsetTime: "",
  notes: "",
  timestamp: "",
  isRedFlag: false
};

export const EMPTY_SYMPTOM: SymptomLog = {
  id: "",
  symptom: "",
  severity: 0,
  onsetTime: "",
  notes: "",
  timestamp: "",
  isRedFlag: false
};

export const RED_FLAG_CHECKLIST = [
  { id: "rf-1", label: "High Fever above 102°F (38.9°C)", severe: true },
  { id: "rf-2", label: "Severe, worsening abdominal pain or sudden swelling", severe: true },
  { id: "rf-3", label: "Repeated vomiting or inability to retain any liquids", severe: true },
  { id: "rf-4", label: "Shortness of breath, chest tightness, or severe dizziness", severe: true },
  { id: "rf-5", label: "Active redness, warmth, or pus drainage at incision site", severe: true }
];

export const AYURBOOK_REMEDIES: Remedy[] = [
  {
    id: "rem-ginger",
    name: "Ginger Tea",
    botanicalName: "Zingiber officinale",
    sanskritName: "Shunti / Adrak",
    category: "Digestive & Anti-Nausea",
    summary: "Time-tested botanical infusion widely used to soothe stomach uneasiness, relieve post-operative nausea, and stimulate gentle digestion.",
    traditionalUses: [
      "Alleviates mild nausea and abdominal motion uneasiness",
      "Enhances digestion (Agni Deepana) without heavy stomach load",
      "Helps reduce bloating and intestinal gas"
    ],
    preparation: "Gently simmer 1/2 tsp fresh crushed ginger root in 1 cup of boiling water for 5 minutes. Strain and sip warm.",
    activeCompounds: ["Gingerols", "Shogaols", "Zingerone"],
    safetyRating: "Safe",
    recommendedFor: ["Nausea", "Mild Nausea", "Morning sickness", "Stomach Upset"],
    iconName: "Coffee"
  },
  {
    id: "rem-cardamom",
    name: "Cardamom & Lemon Water",
    botanicalName: "Elettaria cardamomum",
    sanskritName: "Elaichi",
    category: "Digestive & Anti-Nausea",
    summary: "Aromatic cooling spice infusion that neutralizes stomach qualms and refreshes the palate after nausea or medication taste.",
    traditionalUses: [
      "Soothes stomach lining and relieves nausea impulses",
      "Refreshes breath and balances gastric acid pH"
    ],
    preparation: "Crush 2 green cardamom pods in 1 cup warm water with a drop of fresh lemon juice. Sip slowly.",
    activeCompounds: ["Cineole", "Terpinyl acetate"],
    safetyRating: "Safe",
    recommendedFor: ["Nausea", "Vomiting", "Indigestion"],
    iconName: "Sparkles"
  },
  {
    id: "rem-coriander-jeera",
    name: "Coriander & Cumin Decoction",
    botanicalName: "Coriandrum sativum & Cuminum cyminum",
    sanskritName: "Dhaniya-Jeera Water",
    category: "Headaches & Tension Relief",
    summary: "Traditional cooling seed decoction that relieves tension headaches, reduces bodily heat, and calms vascular throbbing.",
    traditionalUses: [
      "Relieves Pitta-type tension headaches and temples heaviness",
      "Promotes systemic hydration and kidney flushing"
    ],
    preparation: "Soak 1/2 tsp crushed coriander and cumin seeds in warm water for 10 minutes. Strain and drink at room temperature.",
    activeCompounds: ["Linalool", "Cuminaldehyde"],
    safetyRating: "Safe",
    recommendedFor: ["Headaches", "Headache", "Tension", "Body Heat"],
    iconName: "Leaf"
  },
  {
    id: "rem-brahmi",
    name: "Brahmi & Chamomile Infusion",
    botanicalName: "Bacopa monnieri & Matricaria chamomilla",
    sanskritName: "Brahmi-Pudina",
    category: "Headaches & Stress Relief",
    summary: "Medhya (nervine) botanical blend that eases stress headaches, neural fatigue, and neck tightness.",
    traditionalUses: [
      "Soothes mental overactivity and stress-induced head throbbing",
      "Improves mental clarity without sedation"
    ],
    preparation: "Steep 1/2 tsp Brahmi powder or tea bag in hot water for 5 minutes.",
    activeCompounds: ["Bacosides", "Apigenin"],
    safetyRating: "Safe",
    recommendedFor: ["Headaches", "Headache", "Stress", "Fatigue"],
    iconName: "Sparkles"
  },
  {
    id: "rem-fennel",
    name: "Fennel Seed Water",
    botanicalName: "Foeniculum vulgare",
    sanskritName: "Saunf Water",
    category: "Acidity & Mucosal Protection",
    summary: "Cooling alkaline herbal water that coats the stomach mucosa, neutralizes acid reflux, and stops heartburn.",
    traditionalUses: [
      "Rapidly cools burning sensation in chest and throat",
      "Relieves bloating, acid reflux (Amlapitta), and sour belching"
    ],
    preparation: "Steep 1 tsp bruised fennel seeds in a glass of hot water for 7 minutes. Sip warm after meals.",
    activeCompounds: ["Anethole", "Fenchone"],
    safetyRating: "Safe",
    recommendedFor: ["Acidity", "Heartburn", "GERD", "Gastritis"],
    iconName: "Shield"
  },
  {
    id: "rem-amla",
    name: "Amla & Honey Elixir",
    botanicalName: "Phyllanthus emblica",
    sanskritName: "Amalaki",
    category: "Acidity & Digestive Health",
    summary: "Vitamin C-rich rejuvenative fruit that regulates gastric juice secretion without causing hyperacidity.",
    traditionalUses: [
      "Pacifies hyperactive stomach acid and repairs gut mucosal wall",
      "Boosts immunity and cellular healing"
    ],
    preparation: "Mix 1/2 tsp organic Amla powder with 1 tsp pure honey or warm water.",
    activeCompounds: ["Emblicanin", "Ellagic acid", "Ascorbic acid"],
    safetyRating: "Safe",
    recommendedFor: ["Acidity", "Acid Reflux", "Indigestion"],
    iconName: "Shield"
  },
  {
    id: "rem-nutmeg-milk",
    name: "Warm Nutmeg Milk",
    botanicalName: "Myristica fragrans",
    sanskritName: "Jaiphal Ksheera",
    category: "Insomnia & Sleep Care",
    summary: "Calming bedtime tonic containing natural mild sedatives to induce restful deep sleep and reduce nighttime restlessness.",
    traditionalUses: [
      "Promotes deep, uninterrupted sleep (Nidra Deepana)",
      "Relieves nocturnal anxiety and insomnia"
    ],
    preparation: "Add a small pinch (1/8 tsp) of freshly ground nutmeg to 1 cup of warm milk (or almond milk) 30 minutes before sleep.",
    activeCompounds: ["Myristicin", "Elemicin"],
    safetyRating: "Safe",
    recommendedFor: ["Insomnia", "Sleep Disturbance", "Restlessness", "Anxiety"],
    iconName: "Coffee"
  },
  {
    id: "rem-ashwagandha",
    name: "Ashwagandha Moon Milk",
    botanicalName: "Withania somnifera",
    sanskritName: "Ashwagandha",
    category: "Insomnia & Rejuvenation",
    summary: "Renowned adaptogen that lowers cortisol, calms nervous system strain, and promotes deep recovery sleep.",
    traditionalUses: [
      "Lowers stress hormones and improves sleep latency",
      "Restores physical energy during post-illness convalescence"
    ],
    preparation: "Simmer 1/2 tsp Ashwagandha root powder in warm milk with a pinch of cardamom for 5 minutes.",
    activeCompounds: ["Withanolides", "Withaferin A"],
    safetyRating: "Safe",
    recommendedFor: ["Insomnia", "Sleep", "Fatigue", "Stress"],
    iconName: "Sparkles"
  },
  {
    id: "rem-triphala",
    name: "Triphala Warm Water",
    botanicalName: "Three Fruits (Haritaki, Bibhitaki, Amalaki)",
    sanskritName: "Triphala Churna",
    category: "Constipation & Detox",
    summary: "Gentle non-habit-forming bowel regulator that promotes regular peristalsis and cleanses the intestinal tract.",
    traditionalUses: [
      "Relieves chronic or medication-induced constipation gently",
      "Improves colon tone and bowel regularity"
    ],
    preparation: "Mix 1/2 tsp Triphala powder in 1 glass of warm water before bed.",
    activeCompounds: ["Tannins", "Gallic acid", "Chebulinic acid"],
    safetyRating: "Safe",
    recommendedFor: ["Constipation", "Irregular Bowels", "Bloating"],
    iconName: "Leaf"
  },
  {
    id: "rem-isabgol",
    name: "Psyllium Husk (Isabgol) Drink",
    botanicalName: "Plantago ovata",
    sanskritName: "Isabgol",
    category: "Constipation & Fiber Care",
    summary: "Soluble mucilaginous fiber that absorbs water, softens stool, and eases bowel evacuation smoothly.",
    traditionalUses: [
      "Provides gentle bulk to stool for effortless passage",
      "Soothes inflamed hemorrhoidal or intestinal lining"
    ],
    preparation: "Mix 1-2 tsp Isabgol in a full glass of warm water or milk and drink immediately followed by water.",
    activeCompounds: ["Soluble Hemicellulose Mucilage"],
    safetyRating: "Safe",
    recommendedFor: ["Constipation", "Hard Stool", "Bowel Irregularity"],
    iconName: "Shield"
  },
  {
    id: "rem-pomegranate-peel",
    name: "Pomegranate Peel Decoction",
    botanicalName: "Punica granatum",
    sanskritName: "Dadima",
    category: "Diarrhea & Gut Astringent",
    summary: "Natural astringent herbal tea that firms loose stools, reduces intestinal hypermotility, and stops diarrhea.",
    traditionalUses: [
      "Stops acute loose motions and intestinal watery stooling",
      "Restores gut flora and stops abdominal cramping"
    ],
    preparation: "Boil a piece of clean dry pomegranate peel in 1 cup water for 5 minutes. Strain and drink warm.",
    activeCompounds: ["Punicalagins", "Ellagitannins"],
    safetyRating: "Safe",
    recommendedFor: ["Diarrhea", "Loose Stools", "Stomach Cramps"],
    iconName: "Shield"
  },
  {
    id: "rem-jeera-chaas",
    name: "Roasted Cumin Buttermilk",
    botanicalName: "Cuminum cyminum & Probiotic Whey",
    sanskritName: "Takra / Jeera Chaas",
    category: "Diarrhea & Gut Probiotic",
    summary: "Traditional Ayurvedic probiotic drink containing digestive enzymes and friendly lactobacilli to restore gut microbiome.",
    traditionalUses: [
      "Replenishes gut flora lost due to antibiotic treatments",
      "Firms loose stools and soothes hyperactive intestines"
    ],
    preparation: "Whisk 1 font cup fresh light curd/yogurt with 1 cup water, a pinch of roasted cumin powder, and rock salt.",
    activeCompounds: ["Probiotic Lactobacilli", "Cuminaldehyde"],
    safetyRating: "Safe",
    recommendedFor: ["Diarrhea", "Loose Stools", "Antibiotic Stomach Upset"],
    iconName: "Coffee"
  }
];

export const DEMO_INTERACTION_RESULT: {
  remedy: Remedy;
  overallStatus: 'SAFE_WITH_CAUTION' | 'COMPATIBLE' | 'CONTRAINDICATED';
  riskScore: string;
  details: InteractionDetail[];
  summary: string;
  actionableSteps: string[];
} = {
  remedy: AYURBOOK_REMEDIES[0], // Ginger Tea
  overallStatus: 'SAFE_WITH_CAUTION',
  riskScore: 'Low-to-Moderate Caution',
  summary: 'Ginger Tea (Zingiber officinale) exhibits NO severe chemical blockage or adverse drug-drug cross-reactions with Demo Medicine A (Amoxicillin) or Demo Medicine B (Paracetamol). However, because antibiotics like Amoxicillin can irritate stomach linings in some patients, consuming ginger tea on an empty stomach might trigger mild acidity. Taking warm ginger tea 30 minutes AFTER food is recommended.',
  details: [
    {
      medicineId: "med-a",
      medicineName: "Demo Medicine A (Amoxicillin 500mg)",
      remedyId: "rem-ginger",
      remedyName: "Ginger Tea",
      riskLevel: "MODERATE_CAUTION",
      summary: "Mild potential for stomach lining stimulation when combined.",
      mechanism: "Gingerols stimulate gastric juice secretion. When paired with oral antibiotics on an empty stomach, stomach acidity may temporarily spike.",
      actionableAdvice: "Always take your Ginger Tea with or 30 minutes after your meal and antibiotic dose. Do not drink boiling hot."
    },
    {
      medicineId: "med-b",
      medicineName: "Demo Medicine B (Paracetamol 500mg)",
      remedyId: "rem-ginger",
      remedyName: "Ginger Tea",
      riskLevel: "LOW_RISK",
      summary: "No metabolic interference detected in standard dietary amounts.",
      mechanism: "Paracetamol is metabolized primarily via hepatic glucuronidation; mild dietary ginger consumption does not inhibit CYP450 enzymes at therapeutic doses.",
      actionableAdvice: "Compatible. Maintain normal hydration."
    }
  ],
  actionableSteps: [
    "Sip warm (not hot) ginger tea 30 minutes after light meals.",
    "Do not consume concentrated ginger supplements/extract capsules; stick to light culinary tea.",
    "Maintain a gap of 45-60 minutes between antibiotic intake and herbal tea for optimal stomach absorption.",
    "Log your response in the Recovery Timeline after 2 hours."
  ]
};

export const INITIAL_TIMELINE: TimelineEvent[] = [
  {
    id: "tl-1",
    day: 1,
    date: "Aug 20, 2026",
    title: "Hospital Discharge & Recovery Plan Initialized",
    description: "Discharged following successful laparoscopic appendectomy. Prescribed Demo Medicine A (Antibiotic) & Demo Medicine B (Pain Reliever).",
    category: "DISCHARGE",
    status: "COMPLETED",
    badgeColor: "emerald"
  },
  {
    id: "tl-2",
    day: 2,
    date: "Aug 21, 2026",
    title: "Post-Op Home Vital Check",
    description: "Temperature 98.4°F, blood pressure normal. Walking 10 minutes around living room.",
    category: "MILESTONE",
    status: "COMPLETED",
    badgeColor: "teal"
  },
  {
    id: "tl-3",
    day: 3,
    date: "Aug 22, 2026",
    title: "Surgical Dressing & Pain Check",
    description: "Incision clean and dry. Pain reduced from 6/10 to 3/10. Demo Medicine B taken once.",
    category: "MEDICATION",
    status: "COMPLETED",
    badgeColor: "indigo"
  },
  {
    id: "tl-4",
    day: 4,
    date: "Aug 24, 2026 (TODAY)",
    title: "Symptom Check-in & AyurBook Safety Check",
    description: "Logged 'Mild Nausea' post-lunch. Passed Red-Flag Safety Gate. Checked Ginger Tea against Demo Medicine A & B (Cleared with mild caution).",
    category: "REMEDY",
    status: "CURRENT",
    badgeColor: "amber"
  },
  {
    id: "tl-5",
    day: 5,
    date: "Aug 25, 2026",
    title: "Post-Op Tele-Check Routine",
    description: "Follow-up check-in with CareConnect nurse assistant.",
    category: "MILESTONE",
    status: "UPCOMING",
    badgeColor: "slate"
  },
  {
    id: "tl-6",
    day: 7,
    date: "Aug 27, 2026",
    title: "Antibiotic Course Completion",
    description: "Final dose of Demo Medicine A (Amoxicillin) expected.",
    category: "MEDICATION",
    status: "UPCOMING",
    badgeColor: "slate"
  },
  {
    id: "tl-7",
    day: 14,
    date: "Sep 03, 2026",
    title: "Final Doctor Consultation & Recovery Clearance",
    description: "Post-operative follow-up clinic visit with Dr. Vikram Malhotra.",
    category: "MILESTONE",
    status: "UPCOMING",
    badgeColor: "slate"
  }
];
