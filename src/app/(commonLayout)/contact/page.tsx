"use client";

import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 mb-6 shadow-lg shadow-orange-500/10">
            <Mail size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            Get in <span className="text-orange-500">Touch</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium text-lg max-w-2xl mx-auto">
            Have a question or feedback? We&apos;re here to help! Send us a
            message and we&apos;ll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="space-y-6 lg:col-span-1">
            {[
              {
                icon: <Phone size={24} />,
                title: "Call Us",
                content: "+880 1234 567 890",
                color: "bg-blue-500",
              },
              {
                icon: <Mail size={24} />,
                title: "Email Us",
                content: "contact.rizbi123@gmail.com",
                color: "bg-orange-500",
              },
              {
                icon: <MapPin size={24} />,
                title: "Visit Us",
                content: "Mirsharai, Chittagong, Bangladesh",
                color: "bg-green-500",
              },
            ].map((info, idx) => (
              <div
                key={idx}
                className="p-8 rounded-[2rem] bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/30 dark:shadow-none flex gap-6 items-start group hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 rounded-2xl ${info.color} text-white flex items-center justify-center shrink-0 shadow-lg shadow-${info.color.split("-")[1]}-500/20`}
                >
                  {info.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">
                    {info.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                    {info.content}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-[3rem] p-8 md:p-12 border border-gray-100 dark:border-gray-800 shadow-2xl shadow-gray-200/50 dark:shadow-none">
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full h-14 px-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none outline-none focus:ring-4 focus:ring-orange-500/10 font-medium text-gray-900 dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full h-14 px-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none outline-none focus:ring-4 focus:ring-orange-500/10 font-medium text-gray-900 dark:text-white"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="What is this about?"
                  className="w-full h-14 px-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none outline-none focus:ring-4 focus:ring-orange-500/10 font-medium text-gray-900 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Write your message here..."
                  className="w-full p-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none outline-none focus:ring-4 focus:ring-orange-500/10 font-medium text-gray-900 dark:text-white resize-none"
                />
              </div>
              <Button className="w-full h-16 bg-orange-600 hover:bg-gray-900 text-white rounded-2xl font-black text-lg transition-all duration-500 hover:scale-[1.02] shadow-xl shadow-orange-600/20 group">
                Send Message{" "}
                <Send className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
