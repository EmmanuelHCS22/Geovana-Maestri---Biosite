import React, { useState } from 'react';
import {
  ChevronRight,
  ChevronDown,
  MessageCircle,
  Instagram,
  Sparkles,
  Calendar,
} from 'lucide-react';
import { BiositeData, GalleryItem, LinkButton } from './types';
import { DEFAULT_BIOSITE_DATA } from './defaultData';
import { DynamicIcon } from './components/DynamicIcon';
import { BookingModal } from './components/BookingModal';
import { GalleryModal } from './components/GalleryModal';
import { CatalogModal } from './components/CatalogModal';
import { ReviewModal } from './components/ReviewModal';

const LOCAL_STORAGE_KEY = 'geovana_maestri_biosite_v3';

export default function App() {
  const [data] = useState<BiositeData>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading biosite data from localStorage', e);
    }
    return DEFAULT_BIOSITE_DATA;
  });

  // Modals state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);
  const [activeFaqId, setActiveFaqId] = useState<string | null>(data.faqs[0]?.id || null);

  // Toggle FAQ accordion
  const toggleFaq = (id: string) => {
    setActiveFaqId((prev) => (prev === id ? null : id));
  };

  // Handle Link Button click
  const handleLinkClick = (link: LinkButton) => {
    if (link.actionType === 'booking_modal') {
      setIsBookingOpen(true);
    } else if (link.actionType === 'catalog_modal') {
      setIsCatalogOpen(true);
    } else if (link.actionType === 'review_modal') {
      setIsReviewOpen(true);
    } else if (link.actionType === 'whatsapp' || link.actionType === 'url') {
      const target = link.url || `https://wa.me/${data.ctaWhatsappNumber}`;
      window.open(target, '_blank', 'noopener,noreferrer');
    }
  };

  // Background pattern generator
  const getPatternStyle = () => {
    if (data.bgPattern === 'delicate-mesh') {
      return {
        backgroundImage: `radial-gradient(${data.accentColor}25 1.2px, transparent 1.2px), radial-gradient(${data.accentColor}15 1.2px, transparent 1.2px)`,
        backgroundSize: '36px 36px',
        backgroundPosition: '0 0, 18px 18px',
      };
    }
    if (data.bgPattern === 'subtle-dots') {
      return {
        backgroundImage: `radial-gradient(${data.accentColor}30 1px, transparent 1px)`,
        backgroundSize: '24px 24px',
      };
    }
    if (data.bgPattern === 'floral-accent') {
      return {
        backgroundImage: `radial-gradient(circle at 10% 20%, ${data.accentColor}18 0%, transparent 40%), radial-gradient(circle at 90% 80%, ${data.accentColor}15 0%, transparent 40%)`,
      };
    }
    return {};
  };

  return (
    <div
      className="min-h-screen relative font-sans transition-colors duration-300 antialiased overflow-x-hidden selection:bg-rose-200 selection:text-rose-900"
      style={{
        backgroundColor: data.bgColor,
        color: data.textColor,
      }}
    >
      {/* Background pattern overlay */}
      <div
        className="fixed inset-0 pointer-events-none transition-opacity duration-500"
        style={getPatternStyle()}
        aria-hidden="true"
      />

      {/* Optional custom background image */}
      {data.bgImageUrl && (
        <div
          className="fixed inset-0 pointer-events-none bg-cover bg-center transition-opacity duration-500"
          style={{
            backgroundImage: `url(${data.bgImageUrl})`,
            opacity: data.bgImageOpacity || 0.15,
          }}
          aria-hidden="true"
        />
      )}

      {/* Main Container Layout */}
      <main className="min-h-screen p-0 sm:py-8 sm:px-4 md:py-12 flex justify-center items-start">
        <div
          className="w-full max-w-full sm:max-w-md md:max-w-[480px] lg:max-w-[500px] sm:rounded-[36px] md:rounded-[40px] sm:border sm:border-rose-200/80 sm:shadow-2xl overflow-hidden shadow-none transition-all duration-300"
          style={{ backgroundColor: data.bgColor }}
        >
          {/* ============================================================== */}
          {/* 1. PERFIL (HERO FULL BLEED PHOTO WITH NAME OVERLAID)           */}
          {/* Fiel ao screenshot: foto dela no fundo e nome na frente        */}
          {/* ============================================================== */}
          <section className="relative w-full h-[62vh] min-h-[460px] xs:min-h-[490px] sm:min-h-[520px] max-h-[620px] overflow-hidden bg-slate-900 flex flex-col justify-end">
            {/* Foto de fundo em tela cheia / full bleed */}
            <img
              src={data.avatarUrl}
              alt={`${data.firstName} ${data.lastName}`}
              referrerPolicy="no-referrer"
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover object-[center_18%] filter brightness-[0.96]"
            />

            {/* Suave degradê para contraste de texto na altura do peito */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10 pointer-events-none" />

            {/* Nome e subtítulo sobrepostos na foto (exatamente como no screenshot) */}
            <div className="relative z-10 px-4 xs:px-6 pb-11 xs:pb-12 sm:pb-14 text-center select-none">
              {/* Geovana em itálico serifado grande */}
              <h1 className="font-serif italic font-normal text-4xl xs:text-5xl sm:text-6xl text-white tracking-wide drop-shadow-md leading-none">
                {data.firstName}
              </h1>

              {/* Maestri em serif regular grande */}
              <div className="font-serif font-light text-3xl xs:text-4xl sm:text-5xl text-white tracking-wider drop-shadow-md -mt-1 sm:-mt-2">
                {data.lastName}
              </div>

              {/* CÍLIOS · SOBRANCELHA · CURSO */}
              <p className="mt-2.5 xs:mt-3 text-[10px] xs:text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] sm:tracking-[0.26em] text-white/95 drop-shadow-sm px-2">
                {data.tagline}
              </p>
            </div>
          </section>

          {/* ============================================================== */}
          {/* 2. CARD CENTRAL SOBREPOSTO COM OS BOTÕES DE LINK               */}
          {/* Ordem: Agendamento, Curso Lash, Catálogo, Avalie sua exp.      */}
          {/* ============================================================== */}
          <section className="relative z-20 -mt-7 xs:-mt-8 sm:-mt-10 rounded-t-[30px] xs:rounded-t-[34px] sm:rounded-t-[38px] bg-white pt-5 xs:pt-6 pb-2 px-3.5 xs:px-4 sm:px-6 shadow-xl border-t border-rose-100">
            {/* Os 4 botões na ordem solicitada */}
            <div className="space-y-2.5 xs:space-y-3">
              {data.links.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link)}
                  className="w-full group text-left p-3 xs:p-3.5 sm:p-4 rounded-2xl bg-[#fdf2f4] hover:bg-[#faebee] active:bg-[#f8dde3] border border-rose-200/70 hover:border-rose-300 shadow-xs hover:shadow-sm transition-all duration-200 flex items-center justify-between gap-3 xs:gap-3.5 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2"
                >
                  <div className="flex items-center gap-3 xs:gap-3.5 min-w-0">
                    {/* Quadrinho com o ícone em tom rosa suave */}
                    <div
                      className="w-11 h-11 xs:w-12 xs:h-12 rounded-xl flex items-center justify-center text-white shrink-0 shadow-xs transition-transform group-hover:scale-105"
                      style={{ backgroundColor: data.accentColor }}
                    >
                      <DynamicIcon name={link.icon} className="w-5 h-5 xs:w-6 xs:h-6 text-white" />
                    </div>

                    <div className="truncate">
                      <h2 className="text-sm xs:text-base sm:text-lg font-serif font-semibold text-slate-800 group-hover:text-slate-900 transition-colors truncate leading-snug">
                        {link.title}
                      </h2>
                      <p className="text-[11px] xs:text-xs text-slate-600 truncate mt-0.5">{link.subtitle}</p>
                    </div>
                  </div>

                  {/* Círculo com a seta '>' */}
                  <div className="w-7 h-7 xs:w-8 xs:h-8 rounded-full border border-rose-300/80 flex items-center justify-center text-rose-400 group-hover:bg-rose-400 group-hover:text-white transition-all shrink-0">
                    <ChevronRight className="w-3.5 h-3.5 xs:w-4 xs:h-4 stroke-[2.5]" />
                  </div>
                </button>
              ))}
            </div>

            {/* Assinatura "Transformo beleza em confiança e presença." logo abaixo dos botões (fiel ao screenshot) */}
            <div className="pt-7 xs:pt-8 pb-4 text-center px-2">
              <span className="text-xs sm:text-sm text-slate-600 font-medium tracking-wide">
                {data.signatureLead}{' '}
              </span>
              <div
                className="font-cursive text-xl xs:text-2xl sm:text-3xl font-normal mt-0.5"
                style={{ color: data.accentColor }}
              >
                {data.signatureCursive}
              </div>
            </div>
          </section>

          {/* ============================================================== */}
          {/* 3. SOBRE MIM COM FOTO DELA NO FUNDO / LATERAL DIREITA           */}
          {/* Fiel ao screenshot de referência com a foto em meio à natureza  */}
          {/* ============================================================== */}
          <section className="relative overflow-hidden bg-white min-h-[360px] xs:min-h-[390px] sm:min-h-[440px] flex items-center border-t border-rose-100/70">
            {/* Foto de Geovana no fundo à direita com transição suave */}
            <div className="absolute right-0 top-0 bottom-0 w-[56%] xs:w-[58%] sm:w-[54%] overflow-hidden pointer-events-none">
              <img
                src={data.aboutImageUrl}
                alt={data.aboutTitle}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-[center_12%] filter brightness-[0.98]"
              />
              {/* Degradê lateral para fundir com o texto branco à esquerda */}
              <div className="absolute inset-y-0 left-0 w-20 xs:w-28 sm:w-36 bg-gradient-to-r from-white via-white/80 to-transparent" />
              {/* Degradê na base */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
            </div>

            {/* Conteúdo textual "Sobre mim" sobreposto à esquerda */}
            <div className="relative z-10 w-[62%] xs:w-[58%] sm:w-[52%] py-6 xs:py-8 sm:py-12 pl-4 xs:pl-6 sm:pl-8 pr-1.5 xs:pr-2">
              <h3
                className="font-serif text-3xl xs:text-4xl sm:text-5xl font-normal leading-none tracking-tight mb-3 xs:mb-4 select-none"
                style={{ color: data.accentColor }}
              >
                Sobre<br />mim
              </h3>

              <div className="text-[11px] xs:text-xs sm:text-sm text-slate-700 leading-relaxed font-sans space-y-1.5 xs:space-y-2 max-w-xs">
                {data.aboutText.split('. ').map((sentence, idx) => (
                  <p key={idx} className={idx === 0 ? 'font-semibold text-slate-800' : ''}>
                    {sentence.trim()}{sentence.trim().endsWith('.') ? '' : '.'}
                  </p>
                ))}
              </div>

              {data.aboutBadge && (
                <div className="pt-2.5 xs:pt-3">
                  <span
                    className="inline-flex items-center gap-1.5 px-2.5 xs:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-medium"
                    style={{
                      backgroundColor: `${data.accentColor}18`,
                      color: data.accentColor,
                    }}
                  >
                    <Sparkles className="w-3 h-3 shrink-0" />
                    <span className="truncate">{data.aboutBadge}</span>
                  </span>
                </div>
              )}
            </div>
          </section>

          {/* ============================================================== */}
          {/* 4. SERVIÇOS — "Como posso te ajudar"                           */}
          {/* Título em cursiva e ícones circulares lineares como no print   */}
          {/* ============================================================== */}
          <section className="px-3 xs:px-4 sm:px-6 pt-7 xs:pt-8 pb-7 xs:pb-8 bg-white border-t border-rose-100/60">
            <div className="text-center mb-6 xs:mb-8 px-2">
              <h3
                className="font-cursive text-2xl xs:text-3xl sm:text-4xl font-normal"
                style={{ color: data.accentColor }}
              >
                {data.servicesTitle}
              </h3>
            </div>

            {/* 3 cards de serviços com ícones circulares em contorno */}
            <div className="grid grid-cols-3 gap-2 xs:gap-3 sm:gap-4 text-center">
              {data.services.map((svc) => (
                <div key={svc.id} className="group flex flex-col items-center">
                  {/* Ícone circular outline sofisticado */}
                  <div
                    className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 rounded-full border-2 flex items-center justify-center bg-white shadow-xs group-hover:scale-105 group-hover:shadow-md transition-all duration-300 mb-2 xs:mb-3 shrink-0"
                    style={{
                      borderColor: `${data.accentColor}50`,
                      color: data.accentColor,
                    }}
                  >
                    <DynamicIcon name={svc.icon} className="w-5 h-5 xs:w-6 xs:h-6 stroke-[1.75]" />
                  </div>

                  <h4 className="font-serif text-xs xs:text-sm sm:text-base font-semibold text-slate-800 group-hover:text-rose-700 transition-colors leading-snug">
                    {svc.title}
                  </h4>

                  <p className="text-[10px] xs:text-[11px] sm:text-xs text-slate-600 leading-snug mt-1 xs:mt-1.5 line-clamp-3 font-sans px-0.5">
                    {svc.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ============================================================== */}
          {/* 5. CTA DE AGENDAMENTO                                          */}
          {/* ============================================================== */}
          <section className="px-3 xs:px-4 sm:px-6 py-4 bg-white/60">
            <div
              className="relative p-5 xs:p-6 sm:p-7 rounded-3xl text-center overflow-hidden shadow-lg"
              style={{
                background: `linear-gradient(145deg, ${data.accentColor}, #b65f75)`,
              }}
            >
              {/* Subtle radial pattern overlay */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

              <div className="relative z-10 space-y-2.5 xs:space-y-3 text-white max-w-sm mx-auto">
                <span className="inline-block text-[9px] xs:text-[10px] font-bold uppercase tracking-widest text-white/90 bg-white/15 px-3 py-1 rounded-full">
                  Exclusividade & Cuidado
                </span>

                <h3 className="text-lg xs:text-xl sm:text-2xl font-serif font-medium leading-snug">
                  "{data.ctaHeadline}"
                </h3>

                {data.ctaSubheadline && (
                  <p className="text-[11px] xs:text-xs sm:text-sm text-white/90 leading-relaxed font-sans">
                    {data.ctaSubheadline}
                  </p>
                )}

                <div className="pt-1.5 xs:pt-2">
                  <button
                    onClick={() => setIsBookingOpen(true)}
                    className="w-full xs:w-auto inline-flex items-center justify-center gap-2 px-6 xs:px-7 py-3 min-h-[44px] rounded-full bg-white text-slate-800 font-semibold text-xs tracking-wider uppercase shadow-md hover:bg-rose-50 hover:shadow-xl transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    style={{ color: data.accentColor }}
                  >
                    <MessageCircle className="w-4 h-4 fill-current shrink-0" />
                    <span>{data.ctaButtonText}</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================================== */}
          {/* 6. GALERIA (3 IMAGENS COM LEGENDA)                             */}
          {/* ============================================================== */}
          <section className="px-3 xs:px-4 sm:px-6 pt-6 pb-4 bg-white/60">
            <div className="text-center mb-4 xs:mb-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600">
                {data.gallerySubtitle}
              </p>
              <h3 className="text-xl xs:text-2xl sm:text-3xl font-serif font-semibold text-slate-800 mt-0.5">
                {data.galleryTitle}
              </h3>
            </div>

            <div className="grid grid-cols-1 xs:grid-cols-3 gap-2.5 xs:gap-2.5 sm:gap-3.5">
              {data.gallery.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedGalleryItem(item)}
                  className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-rose-100 shadow-xs hover:shadow-md transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
                  tabIndex={0}
                  role="button"
                  aria-label={`Ver foto ampliada de ${item.title}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedGalleryItem(item);
                    }
                  }}
                >
                  <div className="aspect-4/5 sm:aspect-square relative overflow-hidden bg-rose-50">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-106"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5 xs:p-3">
                      <span className="text-[10px] xs:text-[11px] text-white font-medium flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-rose-300" /> Ver Detalhes
                      </span>
                    </div>
                  </div>

                  <div className="p-2.5 xs:p-3 text-center">
                    <h4 className="text-xs xs:text-sm font-serif font-semibold text-slate-800 group-hover:text-rose-700 transition-colors">
                      {item.title}
                    </h4>
                    {item.subtitle && (
                      <p className="text-[10px] xs:text-[11px] text-slate-600 mt-0.5 line-clamp-1">
                        {item.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ============================================================== */}
          {/* 7. FAQ — "Dúvidas frequentes" (ACORDEÃO)                       */}
          {/* ============================================================== */}
          <section className="px-3 xs:px-4 sm:px-6 pt-5 xs:pt-6 pb-6 bg-white/60">
            <div className="text-center mb-4 xs:mb-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600">
                {data.faqSubtitle}
              </p>
              <h3 className="text-xl xs:text-2xl sm:text-3xl font-serif font-semibold text-slate-800 mt-0.5">
                {data.faqTitle}
              </h3>
            </div>

            <div className="space-y-2 xs:space-y-2.5">
              {data.faqs.map((faq) => {
                const isOpen = activeFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="rounded-2xl bg-white border border-rose-100 overflow-hidden shadow-xs transition-all"
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full text-left p-3.5 xs:p-4 sm:p-4.5 flex items-center justify-between gap-3 font-medium text-slate-800 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 min-h-[48px]"
                      aria-expanded={isOpen}
                    >
                      <span className="text-xs xs:text-sm font-serif font-medium leading-snug">
                        {faq.question}
                      </span>
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 bg-rose-100 text-rose-700' : 'text-slate-400'
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-3.5 xs:px-4 pb-4 pt-1 text-xs xs:text-sm text-slate-600 leading-relaxed border-t border-rose-50/80 animate-fade-in font-sans">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* ============================================================== */}
          {/* 8. RODAPÉ (ROSA ESCURO)                                        */}
          {/* ============================================================== */}
          <footer
            className="pt-8 pb-20 xs:pb-24 sm:pb-12 px-6 text-center text-white relative"
            style={{ backgroundColor: data.footerBgColor }}
          >
            <div className="max-w-xs mx-auto space-y-3.5 xs:space-y-4">
              {/* Monograma ou logo */}
              <div className="w-11 h-11 xs:w-12 xs:h-12 rounded-full mx-auto flex items-center justify-center border border-white/30 text-white font-serif font-bold text-sm bg-white/10 shadow-inner">
                {data.logoType === 'image' && data.logoImageUrl ? (
                  <img
                    src={data.logoImageUrl}
                    alt="Logo"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <span>{data.logoMonogram || 'GM'}</span>
                )}
              </div>

              <div>
                <h4 className="text-lg xs:text-xl font-serif tracking-wide">{data.footerLogoText}</h4>
                <p className="text-[10px] xs:text-[11px] text-white/80 uppercase tracking-widest mt-1">
                  {data.footerInviteText}
                </p>
              </div>

              {/* Redes sociais (Instagram, WhatsApp) */}
              <div className="flex items-center justify-center gap-4 pt-1">
                {data.socials.instagram && (
                  <a
                    href={data.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    title="Instagram"
                    aria-label="Abrir Instagram de Geovana Maestri"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                )}

                {data.socials.whatsapp && (
                  <a
                    href={data.socials.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    title="WhatsApp"
                    aria-label="Abrir WhatsApp de Geovana Maestri"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                )}
              </div>

              {/* Copyright */}
              <div className="pt-3 border-t border-white/15">
                <p className="text-[10px] xs:text-[11px] text-white/70">{data.copyright}</p>
              </div>
            </div>
          </footer>
        </div>
      </main>

      {/* Floating Quick Action: Agendar Agora */}
      <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom,1rem))] right-3 xs:right-4 sm:bottom-6 sm:right-6 z-30">
        <button
          onClick={() => setIsBookingOpen(true)}
          className="flex items-center gap-2 px-4 xs:px-5 py-2.5 xs:py-3 min-h-[44px] rounded-full text-white font-medium text-xs xs:text-sm shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300"
          style={{ backgroundColor: data.accentColor }}
          aria-label="Agendar Horário"
        >
          <Calendar className="w-4 h-4 shrink-0" />
          <span className="font-semibold tracking-wide">Agendar Horário</span>
        </button>
      </div>

      {/* Modals */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        services={data.services}
        whatsappNumber={data.ctaWhatsappNumber}
        professionalName={`${data.firstName} ${data.lastName}`}
        accentColor={data.accentColor}
      />

      <CatalogModal
        isOpen={isCatalogOpen}
        onClose={() => setIsCatalogOpen(false)}
        services={data.services}
        professionalName={`${data.firstName} ${data.lastName}`}
        whatsappNumber={data.ctaWhatsappNumber}
        accentColor={data.accentColor}
        onSelectBooking={(_serviceTitle) => {
          setIsBookingOpen(true);
        }}
      />

      <ReviewModal
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        professionalName={`${data.firstName} ${data.lastName}`}
        whatsappNumber={data.ctaWhatsappNumber}
        accentColor={data.accentColor}
      />

      <GalleryModal
        item={selectedGalleryItem}
        onClose={() => setSelectedGalleryItem(null)}
        accentColor={data.accentColor}
      />
    </div>
  );
}
