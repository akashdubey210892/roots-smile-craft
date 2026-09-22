import examination from "@/assets/services/examination.jpg";
import aligners from "@/assets/services/aligners.jpg";
import braces from "@/assets/services/braces.jpg";
import pediatric from "@/assets/services/pediatric.jpg";
import implants from "@/assets/services/implants.jpg";
import rootCanal from "@/assets/services/root-canal.jpg";
import crownBridge from "@/assets/services/crown-bridge.jpg";
import cleaning from "@/assets/services/cleaning.jpg";
import ceoPhoto from "@/assets/ceo.jpeg";
import mdPhoto from "@/assets/md.jpeg";

export const clinic = {
  name: "ROOTS DENTAL CLINIC",
  tagline: "Strong Foundations. Healthy Smiles.",
  phone: "8009537637",
  email: "drykkiran@gmail.com",
  address:
    "#63/2, Shree Sai Layout, Singanayakanahalli, Doddaballapur Main Road, Yelahanka, Bengaluru - 560064",
  directions:
    "https://www.google.com/maps/search/?api=1&query=ROOTS+DENTAL+CLINIC+63%2F2+Shree+Sai+Layout+Singanayakanahalli+Yelahanka+Bengaluru+560064",
  whatsapp: "https://wa.me/918009537637",
};

export type Service = {
  slug: string;
  title: string;
  short: string;
  intro: string;
  indications: string[];
  process: string[];
  benefits: string[];
  image: string;
  alt: string;
};

