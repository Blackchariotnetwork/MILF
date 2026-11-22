import { RotateCcw, Search, SlidersHorizontal, X } from 'lucide-react';
import { ACCENT_TOKENS, ALL_TAGS, CATEGORIES, CATEGORY_ACCENT } from '../data/catalog';
import { CategoryName, VideoSortOption } from '../types';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: CategoryName;
  onCategoryChange: (category: CategoryName) => void;
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
  sortBy: VideoSortOption;
  onSortChange: (sort: VideoSortOption) => void;
  totalResults: number;
  totalCatalog: number;
  onResetAll: () => void;
}

const SORT_OPTIONS: { value: VideoSortOption; label: string }[] = [
  { value: 'latest', label: 'Latest Updates' },
  { value: 'views', label: 'Most Viewed' },
  { value: 'rating', label: 'Most Liked' },
  { value: 'longest', label: 'Longest' },
];

export function FilterBar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedTags,
  onToggleTag,
  sortBy,
  onSortChange,
  totalResults,
  totalCatalog,
  onResetAll,
}: FilterBarProps) {
  const hasActiveFilters =
    searchQuery.trim().length > 0 ||
    selectedCategory !== 'All' ||
    selectedTags.length > 0 ||
    sortBy !== 'latest';

  return (
    <section
      aria-label="Search and Filter Videos"
      className="border-b border-zinc-200 bg-zinc-50/70"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-4 space-y-3.5">
        {/* Row 1: Search Input + Sort Segmented Control */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <div className="relative flex-1 max-w-xl">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search videos, models, categories, or #tags..."
              aria-label="Search videos by title, model, category, or tag"
              className="w-full rounded-lg border border-zinc-200 bg-white py-2.5 pl-10 pr-9 text-sm text-zinc-900 placeholder:text-zinc-400 transition-colors focus:border-[#007BFF] focus:outline-none focus:ring-2 focus:ring-[#007BFF]/20"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                aria-label="Clear search query"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 whitespace-nowrap shrink-0">
              <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
              Sort:
            </span>
            <div
              role="group"
              aria-label="Sort videos"
              className="inline-flex items-center gap-1 rounded-lg bg-zinc-200/70 p-1 overflow-x-auto max-w-full"
            >
              {SORT_OPTIONS.map((option) => {
                const active = sortBy === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => onSortChange(option.value)}
                    className={`rounded-md px-3 py-1.5 text-xs font-semibold whitespace-nowrap shrink-0 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007BFF] ${
                      active
                        ? 'bg-white text-zinc-950 shadow-xs'
                        : 'text-zinc-600 hover:text-zinc-950'
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Row 2: Categories */}
        <div className="flex items-center gap-2 overflow-x-auto pb-0.5">
          <span className="text-xs font-semibold text-zinc-500 whitespace-nowrap shrink-0 mr-1">
            Categories
          </span>
          {CATEGORIES.map((category) => {
            const active = selectedCategory === category;
            const accent = ACCENT_TOKENS[CATEGORY_ACCENT[category]];
            return (
              <button
                key={category}
                type="button"
                onClick={() => onCategoryChange(category)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap shrink-0 border transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 ${accent.ring} ${
                  active
                    ? `${accent.bg} border-transparent text-white`
                    : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:text-zinc-950'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Row 3: Tags + Active Results Summary */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-0.5">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-semibold text-zinc-500 mr-1 whitespace-nowrap">
              Tags
            </span>
            {ALL_TAGS.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => onToggleTag(tag)}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium whitespace-nowrap shrink-0 border transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EC008C] ${
                    isSelected
                      ? 'border-[#007BFF] bg-[#007BFF] text-white'
                      : 'border-zinc-200/80 bg-white text-zinc-600 hover:border-zinc-400 hover:text-zinc-950'
                  }`}
                >
                  #{tag}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 text-xs text-zinc-500 whitespace-nowrap shrink-0">
            <span className="font-mono tabular-nums">
              Showing <strong className="text-zinc-900">{totalResults}</strong> of {totalCatalog}
            </span>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={onResetAll}
                className="inline-flex items-center gap-1 font-semibold text-[#D6007E] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EC008C] rounded-sm"
              >
                <RotateCcw className="h-3 w-3" aria-hidden="true" />
                Reset filters
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
