import { MEDIA_CONFIG } from './config.js';

/**
 * Shared single-source "When PEEK is not the answer" block
 * Used identically in Section 1 PEEK FAQ and Section 3 Before You Decide.
 */
export const NOT_PEEK_BLOCK = {
  heading: 'When PEEK is not the answer',
  items: [
    {
      issue: 'Skin laxity or sagging',
      direction: 'Lifting procedures address soft-tissue descent; bone-level implants do not lift loose skin.',
    },
    {
      issue: 'Bite or jaw-alignment (occlusion) issues',
      direction: 'Functional bite discrepancies require orthognathic evaluation rather than cosmetic onlay implants.',
    },
    {
      issue: 'Pure soft-tissue volume loss',
      direction: 'Where the underlying bone frame is already balanced, implants may not be needed at all.',
    },
  ],
  closing: 'Your consultation will tell you which option fits you.',
  statusNote: '[Clinical scope subject to partner surgeon review]',
};

/**
 * 7 A-list Areas (Locked English names)
 * 5 existing implant components vs 7 simulation design areas clearly separated.
 */
export const AREAS_A_LIST = [
  {
    id: 'brow-ridge',
    name: 'Brow ridge',
    hasExistingImplant: true,
    categoryNote: 'Existing implant component · Included in 7-area simulation',
    focus: 'Upper-third projection and orbital framing along the frontal bone.',
    caution:
      'Temporary numbness is common after surgery; swelling can create a prominent bulge and may be followed by tissue thickening (hyperplasia); augmentation height must not exceed the thickness of your own skin and soft tissue; an overly aggressive design is the most common reason for revision.',
    cautionTag: '[Pending surgeon confirmation]',
    hotspot: { position: '0m 0.048m 0.095m', normal: '0m 0.15m 0.98m' },
    caseCount: 0,
  },
  {
    id: 'cheekbones',
    name: 'Cheekbones',
    hasExistingImplant: true,
    categoryNote: 'Existing implant component · Included in 7-area simulation',
    focus: 'Midface structural width, malar support, and smooth lateral transition.',
    caution:
      'The cheeks and upper lip may feel numb after cheekbone and infraorbital surgery; in thin-tissue zones such as the orbital rim and lower eyelid, implant edges may be felt or even seen; titanium screw-hole placement is critical and errors can cause serious complications.',
    cautionTag: '[Pending surgeon confirmation]',
    hotspot: { position: '0.058m 0.008m 0.068m', normal: '0.75m 0.05m 0.65m' },
    caseCount: 0,
  },
  {
    id: 'nasal-base',
    name: 'Nasal base',
    hasExistingImplant: true,
    categoryNote: 'Existing implant component · Included in 7-area simulation',
    focus: 'Piriform aperture support beneath the midface and nasolabial junction.',
    caution:
      'Design drawings and height must be mutually confirmed pre-op with mandatory 3D modeling; treating the nasal base alone can create a protruding upper-lip appearance and widen the alar base (over 4 mm of width increase can widen the alar base by ~1 mm); post-op effects may include swelling, nostril flaring, a longer philtrum, temporary midface tissue separation, possible numbness, and possible toothache for 3–7 days; improperly tightened screws can lead to displacement, with reported cases of intraoral extrusion; there are also reported cases of infection with repeated healing failure ultimately requiring removal.',
    cautionTag: '[Pending surgeon confirmation]',
    hotspot: { position: '0m -0.015m 0.098m', normal: '0m 0m 1m' },
    caseCount: 0,
  },
  {
    id: 'chin',
    name: 'Chin',
    hasExistingImplant: true,
    categoryNote: 'Existing implant component · Included in 7-area simulation',
    focus: 'Lower-third projection, vertical proportion, and mentolabial balance.',
    caution:
      'The chin has the highest risk of unsatisfactory outcomes: an oversized design can make closing the mouth difficult, while an undersized design yields little visible change; the implant cannot be modified intraoperatively and would have to be remanufactured; there are reported cases of reversed implant placement; mental nerve numbness is possible; after removal, surface irregularity can occur, with explanted pieces sometimes showing curled edges or surface pitting.',
    cautionTag: '[Pending surgeon confirmation]',
    hotspot: { position: '0m -0.085m 0.088m', normal: '0m -0.2m 0.98m' },
    caseCount: 0,
  },
  {
    id: 'jaw-angle',
    name: 'Jaw angle',
    hasExistingImplant: true,
    categoryNote: 'Existing implant component (includes jawline) · Included in 7-area simulation',
    focus: 'Mandibular angle definition and continuous jawline contour from ramus to chin.',
    caution: 'Implant edges may be visible or palpable.',
    cautionTag: '[Pending surgeon confirmation]',
    hotspot: { position: '0.056m -0.062m 0.012m', normal: '0.92m -0.15m 0.35m' },
    caseCount: 0,
  },
  {
    id: 'forehead',
    name: 'Forehead',
    hasExistingImplant: false,
    categoryNote: 'Custom simulation design range (not in standard 5-area component list)',
    focus: 'Frontal contour smoothness and upper-third curvature designed from your CT.',
    caution:
      'Swelling and tissue thickening (hyperplasia) may occur; smaller forehead areas can temporarily swell into a prominent bulge.',
    cautionTag: '[Pending surgeon confirmation]',
    hotspot: { position: '0m 0.088m 0.075m', normal: '0m 0.55m 0.83m' },
    caseCount: 0,
  },
  {
    id: 'crown',
    name: 'Crown',
    hasExistingImplant: false,
    categoryNote: 'Custom simulation design range (not in standard 5-area component list)',
    focus: 'Cranial vertex curvature and upper-head proportion in 3D custom design.',
    caution: '',
    cautionTag: "[Pending surgeon's draft]",
    hotspot: { position: '0m 0.132m 0.005m', normal: '0m 1m 0m' },
    caseCount: 0,
  },
];

