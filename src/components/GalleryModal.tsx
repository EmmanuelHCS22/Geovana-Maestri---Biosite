import React from 'react';
import { X, Sparkles } from 'lucide-react';
import { GalleryItem } from '../types';

interface GalleryModalProps {
  item: GalleryItem | null;
  onClose: () => void;
  accentColor: string;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({ item, onClose, accentColor }) => {
  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-lg md:max-w-xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/20 my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-11 h-11 bg-black/50 hover:bg-black/70 rounded-full text-white backdrop-blur-md flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Fechar galeria"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative aspect-4/5 sm:aspect-square bg-slate-900 overflow-hidden flex items-center justify-center">
          <img
            src={item.imageUrl}
            alt={item.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6 bg-white">
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className="text-xs font-semibold uppercase tracking-widest px-2.5 py-0.5 rounded-full"
              style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
            >
              Resultado Real
            </span>
          </div>
          <h3 className="text-2xl font-serif text-slate-800">{item.title}</h3>
          <p className="text-sm text-slate-600 mt-1 leading-relaxed">{item.subtitle}</p>
        </div>
      </div>
    </div>
  );
};
