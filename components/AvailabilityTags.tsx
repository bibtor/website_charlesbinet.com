/**
 * Availability status — two quiet pills that sit below the work assets
 * (desktop pile and mobile strip). Panel-toned chips with a small coloured
 * dot so the status reads at a glance without pulling focus from the work.
 */
const TAGS = [
  { label: "Booked until end 2026", dot: "rgba(248,113,113,0.85)" },
  { label: "Open in Jan 2027", dot: "rgba(134,239,172,0.85)" },
];

export function AvailabilityTags({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-1.5 ${className}`}>
      {TAGS.map(({ label, dot }) => (
        <span
          key={label}
          className="inline-flex items-center gap-1.5 text-[13px] leading-none text-white/50 pl-2 pr-2.5 py-1.5 rounded-full"
          style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
        >
          <span
            aria-hidden
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: dot }}
          />
          {label}
        </span>
      ))}
    </div>
  );
}
