import { getOrdersAction } from "@/actions/order.action";
import ReviewBox from "@/components/modules/customer/Review/ReviewBox";
import { Order } from "@/services/order.service";
import Image from "next/image";
import { 
  Package, 
  MapPin, 
  Phone, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  XCircle,
  Receipt
} from "lucide-react";

export default async function MyOrdersPage() {
  const res = await getOrdersAction();

  if (res.error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-full">
          <XCircle className="text-red-500 w-12 h-12" />
        </div>
        <p className="text-red-500 font-bold text-xl">Oops! Failed to load orders</p>
        <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs text-center">
          {res.error.message}. Please make sure you are logged in correctly.
        </p>
      </div>
    );
  }

  const orders: Order[] = res.data || [];

  if (!orders.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] space-y-6 text-center">
        <div className="bg-orange-50 dark:bg-orange-950/20 p-8 rounded-full">
          <Package className="text-orange-500 w-16 h-16" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">No Orders Found</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-sm">
            It looks like you haven&apos;t placed any orders yet. 
            Discover delicious meals and start your first order!
          </p>
        </div>
      </div>
    );
  }

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "DELIVERED":
        return {
          bg: "bg-green-500/10 dark:bg-green-500/20",
          text: "text-green-600 dark:text-green-400",
          icon: <CheckCircle2 size={14} />
        };
      case "CANCELLED":
        return {
          bg: "bg-red-500/10 dark:bg-red-500/20",
          text: "text-red-600 dark:text-red-400",
          icon: <XCircle size={14} />
        };
      default:
        return {
          bg: "bg-orange-500/10 dark:bg-orange-500/20",
          text: "text-orange-600 dark:text-orange-400",
          icon: <Clock size={14} />
        };
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-10">
        <Receipt className="text-orange-500 w-8 h-8" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Orders</h1>
      </div>

      <div className="space-y-8">
        {orders.map((order) => {
          const styles = getStatusStyles(order.status);
          
          return (
            <div
              key={order.id}
              className="group bg-white dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-none overflow-hidden transition-all duration-300 hover:border-orange-200 dark:hover:border-orange-500/30"
            >
              {/* Order Header */}
              <div className="p-6 md:p-8 border-b border-gray-50 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Order ID</span>
                      <h3 className="font-mono text-sm font-bold text-gray-700 dark:text-gray-300">#{order.id.slice(0, 12)}...</h3>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <p className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        {new Date(order.createdAt).toLocaleDateString("en-US", { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 uppercase tracking-wide ${styles.bg} ${styles.text}`}>
                      {styles.icon}
                      {order.status}
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Body */}
              <div className="p-6 md:p-8">
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Items Section */}
                  <div className="lg:col-span-2 space-y-6">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex gap-5 items-start">
                        <div className="relative w-20 h-20 rounded-2xl overflow-hidden shadow-md shrink-0 border border-gray-100 dark:border-gray-800">
                          <Image
                            src={item.meal?.image || "/placeholder.jpg"}
                            alt={item.meal?.name || "Meal"}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 space-y-1 pt-1">
                          <h4 className="font-bold text-gray-900 dark:text-white">{item.meal?.name}</h4>
                          <div className="flex items-center gap-3 text-sm text-gray-500">
                            <p>Qty: <span className="font-bold text-gray-700 dark:text-gray-300">{item.quantity}</span></p>
                            <span className="w-1 h-1 rounded-full bg-gray-300" />
                            <p>৳ {item.meal?.price}</p>
                          </div>
                          
                          {/* ⭐ REVIEW SECTION */}
                          {order.status === "DELIVERED" && (
                            <div className="mt-3 pt-3 border-t border-gray-50 dark:border-gray-800">
                              <ReviewBox mealId={item.mealId} />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Summary / Delivery Section */}
                  <div className="bg-gray-50/50 dark:bg-gray-800/20 p-6 rounded-3xl space-y-6 border border-gray-100 dark:border-gray-800/50">
                    <div className="space-y-4">
                      <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Delivery Info</h5>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 text-sm">
                          <MapPin size={16} className="text-orange-500 shrink-0 mt-0.5" />
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{order.address}</p>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <Phone size={16} className="text-orange-500 shrink-0" />
                          <p className="text-gray-600 dark:text-gray-300 font-medium">{order.phone}</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-200 dark:border-gray-700 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500 text-sm">Total Paid</span>
                        <span className="text-xl font-black text-orange-600 dark:text-orange-500">৳ {order.totalAmount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