/**
 * 8-Grid Redo Layout (EXEC-SUMMARY §2):
 * - Old L1-L4 / R1-R4 images are NEVER used on site.
 * - Male 4 tiles first (Cheekbones, Jaw angle, Chin, Brow ridge) using demonstrator simulation views.
 * - Female 4 tiles next (Forehead, Crown, Nasal base, Chin) as clean placeholder frames pending shoot.
 * - Every tile supports Before / Simulated after toggle (150-200ms fade) + "See cases" deep link.
 */
export const GRID_8_TILES = [
  {
    id: 'male-cheekbones',
    group: 'male',
    areaId: 'cheekbones',
    areaName: 'Cheekbones',
    subtitle: 'Lateral malar support · Demonstrator model',
    isPlaceholder: false,
    beforeImg: MEDIA_CONFIG.VIEWS.oblique,
    afterImg: MEDIA_CONFIG.SIM.bone,
    beforeCaption: 'Reference baseline view (demonstrator skull, not patient data)',
    afterCaption: 'Simulated PEEK skeletal overlay — Cheekbones (illustrative only)',
  },
  {
    id: 'male-jaw-angle',
    group: 'male',
    areaId: 'jaw-angle',
    areaName: 'Jaw angle',
    subtitle: 'Mandibular angle & jawline · Demonstrator model',
    isPlaceholder: false,
    beforeImg: MEDIA_CONFIG.VIEWS.side,
    afterImg: MEDIA_CONFIG.SIM.profile,
    beforeCaption: 'Reference lateral view (demonstrator model, not patient data)',
    afterCaption: 'Simulated profile contour — Jaw angle & jawline (illustrative only)',
  },
  {
    id: 'male-chin',
    group: 'male',
    areaId: 'chin',
    areaName: 'Chin',
    subtitle: 'Lower-third projection · Demonstrator model',
    isPlaceholder: false,
    beforeImg: MEDIA_CONFIG.VIEWS.front,
    afterImg: MEDIA_CONFIG.SIM.front,
    beforeCaption: 'Reference frontal view (demonstrator model, not patient data)',
    afterCaption: 'Simulated front overlay — Chin & lower third (illustrative only)',
  },
  {
    id: 'male-brow-ridge',
    group: 'male',
    areaId: 'brow-ridge',
    areaName: 'Brow ridge',
    subtitle: 'Supraorbital framing · Demonstrator model',
    isPlaceholder: false,
    beforeImg: MEDIA_CONFIG.VIEWS.oblique,
    afterImg: MEDIA_CONFIG.SIM.bone,
    beforeCaption: 'Reference oblique view (demonstrator skull, not patient data)',
    afterCaption: 'Simulated PEEK skeletal overlay — Brow ridge (illustrative only)',
  },
  {
    id: 'female-forehead',
    group: 'female',
    areaId: 'forehead',
    areaName: 'Forehead',
    subtitle: 'Upper-third curvature · Female simulation',
    isPlaceholder: true,
    placeholderBefore: 'Female demonstrator — Before [Pending shoot]',
    placeholderAfter: 'Female demonstrator — Simulated after (Forehead) [Pending shoot]',
  },
  {
    id: 'female-crown',
    group: 'female',
    areaId: 'crown',
    areaName: 'Crown',
    subtitle: 'Cranial contour · Female simulation',
    isPlaceholder: true,
    placeholderBefore: 'Female demonstrator — Before [Pending shoot]',
    placeholderAfter: 'Female demonstrator — Simulated after (Crown) [Pending shoot]',
  },
  {
    id: 'female-nasal-base',
    group: 'female',
    areaId: 'nasal-base',
    areaName: 'Nasal base',
    subtitle: 'Midface piriform support · Female simulation',
    isPlaceholder: true,
    placeholderBefore: 'Female demonstrator — Before [Pending shoot]',
    placeholderAfter: 'Female demonstrator — Simulated after (Nasal base) [Pending shoot]',
  },
  {
    id: 'female-chin',
    group: 'female',
    areaId: 'chin',
    areaName: 'Chin',
    subtitle: 'Lower-third balance · Female simulation',
    isPlaceholder: true,
    placeholderBefore: 'Female demonstrator — Before [Pending shoot]',
    placeholderAfter: 'Female demonstrator — Simulated after (Chin) [Pending shoot]',
  },
];

