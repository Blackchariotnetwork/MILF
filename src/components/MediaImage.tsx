import { useState } from 'react';
import { Film, User } from 'lucide-react';
import { BrandAccent } from '../types';

interface MediaImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  fallbackType?: 'video' | 'model';
  accent?: BrandAccent;
}

const FALLBACK_GRADIENTS: Record<BrandAccent, string> = {
  pink: 'from-[#EC008C]/15 via-white to-[#FFD400]/15',
  blue: 'from-[#007BFF]/15 via-white to-[#7AC943]/15',
  lime: 'from-[#7AC943]/20 via-white to-[#007BFF]/15',
  yellow: 'from-[#FFD400]/20 via-white to-[#EC008C]/15',
};

export function MediaImage({
  src,
  alt,
  className = '',
  fallbackTitle,
  fallbackType = 'video',
  accent = 'pink',
}: MediaImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    const Icon = fallbackType === 'model' ? User : Film;
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br ${FALLBACK_GRADIENTS[accent]} p-4 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Icon className="mb-2 h-7 w-7 text-zinc-500" aria-hidden="true" />
        <span className="line-clamp-2 max-w-[180px] text-xs font-medium text-zinc-700">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      loading="lazy"
    />
  );
}
