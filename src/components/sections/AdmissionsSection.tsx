// ============================================================
// src/components/sections/AdmissionsSection.tsx
// ============================================================
// The admissions CTA section + enquiry form.
// This is the most conversion-critical section on the page.
//
// Design: dark red gradient background to stand out from rest of page.
// The form collects: Name, Phone, Email, Class, City.
// (Mirrors the actual TIS enquiry form fields.)
//
// Form state is managed with a simple useState object.
// In production, the onSubmit would call an API endpoint.
// ============================================================

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { CONTACT } from "@/data/siteData";

// TypeScript type for the form fields
type FormState = {
  name: string;
  phone: string;
  email: string;
  classApplying: string;
  city: string;
};

// Class options matching TIS's actual form
const CLASS_OPTIONS = [
  "Class IV", "Class V", "Class VI", "Class VII",
  "Class VIII", "Class IX", "Class X", "Class XI", "Class XII",
];

export default function AdmissionsSection() {
  // Single state object for the entire form
  // Why one object instead of separate states? Fewer useState calls,
  // easier to reset the whole form at once, cleaner code.
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    classApplying: "",
    city: "",
  });

  // Track whether the form was submitted (to show success message)
  const [submitted, setSubmitted] = useState(false);

  // Generic change handler — works for all input/select fields
  // The key trick: [e.target.name] uses the input's "name" attribute
  // as the key in the state object (computed property name)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page refresh (default browser behaviour)
    // In production: await fetch('/api/enquire', { body: JSON.stringify(form) })
    setSubmitted(true); // Show thank-you state
    setForm({ name: "", phone: "", email: "", classApplying: "", city: "" });
  };

  return (
    <SectionWrapper id="admissions" className="bg-white dark:bg-tis-dark">
      {/* Full-width red gradient card */}
      <div className="bg-gradient-to-br from-tis-red via-red-800 to-red-950 rounded-3xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

          {/* ---- Left: Info Panel ---- */}
          <div className="p-10 lg:p-14 flex flex-col justify-between">
            <div>
              <Badge color="gold">Admissions Open</Badge>
              <h2 className="mt-6 text-4xl md:text-5xl font-black text-white leading-tight">
                Begin Your{" "}
                <span className="text-tis-gold">TIS Journey</span>
              </h2>
              <p className="mt-4 text-red-100 text-lg leading-relaxed">
                Join a community of achievers. Fill in the enquiry form and our
                admissions team will reach out to guide you through the process.
              </p>

              {/* Contact details */}
              <ul className="mt-8 space-y-4">
                <li>
                  <a
                    href={`tel:${CONTACT.phone}`}
                    className="flex items-center gap-3 text-white hover:text-tis-gold transition-colors"
                  >
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                      <Phone size={16} />
                    </div>
                    <div>
                      <p className="text-xs text-red-200 uppercase tracking-wider">Admissions Helpline</p>
                      <p className="font-semibold">{CONTACT.phone}</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="flex items-center gap-3 text-white hover:text-tis-gold transition-colors"
                  >
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                      <Mail size={16} />
                    </div>
                    <div>
                      <p className="text-xs text-red-200 uppercase tracking-wider">Email Us</p>
                      <p className="font-semibold">{CONTACT.email}</p>
                    </div>
                  </a>
                </li>
                <li>
                  <div className="flex items-start gap-3 text-white">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin size={16} />
                    </div>
                    <div>
                      <p className="text-xs text-red-200 uppercase tracking-wider">Address</p>
                      <p className="font-semibold text-sm leading-relaxed">{CONTACT.address}</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            {/* Apply online button */}
            <div className="mt-10">
              <Button
                href={CONTACT.admissionUrl}
                variant="teal"
                id="admissions-apply-btn"
              >
                Apply Online →
              </Button>
            </div>
          </div>

          {/* ---- Right: Enquiry Form ---- */}
          <div className="bg-white dark:bg-tis-dark-card p-10 lg:p-14">
            {submitted ? (
              // Success state — shown after form submission
              <motion.div
                className="h-full flex flex-col items-center justify-center text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring" }}
              >
                <span className="text-6xl mb-4">🎉</span>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
                  Thank You!
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Our admissions team will contact you within 24 hours.
                </p>
                <Button
                  variant="secondary"
                  onClick={() => setSubmitted(false)}
                  id="form-reset-btn"
                >
                  Submit Another Enquiry
                </Button>
              </motion.div>
            ) : (
              // The actual form
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-6">
                  Enquire Now
                </h3>

                {/* Each input uses the same pattern: label + input */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-tis-dark focus:outline-none focus:ring-2 focus:ring-tis-red transition-all text-gray-900 dark:text-white placeholder-gray-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      maxLength={10}
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="10-digit number"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-tis-dark focus:outline-none focus:ring-2 focus:ring-tis-red transition-all text-gray-900 dark:text-white placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">
                      Class Applying
                    </label>
                    <select
                      name="classApplying"
                      value={form.classApplying}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-tis-dark focus:outline-none focus:ring-2 focus:ring-tis-red transition-all text-gray-900 dark:text-white"
                    >
                      <option value="">Select class</option>
                      {CLASS_OPTIONS.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-tis-dark focus:outline-none focus:ring-2 focus:ring-tis-red transition-all text-gray-900 dark:text-white placeholder-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="Your city"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-tis-dark focus:outline-none focus:ring-2 focus:ring-tis-red transition-all text-gray-900 dark:text-white placeholder-gray-400"
                  />
                </div>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  id="form-submit-btn"
                  className="w-full flex items-center justify-center gap-2 py-4 bg-tis-red text-white rounded-xl font-bold text-lg hover:bg-red-700 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send size={18} />
                  Send Enquiry
                </motion.button>

                <p className="text-xs text-gray-400 text-center">
                  By submitting, you agree to be contacted by TIS regarding admissions.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