export const services: Service[] = [
  {
    slug: "general-dentistry",
    title: "General Dentistry",
    short: "Preventive examinations, cleaning and everyday oral care for the whole family.",
    intro:
      "General dentistry supports long-term oral health through regular examinations, professional cleaning, preventive advice and early assessment of dental concerns.",
    indications: [
      "A routine dental check-up is due",
      "Plaque, tartar or persistent bad breath",
      "Sensitivity, discomfort or a suspected cavity",
    ],
    process: [
      "A conversation about your dental and medical history",
      "A careful examination of teeth, gums and bite",
      "A personalized preventive or treatment plan",
    ],
    benefits: [
      "Early identification of concerns",
      "Healthier teeth and gums",
      "Practical guidance for home care",
    ],
    image: examination,
    alt: "Dentist carrying out a gentle dental examination",
  },
  {
    slug: "restoration",
    title: "Restoration",
    short: "Natural-looking repair for teeth affected by decay, wear or damage.",
    intro:
      "Dental restorations rebuild damaged or decayed teeth using clinically appropriate techniques, with attention to function, comfort and appearance.",
    indications: [
      "Dental decay or a damaged filling",
      "A chipped, worn or fractured tooth",
      "Difficulty chewing on a tooth",
    ],
    process: [
      "Clinical assessment of the affected tooth",
      "Removal of compromised tooth structure where needed",
      "Placement and finishing of a suitable restoration",
    ],
    benefits: [
      "Restored chewing function",
      "Protection of remaining tooth structure",
      "Tooth-colored options where appropriate",
    ],
    image: examination,
    alt: "Dentist assessing a tooth for restoration",
  },
  {
    slug: "aligners",
    title: "Clear Aligners",
    short: "A discreet, removable approach to selected alignment and bite concerns.",
    intro:
      "Clear aligners use a planned series of removable trays to guide teeth towards a more balanced position when clinically suitable.",
    indications: [
      "Crowded or spaced teeth",
      "Selected bite concerns",
      "A preference for a discreet orthodontic option",
    ],
    process: [
      "Orthodontic assessment and digital records",
      "Personalized digital treatment planning",
      "Progress reviews and updated guidance",
    ],
    benefits: [
      "Discreet appearance",
      "Removable for eating and oral hygiene",
      "Digitally planned movement",
    ],
    image: aligners,
    alt: "Dentist holding a transparent dental aligner",
  },
  {
    slug: "braces",
    title: "Braces",
    short: "Planned orthodontic care to improve tooth alignment and bite.",
    intro:
      "Conventional and modern braces apply controlled forces to correct tooth alignment and bite concerns over a carefully monitored course of care.",
    indications: [
      "Crowding or spacing",
      "Teeth that are out of alignment",
      "Bite relationships requiring correction",
    ],
    process: [
      "Detailed orthodontic assessment",
      "Appliance selection and treatment planning",
      "Regular follow-up visits and adjustments",
    ],
    benefits: [
      "Improved alignment",
      "Better bite relationships",
      "A plan tailored to clinical needs",
    ],
    image: braces,
    alt: "Close view of modern orthodontic braces",
  },
  {
    slug: "smile-design",
    title: "Smile Design & Correction",
    short: "Personalized cosmetic planning that respects oral health and facial harmony.",
    intro:
      "Smile design begins with a careful assessment of teeth, gums, bite and facial features before suitable cosmetic or restorative options are discussed.",
    indications: [
      "Concerns about tooth shape, color or proportion",
      "Uneven or worn teeth",
      "Interest in a considered smile enhancement",
    ],
    process: [
      "Smile, bite and oral health assessment",
      "Discussion of goals and realistic options",
      "A staged plan that may include whitening, reshaping, veneers, restoration or alignment",
    ],
    benefits: [
      "Personalized planning",
      "Balanced function and aesthetics",
      "Clear understanding of suitable options",
    ],
    image: crownBridge,
    alt: "Dental professional reviewing a natural-looking smile",
  },
  {
    slug: "pediatric-dentistry",
    title: "Pediatric Dentistry",
    short: "Warm, age-appropriate dental care that helps children feel at ease.",
    intro:
      "Pediatric dental visits support healthy development through check-ups, preventive care, cavity management and positive oral hygiene education.",
    indications: [
      "A child's first or routine dental visit",
      "Tooth discomfort or a suspected cavity",
      "Monitoring growth and dental development",
    ],
    process: [
      "A friendly introduction to the dental setting",
      "Age-appropriate examination and prevention",
      "Clear guidance for children and caregivers",
    ],
    benefits: [
      "Early healthy habits",
      "Monitoring of dental development",
      "A calm, child-friendly experience",
    ],
    image: pediatric,
    alt: "Pediatric dentist greeting a smiling child patient",
  },
  {
    slug: "minor-surgical-procedures",
    title: "Minor Surgical Procedures",
    short: "Carefully evaluated dental procedures performed when clinically indicated.",
    intro:
      "Some dental concerns may require a minor surgical approach. Every procedure is recommended only after examination, diagnosis and a discussion of suitable options.",
    indications: [
      "A condition not resolved through routine care",
      "Minor soft-tissue concerns",
      "A dental intervention advised after assessment",
    ],
    process: [
      "Clinical evaluation and relevant imaging",
      "Discussion of procedure, alternatives and aftercare",
      "Planned treatment with follow-up guidance",
    ],
    benefits: [
      "Care based on a clear diagnosis",
      "Structured preparation and aftercare",
      "Referral when a specialist setting is more appropriate",
    ],
    image: examination,
    alt: "Dentist discussing a minor dental procedure with a patient",
  },
  {
    slug: "periodontal-treatment",
    title: "Periodontal Treatment",
    short: "Assessment and management focused on healthy gums and tooth support.",
    intro:
      "Periodontal care addresses inflammation and disease affecting the gums and supporting tissues, with ongoing maintenance playing an important role.",
    indications: [
      "Bleeding, swollen or tender gums",
      "Persistent plaque or tartar",
      "Gum recession, bad breath or tooth mobility",
    ],
    process: [
      "Detailed gum examination",
      "Plaque and tartar management",
      "Personalized home care and maintenance reviews",
    ],
    benefits: [
      "Healthier gum tissues",
      "Better control of inflammation",
      "Support for long-term tooth stability",
    ],
    image: cleaning,
    alt: "Professional dental cleaning for healthy gums",
  },
  {
    slug: "root-canal-treatment",
    title: "Root Canal Treatment",
    short: "Treatment designed to preserve a tooth affected by inflamed or infected pulp.",
    intro:
      "Root canal treatment removes inflamed or infected tissue from inside a tooth, then cleans, shapes and seals the root canal system before the tooth is restored.",
    indications: [
      "Persistent or severe tooth pain",
      "Sensitivity that lingers",
      "Swelling, tenderness or signs of dental infection",
    ],
    process: [
      "Assessment and diagnostic imaging",
      "Cleaning and sealing of the root canal system",
      "A suitable final restoration to protect the tooth",
    ],
    benefits: [
      "Management of infection and discomfort",
      "Preservation of the natural tooth where possible",
      "Restoration of function",
    ],
    image: rootCanal,
    alt: "Dental root canal model used during patient education",
  },
  {
    slug: "crown-and-bridge",
    title: "Crown & Bridge",
    short: "Fixed restorations that protect teeth or replace selected missing teeth.",
    intro:
      "Crowns can protect and rebuild compromised teeth, while bridges can provide a fixed replacement for selected missing teeth.",
    indications: [
      "A heavily restored, cracked or weakened tooth",
      "A tooth requiring protection after treatment",
      "One or more missing teeth suitable for a fixed bridge",
    ],
    process: [
      "Assessment and preparation",
      "Accurate records and shade planning",
      "Fitting, bite checks and care guidance",
    ],
    benefits: [
      "Protection of vulnerable teeth",
      "Improved chewing function",
      "Restored appearance",
    ],
    image: crownBridge,
    alt: "Dental crown being placed on a tooth model",
  },
  {
    slug: "complete-denture",
    title: "Complete Denture",
    short: "Personalized removable replacement when all teeth in an arch are missing.",
    intro:
      "Complete dentures are designed to replace all teeth in the upper or lower arch and support everyday function, speech and facial appearance.",
    indications: [
      "All teeth are missing in one or both arches",
      "An existing denture no longer fits comfortably",
      "A removable replacement is being considered",
    ],
    process: [
      "Oral assessment and impressions",
      "Bite, appearance and fit trials",
      "Delivery with follow-up adjustments",
    ],
    benefits: [
      "Support for chewing and speech",
      "Improved facial support",
      "Personalized fit and appearance",
    ],
    image: crownBridge,
    alt: "Dentist presenting a personalized dental prosthesis",
  },
  {
    slug: "removable-partial-denture",
    title: "Removable Partial Denture",
    short: "A removable solution for multiple missing teeth when natural teeth remain.",
    intro:
      "A removable partial denture replaces selected missing teeth and is designed around the remaining natural teeth and oral tissues.",
    indications: [
      "Multiple teeth are missing",
      "Some healthy natural teeth remain",
      "A removable replacement is preferred or indicated",
    ],
    process: [
      "Assessment of teeth, gums and bite",
      "Personalized design and fitting",
      "Review of comfort, function and care",
    ],
    benefits: [
      "Improved function and appearance",
      "Removable for cleaning",
      "Designed for the individual mouth",
    ],
    image: crownBridge,
    alt: "Dental prosthetic model for replacing missing teeth",
  },
  {
    slug: "implants",
    title: "Dental Implants",
    short: "A planned replacement option for missing teeth when clinically suitable.",
    intro:
      "A dental implant is placed in the jaw to support a replacement tooth or crown. Suitability depends on oral health, bone, medical factors and individual goals.",
    indications: [
      "One or more missing teeth",
      "Difficulty with an existing replacement",
      "Interest in a fixed replacement option",
    ],
    process: [
      "Comprehensive clinical and imaging evaluation",
      "Planned implant placement where suitable",
      "Healing, restoration and maintenance guidance",
    ],
    benefits: [
      "Restored function",
      "A natural-looking replacement option",
      "Planning that considers long-term maintenance",
    ],
    image: implants,
    alt: "Dentist explaining a dental implant using a tooth model",
  },
  {
    slug: "wisdom-teeth-extraction",
    title: "Wisdom Teeth Extraction",
    short: "Assessment and removal when wisdom teeth cause or risk dental problems.",
    intro:
      "Wisdom teeth may require removal when they are impacted, painful, infected or affecting nearby teeth. Evaluation comes before any recommendation.",
    indications: [
      "Pain or recurrent gum swelling",
      "Impaction or limited space",
      "Infection or damage to a neighboring tooth",
    ],
    process: [
      "Consultation and appropriate imaging",
      "Discussion of findings and treatment options",
      "Planned extraction and aftercare if indicated",
    ],
    benefits: [
      "Management of the underlying dental concern",
      "Reduced risk of recurrent local problems",
      "Clear aftercare and review",
    ],
    image: examination,
    alt: "Dentist reviewing an X-ray before wisdom tooth treatment",
  },
  {
    slug: "tmj",
    title: "TMJ Issues",
    short: "Evaluation of jaw-joint symptoms, movement and contributing factors.",
    intro:
      "Temporomandibular joint concerns can have several causes. Care begins with a detailed history and examination before management options are considered.",
    indications: [
      "Jaw pain or stiffness",
      "Clicking or popping",
      "Difficulty opening the mouth or facial discomfort",
    ],
    process: [
      "History of symptoms and contributing factors",
      "Jaw movement, muscle and bite assessment",
      "Personalized advice, care or referral as needed",
    ],
    benefits: [
      "A clearer understanding of possible causes",
      "Management matched to findings",
      "Coordinated referral when necessary",
    ],
    image: examination,
    alt: "Dental consultation for jaw and TMJ discomfort",
  },
  {
    slug: "orofacial-pain",
    title: "Orofacial Pain Relief",
    short: "Careful evaluation of pain involving the mouth, jaw, face and nearby structures.",
    intro:
      "Orofacial pain can arise from dental, muscular, joint, nerve or other causes. A detailed assessment helps guide appropriate care and referral.",
    indications: [
      "Persistent mouth, jaw or facial pain",
      "Head or facial discomfort linked to jaw function",
      "Pain without a clear dental cause",
    ],
    process: [
      "Detailed symptom and health history",
      "Clinical assessment to identify possible causes",
      "Personalized planning or referral where necessary",
    ],
    benefits: [
      "Structured evaluation",
      "Care directed by the likely cause",
      "Appropriate coordination with other professionals",
    ],
    image: examination,
    alt: "Dentist listening to a patient describe facial discomfort",
  },
  {
    slug: "dental-cleaning",
    title: "Dental Cleaning",
    short: "Professional removal of plaque and tartar to support healthy teeth and gums.",
    intro:
      "Professional dental cleaning complements daily brushing and flossing by removing deposits that are difficult to manage at home.",
    indications: [
      "Visible tartar or staining",
      "Bleeding gums or persistent bad breath",
      "Routine preventive care is due",
    ],
    process: [
      "Assessment of teeth and gums",
      "Careful removal of plaque and tartar",
      "Polishing and personalized hygiene guidance",
    ],
    benefits: [
      "Cleaner teeth and fresher mouth",
      "Support for gum health",
      "Preventive guidance tailored to you",
    ],
    image: cleaning,
    alt: "Patient receiving a professional dental cleaning",
  },
];

