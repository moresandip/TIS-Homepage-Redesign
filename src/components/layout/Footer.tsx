// ============================================================
// src/components/layout/Footer.tsx
// ============================================================
// Site footer with school info, navigation links, and social links.
// Uses a simple 3-column grid that collapses to 1 column on mobile.
// ============================================================

import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from "lucide-react";
import { CONTACT, NAV_LINKS } from "@/data/siteData";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-tis-dark text-gray-300">
      {/* Red accent line at the top */}
      <div className="h-1 bg-gradient-to-r from-tis-red via-tis-gold to-tis-teal" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* 3-column grid → stacks on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* ---- Column 1: School Identity ---- */}
          <div>
            <h3 className="text-white font-black text-2xl mb-2">TIS</h3>
            <p className="text-tis-gold text-sm font-medium mb-4 uppercase tracking-widest">
              Tulas International School
            </p>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              A CBSE-affiliated co-educational boarding school in Dehradun,
              nurturing young minds since 2012 through the Modern Gurukul approach.
            </p>
            {/* Social media icons */}
            <div className="flex gap-4">
              <a
                href={CONTACT.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 hover:bg-tis-red transition-colors"
                aria-label="Follow TIS on Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href={CONTACT.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 hover:bg-tis-red transition-colors"
                aria-label="Follow TIS on Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href={CONTACT.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 hover:bg-tis-red transition-colors"
                aria-label="TIS on YouTube"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* ---- Column 2: Quick Navigation ---- */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-tis-teal transition-colors text-sm flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-tis-gold" />
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={CONTACT.admissionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-tis-teal hover:text-white transition-colors text-sm font-semibold flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-tis-teal" />
                  Apply for Admission →
                </a>
              </li>
            </ul>
          </div>

          {/* ---- Column 3: Contact Info ---- */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="flex items-start gap-3 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <Phone size={16} className="text-tis-teal mt-0.5 shrink-0" />
                  <span>{CONTACT.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-start gap-3 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <Mail size={16} className="text-tis-teal mt-0.5 shrink-0" />
                  <span>{CONTACT.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <MapPin size={16} className="text-tis-teal mt-0.5 shrink-0" />
                  <span>{CONTACT.address}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {currentYear} Tulas International School. All rights reserved.</p>
          <p>Dehradun, Uttarakhand, India</p>
        </div>
      </div>
    </footer>
  );
}
