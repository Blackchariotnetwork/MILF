import { Bookmark } from 'lucide-react';
import { BRAND_LOGO_URL } from '../data/catalog';
import { AppView } from '../types';

interface HeaderProps {
  activeView: AppView;
  activeNavKey: 'videos' | 'models' | 'latest' | 'top-rated';
  savedCount: number;
  onNavigateVideos: () => void;
  onNavigateModels: () => void;
  onNavigateLatest: () => void;
  onNavigateTopRated: () => void;
  onOpenSaved: () => void;
}

export function Header({
  activeView,
  activeNavKey,
  savedCount,
  onNavigateVideos,
  onNavigateModels,
  onNavigateLatest,
  onNavigateTopRated,
  onOpenSaved,
}: HeaderProps) {
  const navItems: {
    key: 'videos' | 'models' | 'latest' | 'top-rated';
    label: string;
    onClick: () => void;
    activeAccent: string;
  }[] = [
    {
      key: 'videos',
      label: 'Videos',
      onClick: onNavigateVideos,
      activeAccent: 'border-[#EC008C] text-zinc-950',
    },
    {
      key: 'models',
      label: 'Models',
      onClick: onNavigateModels,
      activeAccent: 'border-[#007BFF] text-zinc-950',
    },
    {
      key: 'latest',
      label: 'Latest',
      onClick: onNavigateLatest,
      activeAccent: 'border-[#65A30D] text-zinc-950',
    },
    {
      key: 'top-rated',
      label: 'Top Rated',
      onClick: onNavigateTopRated,
      activeAccent: 'border-[#EAB308] text-zinc-950',
    },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-zinc-200">
      <div className="pop-spectrum-bar h-[3px] w-full" aria-hidden="true" />
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 h-20 sm:h-24">
        {/* Zone 1: Brand Logo */}
        <button
          type="button"
          onClick={onNavigateVideos}
          aria-label="MILF Tube Home"
          className="flex items-center shrink-0 whitespace-nowrap rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EC008C] focus-visible:ring-offset-2 transition-transform duration-150 hover:scale-[1.03]"
        >
          <img
            src={BRAND_LOGO_URL}
            alt="MILF"
            referrerPolicy="no-referrer"
            className="h-16 sm:h-20 w-auto object-contain mix-blend-multiply select-none"
          />
        </button>

        {/* Zone 2: Clean single-line navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="flex items-center gap-5 sm:gap-7 overflow-x-auto no-scrollbar"
        >
          {navItems.map((item) => {
            const isActive =
              activeNavKey === item.key ||
              (activeView === 'model-detail' && item.key === 'models');
            return (
              <button
                key={item.key}
                type="button"
                onClick={item.onClick}
                className={`relative py-2 text-sm font-semibold whitespace-nowrap shrink-0 border-b-2 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007BFF] focus-visible:rounded-sm ${
                  isActive
                    ? item.activeAccent
                    : 'border-transparent text-zinc-600 hover:text-zinc-950 hover:border-zinc-300'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Single primary action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenSaved}
            className="inline-flex items-center gap-2 rounded-lg bg-zinc-950 px-4 py-2 text-xs sm:text-sm font-semibold text-white whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#EC008C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EC008C] focus-visible:ring-offset-2"
          >
            <Bookmark className="h-4 w-4" aria-hidden="true" />
            <span>Saved</span>
            <span className="font-mono tabular-nums text-white/90">({savedCount})</span>
          </button>
        </div>
      </div>
    </header>
  );
}
