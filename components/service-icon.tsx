import {
  Radar,
  Scale,
  ShieldAlert,
  BadgeCheck,
  FileSearch,
  Route,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";

const map: Record<string, LucideIcon> = {
  "cybersecurity-risk-advisory": Radar,
  "cybersecurity-governance": Scale,
  "cybersecurity-operational-resilience": ShieldAlert,
  "regulatory-framework-compliance": BadgeCheck,
  "it-audit-and-control-assurance": FileSearch,
  "cybersecurity-program-development": Route,
  "security-awareness-training": GraduationCap,
};

export function ServiceIcon({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const Icon = map[slug] ?? Radar;
  return <Icon className={cn("h-5 w-5", className)} aria-hidden strokeWidth={1.75} />;
}
