import React, { useState } from 'react';
import { X, Copy, Check, Share2, Instagram, MessageCircle, ExternalLink } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  accentColor: string;
  professionalName: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  accentColor,
  professionalName,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = window.location.href;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-md w-full bg-white rounded-3xl p-6 shadow-2xl border border-rose-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-500"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div
            className="w-12 h-12 rounded-2xl mx-auto flex items-center justify-center text-white mb-3 shadow-md"
            style={{ backgroundColor: accentColor }}
          >
            <Share2 className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-serif text-slate-800">Compartilhar Biosite</h3>
          <p className="text-xs text-slate-600 mt-1">
            Copie o link para colocar na bio do Instagram ou enviar para suas clientes.
          </p>
        </div>

        <div className="bg-rose-50/60 p-3 rounded-2xl border border-rose-100 flex items-center justify-between gap-2 mb-4">
          <span className="text-xs text-slate-600 truncate font-mono select-all">
            {currentUrl}
          </span>
          <button
            onClick={handleCopy}
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white flex items-center gap-1.5 transition-all active:scale-95 shrink-0"
            style={{ backgroundColor: accentColor }}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" /> Copiado!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" /> Copiar
              </>
            )}
          </button>
        </div>

        <div className="space-y-2">
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Acesse meu perfil profissional e agende seu horário: ${currentUrl}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-medium flex items-center justify-center gap-2 transition"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            Enviar via WhatsApp
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-medium flex items-center justify-center gap-2 transition"
          >
            <Instagram className="w-4 h-4 text-rose-600" />
            Adicionar na Bio do Instagram
          </a>
        </div>
      </div>
    </div>
  );
};
