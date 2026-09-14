import {
  ScopeMark,
  BalanceMark,
  PulseShieldMark,
  StampMark,
  LoupeLedgerMark,
  RoadmapMark,
  CapMark,
} from "@/components/icons";
import { cn } from "@/lib/cn";

const map: Record<
  string,
  { Mark: (props: { className?: string }) => React.JSX.Element; tone: "accent" | "teal" | "pink" | "amber" }
> = {
  "cybersecurity-risk-advisory": { Mark: ScopeMark, tone: "accent" },
  "cybersecurity-governance": { Mark: BalanceMark, tone: "teal" },
  "cybersecurity-operational-resilience": { Mark: PulseShieldMark, tone: "pink" },
  "regulatory-framework-compliance": { Mark: StampMark, tone: "amber" },
  "it-audit-and-control-assurance": { Mark: LoupeLedgerMark, tone: "accent" },
  "cybersecurity-program-development": { Mark: RoadmapMark, tone: "teal" },
  "security-awareness-training": { Mark: CapMark, tone: "pink" },
};

const toneClasses = {
  accent: "bg-accent-soft text-accent",
  teal: "bg-teal-soft text-teal",
  pink: "bg-pink-soft text-pink",
  amber: "bg-amber-soft text-amber",
};

/** The icon, pre-wrapped in its colored rounded chip — the standard way a
 *  service category is presented across cards and lists. */
export function ServiceIconChip({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const entry = map[slug] ?? map["cybersecurity-risk-advisory"];
  const { Mark, tone } = entry;
  return (
    <span
      className={cn(
        "grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl",
        toneClasses[tone],
        className,
      )}
    >
      <Mark className="h-5 w-5" />
    </span>
  );
}