/**
 * 5-Material Comparison Table (v1.51 §1.2 Step 7 + EXEC-SUMMARY §7)
 * Generic clinical material names only (no commercial brand names).
 * Limitations column intentionally left pending surgeon confirmation.
 */
export const MATERIALS_TABLE = [
  {
    name: 'PEEK (Polyetheretherketone)',
    customFit: 'CT-based 3D patient-specific design & printing',
    imaging: 'Radiolucent (minimal CT / MRI artifact)',
    stability: 'Rigid polymer with bone-like elastic modulus; screw-fixated',
    limitation: '[Pending surgeon confirmation]',
  },
  {
    name: 'Titanium',
    customFit: 'Custom 3D-printed or pre-bent plates/mesh',
    imaging: 'Radiopaque (can cause CT scatter artifact)',
    stability: 'High mechanical strength; metallic thermal conductivity',
    limitation: '[Pending surgeon confirmation]',
  },
  {
    name: 'Silicone',
    customFit: 'Standard off-the-shelf shapes carved intraoperatively',
    imaging: 'Low density on imaging',
    stability: 'Soft elastomer; relies on capsule and pocket fit',
    limitation: '[Pending surgeon confirmation]',
  },
  {
    name: 'ePTFE (Expanded PTFE)',
    customFit: 'Sheet or pre-formed blocks trimmed intraoperatively',
    imaging: 'Low density on imaging',
    stability: 'Microporous flexible polymer allowing soft-tissue ingrowth',
    limitation: '[Pending surgeon confirmation]',
  },
  {
    name: 'Autologous bone',
    customFit: 'Harvested and contoured from patient’s own donor site',
    imaging: 'Native bone appearance on imaging',
    stability: 'Living tissue; requires donor-site surgery',
    limitation: '[Pending surgeon confirmation]',
  },
];

/**
 * 6-Step Process Bar (v1.51 §1.2 Step 9)
 */
export const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Free consultation',
    desc: 'Ask questions first — no files, no payment, no obligation. We reply within 2 working days. [Pending clinic confirmation]',
  },
  {
    num: '02',
    title: 'Online CT upload',
    desc: 'Upload your hospital CT archive online (up to 500 MB) via a dedicated transfer link — used strictly for design review and deleted after completion.',
  },
  {
    num: '03',
    title: '3D simulation & revisions',
    desc: 'Full-head 3D design from your CT with before/after views and revisions before you decide to travel.',
  },
  {
    num: '04',
    title: 'Arrive in Shanghai & in-person assessment',
    desc: 'Airport pickup and face-to-face clinical evaluation. Final implant geometry follows in-person assessment and factory CAD.',
  },
  {
    num: '05',
    title: 'Printing & surgery',
    desc: 'Implant production (printing days per manufacturer schedule) followed by surgery with our partner surgical team.',
  },
  {
    num: '06',
    title: 'Recovery, fit-to-fly & follow-up',
    desc: 'Structured recovery and follow-up visits in Shanghai until written fit-to-fly clearance, plus ongoing post-return communication.',
  },
];

/**
 * Section 2: Why Shanghai (China) — 3 YouTube Episodes (Default Expanded)
 */
