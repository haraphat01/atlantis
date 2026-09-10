import type { ReactNode } from "react";

/**
 * Marquee — seamless horizontal loop. Children are rendered twice; the track
 * translates -50% so the second copy takes over without a seam. Pauses on hover.
 */
export function Marquee({ children }: { children: ReactNode }) {
  return (
    <div className="group relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
      <div className="flex shrink-0 animate-marquee items-center gap-4 pr-4 group-hover:[animation-play-state:paused]">
        {children}
      </div>
      <div
        aria-hidden
        className="flex shrink-0 animate-marquee items-center gap-4 pr-4 group-hover:[animation-play-state:paused]"
      >
        {children}
      </div>
    </div>
  );
}
