import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogs } from "@/constants/blog-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, ArrowLeft, Share2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface BlogDetailsProps {
  params: Promise<{ id: string }>;
}

export default async function BlogDetailsPage({ params }: BlogDetailsProps) {
  const { id } = await params;
  const blog = blogs.find((b) => b.id === id);

  if (!blog) {
    notFound();
  }

  return (
    <article className="container max-w-4xl mx-auto py-12 px-4">
      {/* Back Button */}
      <Button
        asChild
        variant="ghost"
        className="mb-8 -ml-4 text-muted-foreground hover:text-primary"
      >
        <Link href="/blogs">
          <ArrowLeft className="mr-2 size-4" />
          Back to Blogs
        </Link>
      </Button>

      {/* Header */}
      <header className="mb-8">
        <Badge className="bg-orange-500 hover:bg-orange-600 border-none mb-4">
          {blog.category}
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
          {blog.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="size-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
              {blog.author[0]}
            </div>
            <div>
              <p className="text-sm font-medium">{blog.author}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <CalendarDays className="size-3" />
                  {blog.date}
                </span>
                <span>•</span>
                <span>5 min read</span>
              </div>
            </div>
          </div>

          <Button variant="outline" size="sm" className="gap-2">
            <Share2 className="size-4" />
            Share
          </Button>
        </div>
      </header>

      {/* Main Image */}
      <div className="relative aspect-video rounded-2xl overflow-hidden mb-12 shadow-2xl">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="prose prose-orange max-w-none dark:prose-invert">
        <div
          className="text-lg leading-relaxed text-muted-foreground space-y-6"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>

      <Separator className="my-12" />

      {/* Footer / Author Box */}
      <div className="bg-muted/50 rounded-2xl p-8 flex flex-col md:flex-row gap-6 items-center border border-border/50 backdrop-blur-sm">
        <div className="size-20 rounded-full bg-orange-500 flex items-center justify-center text-white text-3xl font-bold shrink-0">
          {blog.author[0]}
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold mb-2">About {blog.author}</h3>
          <p className="text-muted-foreground">
            Food enthusiast and professional writer dedicated to sharing the
            best culinary experiences and healthy living tips with the FoodHub
            community.
          </p>
        </div>
      </div>
    </article>
  );
}
