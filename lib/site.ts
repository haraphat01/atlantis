// Company facts, navigation, and cross-cutting content for the Atlantic Fortis site.
// Sourced from the approved Website Business and Content Requirements brief.

export const company = {
  legalName: "Atlantic Fortis Inc.",
  name: "Atlantic Fortis",
  tagline: "Independent cybersecurity advisory",
  descriptionShort:
    "Atlantic Fortis is an independent B2B cybersecurity advisory firm. We help organizations understand risk, strengthen governance, meet regulatory requirements, and build resilience.",
  email: "info@atlanticfortis.com",
  regions:
    "Serving clients across North America and Sub-Saharan Africa, with a virtual-first delivery model.",
  canadaFocus:
    "Initial focus on Canada, in Ontario, Alberta, and British Columbia, including the Greater Toronto Area, Ottawa, Kitchener-Waterloo-Hamilton, Calgary, Edmonton, and Vancouver.",
} as const;

export const vision =
  "A future where every organization's data, systems, and people are secure and ready for what's next.";

export const mission =
  "We help organizations manage cyber risk and build lasting resilience through clear, practical, evidence-based guidance.";

export type NavLink = { label: string; href: string };

export const primaryNav: NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "How We Work", href: "/how-we-work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const primaryCta = {
  label: "Request a Consultation",
  href: "/contact",
} as const;

export const supportingCtas: NavLink[] = [
  { label: "Speak With an Advisor", href: "/contact" },
  { label: "Discuss Your Cybersecurity Requirements", href: "/contact" },
  { label: "Request a Cybersecurity Assessment", href: "/contact?interest=assessment" },
  { label: "Explore Our Services", href: "/services" },
  { label: "Contact Atlantic Fortis", href: "/contact" },
];

// Differentiators — used on the home and about pages.
export const differentiators: { title: string; description: string }[] = [
  {
    title: "Genuinely independent",
    description: "No hardware, software, or help desk to sell — advice answers to the client only.",
  },
  {
    title: "Business and risk led",
    description: "Findings connect to business impact and the decisions management actually has to make.",
  },
  {
    title: "Broad assurance coverage",
    description: "Depth across risk, governance, compliance, IT audit, and resilience, not one narrow speciality.",
  },
  {
    title: "Flexible engagement models",
    description: "Fixed-scope projects, retainers, or full program engagements, matched to your needs.",
  },
  {
    title: "Evidence-based delivery",
    description: "Conclusions are backed by documents, interviews, and testing, with clear accountability.",
  },
  {
    title: "Practical and prioritized",
    description: "Recommendations built for prioritization, remediation, and management decision-making.",
  },
];

// Problem-led entry points — used on the home page and the "How We Work" narrative.
export const clientProblems: { problem: string; direction: string; href: string }[] = [
  {
    problem: "We don't know our current cybersecurity maturity.",
    direction: "Maturity assessment, risk assessment, and roadmap development.",
    href: "/services/cybersecurity-risk-advisory",
  },
  {
    problem:
      "A customer, auditor, or regulator is asking us to demonstrate stronger security.",
    direction: "Compliance readiness, control assurance, governance, and risk assessment.",
    href: "/services/regulatory-framework-compliance",
  },
  {
    problem: "We need SOC 2, ISO 27001, NIST, PCI DSS, or a privacy framework.",
    direction: "Regulatory framework compliance and program development.",
    href: "/services/regulatory-framework-compliance",
  },
  {
    problem: "Our board needs better visibility into cybersecurity risk.",
    direction: "Risk advisory, governance, executive reporting, and cybersecurity strategy.",
    href: "/services/cybersecurity-risk-advisory",
  },
  {
    problem: "Our security policies are incomplete, outdated, or not operational.",
    direction: "Governance, standards, procedures, ISMS, and program development.",
    href: "/services/cybersecurity-governance",
  },
  {
    problem: "We need stronger incident response, disaster recovery, or business continuity.",
    direction: "Operational resilience and continuity services.",
    href: "/services/cybersecurity-operational-resilience",
  },
  {
    problem: "We need an independent review of IT controls.",
    direction: "ITGC review and IT internal audit.",
    href: "/services/it-audit-and-control-assurance",
  },
  {
    problem:
      "We need to assess a cloud environment, supplier, AI system, or new technology initiative.",
    direction: "Cloud, third-party, AI, and threat risk assessments.",
    href: "/services/cybersecurity-risk-advisory",
  },
  {
    problem: "We lack enough internal cybersecurity leadership or specialist capacity.",
    direction: "Advisory retainers, program support, and targeted specialist engagements.",
    href: "/services/cybersecurity-program-development",
  },
  {
    problem: "Employees are a major security risk.",
    direction: "Phishing simulation and role-based security awareness training.",
    href: "/services/security-awareness-training",
  },
];

// Engagement journey — used on the "How We Work" page and summarized on the home page.
export const engagementSteps: { title: string; description: string }[] = [
  {
    title: "Understand the need",
    description: "Your objective, concern, regulatory driver, timeline, and desired outcome.",
  },
  {
    title: "Define scope and approach",
    description: "Service, boundaries, stakeholders, deliverables, and commercial model — agreed before proposal.",
  },
  {
    title: "Gather evidence and context",
    description: "Documents, interviews, walkthroughs, and system or control evaluation.",
  },
  {
    title: "Assess and analyze",
    description: "Risks, gaps, control weaknesses, root causes, and business implications.",
  },
  {
    title: "Validate findings",
    description: "Key facts discussed with your stakeholders to confirm accuracy and shape remediation.",
  },
  {
    title: "Report and prioritize",
    description: "Decision-relevant findings and priorities, with a roadmap or executive briefing where useful.",
  },
  {
    title: "Support improvement",
    description: "Implementation support, recurring advisory, training, or reassessment, as required.",
  },
];

export const deliveryModel =
  "A virtual-first, hybrid model. Advisory work, assessments, and workshops are typically remote. On-site attendance is used for audits, executive workshops, and incident-related work where presence adds value.";

// Frameworks and standards — presented with context, not as a logo wall.
export const frameworks: { name: string; note: string }[] = [
  { name: "ISO/IEC 27001", note: "Information security management system readiness and improvement." },
  { name: "ISO 22301", note: "Business continuity management alignment." },
  { name: "ISO 27701", note: "Privacy information management extension to ISO 27001." },
  { name: "NIST Cybersecurity Framework 2.0", note: "Profile development, gap analysis, and roadmap." },
  { name: "NIST SP 800-53", note: "Control assessment and improvement for higher-assurance environments." },
  { name: "CIS Critical Security Controls", note: "Prioritized, practical control baselines." },
  { name: "SOC 2", note: "Trust Services Criteria readiness ahead of an independent examination." },
  { name: "PCI DSS", note: "Cardholder data environment scoping and compliance readiness." },
  { name: "PIPEDA", note: "Canadian federal privacy compliance support." },
  { name: "GDPR", note: "EU data protection compliance support where applicable." },
  { name: "HIPAA", note: "Protected health information safeguards where applicable." },
  { name: "AI governance frameworks", note: "Governance and management system alignment for AI systems." },
];

// Trust and credibility placeholders — the structure exists even where content is pending.
export const trustSignals: string[] = [
  "Founder and consultant biographies",
  "Professional certifications and credentials",
  "Client testimonials",
  "Case studies and measurable engagement outcomes",
  "Professional memberships and affiliations",
  "Strategic partnerships",
  "Published articles, webinars, and speaking engagements",
];
