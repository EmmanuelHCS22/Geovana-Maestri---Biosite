import { BiositeData } from './types';

export const DEFAULT_BIOSITE_DATA: BiositeData = {
  // Profile
  firstName: 'Geovana',
  lastName: 'Maestri',
  tagline: 'CÍLIOS · SOBRANCELHA · CURSO',
  signatureLead: 'Transformo beleza em',
  signatureCursive: 'confiança e presença.',
  avatarUrl: '/assets/aistudio/WhatsApp_Image_2026-10-19_at_22.56.56_2c2395bd.jpeg',
  logoType: 'monogram',
  logoMonogram: 'GM',
  logoImageUrl: '',

  // Visual & Colors
  bgColor: '#f7eaed',
  accentColor: '#d78096',
  textColor: '#2b2728',
  footerBgColor: '#8a3c50',
  bgPattern: 'delicate-mesh',
  bgImageUrl: '',
  bgImageOpacity: 0.12,

  // Central Link Buttons (EXACT ORDER REQUESTED)
  // 1. Agendamento, 2. Curso Lash, 3. Catálogo, 4. Avalie sua experiência
  links: [
    {
      id: '1',
      icon: 'Calendar',
      title: 'Agendamento',
      subtitle: 'Reserve seu horário',
      actionType: 'booking_modal',
      url: '',
    },
    {
      id: '2',
      icon: 'GraduationCap',
      title: 'Curso Lash',
      subtitle: 'Aprenda do zero ao avançado',
      actionType: 'whatsapp',
      url: 'https://wa.me/5511999999999?text=Ol%C3%A1%20Geovana,%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20o%20Curso%20Lash!',
    },
    {
      id: '3',
      icon: 'BookOpen',
      title: 'Catálogo',
      subtitle: 'Conheça nossos procedimentos e valores',
      actionType: 'catalog_modal',
      url: '',
    },
    {
      id: '4',
      icon: 'Star',
      title: 'Avalie sua experiência',
      subtitle: 'Sua opinião é fundamental para nós',
      actionType: 'review_modal',
      url: '',
    },
  ],

  // About Me
  aboutTitle: 'Sobre mim',
  aboutSubtitle: 'MEU PROPÓSITO',
  aboutText:
    'Experiência desde 2021. Especialista em Cílios e Sobrancelha com naturalidade, durabilidade, qualidade e segurança.',
  aboutImageUrl: '/assets/aistudio/IMG_20261020_143006_bcc80033.jpg',
  aboutBadge: 'Especialista em Cílios & Sobrancelhas',

  // Services
  servicesTitle: 'Como posso te ajudar',
  servicesSubtitle: 'SERVIÇOS EXCLUSIVOS',
  services: [
    {
      id: 's1',
      title: 'Sobrancelhas',
      description: 'Design personalizado para valorizar seu olhar com harmonia e naturalidade.',
      icon: 'Sparkles',
      highlight: 'Design & Mapeamento',
    },
    {
      id: 's2',
      title: 'Cílios',
      description: 'Técnicas que realçam sua beleza com leveza e acabamento impecável.',
      icon: 'Eye',
      highlight: 'Volume & Lifting',
    },
    {
      id: 's3',
      title: 'Cursos & Mentorias',
      description: 'Treinamento intensivo para transformar sua carreira na área da beleza com técnica de excelência.',
      icon: 'GraduationCap',
      highlight: 'Formação VIP',
    },
  ],

  // CTA Section
  ctaHeadline: 'Sua melhor versão começa com um agendamento.',
  ctaSubheadline: 'Espaço acolhedor com atendimento individualizado e horário exclusivo para você.',
  ctaButtonText: 'QUERO AGENDAR',
  ctaWhatsappNumber: '5511999999999',
  ctaDefaultMessage: 'Olá Geovana! Gostaria de agendar meu horário para realçar minha beleza.',

  // Gallery
  galleryTitle: 'Galeria',
  gallerySubtitle: 'RESULTADOS & TRANSFORMAÇÕES',
  gallery: [
    {
      id: 'g1',
      title: 'Sobrancelhas Perfeitas',
      subtitle: 'Alinhamento natural respeitando a anatomia facial',
      imageUrl: '/assets/aistudio/image_397d3751.png',
    },
    {
      id: 'g2',
      title: 'Realce sua Beleza',
      subtitle: 'Harmonia facial e acabamento aveludado e glow',
      imageUrl: '/assets/aistudio/image_c5fb698b.png',
    },
    {
      id: 'g3',
      title: 'Cílios que Encantam',
      subtitle: 'Volume elegante, fios macios e curvatura marcante',
      imageUrl: '/assets/aistudio/image_ec9f50c0.png',
    },
  ],

  // FAQ
  faqTitle: 'Dúvidas frequentes',
  faqSubtitle: 'PERGUNTAS COMUNS',
  faqs: [
    {
      id: 'f1',
      question: 'Como funciona o atendimento?',
      answer:
        'Entre em contato para conhecer os serviços e combinar o melhor horário para você. O atendimento é feito de forma individual e pontual em nosso estúdio, com uma breve avaliação prévia para entender o resultado desejado.',
    },
    {
      id: 'f2',
      question: 'Quais formas de pagamento são aceitas?',
      answer:
        'Consulte as opções de pagamento no momento do agendamento. Aceitamos Pix, cartões de crédito (com possibilidade de parcelamento) e débito.',
    },
    {
      id: 'f3',
      question: 'Como funcionam os Cursos de Lash Designer?',
      answer:
        'Oferecemos formação individual e em turmas reduzidas, com teoria completa, apostila exclusiva, prática supervisionada em modelos reais e certificado profissional reconhecido.',
    },
  ],

  // Footer & Socials
  footerLogoText: 'Geovana Maestri',
  footerInviteText: 'Acompanhe meu trabalho',
  socials: {
    instagram: 'https://instagram.com/geovanamaestri',
    whatsapp: 'https://wa.me/5511999999999',
  },
  copyright: '© 2026 Geovana Maestri. Todos os direitos reservados.',
};
