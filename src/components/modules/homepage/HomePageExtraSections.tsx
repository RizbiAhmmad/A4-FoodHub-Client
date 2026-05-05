"use client";

import {
  Truck,
  ShieldCheck,
  Star,
  Utensils,
  MessageSquare,
  Newspaper,
  Mail,
  ArrowRight,
  HelpCircle,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function HomepageExtraSections() {
  return (
    <div className="space-y-32 mt-28 mb-20">
      {/*  Premium Promo Banner */}
      <section className="relative rounded-[2.5rem] overflow-hidden bg-linear-to-br from-orange-600 via-red-500 to-amber-500 p-8 md:p-16 text-white shadow-2xl">
        <div className="relative z-10 max-w-2xl space-y-8">
          <Badge className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium inline-flex">
            ✨ Special Offer - 30% Off
          </Badge>
          <h2 className="text-5xl md:text-6xl font-black leading-tight tracking-tight">
            Craving for <br />
            <span className="text-yellow-200">Perfection?</span> 🍽️
          </h2>
          <p className="text-xl opacity-90 font-medium max-w-lg">
            Experience the finest culinary creations delivered with speed and
            care to your home.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/meals">
              <Button
                size="lg"
                className="bg-white text-orange-600 hover:bg-gray-100 rounded-2xl px-8 h-14 text-lg font-bold shadow-lg transition-transform hover:scale-105"
              >
                Order Now
              </Button>
            </Link>
            <Link href="/meals">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-white border-white/50 hover:bg-white/10 rounded-2xl px-8 h-14 text-lg font-bold backdrop-blur-sm"
              >
                View Menu
              </Button>
            </Link>
          </div>
        </div>
        {/* Abstract background shapes */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 translate-x-20 pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-yellow-400/20 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/*  Why Choose Us - Enhanced */}
      <section className="px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl font-black text-gray-900 dark:text-white">
            Why Choose <span className="text-orange-500">FoodHub?</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium">
            We don&apos;t just deliver food; we deliver an experience that keeps
            you coming back for more.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <Utensils size={32} />,
              title: "Premium Quality",
              desc: "Curated meals from certified top-tier chefs.",
              color: "bg-orange-500",
              light: "bg-orange-50",
            },
            {
              icon: <Truck size={32} />,
              title: "Hyper-Fast",
              desc: "Hot and fresh delivery within 30 minutes.",
              color: "bg-blue-500",
              light: "bg-blue-50",
            },
            {
              icon: <Star size={32} />,
              title: "Top Rated",
              desc: "Trusted by 50,000+ happy food lovers.",
              color: "bg-yellow-500",
              light: "bg-yellow-50",
            },
            {
              icon: <ShieldCheck size={32} />,
              title: "Safe & Secure",
              desc: "Contactless delivery with encrypted payments.",
              color: "bg-green-500",
              light: "bg-green-50",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="group p-8 rounded-[2rem] bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
            >
              <div
                className={`w-16 h-16 flex items-center justify-center rounded-2xl ${item.light} dark:bg-gray-800 text-gray-900 dark:text-white mb-6 group-hover:scale-110 transition-transform duration-500`}
              >
                <div className="text-orange-600 dark:text-orange-500">
                  {item.icon}
                </div>
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900 dark:text-white">
                {item.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/*  Statistics Section - Premium Design */}
      <section className="relative py-24 rounded-[3rem] bg-gray-900 overflow-hidden shadow-2xl">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.3),transparent_70%)]" />
        </div>
        <div className="relative z-10 grid md:grid-cols-3 gap-16 text-center max-w-6xl mx-auto px-8">
          {[
            { value: "50k+", label: "Active Users" },
            { value: "1M+", label: "Meals Served" },
            { value: "4.9/5", label: "Customer Rating" },
          ].map((stat, idx) => (
            <div key={idx} className="space-y-2">
              <h3 className="text-5xl md:text-6xl font-black text-white tracking-tighter">
                {stat.value}
              </h3>
              <p className="text-orange-500 font-bold uppercase tracking-widest text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/*  Testimonials Section */}
      <section className="px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-sm font-bold">
            <MessageSquare size={16} /> Testimonials
          </div>
          <h2 className="text-4xl font-black text-gray-900 dark:text-white">
            What Our <span className="text-orange-500">Foodies Say</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "John Doe",
              role: "Food Critic",
              text: "FoodHub has redefined the way I experience home-cooked meals. The quality is consistently exceptional.",
              img: "https://i.pravatar.cc/150?u=john",
            },
            {
              name: "Sarah Khan",
              role: "Software Engineer",
              text: "The delivery is incredibly fast. I usually get my pizza piping hot within 20 minutes!",
              img: "https://i.pravatar.cc/150?u=sarah",
            },
            {
              name: "Alex Johnson",
              role: "Fitness Trainer",
              text: "I love the variety of healthy options available. It makes maintaining my diet so much easier.",
              img: "https://i.pravatar.cc/150?u=alex",
            },
          ].map((t, idx) => (
            <div
              key={idx}
              className="p-10 rounded-[2.5rem] bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-900 relative"
            >
              <div className="absolute top-8 right-10 text-orange-200 dark:text-orange-900/40">
                <MessageSquare size={60} />
              </div>
              <div className="flex gap-1 mb-6 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 font-medium leading-relaxed mb-8 relative z-10">
                &quot;{t.text}&quot;
              </p>
              <div className="flex items-center gap-4">
                <Image
                  src={t.img}
                  alt={t.name}
                  width={50}
                  height={50}
                  className="rounded-full border-2 border-white shadow-md"
                />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">
                    {t.name}
                  </h4>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/*  Latest Blogs / Highlights */}
      <section className="px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl space-y-4 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-bold">
              <Newspaper size={16} /> From Our Blog
            </div>
            <h2 className="text-4xl font-black text-gray-900 dark:text-white leading-tight">
              Food Stories & <span className="text-orange-500">Tips</span>
            </h2>
          </div>
          <Button
            variant="link"
            className="text-orange-600 font-bold text-lg p-0 group h-auto"
          >
            View All Articles{" "}
            <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              title: "The Secret to Perfect Pasta",
              date: "May 10, 2024",
              img: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=600",
              tag: "Cooking",
            },
            {
              title: "Top 10 Street Foods to Try",
              date: "May 08, 2024",
              img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600",
              tag: "Travel",
            },
            {
              title: "Benefits of Organic Diet",
              date: "May 05, 2024",
              img: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600",
              tag: "Health",
            },
          ].map((blog, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden mb-6 shadow-lg">
                <Image
                  src={blog.img}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-white dark:bg-black px-4 py-1.5 rounded-full text-xs font-bold text-orange-600">
                  {blog.tag}
                </div>
              </div>
              <p className="text-sm text-gray-500 font-bold mb-2 uppercase tracking-tighter">
                {blog.date}
              </p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors leading-tight">
                {blog.title}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/*  Newsletter Section */}
      <section className="relative py-24 rounded-[3.5rem] bg-orange-500 overflow-hidden shadow-2xl">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-black/10 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-4xl mx-auto px-8 text-center text-white space-y-10">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto rotate-12">
            <Mail size={40} />
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tight">
              Join the FoodHub Family
            </h2>
            <p className="text-xl text-white/90 font-medium">
              Get weekly recipes, special discounts, and fresh updates delivered
              to your inbox.
            </p>
          </div>
          <form
            className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-grow h-16 px-8 rounded-2xl bg-white text-gray-900 font-bold text-lg outline-none focus:ring-4 focus:ring-black/5"
            />
            <Button className="h-16 px-10 bg-black text-white hover:bg-gray-900 rounded-2xl font-black text-lg transition-transform hover:scale-105">
              Subscribe Now
            </Button>
          </form>
        </div>
      </section>

      {/*  FAQ Section - Premium Accordion */}
      <section className="px-4 max-w-4xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-sm font-bold">
            <HelpCircle size={16} /> FAQ
          </div>
          <h2 className="text-4xl font-black text-gray-900 dark:text-white">
            Common <span className="text-orange-500">Questions</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium">
            Everything you need to know about FoodHub and how we serve you.
          </p>
        </div>

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
          ].map((faq, idx) => (
            <AccordionItem
              key={idx}
              value={`item-${idx}`}
              className="border border-gray-100 dark:border-gray-800 rounded-[1.5rem] px-6 bg-white dark:bg-gray-900 shadow-sm overflow-hidden"
            >
              <AccordionTrigger className="text-lg font-bold text-gray-900 dark:text-white hover:text-orange-600 hover:no-underline py-6">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-gray-500 dark:text-gray-400 text-base leading-relaxed pb-6">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/*  Final CTA - Ultra Premium */}
      <section className="text-center py-32 bg-gray-50 dark:bg-gray-950 rounded-[4rem] border-2 border-dashed border-gray-200 dark:border-gray-800 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto space-y-10">
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white leading-tight">
            Ready to Discover <br />
            Your Next{" "}
            <span className="text-orange-500 underline decoration-yellow-300 underline-offset-8">
              Favorite Meal?
            </span>
          </h2>
          <p className="text-xl text-gray-500 font-medium">
            Join thousands of foodies who have already found their joy. <br />
            Your table is waiting for you!
          </p>
          <Link href="/meals">
            <Button
              size="lg"
              className="bg-orange-600 hover:bg-gray-900 text-white rounded-2xl px-12 h-16 text-xl font-black shadow-2xl transition-all duration-500 hover:scale-110"
            >
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

// Simple Badge component for the promo banner
function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`border px-2 py-0.5 rounded text-xs ${className}`}>
      {children}
    </div>
  );
}
