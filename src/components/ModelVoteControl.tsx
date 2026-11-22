import { ArrowDown, ArrowUp } from 'lucide-react';
import { VoteDirection } from '../types';

interface ModelVoteControlProps {
  modelName: string;
  upvotes: number;
  downvotes: number;
  userVote: VoteDirection;
  onVote: (direction: 'up' | 'down') => void;
  variant?: 'compact' | 'full';
}

export function ModelVoteControl({
  modelName,
  upvotes,
  downvotes,
  userVote,
  onVote,
  variant = 'compact',
}: ModelVoteControlProps) {
  const netScore = upvotes - downvotes;
  const totalVotes = upvotes + downvotes;
  const approvalRate = totalVotes > 0 ? Math.round((upvotes / totalVotes) * 100) : 100;

  if (variant === 'compact') {
    return (
      <div
        className="inline-flex items-center gap-1 rounded-lg border border-zinc-200 bg-zinc-50 p-1"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => onVote('up')}
          aria-label={`Upvote ${modelName}`}
          aria-pressed={userVote === 'up'}
          title="Upvote model"
          className={`inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#65A30D] ${
            userVote === 'up'
              ? 'bg-[#65A30D] text-white'
              : 'bg-white text-zinc-700 hover:bg-[#7AC943]/20 hover:text-[#4D7C0F]'
          }`}
        >
          <ArrowUp className="h-4 w-4 stroke-[2.5]" aria-hidden="true" />
        </button>

        <span
          className="min-w-[3.25rem] px-1.5 text-center font-mono text-xs font-semibold tabular-nums text-zinc-900"
          title={`${upvotes} upvotes · ${downvotes} downvotes (${approvalRate}% approval)`}
        >
          {netScore >= 0 ? `+${netScore.toLocaleString()}` : netScore.toLocaleString()}
        </span>

        <button
          type="button"
          onClick={() => onVote('down')}
          aria-label={`Downvote ${modelName}`}
          aria-pressed={userVote === 'down'}
          title="Downvote model"
          className={`inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EC008C] ${
            userVote === 'down'
              ? 'bg-[#EC008C] text-white'
              : 'bg-white text-zinc-700 hover:bg-[#EC008C]/15 hover:text-[#D6007E]'
          }`}
        >
          <ArrowDown className="h-4 w-4 stroke-[2.5]" aria-hidden="true" />
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-zinc-200 bg-zinc-50/80 p-5 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-zinc-900">Community Model Rating</h3>
          <p className="text-xs text-zinc-500 mt-0.5">
            Rate {modelName} using the up and down arrows below.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onVote('up')}
            aria-label={`Upvote ${modelName}`}
            aria-pressed={userVote === 'up'}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold whitespace-nowrap shrink-0 border transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#65A30D] ${
              userVote === 'up'
                ? 'border-[#65A30D] bg-[#65A30D] text-white'
                : 'border-zinc-200 bg-white text-zinc-800 hover:border-[#65A30D] hover:text-[#4D7C0F]'
            }`}
          >
            <ArrowUp className="h-4 w-4 stroke-[2.5]" aria-hidden="true" />
            <span>{userVote === 'up' ? 'Upvoted' : 'Upvote'}</span>
            <span className="font-mono text-xs tabular-nums opacity-90">
              {upvotes.toLocaleString()}
            </span>
          </button>

          <button
            type="button"
            onClick={() => onVote('down')}
            aria-label={`Downvote ${modelName}`}
            aria-pressed={userVote === 'down'}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold whitespace-nowrap shrink-0 border transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EC008C] ${
              userVote === 'down'
                ? 'border-[#EC008C] bg-[#EC008C] text-white'
                : 'border-zinc-200 bg-white text-zinc-800 hover:border-[#EC008C] hover:text-[#D6007E]'
            }`}
          >
            <ArrowDown className="h-4 w-4 stroke-[2.5]" aria-hidden="true" />
            <span>{userVote === 'down' ? 'Downvoted' : 'Downvote'}</span>
            <span className="font-mono text-xs tabular-nums opacity-90">
              {downvotes.toLocaleString()}
            </span>
          </button>
        </div>
      </div>

      {/* Explicit approval readout & visual ratio bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs text-zinc-600">
          <span className="font-medium">
            Approval: <strong className="font-mono tabular-nums text-zinc-950">{approvalRate}%</strong>
          </span>
          <span className="font-mono tabular-nums text-zinc-600">
            Net Score:{' '}
            <strong className="text-zinc-950">
              {netScore >= 0 ? `+${netScore.toLocaleString()}` : netScore.toLocaleString()}
            </strong>
          </span>
        </div>
        <div
          className="h-2 w-full overflow-hidden rounded-full bg-[#EC008C]/25"
          role="progressbar"
          aria-valuenow={approvalRate}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${approvalRate}% positive rating`}
        >
          <div
            className="h-full bg-[#65A30D] transition-all duration-200"
            style={{ width: `${approvalRate}%` }}
          />
        </div>
      </div>
    </div>
  );
}
