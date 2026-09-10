// The seven primary service categories. Each explains the business problem,
// what Atlantic Fortis does, the service areas within it, and typical outcomes.

export type Service = {
  slug: string;
  title: string;
  summary: string; // short line used in cards and the services overview
  problem: string; // the client concern this category answers
  whatWeDo: string;
  serviceAreas: string[];
  outcomes: string[];
};

export const services: Service[] = [
  {
    slug: "cybersecurity-risk-advisory",
    title: "Cybersecurity Risk Advisory",
    summary:
      "Gain a clear view of your cyber risks through maturity, threat, cloud, AI, and third-party assessments — turning complex findings into practical priorities.",
    problem:
      "You need to understand where you stand, what could affect the business, and what to address first — before a customer, regulator, or incident forces the question.",
    whatWeDo:
      "We help you identify, understand, prioritize, and manage the cybersecurity risks that could affect business objectives, technology, data, customers, or regulatory obligations. Findings are connected to business impact and management decisions, not left as a technical list.",
    serviceAreas: [
      "Cybersecurity Maturity Assessment",
      "Cybersecurity Risk Assessment",
      "Threat Risk Assessment",
      "Cloud Security Risk Assessment",
      "AI Security Risk Assessment",
      "Regulatory Gap Assessment",
      "Third-Party Risk Assessment",
    ],
    outcomes: [
      "Maturity baseline and risk register",
      "Prioritized findings and gap register",
      "Threat scenarios relevant to your environment",
      "Risk treatment plan and remediation roadmap",
      "Management briefing for board and executive audiences",
    ],
  },
  {
    slug: "cybersecurity-governance",
    title: "Cybersecurity Governance",
    summary:
      "Build a strong foundation with clear security policies, defined responsibilities, privacy governance, and practical continuity and disaster recovery plans.",
    problem:
      "You have some policies, but they are incomplete, outdated, or not actually followed — and it is not always clear who owns which decision.",
    whatWeDo:
      "We translate risk, business requirements, and regulatory obligations into approved policies, standards, responsibilities, and repeatable operating practices. Governance here means clear ownership, decision rights, control expectations, exception processes, and review cycles — not just documents.",
    serviceAreas: [
      "Security Policy Development",
      "Data Privacy Governance (PIPEDA, GDPR, HIPAA where applicable)",
      "Security Standards and Procedures",
      "Disaster Recovery Planning",
      "Business Continuity Planning",
    ],
    outcomes: [
      "Approved, coherent policy set mapped to your risks",
      "Defined roles, decision rights, and exception process",
      "Operational standards and procedures teams can follow",
      "Tested disaster recovery and business continuity plans",
      "Review calendar so governance stays current",
    ],
  },
  {
    slug: "cybersecurity-operational-resilience",
    title: "Cybersecurity Operational Resilience",
    summary:
      "Prepare for, respond to, and recover from cyber threats with expert guidance across incident response, threat intelligence, identity, cloud, endpoint, network, and data security.",
    problem:
      "You need to reduce exposure, detect and respond faster, and be confident you can recover when something goes wrong.",
    whatWeDo:
      "We strengthen your ability to prevent, detect, respond to, recover from, and adapt to cybersecurity incidents and operational disruptions — with advice tied to operational outcomes such as reduced attack exposure, stronger detection and response, better access governance, and clearer security operations.",
    serviceAreas: [
      "Cyber Threat Intelligence",
      "Cloud Security",
      "Incident Response",
      "Identity and Access Management",
      "Network, Endpoint, and Device Security",
      "Incident Response and Digital Forensics",
      "Emerging Technology and AI Security",
      "Data Loss Prevention",
      "Security Operations Advisory",
    ],
    outcomes: [
      "Reduced attack surface and clearer control coverage",
      "Improved detection and response capability",
      "Stronger identity and access governance",
      "Tested incident response and recovery readiness",
      "A practical security operations improvement plan",
    ],
  },
  {
    slug: "regulatory-framework-compliance",
    title: "Regulatory Framework Compliance",
    summary:
      "Navigate cybersecurity and privacy requirements with confidence. We help you prepare for and align with ISO, NIST, SOC 2, PCI DSS, PIPEDA, GDPR, and other frameworks.",
    problem:
      "A framework, certification, or attestation is now a requirement to win or keep business — and you need to know your gaps before an external party looks.",
    whatWeDo:
      "We assess your current controls, identify gaps, prepare you for external assurance or certification activities, and improve alignment with the frameworks that apply to you. Atlantic Fortis supports assessment, readiness, implementation, advisory, and control improvement — we do not issue certifications where an accredited body or independent attestation provider is required.",
    serviceAreas: [
      "ISO/IEC 27001",
      "ISO 22301 Business Continuity",
      "ISO 27701 Privacy",
      "NIST Cybersecurity Framework 2.0",
      "NIST SP 800-53",
      "CIS Critical Security Controls",
      "SOC 2 Readiness",
      "PCI DSS Compliance Readiness",
      "HIPAA Compliance Support",
      "GDPR Compliance Support",
      "PIPEDA Compliance Support",
      "AI Governance Framework Compliance",
    ],
    outcomes: [
      "Control assessment against the target framework",
      "Prioritized gap remediation plan",
      "Evidence and documentation ready for external review",
      "Support through the certification or attestation process",
      "Sustained alignment after the first milestone",
    ],
  },
  {
    slug: "it-audit-and-control-assurance",
    title: "IT Audit and Control Assurance",
    summary:
      "Understand whether your technology controls are working as intended through independent IT General Controls reviews and risk-based internal audits.",
    problem:
      "You — or your auditors, board, or customers — need independent evidence that IT controls are designed well and operating effectively.",
    whatWeDo:
      "We provide independent, evidence-based assessment of technology controls, governance, risk management, and control effectiveness. Typical areas include access management, change management, computer operations, backup and recovery, development controls, interfaces, key reports, and service organization controls.",
    serviceAreas: ["IT General Controls Review", "IT Internal Audit"],
    outcomes: [
      "Independent view of control design and operating effectiveness",
      "Tested findings with supporting evidence",
      "Practical, prioritized remediation recommendations",
      "Assurance output suitable for audit committees and third parties",
    ],
  },
  {
    slug: "cybersecurity-program-development",
    title: "Cybersecurity Program Development",
    summary:
      "Turn security goals into action with tailored strategies, multi-year roadmaps, and structured information security and AI management programs.",
    problem:
      "You have run individual projects and written individual documents, but you do not yet have a sustainable, managed cybersecurity capability.",
    whatWeDo:
      "We help you build lasting cybersecurity management capability rather than relying on one-time documents or isolated projects — establishing governance structures, management processes, a target operating model, prioritized initiatives, metrics, ownership, and an implementation roadmap.",
    serviceAreas: [
      "Information Security Management System Development",
      "AI Management System Development",
      "Cybersecurity Strategy and Roadmap",
    ],
    outcomes: [
      "Governance structure, policies, and registers",
      "Operating calendar and management processes",
      "Target operating model and prioritized initiatives",
      "Metrics, ownership, and an implementation roadmap",
      "A multi-year cybersecurity strategy leadership can stand behind",
    ],
  },
  {
    slug: "security-awareness-training",
    title: "Security Awareness Training",
    summary:
      "Strengthen your human line of defence through role-based training and ethical phishing simulations that help employees recognize and respond to real-world threats.",
    problem:
      "People are one of your largest sources of risk, and generic annual training is not changing behaviour.",
    whatWeDo:
      "We reduce human-related cybersecurity risk and improve workforce security knowledge through measurable, role-relevant learning. Training is positioned around behaviour improvement and practical competence, and can be adapted for executives, technology teams, privileged users, finance teams, developers, and other higher-risk groups.",
    serviceAreas: ["Phishing Simulation", "Targeted Role-Based Security Training"],
    outcomes: [
      "Baseline and trend data on phishing susceptibility",
      "Role-based training mapped to real job risk",
      "Measurable improvement in reporting and response behaviour",
      "A repeatable awareness program, not a one-off campaign",
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
