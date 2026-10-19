"use client";

import { useState } from "react";
import Button from "./Button";

const budgetOptions = [
  "Under £1,000",
  "£1,000–£3,000",
  "£3,000+"
];

export const topicOptions = [
  { value: "contract", label: "Contract or permanent role" },
  { value: "project", label: "Fixed-scope project" },
  { value: "app-review", label: "App Review Rescue" },
  { value: "other", label: "Something else" },
] as const;

const placeholders: Record<string, string> = {
  contract: "Role, team, start date, length, day rate or salary band, and IR35 status if known.",
  project: "Tell me about your project, timeline and what done looks like.",
  "app-review": "App name, the guideline Apple cited, and the rejection message if you can paste it.",
  other: "Tell me what you need.",
};

const inputClasses =
  "w-full px-4 py-3 border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-black dark:text-white rounded-xl focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent";

const labelClasses = "block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2";

export default function ContactForm({ initialTopic = "" }: { initialTopic?: string }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    topic: topicOptions.some((t) => t.value === initialTopic) ? initialTopic : "",
    budget: "",
    message: "",
    website: "" // honeypot
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const canSubmit = formData.name.trim() && formData.email.trim() && formData.message.trim();
  // The £500 deposit is for fixed-scope projects; contract roles and rescues don't take one
  const showDeposit = formData.topic === "" || formData.topic === "project";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.website) return; // honeypot triggered
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitMessage(data.message);
        setFormData({
          name: "",
          email: "",
          company: "",
          topic: "",
          budget: "",
          message: "",
          website: ""
        });
      } else {
        setSubmitMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setSubmitMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeposit = async () => {
    if (!canSubmit || formData.website) return;
    setIsRedirecting(true);
    setSubmitMessage("");

    try {
      // Send enquiry first
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      // Create Stripe Checkout session
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          projectDescription: formData.message,
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setSubmitMessage("Could not create checkout session. Please try again.");
        setIsRedirecting(false);
      }
    } catch {
      setSubmitMessage("Something went wrong. Please try again.");
      setIsRedirecting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot — hidden from real users */}
      <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className={labelClasses}>
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            autoComplete="name"
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClasses}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
            className={inputClasses}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="topic" className={labelClasses}>
            What is this about?
          </label>
          <select
            id="topic"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            className={inputClasses}
          >
            <option value="">Choose one</option>
            {topicOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="company" className={labelClasses}>
            Company or project
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            autoComplete="organization"
            className={inputClasses}
          />
        </div>
      </div>

      {formData.topic !== "contract" && (
        <div className="md:w-1/2 md:pr-3">
          <label htmlFor="budget" className={labelClasses}>
            Budget
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className={inputClasses}
          >
            <option value="">Select budget range</option>
            {budgetOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label htmlFor="message" className={labelClasses}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          required
          className={`${inputClasses} resize-none`}
          placeholder={placeholders[formData.topic] ?? "Tell me about your project..."}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          type="submit"
          variant={showDeposit ? "secondary" : "primary"}
          disabled={!canSubmit || isSubmitting || isRedirecting}
        >
          {isSubmitting ? "Sending..." : "Send enquiry"}
        </Button>

        {showDeposit && (
          <Button
            type="button"
            variant="primary"
            onClick={handleDeposit}
            disabled={!canSubmit || isSubmitting || isRedirecting}
          >
            {isRedirecting ? "Redirecting..." : "Pay £500 deposit to secure your start date"}
          </Button>
        )}
      </div>

      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        {showDeposit
          ? "The deposit is for fixed-scope projects. It locks in your project slot and is deducted from your final invoice."
          : "No deposit needed. Send the enquiry and I'll reply within one working day."}
      </p>

      {submitMessage && (
        <div className={`mt-4 p-4 rounded-xl text-sm ${
          submitMessage.includes("Thank you")
            ? "bg-green-50 text-green-700 border border-green-200"
            : "bg-red-50 text-red-700 border border-red-200"
        }`}>
          {submitMessage}
        </div>
      )}
    </form>
  );
}
