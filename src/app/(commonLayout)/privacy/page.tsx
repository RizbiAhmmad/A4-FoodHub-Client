"use client";

import { Shield } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 mb-6 shadow-lg shadow-orange-500/10">
            <Shield size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            Privacy <span className="text-orange-500">Policy</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">
            Last updated: May 05, 2026
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-16 shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 space-y-12">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">1. Information We Collect</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We collect information that you provide directly to us when you create an account, place an order, or communicate with us. This may include your name, email address, phone number, delivery address, and payment information.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">2. How We Use Your Information</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We use the information we collect to provide, maintain, and improve our services, such as to process your transactions, send you technical notices, updates, security alerts, and support messages.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">3. Information Sharing</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We do not share your personal information with third parties except as described in this policy. We may share information with vendors, consultants, and other service providers who need access to such information to carry out work on our behalf.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">4. Data Security</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">5. Your Choices</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              You may update, correct, or delete information about you at any time by logging into your online account or by contacting us.
            </p>
          </section>

          <section className="pt-8 border-t border-gray-100 dark:border-gray-800">
            <p className="text-gray-500 dark:text-gray-500 italic text-center">
              If you have any questions about this Privacy Policy, please contact us at privacy@foodhub.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
