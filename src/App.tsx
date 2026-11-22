import { useEffect, useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { FilterBar } from './components/FilterBar';
import { Header } from './components/Header';
import { MediaImage } from './components/MediaImage';
import { ModelDirectory } from './components/ModelDirectory';
import { ModelProfilePage } from './components/ModelProfilePage';
import { SavedDrawer } from './components/SavedDrawer';
import { VideoCard } from './components/VideoCard';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { ACCENT_TOKENS, MODELS, VIDEOS } from './data/catalog';
import {
  AppView,
  CategoryName,
  ModelSortOption,
  VideoItem,
  VideoSortOption,
  VoteDirection,
} from './types';

const VOTES_STORAGE_KEY = 'milf_tube_model_votes_v1';
const SAVED_STORAGE_KEY = 'milf_tube_saved_videos_v1';

function loadStoredJson<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [activeView, setActiveView] = useState<AppView>('videos');
  const [activeNavKey, setActiveNavKey] = useState<
    'videos' | 'models' | 'latest' | 'top-rated'
  >('videos');
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);
  const [modelDirectorySort, setModelDirectorySort] =
    useState<ModelSortOption>('top-rated');

  // Video filtering state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryName>('All');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [videoSortBy, setVideoSortBy] = useState<VideoSortOption>('latest');

  // Interactive modals / drawers
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);

  // Persisted model votes (up/down arrows) & saved video IDs
  const [votes, setVotes] = useState<Record<string, VoteDirection>>(() =>
    loadStoredJson<Record<string, VoteDirection>>(VOTES_STORAGE_KEY, {})
  );
  const [savedVideoIds, setSavedVideoIds] = useState<string[]>(() =>
    loadStoredJson<string[]>(SAVED_STORAGE_KEY, [])
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(VOTES_STORAGE_KEY, JSON.stringify(votes));
    } catch {
      // Ignore storage quota errors
    }
  }, [votes]);

  useEffect(() => {
    try {
      window.localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(savedVideoIds));
    } catch {
      // Ignore storage quota errors
    }
  }, [savedVideoIds]);

  const handleVoteModel = (modelId: string, direction: 'up' | 'down') => {
    setVotes((prev) => {
      const current = prev[modelId] ?? null;
      return {
        ...prev,
        [modelId]: current === direction ? null : direction,
      };
    });
  };

  const handleToggleSaveVideo = (videoId: string) => {
    setSavedVideoIds((prev) =>
      prev.includes(videoId)
        ? prev.filter((id) => id !== videoId)
        : [videoId, ...prev]
    );
  };

  const handleToggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedTags([]);
    setVideoSortBy('latest');
  };

  const handleOpenModel = (modelId: string) => {
    setSelectedModelId(modelId);
    setActiveView('model-detail');
    setActiveNavKey('models');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateVideos = () => {
    setActiveView('videos');
    setActiveNavKey('videos');
    setSelectedModelId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateLatest = () => {
    setActiveView('videos');
    setActiveNavKey('latest');
    setSelectedModelId(null);
    setVideoSortBy('latest');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateModels = () => {
    setActiveView('models');
    setActiveNavKey('models');
    setSelectedModelId(null);
    setModelDirectorySort('most-videos');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateTopRated = () => {
    setActiveView('models');
    setActiveNavKey('top-rated');
    setSelectedModelId(null);
    setModelDirectorySort('top-rated');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTagFromPlayer = (tag: string) => {
    setActiveView('videos');
    setActiveNavKey('videos');
    setSelectedModelId(null);
    setSelectedTags([tag]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredVideos = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const list = VIDEOS.filter((video) => {
      if (selectedCategory !== 'All' && video.category !== selectedCategory) {
        return false;
      }

      if (selectedTags.length > 0) {
        const hasAllSelectedTags = selectedTags.every((tag) =>
          video.tags.includes(tag)
        );
        if (!hasAllSelectedTags) return false;
      }

      if (q) {
        const modelNames = MODELS.filter((m) => video.modelIds.includes(m.id))
          .map((m) => m.name.toLowerCase())
          .join(' ');
        const haystack = [
          video.title,
          video.description,
          video.category,
          video.tags.join(' '),
          modelNames,
        ]
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      return true;
    });

    return [...list].sort((a, b) => {
      switch (videoSortBy) {
        case 'latest':
          return (
            new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
          );
        case 'views':
          return b.views - a.views;
        case 'rating':
          return b.likes - a.likes;
        case 'longest':
          return b.durationSeconds - a.durationSeconds;
        default:
          return 0;
      }
    });
  }, [searchQuery, selectedCategory, selectedTags, videoSortBy]);

  const activeModel = useMemo(
    () => MODELS.find((m) => m.id === selectedModelId) ?? null,
    [selectedModelId]
  );

  const activeModelVideos = useMemo(() => {
    if (!activeModel) return [];
    return VIDEOS.filter((v) => v.modelIds.includes(activeModel.id)).sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }, [activeModel]);

  const savedVideos = useMemo(
    () =>
      savedVideoIds
        .map((id) => VIDEOS.find((v) => v.id === id))
        .filter((v): v is VideoItem => Boolean(v)),
    [savedVideoIds]
  );

  const sectionHeading =
    selectedCategory !== 'All'
      ? selectedCategory
      : videoSortBy === 'latest'
      ? 'Latest Updates'
      : videoSortBy === 'views'
      ? 'Most Viewed Videos'
      : videoSortBy === 'rating'
      ? 'Most Liked Videos'
      : 'Longest Feature Films';

  return (
    <div className="min-h-screen flex flex-col bg-white text-zinc-900">
      <Header
        activeView={activeView}
        activeNavKey={activeNavKey}
        savedCount={savedVideoIds.length}
        onNavigateVideos={handleNavigateVideos}
        onNavigateModels={handleNavigateModels}
        onNavigateLatest={handleNavigateLatest}
        onNavigateTopRated={handleNavigateTopRated}
        onOpenSaved={() => setIsSavedDrawerOpen(true)}
      />

      {activeView === 'videos' && (
        <>
          <FilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedTags={selectedTags}
            onToggleTag={handleToggleTag}
            sortBy={videoSortBy}
            onSortChange={setVideoSortBy}
            totalResults={filteredVideos.length}
            totalCatalog={VIDEOS.length}
            onResetAll={handleResetFilters}
          />

          <main className="flex-1 mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 py-7 sm:py-9 space-y-12">
            {/* Primary 5-Videos-Per-Row Tube Grid */}
            <section aria-label="Video Gallery" className="space-y-5">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div className="space-y-0.5">
                  <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950">
                    {sectionHeading}
                  </h1>
                  <p className="text-xs sm:text-sm text-zinc-500">
                    5 videos per row · Click any video to watch or click a model name for their full profile.
                  </p>
                </div>

                {selectedTags.length > 0 && (
                  <div className="text-xs font-medium text-zinc-600">
                    Filtered by tags:{' '}
                    <span className="font-semibold text-[#0066D6]">
                      {selectedTags.map((t) => `#${t}`).join(' · ')}
                    </span>
                  </div>
                )}
              </div>

              {filteredVideos.length === 0 ? (
                <div className="rounded-2xl border border-zinc-200 bg-zinc-50/70 py-16 px-6 text-center space-y-3">
                  <p className="font-display text-xl font-bold text-zinc-950">
                    No videos match your current filters
                  </p>
                  <p className="text-sm text-zinc-500 max-w-md mx-auto">
                    Try clearing one of your selected tags, switching categories, or adjusting your search query.
                  </p>
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="rounded-lg bg-[#EC008C] px-4 py-2 text-xs font-semibold text-white hover:bg-[#D6007E] transition-colors"
                  >
                    Reset all filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-7">
                  {filteredVideos.map((video) => {
                    const featuredModels = MODELS.filter((m) =>
                      video.modelIds.includes(m.id)
                    );
                    return (
                      <VideoCard
                        key={video.id}
                        video={video}
                        models={featuredModels}
                        isSaved={savedVideoIds.includes(video.id)}
                        onSelectVideo={setActiveVideo}
                        onSelectModel={handleOpenModel}
                        onToggleSave={handleToggleSaveVideo}
                      />
                    );
                  })}
                </div>
              )}
            </section>

            {/* Featured Models Directory Preview Strip */}
            <section
              aria-label="Featured Models"
              className="border-t border-zinc-200 pt-9 space-y-5"
            >
              <div className="flex items-end justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl font-extrabold tracking-tight text-zinc-950">
                    Featured Models
                  </h2>
                  <p className="text-sm text-zinc-500 mt-0.5">
                    Explore model portraits, biographies, related videos, and community up/down ratings.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleNavigateModels}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0066D6] hover:underline whitespace-nowrap shrink-0"
                >
                  <span>Full Model Directory</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {MODELS.map((model) => {
                  const userVote = votes[model.id] ?? null;
                  const netScore =
                    model.baseUpvotes +
                    (userVote === 'up' ? 1 : 0) -
                    (model.baseDownvotes + (userVote === 'down' ? 1 : 0));
                  const count = VIDEOS.filter((v) =>
                    v.modelIds.includes(model.id)
                  ).length;
                  const accent = ACCENT_TOKENS[model.accent];

                  return (
                    <button
                      key={model.id}
                      type="button"
                      onClick={() => handleOpenModel(model.id)}
                      className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white text-left transition-all duration-200 hover:border-zinc-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007BFF]"
                    >
                      <div className={`h-1 w-full ${accent.bg}`} aria-hidden="true" />
                      <div className="aspect-[3/4] w-full overflow-hidden bg-zinc-100">
                        <MediaImage
                          src={model.portraitUrl}
                          alt={model.name}
                          fallbackTitle={model.name}
                          fallbackType="model"
                          accent={model.accent}
                          className="h-full w-full object-cover object-top transition-transform duration-200 group-hover:scale-[1.04]"
                        />
                      </div>
                      <div className="p-3 space-y-0.5">
                        <div className="font-display text-sm font-bold text-zinc-950 group-hover:text-[#D6007E] transition-colors truncate">
                          {model.name}
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 font-mono tabular-nums">
                          <span>{count} vids</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-semibold text-zinc-700">
                            +{netScore.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          </main>
        </>
      )}

      {activeView === 'models' && (
        <div className="flex-1">
          <ModelDirectory
            key={modelDirectorySort}
            models={MODELS}
            videos={VIDEOS}
            votes={votes}
            initialSort={modelDirectorySort}
            onSelectModel={handleOpenModel}
            onVoteModel={handleVoteModel}
          />
        </div>
      )}

      {activeView === 'model-detail' && activeModel && (
        <div className="flex-1">
          <ModelProfilePage
            model={activeModel}
            allModels={MODELS}
            relatedVideos={activeModelVideos}
            savedVideoIds={savedVideoIds}
            votes={votes}
            onBackToDirectory={handleNavigateModels}
            onSelectModel={handleOpenModel}
            onSelectVideo={setActiveVideo}
            onToggleSaveVideo={handleToggleSaveVideo}
            onVoteModel={handleVoteModel}
          />
        </div>
      )}

      {/* Clean Minimal Footer */}
      <footer className="mt-auto border-t border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-[1440px] flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 py-6 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} MILF Tube · Editorial Video Hub &amp; Model Directory</p>
          <div className="flex items-center gap-5 font-medium">
            <button
              type="button"
              onClick={handleNavigateVideos}
              className="hover:text-zinc-950 transition-colors"
            >
              Videos
            </button>
            <button
              type="button"
              onClick={handleNavigateModels}
              className="hover:text-zinc-950 transition-colors"
            >
              Model Directory
            </button>
            <button
              type="button"
              onClick={handleNavigateLatest}
              className="hover:text-zinc-950 transition-colors"
            >
              Latest Updates
            </button>
            <button
              type="button"
              onClick={handleNavigateTopRated}
              className="hover:text-zinc-950 transition-colors"
            >
              Top Rated Models
            </button>
          </div>
        </div>
      </footer>

      {/* Interactive Video Player Lightbox */}
      <VideoPlayerModal
        video={activeVideo}
        allVideos={VIDEOS}
        allModels={MODELS}
        votes={votes}
        isSaved={activeVideo ? savedVideoIds.includes(activeVideo.id) : false}
        onClose={() => setActiveVideo(null)}
        onSelectVideo={setActiveVideo}
        onSelectModel={handleOpenModel}
        onSelectTag={handleSelectTagFromPlayer}
        onToggleSave={handleToggleSaveVideo}
        onVoteModel={handleVoteModel}
      />

      {/* Saved Watchlist Drawer */}
      <SavedDrawer
        isOpen={isSavedDrawerOpen}
        savedVideos={savedVideos}
        onClose={() => setIsSavedDrawerOpen(false)}
        onSelectVideo={setActiveVideo}
        onRemoveSaved={handleToggleSaveVideo}
      />
    </div>
  );
}
