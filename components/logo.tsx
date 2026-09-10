// Geometric mark — an angular bastion / shield with a central keep. No wordmark;
// final branding is out of scope, so this themes with `currentColor` and reads
// cleanly at nav size.

export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      role="img"
      aria-label="Atlantic Fortis"
      fill="none"
    >
      <path
        d="M16 2.5 27 6.4v9.1c0 7.6-4.7 12.3-11 14-6.3-1.7-11-6.4-11-14V6.4L16 2.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M16 8.5 21.5 10.5v5c0 4.1-2.4 6.7-5.5 7.6-3.1-.9-5.5-3.5-5.5-7.6v-5L16 8.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        opacity="0.5"
      />
      <path d="M16 12v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
