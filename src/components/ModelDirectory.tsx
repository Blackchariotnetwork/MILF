import { useMemo, useState } from 'react';
import { ArrowRight, Search, SlidersHorizontal, X } from 'lucide-react';
import { ACCENT_TOKENS } from '../data/catalog';
import { ModelProfile, ModelSortOption, VideoItem, VoteDirection } from '../types';
import { MediaImage } from './MediaImage';
import { ModelVoteControl } from './ModelVoteControl';

interface ModelDirectoryProps {
  models: ModelProfile[];
  videos: VideoItem[];
  votes: Record<string, VoteDirection>;
  initialSort?: ModelSortOption;
  onSelectModel: (modelId: string) => void;
  onVoteModel: (modelId: string, direction: 'up' | 'down') => void;
}

const MODEL_SORT_OPTIONS: { value: ModelSortOption; label: string }[] = [
  { value: 'top-rated', label: 'Top Rated' },
  { value: 'most-videos', label: 'Most Videos' },
  { value: 'newest', label: 'Newest' },
  { value: 'alphabetical', label: 'Name A–Z' },
];

export function ModelDirectory({
  models,
  videos,
  votes,
  initialSort = 'top-rated',
  onSelectModel,
  onVoteModel,
}: ModelDirectoryProps) {
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState<ModelSortOption>(initialSort);

  const getCounts = (model: ModelProfile) => {
    const userVote = votes[model.id] ?? null;
    const upvotes = model.baseUpvotes + (userVote === 'up' ? 1 : 0);
    const downvotes = model.baseDownvotes + (userVote === 'down' ? 1 : 0);
    const videoCount = videos.filter((v) => v.modelIds.includes(model.id)).length;
    return { userVote, upvotes, downvotes, netScore: upvotes - downvotes, videoCount };
  };

  const filteredModels = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    const list = models.filter((model) => {
      if (!trimmed) return true;
      return (
        model.name.toLowerCase().includes(trimmed) ||
        model.location.toLowerCase().includes(trimmed) ||
        model.specialty.toLowerCase().includes(trimmed) ||
        model.tagline.toLowerCase().includes(trimmed)
      );
    });

    return [...list].sort((a, b) => {
      const statsA = getCounts(a);
      const statsB = getCounts(b);
      switch (sortBy) {
        case 'top-rated':
          return statsB.netScore - statsA.netScore;
        case 'most-videos':
          return statsB.videoCount - statsA.videoCount || statsB.netScore - statsA.netScore;
        case 'newest':
          return b.debutYear - a.debutYear || statsB.netScore - statsA.netScore;
        case 'alphabetical':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }, [models, videos, votes, query, sortBy]);

  return (
    <main className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Directory Header & Controls */}
      <div className="flex flex-col gap-5 border-b border-zinc-200 pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-1.5 max-w-2xl">
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 text-balance">
            Model Directory
          </h1>
          <p className="text-sm sm:text-base text-zinc-600">
            Browse every featured creator portrait, vote with up and down arrows, and open individual model pages for biographies and related video collections.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="relative min-w-[240px]">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter models or cities..."
              aria-label="Filter models by name, city, or specialty"
              className="w-full rounded-lg border border-zinc-200 bg-white py-2 pl-9 pr-8 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-[#007BFF] focus:outline-none focus:ring-2 focus:ring-[#007BFF]/20"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear model search"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-zinc-400 hover:text-zinc-700"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-zinc-400 shrink-0 hidden sm:block" aria-hidden="true" />
            <div
              role="group"
              aria-label="Sort models"
              className="inline-flex items-center gap-1 rounded-lg bg-zinc-100 p-1 overflow-x-auto"
            >
              {MODEL_SORT_OPTIONS.map((option) => {
                const active = sortBy === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setSortBy(option.value)}
                    className={`rounded-md px-3 py-1.5 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors ${
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
      </div>

      {/* Directory Grid: 3 editorial portrait cards per row on desktop */}
      {filteredModels.length === 0 ? (
        <div className="py-16 text-center space-y-3">
          <p className="font-display text-lg font-bold text-zinc-900">No models match “{query}”</p>
          <p className="text-sm text-zinc-500">Try searching by another name, city, or specialty.</p>
          <button
            type="button"
            onClick={() => setQuery('')}
            className="rounded-lg bg-zinc-950 px-4 py-2 text-xs font-semibold text-white hover:bg-[#007BFF] transition-colors"
          >
            Show all models
          </button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredModels.map((model) => {
            const { userVote, upvotes, downvotes, videoCount } = getCounts(model);
            const accent = ACCENT_TOKENS[model.accent];

            return (
              <article
                key={model.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-all duration-200 hover:border-zinc-300 hover:shadow-md"
              >
                {/* Colorful top hairline bar */}
                <div className={`h-1 w-full ${accent.bg}`} aria-hidden="true" />

                {/* Clickable Portrait Image */}
                <button
                  type="button"
                  onClick={() => onSelectModel(model.id)}
                  aria-label={`View ${model.name}'s profile page`}
                  className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-100 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#007BFF]"
                >
                  <MediaImage
                    src={model.portraitUrl}
                    alt={`${model.name} editorial portrait`}
                    fallbackTitle={model.name}
                    fallbackType="model"
                    accent={model.accent}
                    className="h-full w-full object-cover object-top transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                  />
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 via-black/25 to-transparent"
                    aria-hidden="true"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 text-white">
                    <div>
                      <h2 className="font-display text-2xl font-bold leading-tight tracking-tight">
                        {model.name}
                      </h2>
                      <p className="text-xs font-medium text-white/85 mt-0.5">
                        {model.location}
                      </p>
                    </div>
                    <span className="font-mono text-xs font-semibold tabular-nums text-white/95">
                      {videoCount} {videoCount === 1 ? 'video' : 'videos'}
                    </span>
                  </div>
                </button>

                {/* Info & Up/Down Arrow Rating Bar */}
                <div className="flex flex-1 flex-col justify-between gap-4 p-5">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                      <span className={`font-semibold ${accent.text}`}>{model.specialty}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">Since {model.debutYear}</span>
                    </div>
                    <p className="text-sm text-zinc-600 line-clamp-2 leading-relaxed">
                      {model.tagline}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-3 border-t border-zinc-100">
                    <ModelVoteControl
                      modelName={model.name}
                      upvotes={upvotes}
                      downvotes={downvotes}
                      userVote={userVote}
                      onVote={(direction) => onVoteModel(model.id, direction)}
                      variant="compact"
                    />

                    <button
                      type="button"
                      onClick={() => onSelectModel(model.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-900 hover:text-[#007BFF] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:underline"
                    >
                      <span>View profile</span>
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}
