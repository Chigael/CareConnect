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
    summary: "Time-tested botanical infusion widely used to soothe stomach uneasiness, relieve nausea, and stimulate gentle digestion.",
    traditionalUses: [
      "Alleviates mild nausea and abdominal motion uneasiness",
      "Enhances digestion (Agni Deepana) without heavy stomach load",
      "Helps reduce bloating and intestinal gas"
    ],
    preparation: "Gently simmer 1/2 tsp fresh crushed ginger root in 1 cup of boiling water for 5 minutes. Strain and sip warm.",
    activeCompounds: ["Gingerols", "Shogaols", "Zingerone"],
    safetyRating: "Safe",
    recommendedFor: ["Nausea", "Mild Nausea", "Morning sickness", "Stomach Upset", "Indigestion"],
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
    recommendedFor: ["Nausea", "Vomiting", "Indigestion", "Motion Sickness"],
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
    recommendedFor: ["Headaches", "Headache", "Stress", "Fatigue", "Brain Fog"],
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
    recommendedFor: ["Acidity", "Heartburn", "GERD", "Gastritis", "Bloating"],
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
    recommendedFor: ["Acidity", "Acid Reflux", "Indigestion", "Immunity"],
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
    recommendedFor: ["Insomnia", "Sleep Disturbance", "Restlessness", "Anxiety", "Poor Sleep"],
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
    recommendedFor: ["Insomnia", "Sleep", "Fatigue", "Stress", "Poor Sleep", "Weakness"],
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
    recommendedFor: ["Diarrhea", "Loose Stools", "Stomach Cramps", "Cramps"],
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
    preparation: "Whisk 1 cup fresh light curd/yogurt with 1 cup water, a pinch of roasted cumin powder, and rock salt.",
    activeCompounds: ["Probiotic Lactobacilli", "Cuminaldehyde"],
    safetyRating: "Safe",
    recommendedFor: ["Diarrhea", "Loose Stools", "Antibiotic Stomach Upset", "Indigestion"],
    iconName: "Coffee"
  },
  {
    id: "rem-tulsi-pepper",
    name: "Tulsi & Black Pepper Decoction",
    botanicalName: "Ocimum sanctum & Piper nigrum",
    sanskritName: "Tulsi-Maricha Kwath",
    category: "Cold & Respiratory Relief",
    summary: "Revered Ayurvedic immunity tea that opens congested airways, soothes sinus pressure, and clears head cold.",
    traditionalUses: [
      "Clears nasal blockage and sinus congestion",
      "Relieves acute cold symptoms and runny nose"
    ],
    preparation: "Simmer 8-10 fresh Holy Basil (Tulsi) leaves and 3 crushed black peppercorns in 1.5 cups of water for 7 minutes. Strain, add 1 tsp raw honey, and drink warm.",
    activeCompounds: ["Eugenol", "Piperine", "Ursolic acid"],
    safetyRating: "Safe",
    recommendedFor: ["Cold", "Nasal Congestion", "Head Cold", "Sinus", "Runny Nose"],
    iconName: "Leaf"
  },
  {
    id: "rem-cinnamon-honey",
    name: "Cinnamon & Honey Warm Infusion",
    botanicalName: "Cinnamomum verum",
    sanskritName: "Twak & Madhu",
    category: "Cold & Sinus Care",
    summary: "Warming antibacterial spice elixir that breaks up nasal congestion, soothes sinus irritation, and combats early cold onset.",
    traditionalUses: [
      "Relieves head cold, nasal drip, and early chills",
      "Stimulates circulation and warms cold extremities"
    ],
    preparation: "Mix 1/4 tsp organic Ceylon cinnamon powder in 1 cup warm water with 1 tsp raw honey. Sip twice daily.",
    activeCompounds: ["Cinnamaldehyde", "Eugenol"],
    safetyRating: "Safe",
    recommendedFor: ["Cold", "Head Cold", "Sinus", "Chills", "Runny Nose"],
    iconName: "Sparkles"
  },
  {
    id: "rem-adulsa",
    name: "Vasaka (Adulsa) & Honey Syrup",
    botanicalName: "Justicia adhatoda",
    sanskritName: "Vasaka / Adulsa",
    category: "Cough & Bronchial Care",
    summary: "Potent natural bronchodilator and expectorant that thins stubborn chest phlegm and calms persistent cough fits.",
    traditionalUses: [
      "Liquefies bronchial secretions for easier coughing",
      "Soothes irritated air passages and dry cough"
    ],
    preparation: "Extract 1 tsp fresh Vasaka leaf juice or steep 1/2 tsp dried Vasaka powder in hot water for 5 minutes. Mix with 1 tsp honey after cooling slightly.",
    activeCompounds: ["Vasicine", "Vasicinone"],
    safetyRating: "Safe",
    recommendedFor: ["Cough", "Dry Cough", "Chest Congestion", "Bronchial Irritation"],
    iconName: "Shield"
  },
  {
    id: "rem-sitopaladi",
    name: "Sitopaladi Churna with Honey",
    botanicalName: "Bambusa arundinacea & Piper longum",
    sanskritName: "Sitopaladi Churna",
    category: "Cough & Throat Care",
    summary: "Classic Ayurvedic respiratory powder that pacifies chest tightness, relieves wet or dry cough, and eases throat irritation.",
    traditionalUses: [
      "Calms acute cough bouts and throat tickle",
      "Clears mucous congestion from respiratory tract"
    ],
    preparation: "Mix 1/2 tsp Sitopaladi powder with 1 tsp organic honey. Lick slowly twice daily after meals.",
    activeCompounds: ["Piperine", "Bambusa Silica", "Gingerols"],
    safetyRating: "Safe",
    recommendedFor: ["Cough", "Wet Cough", "Dry Cough", "Chest Congestion", "Cold"],
    iconName: "Sparkles"
  },
  {
    id: "rem-mulethi",
    name: "Mulethi (Licorice) Throat Elixir",
    botanicalName: "Glycyrrhiza glabra",
    sanskritName: "Yashtimadhu / Mulethi",
    category: "Sore Throat & Vocal Care",
    summary: "Demulcent sweet root tea that coats inflamed pharyngeal mucosa, instantly easing raw throat pain and hoarseness.",
    traditionalUses: [
      "Instantly cools burning and raw pain in sore throat",
      "Protects vocal cords and reduces throat tickle"
    ],
    preparation: "Gently boil a 1-inch piece of crushed Mulethi root in 1 cup water for 5 minutes. Sip warm slowly.",
    activeCompounds: ["Glycyrrhizin", "Liquiritigenin"],
    safetyRating: "Safe",
    recommendedFor: ["Sore Throat", "Throat Pain", "Hoarseness", "Cough", "Throat Irritation"],
    iconName: "Coffee"
  },
  {
    id: "rem-salt-turmeric-gargle",
    name: "Salt & Turmeric Warm Gargle",
    botanicalName: "Curcuma longa & Rock Salt",
    sanskritName: "Haridra-Lavana Jala",
    category: "Sore Throat & Oral Hygiene",
    summary: "Simple, highly effective anti-inflammatory salt gargle that reduces pharyngeal tissue swelling and kills sore throat pathogens.",
    traditionalUses: [
      "Reduces tonsil swelling and scratchy throat raw pain",
      "Flushes out bacteria and mucus from back of throat"
    ],
    preparation: "Dissolve 1/4 tsp turmeric powder and 1/2 tsp rock salt in 1 cup warm water. Gargle thoroughly for 60 seconds twice daily.",
    activeCompounds: ["Curcumin", "Sodium Chloride"],
    safetyRating: "Safe",
    recommendedFor: ["Sore Throat", "Throat Pain", "Tonsil Swelling", "Hoarseness"],
    iconName: "Shield"
  },
  {
    id: "rem-turmeric-golden-milk",
    name: "Golden Turmeric Pepper Milk",
    botanicalName: "Curcuma longa",
    sanskritName: "Haridra Ksheera",
    category: "Fever & Immunity Boost",
    summary: "Classic Ayurvedic golden brew packed with anti-inflammatory curcumin to lower low-grade fever and speed recovery.",
    traditionalUses: [
      "Promotes mild diaphoresis to break low-grade fever",
      "Calms systemic inflammation and muscular aches"
    ],
    preparation: "Warm 1 cup milk (or oat milk) with 1/2 tsp organic turmeric powder and a pinch of black pepper for 5 minutes.",
    activeCompounds: ["Curcumin", "Demethoxycurcumin", "Piperine"],
    safetyRating: "Safe",
    recommendedFor: ["Fever", "Mild Fever", "Body Ache", "Immunity", "Chills"],
    iconName: "Sparkles"
  },
  {
    id: "rem-giloy",
    name: "Giloy (Guduchi) Immunity Tea",
    botanicalName: "Tinospora cordifolia",
    sanskritName: "Guduchi / Amrita",
    category: "Fever & Convalescence",
    summary: "Known as the nectar of life in Ayurveda, Giloy pacifies recurrent fevers, detoxifies blood, and restores energy.",
    traditionalUses: [
      "Reduces chronic low-grade fever (Jwarahara)",
      "Restores vitality and immune stamina after illness"
    ],
    preparation: "Steep 1/2 tsp Giloy powder or crushed stem in 1 cup boiling water for 8 minutes. Strain and drink once daily.",
    activeCompounds: ["Tinosporoside", "Cordifolioside A"],
    safetyRating: "Safe",
    recommendedFor: ["Fever", "Fatigue", "Post-Illness Weakness", "Body Ache", "Weakness"],
    iconName: "Shield"
  },
  {
    id: "rem-dashamula",
    name: "Dashamula Warm Kwath",
    botanicalName: "Ten Sacred Roots Blend",
    sanskritName: "Dashamula Kwath",
    category: "Fever & Body Pain",
    summary: "Revered Ayurvedic formulation of ten roots that pacifies Vata disorders, relieving post-fever body aches and deep stiffness.",
    traditionalUses: [
      "Relieves generalized body pain, malaise, and post-fever exhaustion",
      "Pacifies neural and musculoskeletal aches"
    ],
    preparation: "Boil 1 tsp Dashamula coarse powder in 2 cups water until reduced to 1/2 cup. Strain and drink warm.",
    activeCompounds: ["Lupeol", "β-Sitosterol", "Flavonoids"],
    safetyRating: "Safe",
    recommendedFor: ["Fever", "Body Ache", "Back Pain", "Joint Stiffness", "Fatigue"],
    iconName: "Leaf"
  },
  {
    id: "rem-triphala-gargle",
    name: "Triphala Warm Gargle",
    botanicalName: "Phyllanthus emblica, Terminalia chebula, Terminalia bellirica",
    sanskritName: "Triphala Kwath",
    category: "Cold Sores & Oral Care",
    summary: "Antimicrobial astringent wash that speeds healing of cold sores, mouth ulcers, and inflamed gums.",
    traditionalUses: [
      "Dries out and heals oral cold sores and aphthous ulcers",
      "Tightens spongy gums and eliminates oral bacteria"
    ],
    preparation: "Boil 1/2 tsp Triphala powder in 1 cup water for 3 minutes. Allow to cool to warm room temperature, add a pinch of rock salt, and gargle/rinse mouth.",
    activeCompounds: ["Tannic acid", "Gallic acid", "Chebulic acid"],
    safetyRating: "Safe",
    recommendedFor: ["Cold Sores", "Mouth Ulcers", "Sore Throat", "Gum Swelling", "Lip Blisters"],
    iconName: "Leaf"
  },
  {
    id: "rem-coconut-turmeric-paste",
    name: "Virgin Coconut Oil & Turmeric Paste",
    botanicalName: "Cocos nucifera & Curcuma longa",
    sanskritName: "Narikela-Haridra Lepa",
    category: "Cold Sores & Skin Sores",
    summary: "Cooling antimicrobial paste that soothes stinging cold sores, blistered lips, and painful skin redness.",
    traditionalUses: [
      "Provides antiviral protective shield over cold sores",
      "Relieves burning pain and accelerates skin barrier repair"
    ],
    preparation: "Mix 1/2 tsp pure cold-pressed coconut oil with 1/4 tsp organic turmeric powder. Dab gently on cold sore 3 times daily.",
    activeCompounds: ["Lauric Acid", "Curcumin"],
    safetyRating: "Safe",
    recommendedFor: ["Cold Sores", "Lip Blisters", "Mouth Ulcers", "Mild Skin Irritation"],
    iconName: "Shield"
  },
  {
    id: "rem-shatavari-ashwagandha",
    name: "Shatavari & Ashwagandha Rejuvenator",
    botanicalName: "Asparagus racemosus & Withania somnifera",
    sanskritName: "Rasayana Ksheera",
    category: "Fatigue & Physical Weakness",
    summary: "Nourishing revitalizing tonic designed to combat post-viral exhaustion, weakness, and muscular fatigue.",
    traditionalUses: [
      "Rebuilds physical tissue strength (Dhatu Poshana)",
      "Combats chronic fatigue and daily physical exhaustion"
    ],
    preparation: "Mix 1/2 tsp Shatavari and 1/4 tsp Ashwagandha powder in 1 cup warm milk or warm water.",
    activeCompounds: ["Shatavarins", "Withanolides"],
    safetyRating: "Safe",
    recommendedFor: ["Fatigue", "Weakness", "Low Energy", "Body Ache", "Exhaustion"],
    iconName: "Sparkles"
  },
  {
    id: "rem-chyawanprash",
    name: "Chyawanprash Herbal Elixir",
    botanicalName: "Amalaki & 40+ Convalescent Herbs",
    sanskritName: "Chyawanprash",
    category: "Fatigue & Stamina Boost",
    summary: "Ancient Ayurvedic rasayana jam formulated to boost vital life energy (Ojas), rebuild stamina, and eliminate fatigue.",
    traditionalUses: [
      "Restores energy and tissue vitality after illness",
      "Enhances immunity and respiratory strength"
    ],
    preparation: "Take 1 tsp Chyawanprash twice daily followed by a warm cup of milk or water.",
    activeCompounds: ["Ascorbic Acid", "Polyphenols", "Piperine"],
    safetyRating: "Safe",
    recommendedFor: ["Fatigue", "Weakness", "Low Energy", "Immunity", "Exhaustion"],
    iconName: "Sparkles"
  },
  {
    id: "rem-eucalyptus-compress",
    name: "Eucalyptus & Mint Steam Compress",
    botanicalName: "Eucalyptus globulus & Mentha arvensis",
    sanskritName: "Nilgiri-Pudina Vasp",
    category: "Headaches & Sinus Tension",
    summary: "Soothing aromatic inhalant that relieves throbbing vascular headaches, forehead tightness, and sinus heaviness.",
    traditionalUses: [
      "Relieves general tension headaches and forehead pressure",
      "Opens blocked sinuses and refreshes heavy head feeling"
    ],
    preparation: "Add 2 drops eucalyptus oil or fresh crushed mint leaves to a bowl of hot steaming water. Inhale steam with towel overhead for 5 minutes.",
    activeCompounds: ["Eucalyptol (1,8-cineole)", "Menthol"],
    safetyRating: "Safe",
    recommendedFor: ["Headache", "Headaches", "Sinus Headache", "Tension", "Forehead Pressure"],
    iconName: "Coffee"
  },
  {
    id: "rem-chandan-paste",
    name: "Sandalwood & Camphor Cooling Paste",
    botanicalName: "Santalum album & Cinnamomum camphora",
    sanskritName: "Chandana Lepa",
    category: "Headaches & Heat Relief",
    summary: "Cooling forehead paste that calms throbbing temples, heat-induced migraines, and stress headaches.",
    traditionalUses: [
      "Rapidly cools burning head heat and temple throbbing",
      "Relieves tension around eyes and forehead"
    ],
    preparation: "Mix 1/2 tsp sandalwood powder with a drop of water and a tiny pinch of natural camphor. Apply to forehead and temples.",
    activeCompounds: ["Santalol", "Camphor"],
    safetyRating: "Safe",
    recommendedFor: ["Headache", "Headaches", "Migraine", "Tension"],
    iconName: "Sparkles"
  },
  {
    id: "rem-nirgundi-ginger",
    name: "Nirgundi & Ginger Warm Compress",
    botanicalName: "Vitex negundo & Zingiber officinale",
    sanskritName: "Nirgundi Kwath",
    category: "Body Ache & Joint Stiffness",
    summary: "Time-tested analgesic herbal infusion that soothes general body pain, back stiffness, and joint soreness.",
    traditionalUses: [
      "Pacifies Vata aggravated muscular body aches and back pain",
      "Reduces joint inflammation and morning stiffness"
    ],
    preparation: "Simmer 1/2 tsp Nirgundi leaf powder and 1/4 tsp ginger in 1.5 cups water until reduced to 1 cup. Drink warm.",
    activeCompounds: ["Nishindoside", "Gingerols", "Sabinenes"],
    safetyRating: "Safe",
    recommendedFor: ["Body Ache", "Back Pain", "Muscle Soreness", "Joint Pain", "Lower Back Pain"],
    iconName: "Leaf"
  },
  {
    id: "rem-shallaki",
    name: "Shallaki (Boswellia) Herbal Tea",
    botanicalName: "Boswellia serrata",
    sanskritName: "Shallaki",
    category: "Back Pain & Joint Relief",
    summary: "Potent anti-inflammatory resin tea that improves joint mobility, eases chronic back pain, and reduces spinal stiffness.",
    traditionalUses: [
      "Reduces inflammatory degradation of spinal and joint cartilage",
      "Eases lower back soreness and stiffness upon standing"
    ],
    preparation: "Steep 1/2 tsp Shallaki extract powder in 1 cup hot water for 5 minutes. Take after meals.",
    activeCompounds: ["Boswellic Acids", "AKBA"],
    safetyRating: "Safe",
    recommendedFor: ["Back Pain", "Joint Pain", "Body Ache", "Muscle Soreness", "Stiffness"],
    iconName: "Shield"
  },
  {
    id: "rem-ajwain-water",
    name: "Ajwain (Carom) & Salt Water",
    botanicalName: "Trachyspermum ammi",
    sanskritName: "Yavani / Ajwain",
    category: "Indigestion & Gas Relief",
    summary: "Fast-acting carminative remedy that breaks down trapped intestinal gas, relieves stomach heaviness, and cures indigestion.",
    traditionalUses: [
      "Provides rapid relief from gas, abdominal fullness, and indigestion",
      "Stops stomach rumbling and sluggish digestion"
    ],
    preparation: "Boil 1/2 tsp crushed Ajwain seeds in 1 cup water with a small pinch of rock salt for 4 minutes. Drink warm after meals.",
    activeCompounds: ["Thymol", "p-Cymene"],
    safetyRating: "Safe",
    recommendedFor: ["Indigestion", "Gas", "Bloating", "Stomach Upset"],
    iconName: "Coffee"
  },
  {
    id: "rem-trikatu",
    name: "Trikatu & Honey Digestive Paste",
    botanicalName: "Black Pepper, Long Pepper & Ginger",
    sanskritName: "Trikatu Churna",
    category: "Indigestion & Metabolism",
    summary: "Pungent three-spice blend that ignites sluggish digestive fire (Agni), clears heavy post-meal fullness, and aids nutrient absorption.",
    traditionalUses: [
      "Kindles low digestive capacity and eliminates stomach heaviness",
      "Reduces excessive mucus and sluggishness in gut"
    ],
    preparation: "Mix 1/4 tsp Trikatu powder with 1 tsp honey 15 minutes before meals.",
    activeCompounds: ["Piperine", "Gingerols"],
    safetyRating: "Safe",
    recommendedFor: ["Indigestion", "Stomach Upset", "Sluggish Digestion", "Bloating"],
    iconName: "Sparkles"
  },
  {
    id: "rem-hingastak",
    name: "Hingastak & Warm Water",
    botanicalName: "Ferula foetida & Herbal Digestives",
    sanskritName: "Hingashtak Churna",
    category: "Bloating & Flatulence",
    summary: "Classic Ayurvedic digestive formula that dissipates stomach abdominal distension, cramps, and severe bloating.",
    traditionalUses: [
      "Disperses painful abdominal bloating and distension",
      "Kindles digestive fire (Agni) for heavy meals"
    ],
    preparation: "Take 1/4 tsp Hingastak powder with 1/2 glass of warm water or ghee with the first bite of meals.",
    activeCompounds: ["Ferulic acid", "Umbelliferone"],
    safetyRating: "Safe",
    recommendedFor: ["Bloating", "Abdominal Cramps", "Flatulence", "Indigestion", "Cramps"],
    iconName: "Shield"
  },
  {
    id: "rem-fenugreek-ajwain",
    name: "Methi (Fenugreek) & Ajwain Infusion",
    botanicalName: "Trigonella foenum-graecum & Trachyspermum ammi",
    sanskritName: "Methi-Ajwain Water",
    category: "Cramps & Abdominal Pain",
    summary: "Antispasmodic warm herbal water that relaxes smooth muscle spasms, easing bowel cramps and menstrual tightness.",
    traditionalUses: [
      "Relieves spasmodic stomach cramps and intestinal colicky pain",
      "Soothes lower abdominal tightness and menstrual cramps"
    ],
    preparation: "Soak 1/2 tsp fenugreek seeds and 1/4 tsp ajwain in 1 cup hot water for 10 minutes. Strain and sip warm.",
    activeCompounds: ["Diosgenin", "Thymol", "Trigonelline"],
    safetyRating: "Safe",
    recommendedFor: ["Cramps", "Stomach Cramps", "Abdominal Pain", "Bloating", "Menstrual Cramps"],
    iconName: "Leaf"
  },
  {
    id: "rem-jatamansi-tea",
    name: "Jatamansi & Shankhpushpi Tea",
    botanicalName: "Nardostachys jatamansi & Convolvulus pluricaulis",
    sanskritName: "Jatamansi-Shankhpushpi",
    category: "Stress & Anxiety Tension",
    summary: "Tranquilizing nervine tonic that calms nervous tension, racing thoughts, and stress-induced muscle tightness.",
    traditionalUses: [
      "Reduces acute nervous stress, irritability, and anxiety",
      "Relieves stress-induced neck tension and mental restlessness"
    ],
    preparation: "Steep 1/4 tsp Jatamansi powder or tea blend in 1 cup hot water for 5 minutes. Drink in the late afternoon or evening.",
    activeCompounds: ["Jatamansone", "Shankhpushpine"],
    safetyRating: "Safe",
    recommendedFor: ["Stress", "Anxiety", "Tension", "Nervous Restlessness"],
    iconName: "Sparkles"
  },
  {
    id: "rem-shankhpushpi",
    name: "Shankhpushpi Calming Syrup",
    botanicalName: "Convolvulus pluricaulis",
    sanskritName: "Shankhpushpi Syrup",
    category: "Stress & Mental Fatigue",
    summary: "Premier Medhya Rasayana (brain tonic) that lowers nervous excitability, eases stress tension, and promotes calm focus.",
    traditionalUses: [
      "Quiets mental chatter and stress-induced anxiety",
      "Soothes tension headaches caused by mental overwork"
    ],
    preparation: "Take 1-2 tsp Shankhpushpi syrup or powder with warm water after meals.",
    activeCompounds: ["Convolvine", "Microphyllic Acid"],
    safetyRating: "Safe",
    recommendedFor: ["Stress", "Anxiety", "Tension", "Brain Fog", "Fatigue"],
    iconName: "Shield"
  },
  {
    id: "rem-neem-turmeric-wash",
    name: "Neem & Turmeric Soothing Wash",
    botanicalName: "Azadirachta indica & Curcuma longa",
    sanskritName: "Nimba-Haridra Kwath",
    category: "Mild Skin Irritation & Rash",
    summary: "Purifying botanical wash that soothes minor skin itching, red rashes, and mild cutaneous irritations.",
    traditionalUses: [
      "Cools itching skin, hives, and redness",
      "Purifies skin surface against environmental irritants"
    ],
    preparation: "Boil 10 clean Neem leaves and 1/2 tsp turmeric powder in 2 cups water for 8 minutes. Cool completely and dab gently on affected skin with clean cotton.",
    activeCompounds: ["Nimbin", "Azadirachtin", "Curcumin"],
    safetyRating: "Safe",
    recommendedFor: ["Mild Skin Irritation", "Skin Rash", "Itching", "Redness", "Skin Irritation"],
    iconName: "Shield"
  },
  {
    id: "rem-aloe-sandalwood",
    name: "Aloe Vera & Sandalwood Gel",
    botanicalName: "Aloe barbadensis & Santalum album",
    sanskritName: "Kumari-Chandana Gel",
    category: "Skin Irritation & Sunburn",
    summary: "Ultra-cooling herbal gel that cools inflamed skin, sunburns, and localized heat rash.",
    traditionalUses: [
      "Instantly cools burning sensation and skin heat",
      "Hydrates and repairs dry irritated skin tissue"
    ],
    preparation: "Mix 1 tbsp fresh aloe vera gel with a pinch of pure Sandalwood (Chandan) powder. Apply topically.",
    activeCompounds: ["Aloin", "Acomannan", "Santalol"],
    safetyRating: "Safe",
    recommendedFor: ["Mild Skin Irritation", "Sunburn", "Heat Rash", "Skin Inflammation", "Skin Irritation", "Itching"],
    iconName: "Sparkles"
  },
  {
    id: "rem-tagara-night-tea",
    name: "Tagara (Valerian) Night Tea",
    botanicalName: "Valeriana wallichii",
    sanskritName: "Tagara Churna",
    category: "Poor Sleep & Restlessness",
    summary: "Calming bedtime infusion that promotes natural sleep onset for people suffering from poor sleep quality or nocturnal waking.",
    traditionalUses: [
      "Shortens time to fall asleep and reduces tossing and turning",
      "Restores peaceful sleep architecture without morning grogginess"
    ],
    preparation: "Steep 1/4 tsp Tagara root powder in 1 cup hot water for 5 minutes before bed.",
    activeCompounds: ["Valepotriates", "Valerenic acid"],
    safetyRating: "Safe",
    recommendedFor: ["Poor Sleep", "Insomnia", "Restlessness", "Night Waking"],
    iconName: "Coffee"
  },
  {
    id: "rem-chamomile-tulsi",
    name: "Chamomile & Tulsi Evening Brew",
    botanicalName: "Matricaria chamomilla & Ocimum sanctum",
    sanskritName: "Pudina-Tulsi Peya",
    category: "Poor Sleep & Relaxation",
    summary: "Gentle evening herbal tea that releases physical muscle tension, relaxes neural excitability, and prepares the mind for deep sleep.",
    traditionalUses: [
      "Relieves evening stress and restlessness",
      "Promotes serene transition into deep restorative sleep"
    ],
    preparation: "Steep 1 tea bag or 1 tsp dried chamomile flowers and 5 tulsi leaves in hot water for 6 minutes before sleep.",
    activeCompounds: ["Apigenin", "Eugenol", "Bisabolol"],
    safetyRating: "Safe",
    recommendedFor: ["Poor Sleep", "Insomnia", "Restlessness", "Stress", "Anxiety"],
    iconName: "Coffee"
  },
  {
    id: "rem-triphala-eyewash",
    name: "Cool Triphala Eye Compress",
    botanicalName: "Haritaki, Bibhitaki, Amalaki",
    sanskritName: "Triphala Netra Tarpana",
    category: "Eye Strain & Fatigue",
    summary: "Traditional cooling ocular wash that refreshes dry, irritated eyes from screen fatigue, reading strain, or heat exposure.",
    traditionalUses: [
      "Relieves ocular burning, dryness, and screen fatigue",
      "Cools Pitta heat around the eyes"
    ],
    preparation: "Soak 1/4 tsp Triphala in 1 cup water overnight. Filter twice through fine cloth until crystal clear. Use as a gentle eye rinse or cool eye pad compress.",
    activeCompounds: ["Gallic acid", "Tannins", "Vitamin C"],
    safetyRating: "Safe",
    recommendedFor: ["Eye Strain", "Tired Eyes", "Eye Irritation", "Screen Fatigue", "Fatigue"],
    iconName: "Sparkles"
  }
];

export const INITIAL_TIMELINE: TimelineEvent[] = [
  {
    id: "tl-1",
    day: 1,
    date: "Today",
    title: "Account Created & Care Plan Initialized",
    description: "Welcome to CareConnect. Your personalized recovery plan and medication schedule are active.",
    category: "DISCHARGE",
    status: "COMPLETED",
    badgeColor: "emerald"
  }
];