export const YOUTUBE_EPISODES = [
  {
    ep: 'Ep. 1',
    duration: '15–20 min',
    theme: 'Safety first',
    title: 'Why Shanghai feels safe — on the street, in the hospital, and in the operating room',
    coverLabel: 'Cover: The Bund at night (11 p.m.) · Street safety & medical systems',
    coverTag: '[Pending filming — Bund night visual frame]',
    openingQuote: '“This is the Bund at 11 p.m. — and this is what safety looks like here.”',
    featuredLines: [
      '“Cameras are everywhere here — and in a place you don\'t know, that\'s what keeps you safe.”',
      '“Lit streets, convenience stores open late, patrols passing — and the walk back to your hotel alone at night.”',
    ],
    supportNote: 'English-language help when you need it, airport pickup, and support at every appointment.',
    bullets: [
      'Street safety separated from medical safety: we address public safety, surgical protocols, and anesthesia safety as three distinct layers.',
      'System-led clinical safety (illustrative examples, e.g., CT-based pre-op planning, licensed hospital setting with dedicated anesthesia team, and bilingual coordinator support — final institutional details pending clinic confirmation).',
      'Clear pre-op and emergency escalation pathways before you ever board a flight.',
    ],
    highlightPlaceholder: '30–60s highlight clip · [Pending filming — real street view & night scene]',
    fullVideoStatus: '[Unlisted YouTube link — pending filming]',
  },
  {
    ep: 'Ep. 2',
    duration: '15–20 min',
    theme: 'Surgical experience',
    title: 'Inside the hospital — hands, process, and verifiable credentials',
    coverLabel: 'Cover: Partner hospital environment [Gray placeholder pending institutional photography authorization]',
    coverTag: '[Gray placeholder — awaiting licensed partner hospital photography]',
    openingQuote:
      '“This is the hospital. You won\'t see our surgeons\' faces here — you\'ll see their hands, their process and their record.”',
    featuredLines: [],
    supportNote: 'Experience is documented through written credentials and verifiable registry records — never unverified volume claims.',
    bullets: [
      'Why clinical experience matters in custom PEEK surgery: matching skeletal anatomy, screw placement, and tissue tension in real time.',
      'Written, verifiable credentials for our surgical team (practice category, license number, years of practice, and verified case records — pending clinic documentation).',
      'How the hospital workflow connects CT planning, factory CAD manufacturing, and intraoperative fit verification.',
    ],
    highlightPlaceholder: '30–60s highlight clip · [Pending filming — hospital workflow & CAD process]',
    fullVideoStatus: '[Unlisted YouTube link — pending filming]',
  },
  {
    ep: 'Ep. 3',
    duration: '15–20 min',
    theme: 'Recovery, travel & one-stop support',
    title: 'Recovery comes first — how your whole Shanghai stay works',
    coverLabel: 'Cover: Composite — airport pickup sign + Shanghai cityscape & recovery-friendly stops',
    coverTag: '[Pending filming — composite airport pickup & Shanghai frame]',
    openingQuote:
      '“Someone meets you at the airport. Recovery comes first, so the sightseeing fits around it — here is how the whole stay works.”',
    featuredLines: [],
    supportNote: 'Transparent pricing comes from written itemized quotes with no hidden charges — never unverified price-comparison claims.',
    scheduleBar: ['Surgery', 'Hotel recovery', 'Follow-up', 'Free time', 'Fit-to-fly'],
    bullets: [
      'Recovery-first itinerary: light indoor sightseeing, dining, and rest are scheduled strictly around medical checkpoints.',
      'Practical arrival support from airport pickup and +86 SIM accompaniment to payment and local transport apps.',
      'Written itemized pricing mechanism before departure so you know fixed vs. variable costs in advance.',
    ],
    highlightPlaceholder: '30–60s highlight clip · [Pending filming — arrival to fit-to-fly walkthrough]',
    fullVideoStatus: '[Unlisted YouTube link — pending filming]',
  },
];

/**
 * Section 3: 6 Self-Handled Items (v1.51 §1.4 R2-P0-04)
 */
export const SELF_HANDLED_6 = [
  'Hold a valid passport and arrange your visa or eligible entry record.',
  'Visit a local carrier store in person with your passport to register a +86 tourist SIM card with mandatory facial verification (we accompany you, but Chinese regulations require the holder in person).',
  'Share your medical history and consultation photos, and attend the free consultation and in-person medical assessment.',
  'Review your written quotation and arrange the agreed deposit.',
  'Sign medical informed consent and separate privacy / photo consent forms.',
  'Attend post-op follow-up visits and follow your treating medical team’s recovery instructions.',
];

