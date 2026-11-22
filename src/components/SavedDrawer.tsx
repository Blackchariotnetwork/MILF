import { Play, Trash2, X } from 'lucide-react';
import { formatCompactNumber } from '../data/catalog';
import { VideoItem } from '../types';
import { MediaImage } from './MediaImage';

interface SavedDrawerProps {
  isOpen: boolean;
  savedVideos: VideoItem[];
  onClose: () => void;
  onSelectVideo: (video: VideoItem) => void;
  onRemoveSaved: (videoId: string) => void;
}

export function SavedDrawer({
  isOpen,
  savedVideos,
  onClose,
  onSelectVideo,
  onRemoveSaved,
}: SavedDrawerProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-zinc-950/45 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Saved Videos Watchlist"
      onClick={onClose}
    >
      <div
        className="flex h-full w-full max-w-md flex-col bg-white shadow-2xl border-l border-zinc-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pop-spectrum-bar h-1 w-full" aria-hidden="true" />
        <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4">
          <div>
            <h2 className="font-display text-lg font-bold text-zinc-950">Saved Videos</h2>
            <p className="text-xs text-zinc-500 font-mono tabular-nums">
              {savedVideos.length} {savedVideos.length === 1 ? 'item' : 'items'} in your watchlist
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close saved videos drawer"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 text-zinc-700 hover:bg-zinc-100"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {savedVideos.length === 0 ? (
            <div className="py-16 text-center space-y-2">
              <p className="font-display text-base font-bold text-zinc-900">
                Your watchlist is empty
              </p>
              <p className="text-sm text-zinc-500">
                Click the bookmark icon on any video thumbnail to save it for quick playback later.
              </p>
            </div>
          ) : (
            <ul className="space-y-4">
              {savedVideos.map((video) => (
                <li
                  key={video.id}
                  className="flex gap-3 rounded-xl border border-zinc-200 bg-white p-2.5 hover:border-zinc-300 transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => {
                      onSelectVideo(video);
                      onClose();
                    }}
                    className="group relative h-20 w-32 shrink-0 overflow-hidden rounded-lg bg-zinc-100"
                  >
                    <MediaImage
                      src={video.thumbnailUrl}
                      alt={video.title}
                      fallbackTitle={video.title}
                      fallbackType="video"
                      accent={video.accent}
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="h-5 w-5 fill-white text-white" aria-hidden="true" />
                    </span>
                    <span className="absolute bottom-1 right-1 rounded bg-zinc-950/85 px-1 py-0.5 font-mono text-[10px] tabular-nums text-white">
                      {video.duration}
                    </span>
                  </button>

                  <div className="flex flex-1 flex-col justify-between min-w-0">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectVideo(video);
                        onClose();
                      }}
                      className="text-left text-xs font-bold text-zinc-950 line-clamp-2 hover:text-[#D6007E]"
                    >
                      {video.title}
                    </button>

                    <div className="flex items-center justify-between gap-2 text-[11px] text-zinc-500">
                      <span className="truncate font-mono tabular-nums">
                        {video.category} · {formatCompactNumber(video.views)}
                      </span>
                      <button
                        type="button"
                        onClick={() => onRemoveSaved(video.id)}
                        aria-label={`Remove ${video.title} from saved`}
                        className="rounded p-1 text-zinc-400 hover:bg-zinc-100 hover:text-[#D6007E]"
                      >
                        <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
