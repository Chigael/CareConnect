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
  recoveryDay: number;
  totalRecoveryDays: number;
  doctorName: string;
  hospitalName: string;
}

export const DEMO_PATIENT: PatientProfile = {
  name: "Ananya Sharma",
  age: 32,
  gender: "Female",
  condition: "Post-Op Appendectomy Recovery",
  dischargeDate: "Aug 20, 2026",
  recoveryDay: 4,
  totalRecoveryDays: 14,
  doctorName: "Dr. Vikram Malhotra (General Surgery)",
  hospitalName: "CareConnect City Hospital"
};

export const DEMO_MEDICATIONS: Medication[] = [
  {
    id: "med-a",
    name: "Demo Medicine A",
    genericName: "Amoxicillin / Clavulanate 500mg",
    category: "Antibiotic",
    dosage: "1 capsule (500mg)",
    frequency: "3 times daily after meals (8:00 AM, 2:00 PM, 8:00 PM)",
    purpose: "Prevent surgical site bacterial infection post-appendectomy",
    instructions: "Finish the complete 7-day prescription course even if feeling better.",
    status: "Active (Day 4/7)",
    color: "teal",
    nextDose: "8:00 PM Today",
    pillsRemaining: 9
  },
  {
    id: "med-b",
    name: "Demo Medicine B",
    genericName: "Paracetamol 500mg",
    category: "Analgesic & Antipyretic",
    dosage: "1 tablet (500mg)",
    frequency: "Every 6 hours as needed for mild-to-moderate incision pain",
    purpose: "Post-operative pain management and mild fever control",
    instructions: "Do not exceed 4 tablets (2000mg) in 24 hours. Take with a full glass of water.",
    status: "Active (As needed)",
    color: "indigo",
    nextDose: "As Needed (Last taken 6h ago)",
    pillsRemaining: 14
  }
];

export const DEMO_SYMPTOM: SymptomLog = {
  id: "symp-01",
  symptom: "Mild Nausea",
  severity: 2,
  onsetTime: "3 hours ago (Post-lunch)",
  notes: "Slight stomach uneasiness after lunch dose of antibiotic.",
  timestamp: "Today at 2:30 PM",
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
    recommendedFor: ["Mild nausea", "Indigestion", "Morning uneasiness"],
    iconName: "Coffee"
  },
  {
    id: "rem-peppermint",
    name: "Peppermint Infusion",
    botanicalName: "Mentha piperita",
    sanskritName: "Pudina",
    category: "Digestive & Antispasmodic",
    summary: "Cooling aromatic herb that helps relax gastrointestinal smooth muscle and ease bloating.",
    traditionalUses: [
      "Relieves abdominal crampiness and stomach fullness",
      "Provides natural cooling sensation for stomach heat",
      "Soothes mild nausea from medication taste"
    ],
    preparation: "Steep 4-5 fresh mint leaves or 1 tsp dried peppermint in hot water for 4 minutes.",
    activeCompounds: ["Menthol", "Menthone", "Menthyl acetate"],
    safetyRating: "Safe",
    recommendedFor: ["Bloating", "Mild discomfort", "Gas"],
    iconName: "Leaf"
  },
  {
    id: "rem-licorice",
    name: "Licorice Root Tea",
    botanicalName: "Glycyrrhiza glabra",
    sanskritName: "Yasthimadhu",
    category: "Mucosal Protection",
    summary: "Demulcent herb known for forming a soothing protective coating over stomach mucosa.",
    traditionalUses: [
      "Soothes hyperacidity and stomach lining irritation",
      "Supports esophageal comfort after anesthesia intubation"
    ],
    preparation: "Boil 1/4 tsp licorice root powder in water for 3 minutes. Sip slowly.",
    activeCompounds: ["Glycyrrhizin", "Liquiritin"],
    safetyRating: "Caution",
    recommendedFor: ["Stomach irritation", "Acid reflux"],
    iconName: "Shield"
  },
  {
    id: "rem-tulsi",
    name: "Tulsi (Holy Basil) Tea",
    botanicalName: "Ocimum sanctum",
    sanskritName: "Tulsi",
    category: "Immunity & Stress Relief",
    summary: "Revered adaptogenic herb that promotes cellular vitality and mild nervous system calm.",
    traditionalUses: [
      "Supports natural immune defenses during recovery",
      "Promotes mental calm and reduces post-hospital stress"
    ],
    preparation: "Steep 5-6 fresh Tulsi leaves in hot water for 5 minutes.",
    activeCompounds: ["Eugenol", "Ursolic acid", "Rosmarinic acid"],
    safetyRating: "Safe",
    recommendedFor: ["Stress", "Mild fatigue", "Immune support"],
    iconName: "Sparkles"
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
