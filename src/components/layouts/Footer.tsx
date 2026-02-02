"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">FoodHub</h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Delicious meals delivered fast from your favorite local restaurants.
            Fresh, tasty, and always on time.
          </p>

          <div className="flex gap-4 mt-5">
            <Facebook className="w-5 h-5 hover:text-orange-500 cursor-pointer" />
            <Instagram className="w-5 h-5 hover:text-orange-500 cursor-pointer" />
            <Twitter className="w-5 h-5 hover:text-orange-500 cursor-pointer" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-orange-500">
                Home
              </Link>
            </li>
            <li>
              <Link href="/meals" className="hover:text-orange-500">
                Meals
              </Link>
            </li>

            <li>
              <Link href="/dashboard" className="hover:text-orange-500">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/contact" className="hover:text-orange-500">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-orange-500">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-orange-500">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-orange-500">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <MapPin size={16} /> Dhaka, Bangladesh
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} /> +880 1234-567890
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} /> support@foodhub.com
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-5 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} FoodHub. All rights reserved.
      </div>
    </footer>
  );
}
