import { Bookmark, Play } from 'lucide-react';
import { ACCENT_TOKENS, formatCompactNumber } from '../data/catalog';
import { ModelProfile, VideoItem } from '../types';
import { MediaImage } from './MediaImage';

interface VideoCardProps {
  video: VideoItem;
  models: ModelProfile[];
  isSaved: boolean;
  onSelectVideo: (video: VideoItem) => void;
  onSelectModel: (modelId: string) => void;
  onToggleSave: (videoId: string) => void;
}

export function VideoCard({
  video,
  models,
  isSaved,
  onSelectVideo,
  onSelectModel,
  onToggleSave,
}: VideoCardProps) {
  const accent = ACCENT_TOKENS[video.accent];

  return (
    <article className="group flex flex-col">
      {/* Thumbnail container */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-zinc-200/90 bg-zinc-100">
        <button
          type="button"
          onClick={() => onSelectVideo(video)}
          aria-label={`Play ${video.title}`}
          className="block h-full w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EC008C]"
        >
          <MediaImage
            src={video.thumbnailUrl}
            alt={video.title}
            fallbackTitle={video.title}
            fallbackType="video"
            accent={video.accent}
            className="h-full w-full object-cover transition-transform duration-200 ease-out group-hover:scale-[1.04]"
          />

          {/* Subtle bottom scrim for duration & play cue */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-70 transition-opacity duration-200 group-hover:opacity-90"
            aria-hidden="true"
          />

          {/* Center play affordance on hover */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-zinc-950 shadow-md">
              <Play className="h-5 w-5 fill-current ml-0.5" aria-hidden="true" />
            </span>
          </div>

          {/* Crisp duration + resolution readout */}
          <span className="pointer-events-none absolute bottom-2 right-2 rounded bg-zinc-950/85 px-1.5 py-0.5 font-mono text-[11px] font-medium tabular-nums text-white">
            {video.duration}
          </span>

          {/* Thin colorful bottom hover bar */}
          <span
            className={`pointer-events-none absolute bottom-0 left-0 right-0 h-[3px] ${accent.bg} scale-x-0 origin-left transition-transform duration-200 group-hover:scale-x-100`}
            aria-hidden="true"
          />
        </button>

        {/* Save / Bookmark button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(video.id);
          }}
          aria-label={isSaved ? `Remove ${video.title} from saved` : `Save ${video.title}`}
          aria-pressed={isSaved}
          title={isSaved ? 'Remove from Saved' : 'Save video'}
          className={`absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EC008C] ${
            isSaved
              ? 'bg-[#EC008C] text-white opacity-100'
              : 'bg-white/90 text-zinc-800 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 hover:bg-white'
          }`}
        >
          <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} aria-hidden="true" />
        </button>
      </div>

      {/* Text metadata (Zero-Pill Discipline: unboxed typography with clean separators) */}
      <div className="mt-2.5 flex flex-col gap-1">
        <button
          type="button"
          onClick={() => onSelectVideo(video)}
          className="text-left font-display text-[15px] font-bold leading-snug text-zinc-950 line-clamp-2 transition-colors hover:text-[#D6007E] focus-visible:outline-none focus-visible:underline"
        >
          {video.title}
        </button>

        {/* Clickable model link(s) */}
        <div className="flex flex-wrap items-center gap-x-1.5 text-xs font-semibold">
          {models.map((model, idx) => (
            <span key={model.id} className="inline-flex items-center">
              <button
                type="button"
                onClick={() => onSelectModel(model.id)}
                className={`${ACCENT_TOKENS[model.accent].text} hover:underline focus-visible:outline-none focus-visible:underline`}
              >
                {model.name}
              </button>
              {idx < models.length - 1 && (
                <span className="ml-1.5 text-zinc-400" aria-hidden="true">
                  &amp;
                </span>
              )}
            </span>
          ))}
        </div>

        {/* Clean unboxed metadata row */}
        <div className="flex flex-wrap items-center gap-x-1.5 text-xs text-zinc-500">
          <span>{video.category}</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono tabular-nums">{formatCompactNumber(video.views)} views</span>
          <span aria-hidden="true">·</span>
          <span>{video.relativeDate}</span>
        </div>
      </div>
    </article>
  );
}
