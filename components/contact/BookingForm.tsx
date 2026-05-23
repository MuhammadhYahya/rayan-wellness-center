'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Clock3, LoaderCircle, Mail, MessageCircle, Send } from 'lucide-react';

import type { Service } from '@/lib/sanity/types';
import { Button } from '@/components/ui/button';

type BookingFormProps = {
  services: Service[];
  initialService?: string;
};

type FormState = {
  fullName: string;
  phone: string;
  email: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
};

const DEFAULT_FORM: FormState = {
  fullName: '',
  phone: '',
  email: '',
  service: '',
  preferredDate: '',
  preferredTime: '',
  message: '',
};

const PHONE_PATTERN = /^[+\d\s()-]{7,}$/;

function normalizeServiceValue(value: string) {
  return decodeURIComponent(value || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
}

export default function BookingForm({
  services,
  initialService = '',
}: BookingFormProps) {
  const serviceOptions = useMemo(
    () =>
      services.map((service) => ({
        label: service.title,
        value: service.slug || service.title,
        normalizedTitle: normalizeServiceValue(service.title),
        normalizedSlug: normalizeServiceValue(service.slug || ''),
      })),
    [services]
  );

  const resolvedInitialService = useMemo(() => {
    const normalized = normalizeServiceValue(initialService);
    const matched = serviceOptions.find(
      (service) =>
        service.normalizedSlug === normalized || service.normalizedTitle === normalized
    );

    return matched?.label ?? '';
  }, [initialService, serviceOptions]);

  const [formState, setFormState] = useState<FormState>({
    ...DEFAULT_FORM,
    service: resolvedInitialService,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const selectedService = formState.service || resolvedInitialService;
  const selectedServiceDetails = useMemo(() => {
    const normalized = normalizeServiceValue(selectedService);

    if (!normalized) {
      return null;
    }

    return (
      services.find(
        (service) =>
          normalizeServiceValue(service.title) === normalized ||
          normalizeServiceValue(service.slug || '') === normalized
      ) ?? null
    );
  }, [selectedService, services]);
  const whatsappMessage = encodeURIComponent(
    `Hi Rayan, I'd like to book a session.\nService: ${selectedService || 'Not selected yet'}\nPreferred date: ${formState.preferredDate || 'Not provided'}\nPreferred time: ${formState.preferredTime || 'Not provided'}\nName: ${formState.fullName || 'Not provided'}\nPhone: ${formState.phone || 'Not provided'}`
  );

  function validate(values: FormState) {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};

    if (!values.fullName.trim()) {
      nextErrors.fullName = 'Please enter your name.';
    }

    if (!values.phone.trim()) {
      nextErrors.phone = 'Please enter your phone number.';
    } else if (!PHONE_PATTERN.test(values.phone.trim())) {
      nextErrors.phone = 'Please enter a valid phone number.';
    }

    if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    if (!values.service.trim()) {
      nextErrors.service = 'Please select a service.';
    }

    if (!values.preferredDate) {
      nextErrors.preferredDate = 'Please choose a preferred date.';
    }

    if (!values.preferredTime) {
      nextErrors.preferredTime = 'Please choose a preferred time.';
    }

    if (!values.message.trim()) {
      nextErrors.message = 'Please share a short message about your request.';
    }

    return nextErrors;
  }

  function handleFieldChange<K extends keyof FormState>(field: K, value: FormState[K]) {
    setFormState((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => {
      if (!current[field]) {
        return current;
      }

      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(formState);
    setErrors(nextErrors);
    setStatus('idle');
    setStatusMessage('');

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setStatus('error');
      setStatusMessage(
        'Web3Forms is not configured yet. Add NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY to enable submissions.'
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `New booking request from ${formState.fullName}`,
          from_name: 'Rayan Wellness Website',
          fullName: formState.fullName,
          phone: formState.phone,
          email: formState.email || 'Not provided',
          service: formState.service,
          preferredDate: formState.preferredDate,
          preferredTime: formState.preferredTime,
          message: formState.message,
          botcheck: '',
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Unable to submit the booking request.');
      }

      setStatus('success');
      setStatusMessage(
        'Your booking request was sent successfully. You can also continue on WhatsApp for more immediate assistance.'
      );
      setFormState({
        ...DEFAULT_FORM,
        service: resolvedInitialService,
      });
      setErrors({});
    } catch (error) {
      setStatus('error');
      setStatusMessage(
        error instanceof Error
          ? error.message
          : 'Something went wrong while sending the booking request.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
<div className="rounded-[2rem] border border-sage/15 bg-white p-8 shadow-[0_24px_80px_rgba(26,46,26,0.08)] md:p-10">
  <div className="flex flex-col gap-3 border-b border-sage/15 pb-6 text-center md:text-left">
    <p className="text-sm uppercase tracking-[0.28em] text-moss">
      Booking form
    </p>
    <h2 className="font-display text-2xl text-forest md:text-4xl">
      Reserve your session
    </h2>
  </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

        {selectedServiceDetails ? (
          <div className="overflow-hidden rounded-[1.75rem] border border-sage/15 bg-ivory">
            {selectedServiceDetails.imageUrl ? (
              <div className="relative h-56">
                <Image
                  src={selectedServiceDetails.imageUrl}
                  alt={selectedServiceDetails.image?.alt || selectedServiceDetails.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 720px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/50 via-forest/10 to-transparent" />
              </div>
            ) : null}

            <div className="space-y-4 p-6 md:p-7">
              <div className="flex flex-col gap-3 border-b border-sage/15 pb-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-moss">
                    Selected service
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-forest">
                    {selectedServiceDetails.title}
                  </h3>
                </div>

                <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-sage shadow-sm">
                  <Clock3 className="h-4 w-4 text-moss" />
                  {selectedServiceDetails.duration}
                </div>
              </div>

              <p className="text-base leading-7 text-charcoal/80">
                {selectedServiceDetails.shortDescription}
              </p>

              {selectedServiceDetails.longDescription ? (
                <p className="text-sm leading-7 text-charcoal/72">
                  {selectedServiceDetails.longDescription}
                </p>
              ) : null}
            </div>
          </div>
        ) : null}

        <div className="grid gap-5 md:grid-cols-2">
          <Field
            label="Full Name"
            htmlFor="fullName"
            error={errors.fullName}
            required
            input={
              <input
                id="fullName"
                type="text"
                value={formState.fullName}
                onChange={(event) => handleFieldChange('fullName', event.target.value)}
                className="h-14 w-full rounded-2xl border border-sage/20 bg-ivory px-4 text-base text-forest outline-none transition placeholder:text-charcoal/35 focus:border-moss"
                placeholder="Your full name"
              />
            }
          />

          <Field
            label="Phone Number"
            htmlFor="phone"
            error={errors.phone}
            required
            input={
              <input
                id="phone"
                type="tel"
                value={formState.phone}
                onChange={(event) => handleFieldChange('phone', event.target.value)}
                className="h-14 w-full rounded-2xl border border-sage/20 bg-ivory px-4 text-base text-forest outline-none transition placeholder:text-charcoal/35 focus:border-moss"
                placeholder="+94 7X XXX XXXX"
              />
            }
          />

          <Field
            label="Email Address"
            htmlFor="email"
            error={errors.email}
            input={
              <input
                id="email"
                type="email"
                value={formState.email}
                onChange={(event) => handleFieldChange('email', event.target.value)}
                className="h-14 w-full rounded-2xl border border-sage/20 bg-ivory px-4 text-base text-forest outline-none transition placeholder:text-charcoal/35 focus:border-moss"
                placeholder="Optional"
              />
            }
          />

          <Field
            label="Selected Service"
            htmlFor="service"
            error={errors.service}
            required
            input={
              <select
                id="service"
                value={formState.service}
                onChange={(event) => handleFieldChange('service', event.target.value)}
                className="h-14 w-full rounded-2xl border border-sage/20 bg-ivory px-4 text-base text-forest outline-none transition focus:border-moss"
              >
                <option value="">Choose a service</option>
                {serviceOptions.map((service) => (
                  <option key={service.value} value={service.label}>
                    {service.label}
                  </option>
                ))}
              </select>
            }
          />

          <Field
            label="Preferred Date"
            htmlFor="preferredDate"
            error={errors.preferredDate}
            required
            input={
              <input
                id="preferredDate"
                type="date"
                value={formState.preferredDate}
                onChange={(event) =>
                  handleFieldChange('preferredDate', event.target.value)
                }
                className="h-14 w-full rounded-2xl border border-sage/20 bg-ivory px-4 text-base text-forest outline-none transition focus:border-moss"
              />
            }
          />

          <Field
            label="Preferred Time"
            htmlFor="preferredTime"
            error={errors.preferredTime}
            required
            input={
              <input
                id="preferredTime"
                type="time"
                value={formState.preferredTime}
                onChange={(event) =>
                  handleFieldChange('preferredTime', event.target.value)
                }
                className="h-14 w-full rounded-2xl border border-sage/20 bg-ivory px-4 text-base text-forest outline-none transition focus:border-moss"
              />
            }
          />
        </div>

        <Field
          label="Message"
          htmlFor="message"
          error={errors.message}
          required
          input={
            <textarea
              id="message"
              rows={6}
              value={formState.message}
              onChange={(event) => handleFieldChange('message', event.target.value)}
              className="w-full rounded-[1.5rem] border border-sage/20 bg-ivory px-4 py-4 text-base text-forest outline-none transition placeholder:text-charcoal/35 focus:border-moss"
              placeholder="Tell us what you need help with, your goals, or anything important before the session."
            />
          }
        />

        {status !== 'idle' ? (
          <div
            className={`rounded-[1.5rem] border px-5 py-4 text-sm leading-6 ${
              status === 'success'
                ? 'border-moss/20 bg-moss/10 text-forest'
                : 'border-red-200 bg-red-50 text-red-700'
            }`}
          >
            <div className="flex items-start gap-3">
              {status === 'success' ? (
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-moss" />
              ) : (
                <Mail className="mt-0.5 h-5 w-5 shrink-0" />
              )}
              <p>{statusMessage}</p>
            </div>
          </div>
        ) : null}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="h-auto rounded-full bg-forest px-8 py-4 text-base text-ivory hover:bg-forest/92"
          >
            {isSubmitting ? (
              <>
                <LoaderCircle className="h-4 w-4 animate-spin" />
                Sending Request
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Book This Session
              </>
            )}
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-auto rounded-full border-green-600/20 bg-green-50 px-8 py-4 text-base text-green-700 hover:bg-green-100"
          >
            <a
              href={`https://wa.me/94762985339?text=${whatsappMessage}`}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle className="h-4 w-4" />
              Continue on WhatsApp
            </a>
          </Button>
        </div>
      </form>
    </div>
  );
}

type FieldProps = {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  input: React.ReactNode;
};

function Field({ label, htmlFor, error, required, input }: FieldProps) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-2 block text-sm font-medium uppercase tracking-[0.18em] text-forest">
        {label}
        {required ? <span className="ml-1 text-moss">*</span> : null}
      </span>
      {input}
      {error ? <span className="mt-2 block text-sm text-red-600">{error}</span> : null}
    </label>
  );
}
