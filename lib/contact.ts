// Shared types and validation for the consultation request form.
// No external dependencies — validation is intentionally small and explicit.

export const interestOptions = [
  "Cybersecurity Risk Advisory",
  "Cybersecurity Governance",
  "Cybersecurity Operational Resilience",
  "Regulatory Framework Compliance",
  "IT Audit and Control Assurance",
  "Cybersecurity Program Development",
  "Security Awareness Training",
  "Not sure yet / general enquiry",
] as const;

export const orgSizeOptions = [
  "1–49 employees",
  "50–250 employees",
  "251–1,000 employees",
  "1,000+ employees",
] as const;

export const contactMethodOptions = ["Email", "Phone", "Either"] as const;

export type ConsultationInput = {
  name: string;
  organization: string;
  email: string;
  phone: string;
  jobTitle: string;
  orgSize: string;
  interest: string;
  message: string;
  preferredContact: string;
};

export type FieldErrors = Partial<Record<keyof ConsultationInput, string>>;

export type ConsultationState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: FieldErrors;
  // Echo back submitted values so the form can repopulate on error.
  values?: Partial<ConsultationInput>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// A short list of common free/personal domains — flagged, not blocked, since the
// brief asks for a *business* email but we should not reject a legitimate lead.
const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "outlook.com",
  "hotmail.com",
  "yahoo.com",
  "icloud.com",
  "aol.com",
  "live.com",
  "proton.me",
  "protonmail.com",
]);

export function isLikelyFreeEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase().trim();
  return domain ? FREE_EMAIL_DOMAINS.has(domain) : false;
}

export function parseConsultation(formData: FormData): {
  values: ConsultationInput;
  errors: FieldErrors;
} {
  const get = (key: string) => (formData.get(key) ?? "").toString().trim();

  const values: ConsultationInput = {
    name: get("name"),
    organization: get("organization"),
    email: get("email"),
    phone: get("phone"),
    jobTitle: get("jobTitle"),
    orgSize: get("orgSize"),
    interest: get("interest"),
    message: get("message"),
    preferredContact: get("preferredContact"),
  };

  const errors: FieldErrors = {};

  if (values.name.length < 2) errors.name = "Please enter your name.";
  if (values.name.length > 120) errors.name = "That name looks too long.";

  if (values.organization.length < 2)
    errors.organization = "Please enter your organization.";
  if (values.organization.length > 160)
    errors.organization = "That organization name looks too long.";

  if (!EMAIL_RE.test(values.email))
    errors.email = "Please enter a valid email address.";
  if (values.email.length > 200) errors.email = "That email looks too long.";

  if (values.phone.length > 40) errors.phone = "That phone number looks too long.";
  if (values.jobTitle.length > 120)
    errors.jobTitle = "That job title looks too long.";

  if (values.interest && !interestOptions.includes(values.interest as never))
    errors.interest = "Please choose an option from the list.";
  if (values.orgSize && !orgSizeOptions.includes(values.orgSize as never))
    errors.orgSize = "Please choose an option from the list.";
  if (
    values.preferredContact &&
    !contactMethodOptions.includes(values.preferredContact as never)
  )
    errors.preferredContact = "Please choose an option from the list.";

  if (values.message.length < 20)
    errors.message =
      "Please give us a sentence or two about your requirement (at least 20 characters).";
  if (values.message.length > 4000)
    errors.message = "Please keep the description under 4,000 characters.";

  return { values, errors };
}
