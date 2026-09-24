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
    "https://www.google.com/maps/place/Roots+Dental+Clinic/@13.1927079,77.4955784,9.78z/data=!4m6!3m5!1s0x3bae19cf0c69c9df:0x5157dd968efe4981!8m2!3d13.1429128!4d77.5693407!16s%2Fg%2F11zxr_x29p?entry=ttu&g_ep=EgoyMDI2MDkyMS4wIKXMDSoASAFQAw%3D%3D",
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