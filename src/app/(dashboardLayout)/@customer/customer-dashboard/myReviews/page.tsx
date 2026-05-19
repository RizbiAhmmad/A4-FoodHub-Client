import { getMyReviewsAction } from "@/actions/review.action";
import { Review } from "@/services/review.service";
import Image from "next/image";
import { Star, MessageSquare, Calendar } from "lucide-react";
import { DeleteReviewButton } from "@/components/modules/customer/Review/DeleteReviewButton";
export default async function MyReviewsPage() {
  const res = await getMyReviewsAction();
  const reviews: Review[] = res.data || [];

  if (!reviews.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] space-y-6 text-center">
        <div className="bg-blue-50 dark:bg-blue-950/20 p-8 rounded-full text-blue-500">
          <MessageSquare size={48} />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            No Reviews Found
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-sm">
            You haven&apos;t shared your feedback on any meals yet. Your reviews
            help others find the best food!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-10">
        <div className="bg-orange-500 p-2 rounded-xl text-white">
          <Star size={24} fill="currentColor" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          My Reviews
        </h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/40 dark:shadow-none p-6 md:p-8 flex flex-col justify-between"
          >
            <div className="space-y-6">
              {/* Meal Info */}
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 shrink-0">
                  <Image
                    src={review.meal?.image || "/placeholder.jpg"}
                    alt={review.meal?.name || "Meal"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white leading-tight">
                    {review.meal?.name}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                    <Calendar size={12} />
                    {new Date(review.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Rating & Comment */}
              <div className="space-y-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={
                        i < review.rating
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-200 dark:text-gray-700"
                      }
                    />
                  ))}
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl relative">
                  <div className="absolute -top-2 left-4 text-orange-500/20">
                    <MessageSquare size={32} fill="currentColor" />
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 italic relative z-10">
                    &ldquo;{review.comment || "No comment provided."}&rdquo;
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-50 dark:border-gray-800 flex justify-end">
              <DeleteReviewButton mealId={review.mealId} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
