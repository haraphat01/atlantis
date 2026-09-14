/*
  A small set of custom marks for the seven service categories — drawn in
  one stroke weight so they read as a single family, echoing the angular
  bastion in the logo rather than borrowing a generic icon library's style.
*/

type IconProps = { className?: string };

const shared = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function ScopeMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...shared}>
      <circle cx="12" cy="12" r="7" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
      <path d="M12 2v3.4M12 18.6V22M2 12h3.4M18.6 12H22" />
    </svg>
  );
}

export function BalanceMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...shared}>
      <path d="M12 3v16" />
      <path d="M9 20h6" />
      <path d="M4 7h16" />
      <path d="M4 7 1.5 12.5a2.7 2.7 0 0 0 5 0Z" />
      <path d="M20 7l-2.5 5.5a2.7 2.7 0 0 0 5 0Z" />
    </svg>
  );
}

export function PulseShieldMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...shared}>
      <path d="M12 2.5 19.5 5.5V11.5C19.5 17 16.1 20.4 12 21.5 7.9 20.4 4.5 17 4.5 11.5V5.5Z" />
      <path d="M7 12.5H9.5L11 9.5L13.5 15.5L15 12.5H17" />
    </svg>
  );
}

export function StampMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...shared}>
      <circle cx="12" cy="9.5" r="6.5" />
      <path d="M9.2 9.6 11 11.4l3.8-4" />
      <path d="M8.6 15.2 6.2 21l5.8-2.6 5.8 2.6-2.4-5.8" />
    </svg>
  );
}

export function LoupeLedgerMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...shared}>
      <circle cx="10" cy="10" r="6.25" />
      <path d="M7.5 8.25h5M7.5 11.25h3.5" />
      <path d="M14.5 14.5 20.5 20.5" />
    </svg>
  );
}

export function RoadmapMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...shared}>
      <path d="M3 20h4v-4.2h4V11h4V6.8h3.2" />
      <circle cx="20.5" cy="4.5" r="1.85" />
    </svg>
  );
}

export function CapMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...shared}>
      <path d="M12 4 2.5 9 12 14l9.5-5Z" />
      <path d="M6.5 11.3V16c0 1.66 2.46 3 5.5 3s5.5-1.34 5.5-3v-4.7" />
      <path d="M21.5 9v6" />
      <circle cx="21.5" cy="16.2" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
