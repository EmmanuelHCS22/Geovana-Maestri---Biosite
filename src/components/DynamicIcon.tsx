import React from 'react';
import {
  Calendar,
  UserCheck,
  Gem,
  MessageCircle,
  Sparkles,
  Eye,
  Heart,
  Instagram,
  Phone,
  ExternalLink,
  Clock,
  MapPin,
  Smile,
  Scissors,
  CheckCircle2,
  Share2,
  Sliders,
  Send,
  Star,
  Feather,
  Flower2,
  Crown,
  Coffee,
  GraduationCap,
  BookOpen,
  Award,
  ShoppingBag,
  FileText,
} from 'lucide-react';

export const AVAILABLE_ICONS = [
  'Calendar',
  'GraduationCap',
  'BookOpen',
  'Star',
  'UserCheck',
  'Gem',
  'MessageCircle',
  'Sparkles',
  'Eye',
  'Heart',
  'Crown',
  'Award',
  'ShoppingBag',
  'FileText',
  'Feather',
  'Flower2',
  'Instagram',
  'Phone',
  'ExternalLink',
  'Scissors',
  'Smile',
  'Clock',
  'MapPin',
  'Send',
  'Coffee',
];

interface DynamicIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({ name, className = 'w-5 h-5', size }) => {
  const iconProps = { className, ...(size ? { size } : {}) };

  switch (name) {
    case 'Calendar':
      return <Calendar {...iconProps} />;
    case 'GraduationCap':
      return <GraduationCap {...iconProps} />;
    case 'BookOpen':
      return <BookOpen {...iconProps} />;
    case 'Star':
      return <Star {...iconProps} />;
    case 'Award':
      return <Award {...iconProps} />;
    case 'ShoppingBag':
      return <ShoppingBag {...iconProps} />;
    case 'FileText':
      return <FileText {...iconProps} />;
    case 'UserCheck':
      return <UserCheck {...iconProps} />;
    case 'Gem':
      return <Gem {...iconProps} />;
    case 'MessageCircle':
      return <MessageCircle {...iconProps} />;
    case 'Sparkles':
      return <Sparkles {...iconProps} />;
    case 'Eye':
      return <Eye {...iconProps} />;
    case 'Heart':
      return <Heart {...iconProps} />;
    case 'Crown':
      return <Crown {...iconProps} />;
    case 'Feather':
      return <Feather {...iconProps} />;
    case 'Flower2':
      return <Flower2 {...iconProps} />;
    case 'Star':
      return <Star {...iconProps} />;
    case 'Instagram':
      return <Instagram {...iconProps} />;
    case 'Phone':
      return <Phone {...iconProps} />;
    case 'ExternalLink':
      return <ExternalLink {...iconProps} />;
    case 'Scissors':
      return <Scissors {...iconProps} />;
    case 'Smile':
      return <Smile {...iconProps} />;
    case 'Clock':
      return <Clock {...iconProps} />;
    case 'MapPin':
      return <MapPin {...iconProps} />;
    case 'Send':
      return <Send {...iconProps} />;
    case 'Coffee':
      return <Coffee {...iconProps} />;
    default:
      return <Sparkles {...iconProps} />;
  }
};
