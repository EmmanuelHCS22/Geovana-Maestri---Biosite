import React, { useState } from 'react';
import { X, Calendar, Clock, User, Phone, CheckCircle2, MessageCircle } from 'lucide-react';
import { ServiceItem } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: ServiceItem[];
  whatsappNumber: string;
  professionalName: string;
  accentColor: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  services,
  whatsappNumber,
  professionalName,
  accentColor,
}) => {
  const [selectedService, setSelectedService] = useState<string>(services[0]?.title || 'Sobrancelhas');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredShift, setPreferredShift] = useState('Tarde (13h às 18h)');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSendWhatsapp = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNumber = whatsappNumber.replace(/\D/g, '') || '5511999999999';
    const message = `Olá ${professionalName}! ✨\n\nGostaria de agendar um horário:\n• Procedimento: *${selectedService}*\n• Meu nome: *${clientName || 'Cliente'}*\n• Data preferida: *${preferredDate || 'A combinar'}*\n• Período: *${preferredShift}*${notes ? `\n• Observação: ${notes}` : ''}\n\nPoderia me informar a disponibilidade de horários? Obrigada! 💕`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs transition-opacity animate-fade-in">
      <div
        className="relative w-full max-w-lg overflow-hidden bg-white rounded-3xl shadow-2xl border border-rose-100"
        style={{ maxHeight: '90vh' }}
      >
        {/* Header */}
        <div
          className="px-6 py-5 text-white flex items-center justify-between"
          style={{ backgroundColor: accentColor }}
        >
          <div>
            <span className="text-xs uppercase tracking-widest opacity-90 font-sans">Agendamento Online</span>
            <h3 className="text-2xl font-serif font-medium">Reserve seu Horário</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/20 transition-colors text-white"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 80px)' }}>
          {isSuccess ? (
            <div className="text-center py-8 space-y-4">
              <div
                className="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-white"
                style={{ backgroundColor: accentColor }}
              >
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-serif text-slate-800">Solicitação Enviada!</h4>
              <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                Você foi redirecionada para o WhatsApp de {professionalName}. Ela responderá confirmando seu
                atendimento exclusivo.
              </p>
              <button
                onClick={() => {
                  setIsSuccess(false);
                  onClose();
                }}
                className="mt-4 px-6 py-2.5 rounded-full text-sm font-medium text-white transition-all shadow-md hover:shadow-lg"
                style={{ backgroundColor: accentColor }}
              >
                Concluir
              </button>
            </div>
          ) : (
            <form onSubmit={handleSendWhatsapp} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Procedimento Desejado
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-rose-200 bg-rose-50/40 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 transition"
                  required
                >
                  {services.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title} — {s.highlight || 'Procedimento Exclusivo'}
                    </option>
                  ))}
                  <option value="Outro procedimento">Outro procedimento / Avaliação personalizada</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-rose-400" /> Seu Nome
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Como prefere ser chamada?"
                    className="w-full px-4 py-2.5 rounded-xl border border-rose-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-rose-400" /> Seu WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="(00) 00000-0000"
                    className="w-full px-4 py-2.5 rounded-xl border border-rose-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-rose-400" /> Data Preferencial
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-rose-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-rose-400" /> Período
                  </label>
                  <select
                    value={preferredShift}
                    onChange={(e) => setPreferredShift(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-rose-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 transition"
                  >
                    <option value="Manhã (09h às 12h)">Manhã (09h às 12h)</option>
                    <option value="Tarde (13h às 18h)">Tarde (13h às 18h)</option>
                    <option value="Fim de tarde (18h às 20h)">Fim de tarde (18h às 20h)</option>
                    <option value="Sábado">Sábado</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Mensagem ou observação (opcional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ex: Primeira vez fazendo cílios, gostaria de tirar dúvidas..."
                  rows={2}
                  className="w-full px-4 py-2 rounded-xl border border-rose-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 transition resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-2xl text-white font-medium text-sm tracking-wide flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-transform active:scale-98"
                  style={{ backgroundColor: accentColor }}
                >
                  <MessageCircle className="w-5 h-5" />
                  Enviar Pedido no WhatsApp
                </button>
                <p className="text-center text-[11px] text-slate-600 mt-2">
                  Atendimento humanizado direto com a especialista.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
