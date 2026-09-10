// Industry sections. Each describes the common cybersecurity pressures in that
// sector rather than repeating an identical service list.

export type Industry = {
  slug: string;
  name: string;
  summary: string;
  pressures: string[];
  relevantServices: string[]; // slugs from lib/services.ts
};

export const industries: Industry[] = [
  {
    slug: "financial-services-and-fintech",
    name: "Financial Services and FinTech",
    summary:
      "Regulatory oversight, customer trust, and third-party exposure make formal risk management and control assurance a baseline expectation.",
    pressures: [
      "Regulatory oversight and formal control expectations",
      "Third-party and supplier risk across the value chain",
      "Independent control assurance for regulators and partners",
      "Privacy obligations for customer and financial data",
      "Operational resilience and customer trust",
    ],
    relevantServices: [
      "cybersecurity-risk-advisory",
      "regulatory-framework-compliance",
      "it-audit-and-control-assurance",
      "cybersecurity-operational-resilience",
    ],
  },
  {
    slug: "technology-saas-and-cloud",
    name: "Technology, SaaS, and Cloud",
    summary:
      "Enterprise customers, insurers, and investors expect SOC 2 or ISO 27001 and evidence of cloud and third-party assurance before they commit.",
    pressures: [
      "SOC 2 and ISO 27001 expectations from customers and investors",
      "Customer security questionnaires and contractual requirements",
      "Cloud configuration and shared-responsibility risk",
      "Secure growth without slowing the roadmap",
      "Third-party assurance and cybersecurity maturity",
    ],
    relevantServices: [
      "regulatory-framework-compliance",
      "cybersecurity-risk-advisory",
      "cybersecurity-program-development",
      "cybersecurity-operational-resilience",
    ],
  },
  {
    slug: "healthcare-and-life-sciences",
    name: "Healthcare and Life Sciences",
    summary:
      "Sensitive health information, strict privacy requirements, and clinical continuity raise the stakes on access governance and resilience.",
    pressures: [
      "Protection of sensitive health information",
      "Privacy and regulatory readiness",
      "Access governance across clinical and corporate systems",
      "Resilience and continuity of care",
      "Third-party and medical-device supplier risk",
    ],
    relevantServices: [
      "cybersecurity-governance",
      "regulatory-framework-compliance",
      "cybersecurity-risk-advisory",
      "cybersecurity-operational-resilience",
    ],
  },
  {
    slug: "professional-services",
    name: "Professional Services",
    summary:
      "Law firms, accounting practices, and wealth managers hold highly confidential client information and are frequent targets for email compromise.",
    pressures: [
      "Protection of confidential client information",
      "Business email compromise and fraud",
      "Employee-driven risk and phishing exposure",
      "Client and regulatory privacy expectations",
      "Baseline governance and incident preparedness",
    ],
    relevantServices: [
      "cybersecurity-risk-advisory",
      "cybersecurity-governance",
      "security-awareness-training",
      "cybersecurity-operational-resilience",
    ],
  },
  {
    slug: "energy-and-utilities",
    name: "Energy and Utilities",
    summary:
      "Critical infrastructure obligations and the consequences of disruption put operational resilience and supplier assurance at the centre.",
    pressures: [
      "Operational resilience and critical infrastructure risk",
      "Governance and regulatory control frameworks",
      "Incident response for high-consequence environments",
      "Supplier and contractor security",
      "Independent control assurance",
    ],
    relevantServices: [
      "cybersecurity-operational-resilience",
      "cybersecurity-governance",
      "it-audit-and-control-assurance",
      "cybersecurity-risk-advisory",
    ],
  },
  {
    slug: "telecommunications",
    name: "Telecommunications",
    summary:
      "Regulatory obligations and always-on service expectations demand strong identity, network security, and incident management.",
    pressures: [
      "Regulatory obligations and reporting",
      "Service resilience and availability",
      "Identity and network security at scale",
      "Incident management and coordination",
      "Risk governance across a large estate",
    ],
    relevantServices: [
      "cybersecurity-operational-resilience",
      "regulatory-framework-compliance",
      "cybersecurity-risk-advisory",
      "cybersecurity-governance",
    ],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    summary:
      "Operational technology dependencies and supply chain exposure make ransomware and continuity planning a board-level concern.",
    pressures: [
      "Operational technology dependencies",
      "Supply chain and third-party risk",
      "Access control across IT and OT",
      "Ransomware exposure and business continuity",
      "Supplier security requirements",
    ],
    relevantServices: [
      "cybersecurity-risk-advisory",
      "cybersecurity-operational-resilience",
      "cybersecurity-governance",
      "cybersecurity-program-development",
    ],
  },
  {
    slug: "transportation-and-logistics",
    name: "Transportation and Logistics",
    summary:
      "Tightly coupled operations and supplier dependencies mean a cyber disruption quickly becomes an operational one.",
    pressures: [
      "Operational resilience and uptime",
      "Supplier and partner dependencies",
      "Cyber risk across a distributed footprint",
      "Identity and access across sites and systems",
      "Continuity and incident preparedness",
    ],
    relevantServices: [
      "cybersecurity-operational-resilience",
      "cybersecurity-risk-advisory",
      "cybersecurity-governance",
      "cybersecurity-program-development",
    ],
  },
  {
    slug: "government-and-public-sector-supply-chains",
    name: "Government and Public-Sector Supply Chains",
    summary:
      "Selling to government or defence programs brings control-framework obligations, assurance requirements, and formal readiness expectations.",
    pressures: [
      "Prescribed control frameworks and security requirements",
      "Independent assurance and attestation",
      "Risk assessment and regulatory gap analysis",
      "Readiness for government or defence-related obligations",
      "Supply chain security commitments",
    ],
    relevantServices: [
      "regulatory-framework-compliance",
      "it-audit-and-control-assurance",
      "cybersecurity-risk-advisory",
      "cybersecurity-program-development",
    ],
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
