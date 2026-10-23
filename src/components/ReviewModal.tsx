import React, { useState } from 'react';
import { X, Star, Heart, Send, CheckCircle2, MessageCircle } from 'lucide-react';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  professionalName: string;
  whatsappNumber: string;
  accentColor: string;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  professionalName,
  whatsappNumber,
  accentColor,
}) => {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [clientName, setClientName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNumber = whatsappNumber.replace(/\D/g, '') || '5511999999999';
    const starsText = '⭐'.repeat(rating);
    const message = `Olá ${professionalName}! ✨\n\nAcabei de avaliar meu atendimento com ${starsText} (${rating}/5 estrelas):\n\n"${feedback || 'Atendimento impecável, me senti muito acolhida e o resultado ficou perfeito!'}"\n\n— *${clientName || 'Cliente satisfeita'}* 💕`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${cleanNumber}?text=${encoded}`, '_blank');
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-md w-full bg-white rounded-3xl p-5 sm:p-6 shadow-2xl border border-rose-100 overflow-hidden my-auto max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 w-11 h-11 rounded-full hover:bg-slate-100 transition-colors text-slate-500 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div
              className="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-white"
              style={{ backgroundColor: accentColor }}
            >
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-serif text-slate-800">Muito Obrigada!</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xs mx-auto">
              Sua avaliação foi enviada com sucesso. Seu carinho e feedback nos motivam a evoluir a cada dia.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-4 px-6 py-2.5 min-h-[44px] rounded-full text-xs sm:text-sm font-semibold text-white shadow-md hover:shadow-lg transition-all"
              style={{ backgroundColor: accentColor }}
            >
              Fechar
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-center space-y-1">
              <div
                className="w-12 h-12 rounded-2xl mx-auto flex items-center justify-center text-white mb-2 shadow-sm"
                style={{ backgroundColor: accentColor }}
              >
                <Heart className="w-6 h-6 fill-current" />
              </div>
              <h3 className="text-xl sm:text-2xl font-serif text-slate-800">Avalie sua Experiência</h3>
              <p className="text-xs text-slate-600">
                Como foi seu momento com {professionalName}?
              </p>
            </div>

            {/* Stars Selector */}
            <div className="flex items-center justify-center gap-1.5 xs:gap-2 py-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1.5 transition-transform hover:scale-120 active:scale-95 min-w-[40px] min-h-[40px] flex items-center justify-center"
                  aria-label={`${star} estrelas`}
                >
                  <Star
                    className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
                      (hoverRating || rating) >= star
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-slate-200'
                    }`}
                  />
                </button>
              ))}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Seu Nome
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Como prefere ser identificada?"
                className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 min-h-[44px] rounded-xl border border-rose-200 text-slate-800 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 transition"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Seu Depoimento / Comentário
              </label>
              <textarea
                rows={3}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Conte como foi seu resultado, o ambiente, o carinho no atendimento..."
                className="w-full px-3.5 sm:px-4 py-2.5 text-slate-800 text-base sm:text-sm rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-300 transition resize-none"
                required
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 px-6 min-h-[48px] rounded-2xl text-white font-medium text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-transform active:scale-98"
                style={{ backgroundColor: accentColor }}
              >
                <Send className="w-4 h-4" />
                Enviar Avaliação
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
