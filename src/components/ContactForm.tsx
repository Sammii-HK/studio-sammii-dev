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
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
          message: ""
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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

      <Button variant="primary" className="w-full md:w-auto">
        {isSubmitting ? "Sending..." : "Send message"}
      </Button>

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
