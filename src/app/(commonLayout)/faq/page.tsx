"use client";

import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 mb-6 shadow-lg shadow-orange-500/10">
            <HelpCircle size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            Frequently Asked <span className="text-orange-500">Questions</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">
            Find answers to common questions about our service, delivery, and more.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-6">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {[
              {
                q: "How does the delivery process work?",
                a: "Once you place an order, our certified chefs start preparing your meal immediately. Our hyper-fast delivery partners then pick it up and deliver it to your doorstep within 30 minutes, ensuring it's hot and fresh.",
              },
              {
                q: "Is there a minimum order amount?",
                a: "We want you to enjoy your favorite meals without any barriers. Most of our meals have no minimum order requirement, though some premium sets might have specific conditions.",
              },
              {
                q: "How can I become a food provider on FoodHub?",
                a: "We're always looking for talented chefs! You can register as a provider through our dashboard. We conduct a thorough quality and safety check before certifying new providers.",
              },
              {
                q: "Are there healthy or diet-specific options?",
                a: "Absolutely! We have a wide variety of meals categorized by dietary needs, including vegan, keto, and high-protein options. You can use our filters to find exactly what fits your lifestyle.",
              },
              {
                q: "What if I have specific food allergies?",
                a: "Your safety is our priority. Each meal listing includes a detailed ingredient list and allergen warnings. You can also add special instructions for the chef during checkout.",
              },
              {
                q: "Can I cancel my order?",
                a: "Orders can be cancelled within 5 minutes of placement for a full refund. After that, preparation usually begins, and cancellation may not be possible.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, digital wallets like Apple Pay and Google Pay, and local mobile banking services.",
              },
            ].map((faq, idx) => (
              <AccordionItem
                key={idx}
                value={`item-${idx}`}
                className="border border-gray-100 dark:border-gray-800 rounded-[1.5rem] px-8 bg-white dark:bg-gray-900 shadow-xl shadow-gray-200/20 dark:shadow-none overflow-hidden"
              >
                <AccordionTrigger className="text-xl font-bold text-gray-900 dark:text-white hover:text-orange-600 hover:no-underline py-8">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed pb-8">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 font-medium">
            Still have questions?{" "}
            <a href="/contact" className="text-orange-500 hover:underline font-bold">
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
