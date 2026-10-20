import React, { useState, useRef } from 'react';
import {
  X,
  Palette,
  User,
  Link as LinkIcon,
  Sparkles,
  HelpCircle,
  Image as ImageIcon,
  RotateCcw,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Check,
  Upload,
  Download,
  Share2,
  Sliders,
  Eye,
} from 'lucide-react';
import { BiositeData, LinkButton, ServiceItem, GalleryItem, FaqItem } from '../types';
import { AVAILABLE_ICONS, DynamicIcon } from './DynamicIcon';
import { DEFAULT_BIOSITE_DATA } from '../defaultData';

interface EditDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: BiositeData;
  onSave: (newData: BiositeData) => void;
  onReset: () => void;
}

type TabType = 'perfil' | 'visual' | 'botoes' | 'sobre' | 'servicos' | 'cta' | 'galeria' | 'faq' | 'rodape';

export const EditDrawer: React.FC<EditDrawerProps> = ({
  isOpen,
  onClose,
  data,
  onSave,
  onReset,
}) => {
  const [formData, setFormData] = useState<BiositeData>(data);
  const [activeTab, setActiveTab] = useState<TabType>('perfil');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentUploadField, setCurrentUploadField] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFieldChange = <K extends keyof BiositeData>(field: K, value: BiositeData[K]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    onSave(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  // Preset color themes
  const COLOR_PRESETS = [
    {
      name: 'Rosa Clássico (Original)',
      bg: '#f7eaed',
      accent: '#d78096',
      text: '#2b2728',
      footer: '#8a3c50',
    },
    {
      name: 'Nude & Blush',
      bg: '#faf2ee',
      accent: '#c97a7e',
      text: '#342a2b',
      footer: '#783c44',
    },
    {
      name: 'Rosé Dourado Suave',
      bg: '#fcf7f4',
      accent: '#d08c78',
      text: '#2d2524',
      footer: '#824838',
    },
    {
      name: 'Quartzo Rosa Minimal',
      bg: '#f9f1f4',
      accent: '#c36f88',
      text: '#262224',
      footer: '#6b3244',
    },
  ];

  // Image upload handler (converts to base64 data URL)
  const triggerImageUpload = (fieldIdentifier: string) => {
    setCurrentUploadField(fieldIdentifier);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentUploadField) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;

      if (currentUploadField === 'avatarUrl') {
        handleFieldChange('avatarUrl', result);
      } else if (currentUploadField === 'aboutImageUrl') {
        handleFieldChange('aboutImageUrl', result);
      } else if (currentUploadField === 'bgImageUrl') {
        handleFieldChange('bgImageUrl', result);
      } else if (currentUploadField === 'logoImageUrl') {
        setFormData((prev) => ({
          ...prev,
          logoType: 'image',
          logoImageUrl: result,
        }));
      } else if (currentUploadField.startsWith('gallery:')) {
        const index = parseInt(currentUploadField.split(':')[1], 10);
        const updated = [...formData.gallery];
        if (updated[index]) {
          updated[index] = { ...updated[index], imageUrl: result };
          handleFieldChange('gallery', updated);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  // Reorder buttons
  const moveLink = (index: number, direction: 'up' | 'down') => {
    const newLinks = [...formData.links];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newLinks.length) return;
    const temp = newLinks[index];
    newLinks[index] = newLinks[targetIndex];
    newLinks[targetIndex] = temp;
    handleFieldChange('links', newLinks);
  };

  const removeLink = (id: string) => {
    handleFieldChange('links', formData.links.filter((l) => l.id !== id));
  };

  const addLink = () => {
    const newLink: LinkButton = {
      id: Date.now().toString(),
      icon: 'Heart',
      title: 'Novo Botão',
      subtitle: 'Descrição do link',
      actionType: 'whatsapp',
      url: 'https://wa.me/5511999999999',
    };
    handleFieldChange('links', [...formData.links, newLink]);
  };

  // Services handlers
  const addService = () => {
    const newService: ServiceItem = {
      id: `s-${Date.now()}`,
      title: 'Novo Tratamento',
      description: 'Descrição elegante do procedimento oferecido.',
      icon: 'Sparkles',
      highlight: 'Exclusivo',
    };
    handleFieldChange('services', [...formData.services, newService]);
  };

  const removeService = (id: string) => {
    handleFieldChange('services', formData.services.filter((s) => s.id !== id));
  };

  // Gallery handlers
  const addGalleryItem = () => {
    const newItem: GalleryItem = {
      id: `g-${Date.now()}`,
      title: 'Novo Procedimento',
      subtitle: 'Resultado impecável e harmônico',
      imageUrl: '/assets/aistudio/image_397d3751.png',
    };
    handleFieldChange('gallery', [...formData.gallery, newItem]);
  };

  const removeGalleryItem = (id: string) => {
    handleFieldChange('gallery', formData.gallery.filter((g) => g.id !== id));
  };

  // FAQ handlers
  const addFaq = () => {
    const newFaq: FaqItem = {
      id: `f-${Date.now()}`,
      question: 'Nova dúvida frequente?',
      answer: 'Escreva aqui a resposta detalhada e acolhedora para sua cliente.',
    };
    handleFieldChange('faqs', [...formData.faqs, newFaq]);
  };

  const removeFaq = (id: string) => {
    handleFieldChange('faqs', formData.faqs.filter((f) => f.id !== id));
  };

  // JSON export & import
  const exportJson = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(formData, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', 'biosite-geovana-maestri.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-fade-in">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      <div className="relative w-full max-w-2xl bg-white h-full flex flex-col shadow-2xl overflow-hidden border-l border-rose-100">
        {/* Header */}
        <div className="px-6 py-4 border-b border-rose-100 flex items-center justify-between bg-rose-50/50">
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-white"
              style={{ backgroundColor: formData.accentColor }}
            >
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-semibold text-slate-800">Painel de Edição</h2>
              <p className="text-[11px] text-slate-500">Personalize 100% dos textos, fotos e cores</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-white flex items-center gap-1.5 shadow transition-all active:scale-95"
              style={{ backgroundColor: formData.accentColor }}
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4" /> Salvo!
                </>
              ) : (
                'Salvar Alterações'
              )}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-rose-100 overflow-x-auto no-scrollbar bg-white px-4">
          {[
            { id: 'perfil', label: 'Perfil', icon: User },
            { id: 'visual', label: 'Cores & Visual', icon: Palette },
            { id: 'botoes', label: 'Botões de Link', icon: LinkIcon },
            { id: 'sobre', label: 'Sobre Mim', icon: Eye },
            { id: 'servicos', label: 'Serviços', icon: Sparkles },
            { id: 'cta', label: 'CTA Agendamento', icon: Check },
            { id: 'galeria', label: 'Galeria', icon: ImageIcon },
            { id: 'faq', label: 'FAQ', icon: HelpCircle },
            { id: 'rodape', label: 'Rodapé & Redes', icon: Share2 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-1.5 px-3.5 py-3 text-xs font-medium whitespace-nowrap border-b-2 transition-colors ${
                  isActive
                    ? 'border-rose-500 text-rose-700 bg-rose-50/40 font-semibold'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: PERFIL */}
          {activeTab === 'perfil' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-rose-50/40 border border-rose-100 flex items-center gap-4">
                <img
                  src={formData.avatarUrl}
                  alt="Avatar"
                  className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                />
                <div className="space-y-1.5 flex-1">
                  <span className="text-xs font-semibold text-slate-700">Foto Principal</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => triggerImageUpload('avatarUrl')}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white border border-rose-200 text-slate-700 hover:bg-rose-50 flex items-center gap-1 shadow-xs"
                    >
                      <Upload className="w-3.5 h-3.5 text-rose-500" /> Carregar Foto Local
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Ou URL da Foto Principal
                </label>
                <input
                  type="text"
                  value={formData.avatarUrl}
                  onChange={(e) => handleFieldChange('avatarUrl', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-rose-200 text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Nome
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleFieldChange('firstName', e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-rose-200 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Sobrenome
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleFieldChange('lastName', e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-rose-200 text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Tagline (Espaçada, topo)
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => handleFieldChange('tagline', e.target.value)}
                  placeholder="BELEZA · CONFIANÇA · ESSÊNCIA"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-rose-200 text-slate-800 tracking-wider"
                />
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/40 border border-amber-100 space-y-3">
                <span className="text-xs font-semibold text-amber-900 block">Assinatura do Topo</span>
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">
                    Texto inicial (Ex: "Transformo beleza em")
                  </label>
                  <input
                    type="text"
                    value={formData.signatureLead}
                    onChange={(e) => handleFieldChange('signatureLead', e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-amber-200 text-slate-800 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">
                    Texto cursivo / caligráfico (Ex: "confiança e presença.")
                  </label>
                  <input
                    type="text"
                    value={formData.signatureCursive}
                    onChange={(e) => handleFieldChange('signatureCursive', e.target.value)}
                    className="w-full px-3 py-2 text-base font-cursive rounded-xl border border-amber-200 text-slate-800 bg-white"
                  />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50/40 border border-rose-100 space-y-3">
                <span className="text-xs font-semibold text-slate-800 block">Logo Pequena Sobreposta</span>
                <div className="flex gap-4">
                  <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      checked={formData.logoType === 'monogram'}
                      onChange={() => handleFieldChange('logoType', 'monogram')}
                      className="text-rose-500"
                    />
                    Monograma Elegante (Iniciais)
                  </label>
                  <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      checked={formData.logoType === 'image'}
                      onChange={() => handleFieldChange('logoType', 'image')}
                      className="text-rose-500"
                    />
                    Imagem / Logo Customizada
                  </label>
                </div>

                {formData.logoType === 'monogram' ? (
                  <div>
                    <label className="block text-[11px] text-slate-600 mb-1">Monograma</label>
                    <input
                      type="text"
                      maxLength={4}
                      value={formData.logoMonogram}
                      onChange={(e) => handleFieldChange('logoMonogram', e.target.value)}
                      className="w-24 px-3 py-1.5 text-center font-serif text-lg font-bold rounded-xl border border-rose-200 text-slate-800"
                    />
                  </div>
                ) : (
                  <div>
                    <button
                      type="button"
                      onClick={() => triggerImageUpload('logoImageUrl')}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white border border-rose-200 text-slate-700 hover:bg-rose-50 flex items-center gap-1 shadow-xs"
                    >
                      <Upload className="w-3.5 h-3.5 text-rose-500" /> Enviar Arquivo de Logo
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: VISUAL & CORES */}
          {activeTab === 'visual' && (
            <div className="space-y-5">
              <div>
                <span className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Paletas Recomendadas
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  {COLOR_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          bgColor: preset.bg,
                          accentColor: preset.accent,
                          textColor: preset.text,
                          footerBgColor: preset.footer,
                        }));
                      }}
                      className="p-3 rounded-2xl border border-rose-100 text-left hover:border-rose-300 transition-all bg-white hover:shadow-xs"
                    >
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span className="w-4 h-4 rounded-full border border-black/10" style={{ backgroundColor: preset.bg }} />
                        <span className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.accent }} />
                        <span className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.footer }} />
                      </div>
                      <span className="text-xs font-semibold text-slate-800">{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 rounded-2xl border border-rose-100 bg-rose-50/20">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Cor de Fundo da Página
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={formData.bgColor}
                      onChange={(e) => handleFieldChange('bgColor', e.target.value)}
                      className="w-10 h-10 rounded-xl cursor-pointer border border-rose-200 p-0.5"
                    />
                    <input
                      type="text"
                      value={formData.bgColor}
                      onChange={(e) => handleFieldChange('bgColor', e.target.value)}
                      className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-rose-200 font-mono text-slate-800"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-2xl border border-rose-100 bg-rose-50/20">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Cor de Destaque / Botões
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={formData.accentColor}
                      onChange={(e) => handleFieldChange('accentColor', e.target.value)}
                      className="w-10 h-10 rounded-xl cursor-pointer border border-rose-200 p-0.5"
                    />
                    <input
                      type="text"
                      value={formData.accentColor}
                      onChange={(e) => handleFieldChange('accentColor', e.target.value)}
                      className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-rose-200 font-mono text-slate-800"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-2xl border border-rose-100 bg-rose-50/20">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Cor do Texto Principal
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={formData.textColor}
                      onChange={(e) => handleFieldChange('textColor', e.target.value)}
                      className="w-10 h-10 rounded-xl cursor-pointer border border-rose-200 p-0.5"
                    />
                    <input
                      type="text"
                      value={formData.textColor}
                      onChange={(e) => handleFieldChange('textColor', e.target.value)}
                      className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-rose-200 font-mono text-slate-800"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-2xl border border-rose-100 bg-rose-50/20">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Cor de Fundo do Rodapé
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={formData.footerBgColor}
                      onChange={(e) => handleFieldChange('footerBgColor', e.target.value)}
                      className="w-10 h-10 rounded-xl cursor-pointer border border-rose-200 p-0.5"
                    />
                    <input
                      type="text"
                      value={formData.footerBgColor}
                      onChange={(e) => handleFieldChange('footerBgColor', e.target.value)}
                      className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-rose-200 font-mono text-slate-800"
                    />
                  </div>
                </div>
              </div>

              {/* Background pattern & image */}
              <div className="p-4 rounded-2xl bg-rose-50/30 border border-rose-100 space-y-3">
                <span className="text-xs font-semibold text-slate-800 block">Padrão / Textura de Fundo</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'delicate-mesh', label: 'Malha Suave' },
                    { id: 'subtle-dots', label: 'Pontilhado' },
                    { id: 'floral-accent', label: 'Floral Glow' },
                    { id: 'none', label: 'Liso' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleFieldChange('bgPattern', p.id as any)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                        formData.bgPattern === p.id
                          ? 'border-rose-400 bg-white text-rose-700 shadow-xs'
                          : 'border-rose-100 text-slate-600 hover:bg-white'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                <div className="pt-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Imagem de Fundo Opcional
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="URL da imagem de fundo (opcional)"
                      value={formData.bgImageUrl}
                      onChange={(e) => handleFieldChange('bgImageUrl', e.target.value)}
                      className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-rose-200"
                    />
                    <button
                      type="button"
                      onClick={() => triggerImageUpload('bgImageUrl')}
                      className="px-3 py-1.5 rounded-xl text-xs bg-white border border-rose-200 text-slate-700 hover:bg-rose-50 flex items-center gap-1"
                    >
                      <Upload className="w-3.5 h-3.5 text-rose-500" /> Upload
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: BOTÕES DE LINK */}
          {activeTab === 'botoes' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-slate-800">Botões Principais do Biosite</h3>
                  <p className="text-xs text-slate-500">Adicione, edite, remova e altere a ordem dos links</p>
                </div>
                <button
                  type="button"
                  onClick={addLink}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold text-white flex items-center gap-1 shadow-xs"
                  style={{ backgroundColor: formData.accentColor }}
                >
                  <Plus className="w-3.5 h-3.5" /> Adicionar Botão
                </button>
              </div>

              <div className="space-y-3">
                {formData.links.map((link, idx) => (
                  <div
                    key={link.id}
                    className="p-4 rounded-2xl bg-white border border-rose-100 shadow-xs space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-rose-50 pb-2.5">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-white"
                          style={{ backgroundColor: formData.accentColor }}
                        >
                          <DynamicIcon name={link.icon} className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold text-slate-800">
                          #{idx + 1} — {link.title || 'Sem título'}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => moveLink(idx, 'up')}
                          disabled={idx === 0}
                          className="p-1.5 rounded-lg hover:bg-rose-50 text-slate-500 disabled:opacity-30"
                          title="Subir"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveLink(idx, 'down')}
                          disabled={idx === formData.links.length - 1}
                          className="p-1.5 rounded-lg hover:bg-rose-50 text-slate-500 disabled:opacity-30"
                          title="Descer"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeLink(link.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 ml-1"
                          title="Excluir"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-medium text-slate-600 mb-1">Título</label>
                        <input
                          type="text"
                          value={link.title}
                          onChange={(e) => {
                            const updated = [...formData.links];
                            updated[idx].title = e.target.value;
                            handleFieldChange('links', updated);
                          }}
                          className="w-full px-3 py-1.5 text-xs rounded-xl border border-rose-200 text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-slate-600 mb-1">Subtítulo</label>
                        <input
                          type="text"
                          value={link.subtitle}
                          onChange={(e) => {
                            const updated = [...formData.links];
                            updated[idx].subtitle = e.target.value;
                            handleFieldChange('links', updated);
                          }}
                          className="w-full px-3 py-1.5 text-xs rounded-xl border border-rose-200 text-slate-800"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-medium text-slate-600 mb-1">Ícone</label>
                        <select
                          value={link.icon}
                          onChange={(e) => {
                            const updated = [...formData.links];
                            updated[idx].icon = e.target.value;
                            handleFieldChange('links', updated);
                          }}
                          className="w-full px-3 py-1.5 text-xs rounded-xl border border-rose-200 text-slate-800"
                        >
                          {AVAILABLE_ICONS.map((icon) => (
                            <option key={icon} value={icon}>
                              {icon}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium text-slate-600 mb-1">Ação ao Clicar</label>
                        <select
                          value={link.actionType}
                          onChange={(e) => {
                            const updated = [...formData.links];
                            updated[idx].actionType = e.target.value as any;
                            handleFieldChange('links', updated);
                          }}
                          className="w-full px-3 py-1.5 text-xs rounded-xl border border-rose-200 text-slate-800"
                        >
                          <option value="booking_modal">Abrir Modal de Agendamento</option>
                          <option value="catalog_modal">Abrir Catálogo de Procedimentos</option>
                          <option value="review_modal">Abrir Avaliação da Experiência</option>
                          <option value="whatsapp">Abrir WhatsApp Direto</option>
                          <option value="url">Abrir Link Externo / Site</option>
                        </select>
                      </div>
                    </div>

                    {link.actionType !== 'booking_modal' && link.actionType !== 'catalog_modal' && link.actionType !== 'review_modal' && (
                      <div>
                        <label className="block text-[11px] font-medium text-slate-600 mb-1">
                          Link URL / Link do WhatsApp
                        </label>
                        <input
                          type="text"
                          value={link.url || ''}
                          onChange={(e) => {
                            const updated = [...formData.links];
                            updated[idx].url = e.target.value;
                            handleFieldChange('links', updated);
                          }}
                          placeholder="https://wa.me/5511999999999 ou link do site"
                          className="w-full px-3 py-1.5 text-xs rounded-xl border border-rose-200 text-slate-800 font-mono"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SOBRE MIM */}
          {activeTab === 'sobre' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-rose-50/40 border border-rose-100 flex items-center gap-4">
                <img
                  src={formData.aboutImageUrl}
                  alt="Sobre mim"
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md"
                />
                <div className="space-y-1.5 flex-1">
                  <span className="text-xs font-semibold text-slate-700">Foto da Seção Sobre Mim</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => triggerImageUpload('aboutImageUrl')}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white border border-rose-200 text-slate-700 hover:bg-rose-50 flex items-center gap-1 shadow-xs"
                    >
                      <Upload className="w-3.5 h-3.5 text-rose-500" /> Carregar Foto Local
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Título da Seção
                </label>
                <input
                  type="text"
                  value={formData.aboutTitle}
                  onChange={(e) => handleFieldChange('aboutTitle', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-rose-200 text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Texto da Biografia
                </label>
                <textarea
                  rows={4}
                  value={formData.aboutText}
                  onChange={(e) => handleFieldChange('aboutText', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-rose-200 text-slate-800 leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Selo de Especialidade / Subtítulo
                </label>
                <input
                  type="text"
                  value={formData.aboutBadge}
                  onChange={(e) => handleFieldChange('aboutBadge', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-rose-200 text-slate-800"
                />
              </div>
            </div>
          )}

          {/* TAB 5: SERVIÇOS */}
          {activeTab === 'servicos' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-slate-800">Serviços Oferecidos</h3>
                  <p className="text-xs text-slate-500">Adicione, edite ou remova seus serviços</p>
                </div>
                <button
                  type="button"
                  onClick={addService}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold text-white flex items-center gap-1 shadow-xs"
                  style={{ backgroundColor: formData.accentColor }}
                >
                  <Plus className="w-3.5 h-3.5" /> Adicionar Serviço
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">Título da Seção</label>
                  <input
                    type="text"
                    value={formData.servicesTitle}
                    onChange={(e) => handleFieldChange('servicesTitle', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-rose-200 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">Subtítulo</label>
                  <input
                    type="text"
                    value={formData.servicesSubtitle}
                    onChange={(e) => handleFieldChange('servicesSubtitle', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-rose-200 text-slate-800"
                  />
                </div>
              </div>

              <div className="space-y-3">
                {formData.services.map((svc, idx) => (
                  <div
                    key={svc.id}
                    className="p-4 rounded-2xl bg-white border border-rose-100 shadow-xs space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-rose-50 pb-2">
                      <div className="flex items-center gap-2">
                        <DynamicIcon name={svc.icon} className="w-4 h-4 text-rose-500" />
                        <span className="text-xs font-bold text-slate-800">{svc.title}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeService(svc.id)}
                        className="p-1 rounded-lg hover:bg-red-50 text-red-500"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-medium text-slate-600 mb-1">Nome do Serviço</label>
                        <input
                          type="text"
                          value={svc.title}
                          onChange={(e) => {
                            const updated = [...formData.services];
                            updated[idx].title = e.target.value;
                            handleFieldChange('services', updated);
                          }}
                          className="w-full px-3 py-1.5 text-xs rounded-xl border border-rose-200 text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-slate-600 mb-1">Tag de Destaque</label>
                        <input
                          type="text"
                          value={svc.highlight || ''}
                          onChange={(e) => {
                            const updated = [...formData.services];
                            updated[idx].highlight = e.target.value;
                            handleFieldChange('services', updated);
                          }}
                          className="w-full px-3 py-1.5 text-xs rounded-xl border border-rose-200 text-slate-800"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-slate-600 mb-1">Descrição</label>
                      <textarea
                        rows={2}
                        value={svc.description}
                        onChange={(e) => {
                          const updated = [...formData.services];
                          updated[idx].description = e.target.value;
                          handleFieldChange('services', updated);
                        }}
                        className="w-full px-3 py-1.5 text-xs rounded-xl border border-rose-200 text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-slate-600 mb-1">Ícone</label>
                      <select
                        value={svc.icon}
                        onChange={(e) => {
                          const updated = [...formData.services];
                          updated[idx].icon = e.target.value;
                          handleFieldChange('services', updated);
                        }}
                        className="w-full px-3 py-1.5 text-xs rounded-xl border border-rose-200 text-slate-800"
                      >
                        {AVAILABLE_ICONS.map((icon) => (
                          <option key={icon} value={icon}>
                            {icon}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: CTA AGENDAMENTO */}
          {activeTab === 'cta' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Frase de Destaque (Heading)
                </label>
                <input
                  type="text"
                  value={formData.ctaHeadline}
                  onChange={(e) => handleFieldChange('ctaHeadline', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-rose-200 text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Subtítulo / Descrição
                </label>
                <textarea
                  rows={2}
                  value={formData.ctaSubheadline}
                  onChange={(e) => handleFieldChange('ctaSubheadline', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-rose-200 text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Texto do Botão
                </label>
                <input
                  type="text"
                  value={formData.ctaButtonText}
                  onChange={(e) => handleFieldChange('ctaButtonText', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-rose-200 text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  WhatsApp para Agendamentos (com DDI e DDD)
                </label>
                <input
                  type="text"
                  value={formData.ctaWhatsappNumber}
                  onChange={(e) => handleFieldChange('ctaWhatsappNumber', e.target.value)}
                  placeholder="5511999999999"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-rose-200 text-slate-800 font-mono"
                />
              </div>
            </div>
          )}

          {/* TAB 7: GALERIA */}
          {activeTab === 'galeria' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-slate-800">Fotos da Galeria</h3>
                  <p className="text-xs text-slate-500">Mostre suas transformações e fotos reais</p>
                </div>
                <button
                  type="button"
                  onClick={addGalleryItem}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold text-white flex items-center gap-1 shadow-xs"
                  style={{ backgroundColor: formData.accentColor }}
                >
                  <Plus className="w-3.5 h-3.5" /> Adicionar Foto
                </button>
              </div>

              <div className="space-y-3">
                {formData.gallery.map((item, idx) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-white border border-rose-100 shadow-xs space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-rose-50 pb-2">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-12 h-12 rounded-xl object-cover border border-rose-200"
                        />
                        <span className="text-xs font-bold text-slate-800">{item.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => triggerImageUpload(`gallery:${idx}`)}
                          className="px-2.5 py-1 text-xs rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-medium flex items-center gap-1"
                        >
                          <Upload className="w-3 h-3" /> Trocar Foto
                        </button>
                        <button
                          type="button"
                          onClick={() => removeGalleryItem(item.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-medium text-slate-600 mb-1">Título / Legenda</label>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => {
                            const updated = [...formData.gallery];
                            updated[idx].title = e.target.value;
                            handleFieldChange('gallery', updated);
                          }}
                          className="w-full px-3 py-1.5 text-xs rounded-xl border border-rose-200 text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-slate-600 mb-1">Subtítulo</label>
                        <input
                          type="text"
                          value={item.subtitle}
                          onChange={(e) => {
                            const updated = [...formData.gallery];
                            updated[idx].subtitle = e.target.value;
                            handleFieldChange('gallery', updated);
                          }}
                          className="w-full px-3 py-1.5 text-xs rounded-xl border border-rose-200 text-slate-800"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-slate-600 mb-1">URL da Imagem</label>
                      <input
                        type="text"
                        value={item.imageUrl}
                        onChange={(e) => {
                          const updated = [...formData.gallery];
                          updated[idx].imageUrl = e.target.value;
                          handleFieldChange('gallery', updated);
                        }}
                        className="w-full px-3 py-1.5 text-xs rounded-xl border border-rose-200 text-slate-800 font-mono"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: FAQ */}
          {activeTab === 'faq' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-slate-800">Dúvidas Frequentes (FAQ)</h3>
                  <p className="text-xs text-slate-500">Responda às perguntas mais comuns das suas clientes</p>
                </div>
                <button
                  type="button"
                  onClick={addFaq}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold text-white flex items-center gap-1 shadow-xs"
                  style={{ backgroundColor: formData.accentColor }}
                >
                  <Plus className="w-3.5 h-3.5" /> Adicionar Pergunta
                </button>
              </div>

              <div className="space-y-3">
                {formData.faqs.map((faq, idx) => (
                  <div
                    key={faq.id}
                    className="p-4 rounded-2xl bg-white border border-rose-100 shadow-xs space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-rose-50 pb-2">
                      <span className="text-xs font-bold text-slate-800">Pergunta #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeFaq(faq.id)}
                        className="p-1 rounded-lg hover:bg-red-50 text-red-500"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-slate-600 mb-1">Pergunta</label>
                      <input
                        type="text"
                        value={faq.question}
                        onChange={(e) => {
                          const updated = [...formData.faqs];
                          updated[idx].question = e.target.value;
                          handleFieldChange('faqs', updated);
                        }}
                        className="w-full px-3 py-1.5 text-xs rounded-xl border border-rose-200 text-slate-800 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-slate-600 mb-1">Resposta</label>
                      <textarea
                        rows={3}
                        value={faq.answer}
                        onChange={(e) => {
                          const updated = [...formData.faqs];
                          updated[idx].answer = e.target.value;
                          handleFieldChange('faqs', updated);
                        }}
                        className="w-full px-3 py-1.5 text-xs rounded-xl border border-rose-200 text-slate-800 leading-relaxed"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: RODAPÉ & REDES */}
          {activeTab === 'rodape' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Nome / Marca no Rodapé
                </label>
                <input
                  type="text"
                  value={formData.footerLogoText}
                  onChange={(e) => handleFieldChange('footerLogoText', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-rose-200 text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Texto de Convite
                </label>
                <input
                  type="text"
                  value={formData.footerInviteText}
                  onChange={(e) => handleFieldChange('footerInviteText', e.target.value)}
                  placeholder="Acompanhe meu trabalho"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-rose-200 text-slate-800"
                />
              </div>

              <div className="space-y-3 pt-2">
                <span className="text-xs font-semibold text-slate-800 block">Links das Redes Sociais</span>

                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">Instagram URL</label>
                  <input
                    type="text"
                    value={formData.socials.instagram}
                    onChange={(e) =>
                      handleFieldChange('socials', { ...formData.socials, instagram: e.target.value })
                    }
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-rose-200 text-slate-800 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">WhatsApp URL</label>
                  <input
                    type="text"
                    value={formData.socials.whatsapp}
                    onChange={(e) =>
                      handleFieldChange('socials', { ...formData.socials, whatsapp: e.target.value })
                    }
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-rose-200 text-slate-800 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">Pinterest URL</label>
                  <input
                    type="text"
                    value={formData.socials.pinterest}
                    onChange={(e) =>
                      handleFieldChange('socials', { ...formData.socials, pinterest: e.target.value })
                    }
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-rose-200 text-slate-800 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Texto de Copyright
                </label>
                <input
                  type="text"
                  value={formData.copyright}
                  onChange={(e) => handleFieldChange('copyright', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-rose-200 text-slate-800"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-rose-100 bg-rose-50/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                if (confirm('Deseja realmente restaurar todos os dados para os padrões originais de Geovana Maestri?')) {
                  onReset();
                  setFormData(DEFAULT_BIOSITE_DATA);
                }
              }}
              className="px-3 py-1.5 rounded-xl text-xs text-rose-700 hover:bg-rose-100 flex items-center gap-1 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Restaurar Padrões
            </button>

            <button
              type="button"
              onClick={exportJson}
              className="px-3 py-1.5 rounded-xl text-xs text-slate-600 hover:bg-white flex items-center gap-1 transition"
            >
              <Download className="w-3.5 h-3.5" /> Exportar JSON
            </button>
          </div>

          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white flex items-center gap-1.5 shadow-md active:scale-95 transition"
            style={{ backgroundColor: formData.accentColor }}
          >
            {savedSuccess ? <Check className="w-4 h-4" /> : null}
            {savedSuccess ? 'Salvo com Sucesso!' : 'Salvar Alterações'}
          </button>
        </div>
      </div>
    </div>
  );
};
