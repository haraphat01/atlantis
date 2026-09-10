"use server";

import {
  parseConsultation,
  isLikelyFreeEmail,
  type ConsultationState,
} from "@/lib/contact";
import { isEmailConfigured, sendConsultationEmail } from "@/lib/email";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function submitConsultation(
  _prev: ConsultationState,
  formData: FormData,
): Promise<ConsultationState> {
  // Honeypot — bots fill hidden fields, humans don't.
  if ((formData.get("company_website") ?? "").toString().trim() !== "") {
    return { status: "success", message: "Thank you — your request has been received." };
  }

  const { values, errors } = parseConsultation(formData);

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please correct the highlighted fields and try again.",
      fieldErrors: errors,
      values,
    };
  }

  const rows: [string, string][] = [
    ["Name", values.name],
    ["Organization", values.organization],
    ["Email", values.email],
    ["Phone", values.phone || "—"],
    ["Job title", values.jobTitle || "—"],
    ["Organization size", values.orgSize || "—"],
    ["Area of interest", values.interest || "—"],
    ["Preferred contact", values.preferredContact || "—"],
    ["Business email?", isLikelyFreeEmail(values.email) ? "No (personal domain)" : "Yes"],
  ];

  const text = [
    "New consultation request from the Atlantic Fortis website",
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Requirement:",
    values.message,
  ].join("\n");

  const html = `
    <h2 style="margin:0 0 16px;font:600 18px system-ui,sans-serif">New consultation request</h2>
    <table style="border-collapse:collapse;font:14px system-ui,sans-serif">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:4px 16px 4px 0;color:#475569">${escapeHtml(
              k,
            )}</td><td style="padding:4px 0">${escapeHtml(v)}</td></tr>`,
        )
        .join("")}
    </table>
    <p style="margin:16px 0 4px;color:#475569;font:14px system-ui,sans-serif">Requirement</p>
    <p style="margin:0;white-space:pre-wrap;font:14px system-ui,sans-serif">${escapeHtml(
      values.message,
    )}</p>
  `;

  if (!isEmailConfigured()) {
    // Keep the lead visible in server logs until email delivery is configured.
    console.warn(
      "[contact] Email delivery is not configured (missing HOSTINGER_EMAIL_TOKEN / HOSTINGER_MAILBOX_RESOURCE_ID / CONTACT_TO_EMAIL). Submission:\n" +
        text,
    );
    return {
      status: "success",
      message:
        "Thank you — your request has been received. An advisor will be in touch shortly.",
    };
  }

  const result = await sendConsultationEmail({
    subject: `Consultation request — ${values.organization}`,
    text,
    html,
    replyTo: values.email,
  });

  if (!result.ok) {
    console.error("[contact] Failed to send enquiry:", result);
    return {
      status: "error",
      message:
        "Something went wrong sending your request. Please email info@atlanticfortis.com directly and we'll respond promptly.",
      values,
    };
  }

  return {
    status: "success",
    message:
      "Thank you — your request has been received. An advisor will be in touch shortly.",
  };
}
