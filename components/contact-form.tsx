"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { submitConsultation } from "@/app/actions";
import {
  interestOptions,
  orgSizeOptions,
  contactMethodOptions,
  type ConsultationState,
} from "@/lib/contact";
import { Button } from "@/components/button";
import { cn } from "@/lib/cn";

const initialState: ConsultationState = { status: "idle", message: "" };

function fieldClasses(hasError?: boolean) {
  return cn(
    "mt-1.5 block w-full rounded-xl border bg-surface px-3.5 py-2.5 text-sm text-ink outline-none transition-[border-color,box-shadow] placeholder:text-ink-faint",
    "focus:border-accent focus:ring-4 focus:ring-accent/12",
    hasError ? "border-red-400" : "border-line-strong",
  );
}

function Label({
  htmlFor,
  children,
  optional,
}: {
  htmlFor: string;
  children: React.ReactNode;
  optional?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium text-ink">
      {children}
      {optional && <span className="ml-1 font-normal text-ink-faint">(optional)</span>}
    </label>
  );
}

function Err({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1 text-xs text-red-600">{msg}</p>;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          Sending…
        </>
      ) : (
        "Request a Consultation"
      )}
    </Button>
  );
}

export function ContactForm({ defaultInterest }: { defaultInterest?: string }) {
  const [state, formAction] = useActionState(submitConsultation, initialState);
  const errors = state.fieldErrors ?? {};
  const v = state.values ?? {};

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-accent/25 bg-accent-soft p-10 text-center">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-accent/15 text-accent-ink">
          <CheckCircle2 className="h-6 w-6" aria-hidden />
        </span>
        <h2 className="text-xl text-ink">Request received</h2>
        <p className="max-w-sm text-sm leading-6 text-ink-soft">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5" noValidate>
      {state.status === "error" && state.message && (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden />
          {state.message}
        </div>
      )}

      {/* Honeypot */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company_website">Company website</label>
        <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Name</Label>
          <input id="name" name="name" type="text" autoComplete="name" required defaultValue={v.name} className={fieldClasses(!!errors.name)} />
          <Err msg={errors.name} />
        </div>
        <div>
          <Label htmlFor="organization">Organization</Label>
          <input id="organization" name="organization" type="text" autoComplete="organization" required defaultValue={v.organization} className={fieldClasses(!!errors.organization)} />
          <Err msg={errors.organization} />
        </div>
        <div>
          <Label htmlFor="email">Business email</Label>
          <input id="email" name="email" type="email" autoComplete="email" required defaultValue={v.email} className={fieldClasses(!!errors.email)} />
          <Err msg={errors.email} />
        </div>
        <div>
          <Label htmlFor="phone" optional>Phone</Label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" defaultValue={v.phone} className={fieldClasses(!!errors.phone)} />
          <Err msg={errors.phone} />
        </div>
        <div>
          <Label htmlFor="jobTitle" optional>Job title</Label>
          <input id="jobTitle" name="jobTitle" type="text" autoComplete="organization-title" defaultValue={v.jobTitle} className={fieldClasses(!!errors.jobTitle)} />
          <Err msg={errors.jobTitle} />
        </div>
        <div>
          <Label htmlFor="orgSize" optional>Organization size</Label>
          <select id="orgSize" name="orgSize" defaultValue={v.orgSize ?? ""} className={fieldClasses(!!errors.orgSize)}>
            <option value="">Select…</option>
            {orgSizeOptions.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
          <Err msg={errors.orgSize} />
        </div>
      </div>

      <div>
        <Label htmlFor="interest">Service or area of interest</Label>
        <select id="interest" name="interest" defaultValue={v.interest ?? defaultInterest ?? ""} className={fieldClasses(!!errors.interest)}>
          <option value="">Select…</option>
          {interestOptions.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <Err msg={errors.interest} />
      </div>

      <div>
        <Label htmlFor="message">Brief description of your requirement</Label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          defaultValue={v.message}
          placeholder="What's prompting the review, what outcome you're after, any timeline or regulatory driver…"
          className={fieldClasses(!!errors.message)}
        />
        <Err msg={errors.message} />
      </div>

      <fieldset>
        <legend className="text-sm font-medium text-ink">
          Preferred contact method <span className="font-normal text-ink-faint">(optional)</span>
        </legend>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {contactMethodOptions.map((o) => (
            <label
              key={o}
              className="flex cursor-pointer items-center gap-2 rounded-full border border-line-strong px-3.5 py-1.5 text-sm text-ink-soft transition-colors has-[:checked]:border-accent has-[:checked]:bg-accent-soft has-[:checked]:text-ink"
            >
              <input type="radio" name="preferredContact" value={o} defaultChecked={v.preferredContact === o} className="accent-accent" />
              {o}
            </label>
          ))}
        </div>
      </fieldset>

      <p className="text-xs leading-5 text-ink-faint">
        We use your details only to respond to this enquiry. Please don&apos;t include
        confidential or sensitive information in this form.
      </p>

      <SubmitButton />
    </form>
  );
}
