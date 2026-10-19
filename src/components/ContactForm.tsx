"use client";

import { useState } from "react";
import Button from "./Button";

const budgetOptions = [
  "Under £1,000",
  "£1,000–£3,000",
  "£3,000+"
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    message: "",
    website: "" // honeypot
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const canSubmit = formData.name.trim() && formData.email.trim() && formData.message.trim();

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
          <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-neutral-700 mb-2">
            Company or project
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-neutral-700 mb-2">
            Budget
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
          >
            <option value="">Select budget range</option>
            {budgetOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          required
          className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent resize-none"
          placeholder="Tell me about your project..."
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          type="submit"
          variant="secondary"
          disabled={!canSubmit || isSubmitting || isRedirecting}
        >
          {isSubmitting ? "Sending..." : "Send enquiry"}
        </Button>

        <Button
          type="button"
          variant="primary"
          onClick={handleDeposit}
          disabled={!canSubmit || isSubmitting || isRedirecting}
        >
          {isRedirecting ? "Redirecting..." : "Pay £500 deposit to secure your start date"}
        </Button>
      </div>

      <p className="text-sm text-neutral-500">
        The deposit locks in your project slot and is deducted from your final invoice.
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