export const featuredSlugs = [
  "root-canal-treatment",
  "implants",
  "braces",
  "aligners",
  "smile-design",
  "crown-and-bridge",
  "pediatric-dentistry",
  "wisdom-teeth-extraction",
];
export const getService = (slug: string) => services.find((service) => service.slug === slug);

// Doctor profiles now live in Firestore (see src/lib/doctors.ts) and are managed
// from /admin/doctors, so patients always book against the real, current roster.

export const googlePlaceId = "ChIJ38lpDM8ZrjsRgUn-jpbdV1E";
export const reviewLinks = {
  google: googlePlaceId
    ? `https://search.google.com/local/writereview?placeid=${googlePlaceId}`
    : "https://www.google.com/search?q=ROOTS+DENTAL+CLINIC+Yelahanka+reviews",
};

export type ManagementProfile = {
  slug: string;
  initials: string;
  photo: string;
  name: string;
  role: string;
  org: string;
  credentials: string[];
  tags: string[];
  highlights: string[];
  bio: string[];
  closing?: string;
};

// Leadership of Anand Abhigyan Healthcare & Life Sciences, the group behind ROOTS
// DENTAL CLINIC (shared with Vikshana Eye Hospital). Dr Suneela Kiran holds both
// the Managing Director and HOD (ROOTS Dental Clinic) roles.
export const management: ManagementProfile[] = [
  {
    slug: "kamal-kiran-yenamandra",
    initials: "KK",
    photo: ceoPhoto,
    name: "Gp Capt (Dr) Kamal Kiran Yenamandra (Retd)",
    role: "Chief Executive Officer",
    org: "Anand Abhigyan Healthcare & Life Sciences",
    credentials: [
      "MBBS (AFMC)",
      "MD Pediatrics",
      "Trained in Pediatric Cardiology",
      "National Instructor – PALS | NALS | BLS | ACLS | ATLS",
    ],
    tags: [
      "Fetal Echocardiography",
      "Hospital Administration",
      "Medical Education",
      "NABH & Quality Assurance",
      "Emergency Medicine",
      "Disaster Medicine",
    ],
    highlights: [
      "Professor & Head, Department of Pediatrics – Command Hospital Air Force, Bengaluru",
      "Examiner for NBE, RGUHS and MUHS",
      "Commanded a 200-bedded Air Force Hospital",
      "Medical Superintendent of a 400-bedded Air Force Hospital",
      "National Instructor – PALS, NALS, BLS, ACLS and ATLS",
      "Disaster-relief deployments: Sri Lanka Tsunami, Nepal earthquake, Srinagar earthquake",
    ],
    bio: [
      "Gp Capt (Dr) Kamal Kiran Yenamandra (Retd) is a senior Pediatrician, healthcare leader, medical educator and former Indian Air Force medical officer with nearly three decades of experience spanning clinical medicine, hospital administration, healthcare management, medical education, quality assurance and emergency medicine.",
      "An alumnus of the Armed Forces Medical College (AFMC), he completed his MD in Pediatrics from Mumbai and subsequently underwent advanced training in Pediatric Cardiology and Fetal Echocardiography. His special clinical interests include Allergy & Asthma, Developmental Pediatrics, Newborn Care and Preventive Child Health.",
      "During his career with the Indian Air Force, he held several senior clinical, academic and leadership appointments, serving as Professor & Head of the Department of Pediatrics at Command Hospital Air Force, Bengaluru, and as an Examiner for NBE, RGUHS and MUHS.",
      "His leadership experience extends well beyond clinical practice. He commanded a 200-bedded Air Force Hospital and served as Medical Superintendent of a 400-bedded Air Force Hospital, with responsibilities encompassing hospital operations, multidisciplinary healthcare delivery, clinical governance, manpower management, patient safety and quality systems.",
      "Trained in NABH standards and Quality Assurance, he has a strong interest in building healthcare systems that combine clinical excellence with efficient processes, patient safety and a consistently high standard of patient experience.",
      "A committed medical educator, he is a National Instructor in PALS, NALS, BLS, ACLS and ATLS, contributing extensively to the training of doctors and healthcare professionals in pediatric emergencies, neonatal resuscitation, cardiac life support and trauma care.",
      "His Armed Forces service also included participation in major humanitarian assistance and disaster-relief operations, including the Sri Lanka Tsunami, Nepal earthquake and Srinagar earthquake, providing him with significant experience in disaster medicine, emergency response and healthcare delivery under challenging conditions.",
      "As Chief Executive Officer of Anand Abhigyan Healthcare & Life Sciences, Dr Kamal Kiran brings together his experience as a clinician, hospital commander, medical superintendent, academician, instructor and healthcare administrator to build an integrated healthcare organisation centred on clinical quality, patient experience, professional development and innovation.",
    ],
    closing:
      "Build strong systems, empower healthcare professionals and keep the patient at the centre of every decision.",
  },
  {
    slug: "suneela-kiran",
    initials: "SK",
    photo: mdPhoto,
    name: "Dr Suneela Kiran",
    role: "Managing Director | HOD, ROOTS Dental Clinic",
    org: "Anand Abhigyan Healthcare & Life Sciences",
    credentials: [
      "BDS",
      "Healthcare Management",
      "Clinical Data Management & CTRI",
      "Trained in Microscopic Endodontics",
    ],
    tags: [
      "Dental Surgery (BDS)",
      "Microscopic Endodontics",
      "Healthcare Administration",
      "Clinical Governance",
      "Clinical Data Management",
      "CTRI Processes",
      "Patient Experience",
      "Team Coordination",
    ],
    highlights: [
      "BDS, 1998 – Rajah Muthiah Dental College",
      "28 years of clinical experience",
      "Associated with Indian Air Force Dental Centres and ECHS healthcare facilities",
      "Trained in Microscopic Endodontics",
      "Expertise in Clinical Data Management and Clinical Trials Registry–India (CTRI)",
    ],
    bio: [
      "Dr Suneela Kiran is the Managing Director of Anand Abhigyan Healthcare & Life Sciences, and Head of Department at ROOTS Dental Clinic, bringing 28 years of clinical experience together with extensive exposure to healthcare management, clinical operations and patient-centred healthcare delivery.",
      "She completed her Bachelor of Dental Surgery (BDS) in 1998 from Rajah Muthiah Dental College. Over the course of her professional journey, she has worked across different parts of India and has been associated with Indian Air Force Dental Centres and Ex-Servicemen Contributory Health Scheme (ECHS) healthcare facilities, providing her with exposure to diverse clinical environments, patient populations and organised healthcare systems.",
      "Her clinical experience spans nearly three decades, and she is also trained in Microscopic Endodontics, reflecting her continued engagement with contemporary and precision-based dental practice.",
      "Beyond dentistry, Dr Suneela has developed substantial experience in healthcare administration and management, including hospital operations, clinical governance, quality and patient-safety processes, multidisciplinary team coordination, patient experience and healthcare service development.",
      "She also has expertise in Clinical Data Management and Clinical Trials Registry–India (CTRI) processes, complementing her clinical and managerial experience with an understanding of structured clinical documentation, research processes and data-driven healthcare systems.",
      "As Managing Director of Anand Abhigyan and Head of Department at ROOTS Dental Clinic, she is actively involved in the organisation's strategic development and operational governance, as well as the day-to-day clinical leadership of ROOTS, working to strengthen quality, efficiency, clinical standards and patient experience.",
    ],
    closing:
      "Bringing together the perspectives of a clinician, healthcare administrator and organisational leader, backed by nearly three decades of experience across diverse healthcare settings.",
  },
];

export const getManagementProfile = (slug: string) => management.find((m) => m.slug === slug);
