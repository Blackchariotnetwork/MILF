import { useEffect, useState } from 'react';
import {
  Bookmark,
  Pause,
  Play,
  RotateCcw,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import { ACCENT_TOKENS, formatCompactNumber } from '../data/catalog';
import { ModelProfile, VideoItem, VoteDirection } from '../types';
import { MediaImage } from './MediaImage';
import { ModelVoteControl } from './ModelVoteControl';

interface VideoPlayerModalProps {
  video: VideoItem | null;
  allVideos: VideoItem[];
  allModels: ModelProfile[];
  votes: Record<string, VoteDirection>;
  isSaved: boolean;
  onClose: () => void;
  onSelectVideo: (video: VideoItem) => void;
  onSelectModel: (modelId: string) => void;
  onSelectTag: (tag: string) => void;
  onToggleSave: (videoId: string) => void;
  onVoteModel: (modelId: string, direction: 'up' | 'down') => void;
}

function formatSeconds(totalSeconds: number): string {
  const clamped = Math.max(0, Math.floor(totalSeconds));
  const mins = Math.floor(clamped / 60);
  const secs = clamped % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function VideoPlayerModal({
  video,
  allVideos,
  allModels,
  votes,
  isSaved,
  onClose,
  onSelectVideo,
  onSelectModel,
  onSelectTag,
  onToggleSave,
  onVoteModel,
}: VideoPlayerModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [speed, setSpeed] = useState<1 | 1.5 | 2>(1);
  const [quality, setQuality] = useState<'4K' | '1080p'>('4K');

  useEffect(() => {
    if (!video) return;
    setIsPlaying(true);
    setElapsed(0);
    setQuality(video.resolution);
  }, [video?.id]);

  useEffect(() => {
    if (!video || !isPlaying) return;
    const interval = window.setInterval(() => {
      setElapsed((prev) => {
        const next = prev + speed;
        if (next >= video.durationSeconds) {
          setIsPlaying(false);
          return video.durationSeconds;
        }
        return next;
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [video, isPlaying, speed]);

  useEffect(() => {
    if (!video) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === ' ' && (e.target as HTMLElement)?.tagName !== 'BUTTON') {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [video, onClose]);

  if (!video) return null;

  const featuredModels = allModels.filter((m) => video.modelIds.includes(m.id));
  const relatedVideos = allVideos
    .filter(
      (v) =>
        v.id !== video.id &&
        (v.category === video.category ||
          v.modelIds.some((mid) => video.modelIds.includes(mid)))
    )
    .slice(0, 4);

  const progressPct = Math.min(100, (elapsed / video.durationSeconds) * 100);
  const accent = ACCENT_TOKENS[video.accent];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/75 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
      onClick={onClose}
    >
      <div
        className="relative my-auto w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl border border-zinc-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pop-spectrum-bar h-1 w-full" aria-hidden="true" />

        {/* Top Modal Header */}
        <div className="flex items-center justify-between gap-4 border-b border-zinc-200 px-5 py-3.5">
          <div className="flex items-center gap-2 text-xs text-zinc-500 truncate">
            <span className={`font-semibold ${accent.text}`}>{video.category}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">{quality}</span>
            <span aria-hidden="true">·</span>
            <span>{video.relativeDate}</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onToggleSave(video.id)}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold border transition-colors ${
                isSaved
                  ? 'border-[#EC008C] bg-[#EC008C] text-white'
                  : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400'
              }`}
            >
              <Bookmark className={`h-3.5 w-3.5 ${isSaved ? 'fill-current' : ''}`} aria-hidden="true" />
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close video player"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Interactive 16:9 Video Stage */}
        <div className="relative aspect-video w-full overflow-hidden bg-zinc-950 select-none">
          <MediaImage
            src={video.thumbnailUrl}
            alt={video.title}
            fallbackTitle={video.title}
            fallbackType="video"
            accent={video.accent}
            className={`h-full w-full object-cover transition-opacity duration-300 ${
              isPlaying ? 'animate-cinema-pan opacity-100' : 'opacity-85'
            }`}
          />

          {/* Center click-to-play surface */}
          <button
            type="button"
            onClick={() => {
              if (elapsed >= video.durationSeconds) {
                setElapsed(0);
                setIsPlaying(true);
              } else {
                setIsPlaying((p) => !p);
              }
            }}
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
            className="absolute inset-0 flex items-center justify-center bg-black/15 transition-colors hover:bg-black/25 focus-visible:outline-none"
          >
            {!isPlaying && (
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-zinc-950 shadow-xl transition-transform hover:scale-105">
                {elapsed >= video.durationSeconds ? (
                  <RotateCcw className="h-7 w-7" aria-hidden="true" />
                ) : (
                  <Play className="h-7 w-7 fill-current ml-1" aria-hidden="true" />
                )}
              </span>
            )}
          </button>

          {/* Bottom Controls Bar */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-4 pt-8 pb-3 text-white space-y-2">
            {/* Scrubbable Progress Bar */}
            <input
              type="range"
              min={0}
              max={video.durationSeconds}
              value={Math.floor(elapsed)}
              onChange={(e) => setElapsed(Number(e.target.value))}
              aria-label="Seek video timeline"
              className="w-full h-1.5 cursor-pointer accent-[#EC008C]"
            />

            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    if (elapsed >= video.durationSeconds) {
                      setElapsed(0);
                      setIsPlaying(true);
                    } else {
                      setIsPlaying((p) => !p);
                    }
                  }}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                  className="rounded-md p-1.5 hover:bg-white/15"
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4 fill-current" aria-hidden="true" />
                  ) : (
                    <Play className="h-4 w-4 fill-current" aria-hidden="true" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setIsMuted((m) => !m)}
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                  className="rounded-md p-1.5 hover:bg-white/15"
                >
                  {isMuted ? (
                    <VolumeX className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Volume2 className="h-4 w-4" aria-hidden="true" />
                  )}
                </button>

                <span className="font-mono text-xs tabular-nums text-white/90">
                  {formatSeconds(elapsed)} / {video.duration}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setSpeed((s) => (s === 1 ? 1.5 : s === 1.5 ? 2 : 1))
                  }
                  className="rounded bg-white/15 px-2 py-1 font-mono text-xs font-semibold tabular-nums hover:bg-white/25"
                  title="Playback speed"
                >
                  {speed}x
                </button>
                <button
                  type="button"
                  onClick={() => setQuality((q) => (q === '4K' ? '1080p' : '4K'))}
                  className="rounded bg-white/15 px-2 py-1 font-mono text-xs font-semibold hover:bg-white/25"
                  title="Switch stream resolution"
                >
                  {quality}
                </button>
              </div>
            </div>
            {/* Hidden progress semantic sync */}
            <span className="sr-only">{Math.round(progressPct)}% watched</span>
          </div>
        </div>

        {/* Details, Featured Models with Inline Rating, & Related Videos */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[48vh] overflow-y-auto">
          <div className="space-y-2">
            <h2
              id="video-modal-title"
              className="font-display text-xl sm:text-2xl font-extrabold text-zinc-950 text-balance"
            >
              {video.title}
            </h2>

            <div className="flex flex-wrap items-center gap-x-2 text-xs text-zinc-500">
              <span className="font-mono tabular-nums font-medium text-zinc-700">
                {formatCompactNumber(video.views)} views
              </span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">
                {formatCompactNumber(video.likes)} likes
              </span>
              <span aria-hidden="true">·</span>
              <span>Published {video.relativeDate}</span>
            </div>

            <p className="text-sm leading-relaxed text-zinc-600 pt-1">
              {video.description}
            </p>

            {/* Interactive Tags (clicking filters main feed) */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2">
              {video.tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    onSelectTag(tag);
                    onClose();
                  }}
                  className="rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-medium text-zinc-700 hover:border-[#007BFF] hover:text-[#0066D6] transition-colors"
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Models Strip with Direct Profile Link & Up/Down Arrows */}
          <div className="border-t border-zinc-200 pt-5 space-y-3">
            <h3 className="text-xs font-bold text-zinc-500">Featured Model{featuredModels.length > 1 ? 's' : ''}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {featuredModels.map((model) => {
                const userVote = votes[model.id] ?? null;
                const upvotes = model.baseUpvotes + (userVote === 'up' ? 1 : 0);
                const downvotes = model.baseDownvotes + (userVote === 'down' ? 1 : 0);
                return (
                  <div
                    key={model.id}
                    className="flex items-center justify-between gap-3 rounded-xl border border-zinc-200 bg-zinc-50/70 p-3"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        onSelectModel(model.id);
                        onClose();
                      }}
                      className="flex items-center gap-3 text-left min-w-0 group"
                    >
                      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100">
                        <MediaImage
                          src={model.portraitUrl}
                          alt={model.name}
                          fallbackTitle={model.name}
                          fallbackType="model"
                          accent={model.accent}
                          className="h-full w-full object-cover object-top"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="font-display text-sm font-bold text-zinc-950 group-hover:text-[#007BFF] truncate">
                          {model.name}
                        </div>
                        <div className="text-xs text-zinc-500 truncate">{model.specialty}</div>
                      </div>
                    </button>

                    <ModelVoteControl
                      modelName={model.name}
                      upvotes={upvotes}
                      downvotes={downvotes}
                      userVote={userVote}
                      onVote={(dir) => onVoteModel(model.id, dir)}
                      variant="compact"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Related Videos Row */}
          {relatedVideos.length > 0 && (
            <div className="border-t border-zinc-200 pt-5 space-y-3">
              <h3 className="text-xs font-bold text-zinc-500">Up Next</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {relatedVideos.map((rel) => (
                  <button
                    key={rel.id}
                    type="button"
                    onClick={() => onSelectVideo(rel)}
                    className="group text-left space-y-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EC008C] rounded-lg"
                  >
                    <div className="relative aspect-video overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100">
                      <MediaImage
                        src={rel.thumbnailUrl}
                        alt={rel.title}
                        fallbackTitle={rel.title}
                        fallbackType="video"
                        accent={rel.accent}
                        className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                      />
                      <span className="absolute bottom-1 right-1 rounded bg-zinc-950/85 px-1 py-0.5 font-mono text-[10px] tabular-nums text-white">
                        {rel.duration}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-zinc-900 line-clamp-2 group-hover:text-[#D6007E]">
                      {rel.title}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
