export type ActionType = 'booking_modal' | 'catalog_modal' | 'review_modal' | 'whatsapp' | 'url';

export interface LinkButton {
  id: string;
  icon: string; // 'Calendar' | 'UserCheck' | 'Gem' | 'MessageCircle' | 'Sparkles' | 'Heart' | 'Instagram' | 'Phone' | 'FileText' | 'ExternalLink'
  title: string;
  subtitle: string;
  actionType: ActionType;
  url?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  highlight?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface SocialLinks {
  instagram: string;
  whatsapp: string;
  pinterest?: string;
}

export interface BiositeData {
  // Profile
  firstName: string;
  lastName: string;
  tagline: string;
  signatureLead: string;
  signatureCursive: string;
  avatarUrl: string;
  logoType: 'monogram' | 'image';
  logoMonogram: string;
  logoImageUrl: string;

  // Visual & Colors
  bgColor: string;
  accentColor: string;
  textColor: string;
  footerBgColor: string;
  bgPattern: 'none' | 'subtle-dots' | 'delicate-mesh' | 'floral-accent';
  bgImageUrl: string;
  bgImageOpacity: number;

  // Central Link Buttons
  links: LinkButton[];

  // About Me
  aboutTitle: string;
  aboutSubtitle: string;
  aboutText: string;
  aboutImageUrl: string;
  aboutBadge: string;

  // Services
  servicesTitle: string;
  servicesSubtitle: string;
  services: ServiceItem[];

  // CTA Section
  ctaHeadline: string;
  ctaSubheadline: string;
  ctaButtonText: string;
  ctaWhatsappNumber: string;
  ctaDefaultMessage: string;

  // Gallery
  galleryTitle: string;
  gallerySubtitle: string;
  gallery: GalleryItem[];

  // FAQ
  faqTitle: string;
  faqSubtitle: string;
  faqs: FaqItem[];

  // Footer & Socials
  footerLogoText: string;
  footerInviteText: string;
  socials: SocialLinks;
  copyright: string;
}
