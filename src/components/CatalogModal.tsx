import React from 'react';
import { X, Sparkles, Clock, Check, MessageCircle, BookOpen } from 'lucide-react';
import { ServiceItem } from '../types';

interface CatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: ServiceItem[];
  professionalName: string;
  whatsappNumber: string;
  accentColor: string;
  onSelectBooking: (serviceName: string) => void;
}

export const CatalogModal: React.FC<CatalogModalProps> = ({
  isOpen,
  onClose,
  services,
  professionalName,
  whatsappNumber,
  accentColor,
  onSelectBooking,
}) => {
  if (!isOpen) return null;

  const catalogItems = [
    {
      title: 'Extensão de Cílios Volume Brasileiro',
      description: 'Fios em formato Y que proporcionam volume sutil, leveza e durabilidade excelente.',
      duration: '2h',
      tag: 'Mais Pedido',
    },
    {
      title: 'Lash Lifting & Nutrição com Queratina',
      description: 'Curvatura natural dos seus próprios fios com efeito rímel duradouro por até 6 semanas.',
      duration: '1h15',
      tag: 'Efeito Natural',
    },
    {
      title: 'Design Estratégico de Sobrancelhas',
      description: 'Mapeamento facial personalizado para realçar a simetria única do seu olhar.',
      duration: '45min',
      tag: 'Essencial',
    },
    {
      title: 'Brow Lamination & Alinhamento',
      description: 'Fios alinhados e encorpados, proporcionando sobrancelhas cheias e modernas.',
      duration: '1h',
      tag: 'Tendência',
    },
    {
      title: 'Curso VIP Lash Designer Iniciante',
      description: 'Apostila completa, prática em modelo, suporte pós-curso e certificação exclusiva.',
      duration: '2 Dias (Intensivo)',
      tag: 'Profissional',
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-lg w-full bg-white rounded-3xl shadow-2xl border border-rose-100 overflow-hidden flex flex-col"
        style={{ maxHeight: '90vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="px-6 py-5 text-white flex items-center justify-between"
          style={{ backgroundColor: accentColor }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-white/80 font-semibold">
                Menu & Serviços
              </span>
              <h3 className="text-xl font-serif font-medium">Catálogo de Procedimentos</h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/20 transition-colors text-white"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-6 overflow-y-auto space-y-3.5">
          <p className="text-xs text-slate-600 leading-relaxed">
            Consulte nossa seleção de técnicas exclusivas de {professionalName}. Todos os atendimentos
            incluem avaliação prévia e produtos de alta tecnologia.
          </p>

          <div className="space-y-3">
            {catalogItems.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-rose-50/30 border border-rose-100 hover:border-rose-200 transition-all space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-serif text-base font-semibold text-slate-800">{item.title}</h4>
                  <span
                    className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0"
                    style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
                  >
                    {item.tag}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-sans">{item.description}</p>

                <div className="flex items-center justify-between pt-1 border-t border-rose-100/60 text-[11px] text-slate-500">
                  <span className="flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-rose-400" /> {item.duration}
                  </span>

                  <button
                    onClick={() => {
                      onClose();
                      onSelectBooking(item.title);
                    }}
                    className="px-3 py-1 rounded-xl text-xs font-semibold text-white shadow-xs hover:shadow-sm transition active:scale-95 flex items-center gap-1"
                    style={{ backgroundColor: accentColor }}
                  >
                    Agendar Horário
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 text-center">
            <a
              href={`https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(`Olá ${professionalName}! Gostaria de tirar dúvidas sobre o Catálogo de Procedimentos.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold hover:underline"
              style={{ color: accentColor }}
            >
              <MessageCircle className="w-4 h-4" />
              Tirar dúvidas sobre valores no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