/**
 * Section 3: 12-Item x 4-Column All-Inclusive Boundary Table
 */
export const BOUNDARY_12_ITEMS = [
  { item: 'International flights', included: '—', notIncluded: 'Self-funded by patient', paidExtra: '—', assistOnly: 'Allevia assists with flight search & booking' },
  { item: 'Hotel accommodation', included: '[Pending clinic]', notIncluded: '—', paidExtra: 'Upgrades / extra nights', assistOnly: 'Booking coordination' },
  { item: 'Airport & hospital transfers', included: '[Pending clinic]', notIncluded: '—', paidExtra: 'Personal sightseeing cars', assistOnly: 'Dispatch coordination' },
  { item: 'Bilingual interpretation', included: '[Pending clinic]', notIncluded: '—', paidExtra: 'Private non-medical outings', assistOnly: 'Medical appointment accompaniment' },
  { item: 'Payment setup (Alipay / WeChat Pay)', included: '—', notIncluded: 'Card/FX fees [Pending clinic]', paidExtra: '—', assistOnly: 'Setup guidance; you enter all passwords & bind cards yourself' },
  { item: 'Local apps & connectivity', included: '—', notIncluded: 'SIM / eSIM carrier fees', paidExtra: '—', assistOnly: 'Pre-trip checklist + in-person carrier store accompaniment' },
  { item: 'Travel & medical insurance', included: '—', notIncluded: 'Self-funded by patient', paidExtra: '—', assistOnly: 'Reminder to obtain independent coverage' },
  { item: 'Visa & entry documents', included: '—', notIncluded: 'Embassy / visa fees', paidExtra: '—', assistOnly: 'Invitation / schedule documentation if needed' },
  { item: 'Post-op clinical care', included: '[Pending clinic]', notIncluded: '—', paidExtra: 'Additional medications / extended nursing [Pending clinic]', assistOnly: 'Follow-up scheduling' },
  { item: 'Revision policy', included: '[Pending clinic written policy]', notIncluded: '—', paidExtra: '[Pending clinic written policy]', assistOnly: 'Coordination with partner institution' },
  { item: 'Refunds (design fees vs. surgery)', included: 'Full refund only if design has not started (7–14 working days)', notIncluded: 'Design fees non-refundable once first draft starts', paidExtra: '—', assistOnly: 'Written terms confirmed pre-payment' },
  { item: 'Trip cancellation / rescheduling', included: '—', notIncluded: 'Airline / third-party penalties', paidExtra: '[Pending clinic written policy]', assistOnly: 'Rescheduling coordination' },
];

/**
 * Section 3: 8-App Checklist
 */
export const APPS_8_LIST = [
  { name: 'VPN', timing: 'Install BEFORE departure', note: 'Required before landing in mainland China if you need access to overseas services.' },
  { name: 'Apple ID / Google Play', timing: 'Prepare BEFORE departure', note: 'Google Play is not accessible locally in mainland China; check your app store region before flying.' },
  { name: 'WeChat', timing: 'Install before · Bind in person', note: 'Identity and bank-card binding must be done by you personally; we never enter passwords or store accounts.' },
  { name: 'Alipay', timing: 'Install before · Bind in person', note: 'Supports international cards; real-name verification requires your passport.' },
  { name: 'DiDi (Ride-hailing)', timing: 'Activate after +86 SIM', note: 'Requires a +86 number for SMS verification (also accessible via Alipay mini-program).' },
  { name: 'Amap (Gaode Maps)', timing: 'Activate after +86 SIM', note: 'Accurate local navigation and taxi pickup pins across Shanghai.' },
  { name: '12306 (High-speed rail)', timing: 'Activate after +86 SIM', note: 'Official China railway booking if you plan approved recovery-compatible day trips.' },
  { name: 'Meituan / Dianping', timing: 'Activate after +86 SIM', note: 'Food delivery to your hotel during early recovery and local dining reviews.' },
];

/**
 * Section 3: Risks & Recovery 10-Item Structure (R2-P1-25)
 */
export const RISK_10_TOPICS = [
  'General surgical risks & contraindications',
  'Anesthesia risks & pre-op screening',
  'Swelling, bruising & staged recovery timeline',
  'Revision policy (subject to written institutional terms)',
  'Refund & cancellation policy',
  'Visa category & permitted stay duration',
  'Independent travel & medical complication insurance',
  'Cross-border post-op follow-up protocol',
  '24/7 emergency escalation contacts in Shanghai',
  'Medical & CT data protection and deletion rights',
];
