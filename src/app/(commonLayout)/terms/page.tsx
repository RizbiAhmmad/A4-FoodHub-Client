"use client";

import { FileText } from "lucide-react";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-6 shadow-lg shadow-blue-500/10">
            <FileText size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            Terms & <span className="text-orange-500">Conditions</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">
            Last updated: May 05, 2026
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-16 shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 space-y-12">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">1. Acceptance of Terms</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              By accessing and using FoodHub, you agree to be bound by these Terms and Conditions. If you do not agree to all of these terms, do not use this website.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">2. Use of Service</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              You must be at least 18 years old to use our service. You are responsible for maintaining the confidentiality of your account and password.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">3. User Conduct</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Users are prohibited from using the site for any unlawful purpose or in any way that could damage, disable, overburden, or impair the site.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">4. Intellectual Property</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              All content on this site, including text, graphics, logos, and images, is the property of FoodHub and protected by copyright laws.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">5. Limitation of Liability</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              FoodHub shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use the service.
            </p>
          </section>

          <section className="pt-8 border-t border-gray-100 dark:border-gray-800">
            <p className="text-gray-500 dark:text-gray-500 italic text-center">
              By continuing to use FoodHub, you acknowledge that you have read and understood these Terms & Conditions.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
