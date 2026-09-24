export type CertificateItem = {
  id: string;
  title: string;
  image: string;
};

// Fallback list shown only when no certificates exist in Sanity yet
// (or Sanity is unreachable). New certificates should be added in the Studio.
export const fallbackCertificates: CertificateItem[] = [
  { id: "1", title: "Certificate of Yoga | Swami Vivekananda Yoga & Meditation School (RISHIKESH)", image: "/assets/images/Certificates/certificate of yoga.jpg" },
  { id: "2", title: "Diploma in Acupuncture (D.Ac.) | Acupressure / Acupuncture & Alternative Medicine Institute in Jodhpur, Rajasthan", image: "/assets/images/Certificates/d.ac certificate.jpg" },
  { id: "3", title: "Diploma in Cupping Therapy |  from the Acupressure Acupuncture & Alternative Medicine Institute located in Jodhpur, Rajasthan.", image: "/assets/images/Certificates/d.cup.t certificate.jpg" },
  { id: "4", title: "Nuad Bo-Rarn Thai Massage | International Training Massage School (ITM) in Thailand", image: "/assets/images/Certificates/nuad bo_rarn thai massage ITM.jpg" },
  { id: "5", title: "CERTIFIED PERSONAL EXERCISE TRAINER | International Academy of Sport Sciences (IASS)", image: "/assets/images/Certificates/personal exercise trainer IASS.jpg" },
  { id: "6", title: "Certificate Course for Sports Massage | Institute of Sports & Exercise Science", image: "/assets/images/Certificates/sport massage ISES.jpg" },
  { id: "7", title: "National Certificate for a Sport Masseur | NVQ Level 4", image: "/assets/images/Certificates/SPORT MASSEUR NVQ 4.jpg" },
  { id: "8", title: "Workshop on Sports Related Stretching Training Techniques | Lanka Institute of Fitness & Nutrition", image: "/assets/images/Certificates/SPORT RELATED STRETCHIGN TRAINING lifn.jpg" },
  { id: "9", title: "60-hour Swedish Massage course | International Practitioners of Holistic Medicine (IPHM)", image: "/assets/images/Certificates/swedish massage IPHM.jpg" },
  { id: "10", title: "Certificate in Taping for Sports & Rehabilitation | Institute of Sports and Exercise Science (ISES)", image: "/assets/images/Certificates/training for sports and rehablation ISES.jpg" },
  { id: "11", title: "Professional Certificate in integrated soft tissue and Sports Massage Theraphy | Ceylon Sports Theraphy", image: "/assets/images/Certificates/certificate 11.jpeg" },
  { id: "12", title: "Swedish Massage Certificate | International Practitioners of Holistic Medicine (IPHM)", image: "/assets/images/Certificates/certificate 12.jpeg" },
];
