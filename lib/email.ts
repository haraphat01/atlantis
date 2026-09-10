// Sends the consultation enquiry through the Hostinger Email API.
//
// This talks to the same API surfaced by the Hostinger email tooling, but a
// deployed server needs its own credentials — configure these environment
// variables (see .env.example):
//
//   HOSTINGER_EMAIL_TOKEN         Bearer token authorized for the mailbox
//   HOSTINGER_MAILBOX_RESOURCE_ID Resource id of the sending mailbox (GET /api/v1/me)
//   CONTACT_TO_EMAIL             Where enquiries are delivered (e.g. info@atlanticfortis.com)
//   CONTACT_FROM_DISPLAY_NAME    Optional display name on the outgoing message
//
// Note: the sending mailbox belongs to whatever domain the token is issued for.
// Ideally that is an atlanticfortis.com mailbox so replies and SPF/DKIM line up;
// if it is a different domain, deliverability may suffer and the visitor's
// address is still set as Reply-To so the team can respond directly.

const API_BASE = "https://api.mail.hostinger.com";

export type EmailPayload = {
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
};

export type EmailResult =
  | { ok: true }
  | { ok: false; reason: "not_configured" | "send_failed"; detail?: string };

export function isEmailConfigured(): boolean {
  return Boolean(
    process.env.HOSTINGER_EMAIL_TOKEN &&
      process.env.HOSTINGER_MAILBOX_RESOURCE_ID &&
      process.env.CONTACT_TO_EMAIL,
  );
}

export async function sendConsultationEmail(
  payload: EmailPayload,
): Promise<EmailResult> {
  const token = process.env.HOSTINGER_EMAIL_TOKEN;
  const mailbox = process.env.HOSTINGER_MAILBOX_RESOURCE_ID;
  const to = process.env.CONTACT_TO_EMAIL;
  const displayName = process.env.CONTACT_FROM_DISPLAY_NAME || "Atlantic Fortis Website";

  if (!token || !mailbox || !to) {
    return { ok: false, reason: "not_configured" };
  }

  const body: Record<string, unknown> = {
    to: [to],
    subject: payload.subject,
    text: payload.text,
    html: payload.html,
    displayName,
  };
  // The Hostinger send endpoint does not expose a dedicated replyTo field, so we
  // add it as a header.
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  try {
    const res = await fetch(
      `${API_BASE}/api/v1/mailboxes/${encodeURIComponent(mailbox)}/send`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(
          payload.replyTo
            ? { ...body, headers: { "Reply-To": payload.replyTo } }
            : body,
        ),
        // Never cache a side-effecting request.
        cache: "no-store",
      },
    );

    if (res.status === 204 || res.ok) {
      return { ok: true };
    }

    const detail = await res.text().catch(() => "");
    return { ok: false, reason: "send_failed", detail: `${res.status} ${detail}`.trim() };
  } catch (err) {
    return {
      ok: false,
      reason: "send_failed",
      detail: err instanceof Error ? err.message : "unknown error",
    };
  }
}
