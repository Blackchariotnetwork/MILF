import { ArrowLeft } from 'lucide-react';
import { ACCENT_TOKENS, formatCompactNumber } from '../data/catalog';
import { ModelProfile, VideoItem, VoteDirection } from '../types';
import { MediaImage } from './MediaImage';
import { ModelVoteControl } from './ModelVoteControl';
import { VideoCard } from './VideoCard';

interface ModelProfilePageProps {
  model: ModelProfile;
  allModels: ModelProfile[];
  relatedVideos: VideoItem[];
  savedVideoIds: string[];
  votes: Record<string, VoteDirection>;
  onBackToDirectory: () => void;
  onSelectModel: (modelId: string) => void;
  onSelectVideo: (video: VideoItem) => void;
  onToggleSaveVideo: (videoId: string) => void;
  onVoteModel: (modelId: string, direction: 'up' | 'down') => void;
}

export function ModelProfilePage({
  model,
  allModels,
  relatedVideos,
  savedVideoIds,
  votes,
  onBackToDirectory,
  onSelectModel,
  onSelectVideo,
  onToggleSaveVideo,
  onVoteModel,
}: ModelProfilePageProps) {
  const accent = ACCENT_TOKENS[model.accent];
  const userVote = votes[model.id] ?? null;
  const upvotes = model.baseUpvotes + (userVote === 'up' ? 1 : 0);
  const downvotes = model.baseDownvotes + (userVote === 'down' ? 1 : 0);
  const totalViews = relatedVideos.reduce((acc, v) => acc + v.views, 0);

  const otherModels = allModels.filter((m) => m.id !== model.id);

  return (
    <main className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-12">
      {/* Breadcrumb Back Navigation */}
      <div>
        <button
          type="button"
          onClick={onBackToDirectory}
          className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 hover:text-zinc-950 transition-colors focus-visible:outline-none focus-visible:underline"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Back to Model Directory</span>
        </button>
      </div>

      {/* Hero Split: Portrait + Biography & Voting */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
        {/* Left: Editorial Portrait */}
        <div className="lg:col-span-4">
          <div className="h-full overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100">
            <div className={`h-1.5 w-full ${accent.bg}`} aria-hidden="true" />
            <div className="aspect-[3/4] lg:aspect-auto lg:h-[calc(100%-6px)] w-full">
              <MediaImage
                src={model.portraitUrl}
                alt={`${model.name} portrait`}
                fallbackTitle={model.name}
                fallbackType="model"
                accent={model.accent}
                className="h-full w-full object-cover object-top"
              />
            </div>
          </div>
        </div>

        {/* Right: Biography, Profile Details, & Up/Down Arrow Rating */}
        <div className="lg:col-span-8 flex flex-col justify-between gap-6">
          <div className="space-y-5">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-sm text-zinc-500">
                <span className={`font-semibold ${accent.text}`}>{model.specialty}</span>
                <span aria-hidden="true">·</span>
                <span>{model.location}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">Debut {model.debutYear}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">
                  {relatedVideos.length} {relatedVideos.length === 1 ? 'video' : 'videos'}
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">
                  {formatCompactNumber(totalViews)} total views
                </span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 text-balance">
                {model.name}
              </h1>
              <p className="text-base sm:text-lg font-medium text-zinc-700">
                {model.tagline}
              </p>
            </div>

            {/* Biography Copy */}
            <div className="space-y-3 border-t border-zinc-200 pt-5 max-w-3xl">
              <h2 className="font-display text-lg font-bold text-zinc-950">Biography</h2>
              {model.biography.map((paragraph, idx) => (
                <p key={idx} className="text-[15px] leading-relaxed text-zinc-600">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Structured Editorial Facts (Unboxed tabular definitions) */}
            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-zinc-200 pt-5">
              <div>
                <dt className="text-xs font-medium text-zinc-500">Height</dt>
                <dd className="mt-1 font-mono text-sm font-semibold tabular-nums text-zinc-900">
                  {model.stats.height}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-zinc-500">Languages</dt>
                <dd className="mt-1 text-sm font-semibold text-zinc-900">
                  {model.stats.languages}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-zinc-500">Representation</dt>
                <dd className="mt-1 text-sm font-semibold text-zinc-900">
                  {model.stats.agency}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-zinc-500">Signature Style</dt>
                <dd className="mt-1 text-sm font-semibold text-zinc-900">
                  {model.stats.signatureStyle}
                </dd>
              </div>
            </dl>
          </div>

          {/* Interactive Up / Down Arrow Rating Panel */}
          <ModelVoteControl
            modelName={model.name}
            upvotes={upvotes}
            downvotes={downvotes}
            userVote={userVote}
            onVote={(direction) => onVoteModel(model.id, direction)}
            variant="full"
          />
        </div>
      </section>

      {/* Related Video Content */}
      <section className="space-y-5 border-t border-zinc-200 pt-8">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-zinc-950">
              Videos featuring {model.name}
            </h2>
            <p className="text-sm text-zinc-500 mt-0.5">
              Click any thumbnail to launch the interactive theater player.
            </p>
          </div>
          <span className="font-mono text-xs font-semibold tabular-nums text-zinc-500">
            {relatedVideos.length} {relatedVideos.length === 1 ? 'title' : 'titles'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-7">
          {relatedVideos.map((video) => {
            const featuredModels = allModels.filter((m) => video.modelIds.includes(m.id));
            return (
              <VideoCard
                key={video.id}
                video={video}
                models={featuredModels}
                isSaved={savedVideoIds.includes(video.id)}
                onSelectVideo={onSelectVideo}
                onSelectModel={onSelectModel}
                onToggleSave={onToggleSaveVideo}
              />
            );
          })}
        </div>
      </section>

      {/* Discover More Models */}
      <section className="space-y-5 border-t border-zinc-200 pt-8">
        <h2 className="font-display text-xl font-bold tracking-tight text-zinc-950">
          More Models in the Directory
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {otherModels.map((other) => {
            const otherVote = votes[other.id] ?? null;
            const otherScore =
              other.baseUpvotes +
              (otherVote === 'up' ? 1 : 0) -
              (other.baseDownvotes + (otherVote === 'down' ? 1 : 0));

            return (
              <button
                key={other.id}
                type="button"
                onClick={() => onSelectModel(other.id)}
                className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white text-left transition-all hover:border-zinc-300 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007BFF]"
              >
                <div className="aspect-[3/4] w-full overflow-hidden bg-zinc-100">
                  <MediaImage
                    src={other.portraitUrl}
                    alt={other.name}
                    fallbackTitle={other.name}
                    fallbackType="model"
                    accent={other.accent}
                    className="h-full w-full object-cover object-top transition-transform duration-200 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-3 space-y-0.5">
                  <div className="font-display text-sm font-bold text-zinc-950 group-hover:text-[#007BFF] transition-colors truncate">
                    {other.name}
                  </div>
                  <div className="flex items-center justify-between text-xs text-zinc-500">
                    <span className="truncate">{other.location.split('&')[0].trim()}</span>
                    <span className="font-mono tabular-nums font-medium text-zinc-700 shrink-0 ml-1">
                      +{otherScore.toLocaleString()}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </main>
  );
}
