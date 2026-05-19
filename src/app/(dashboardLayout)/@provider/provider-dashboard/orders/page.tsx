"use client";

import { useState, useEffect } from "react";
import { ProviderOrder } from "@/services/order.service";
import { getProviderOrdersAction, updateOrderStatusAction } from "@/actions/order.action";
import Image from "next/image";
import { 
  ClipboardList, 
  User, 
  MapPin, 
  Phone, 
  Package, 
  CreditCard,
  ChevronDown,
  Loader2,
  Inbox
} from "lucide-react";
import { toast } from "sonner";

export default function ProviderOrdersTable() {
  const [orders, setOrders] = useState<ProviderOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const res = await getProviderOrdersAction();
      if (!res.error) setOrders(res.data || []);
      setLoading(false);
    };

    fetchOrders();
  }, []);

  const updateStatus = async (orderId: string, status: string) => {
    const t = toast.loading("Updating order status...");
    try {
      const res = await updateOrderStatusAction(orderId, status);
      if (res?.error) throw new Error(res.error.message);

      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status } : order
        )
      );
      toast.success(`Order status updated to ${status}`, { id: t });
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to update status", { id: t });
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "DELIVERED":
        return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
      case "CANCELLED":
        return "bg-rose-500/10 text-rose-600 border-rose-500/20";
      case "PLACED":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      default:
        return "bg-amber-500/10 text-amber-600 border-amber-500/20";
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
        <Loader2 className="size-8 text-orange-500 animate-spin" />
        <p className="text-gray-500 font-medium">Fetching orders...</p>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 text-center">
        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-full">
          <Inbox className="size-12 text-gray-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">No Orders Found</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-xs mt-1">You haven&apos;t received any orders yet. Stay tuned!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      <div className="flex items-center gap-3">
        <div className="bg-orange-500 p-2.5 rounded-2xl shadow-lg shadow-orange-500/20 text-white">
          <ClipboardList size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Active Orders</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Manage and track your incoming meal requests</p>
        </div>
      </div>

      <div className="overflow-hidden bg-white dark:bg-gray-950 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-2xl shadow-gray-200/40 dark:shadow-none">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800">
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Order & Customer</th>
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Contact & Delivery</th>
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Items Detail</th>
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Summary</th>
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/30 transition-all duration-200">
                  <td className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-gray-500 uppercase">#{order.id.slice(0, 8)}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-xl bg-orange-100 dark:bg-orange-500/10 flex items-center justify-center text-orange-600">
                          <User size={18} />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 dark:text-white leading-tight">{order.customer?.name || "Unknown Customer"}</p>
                          <p className="text-[10px] text-gray-400 font-medium uppercase mt-0.5">Verified Customer</p>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="p-6">
                    <div className="space-y-2 max-w-[200px]">
                      <p className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <MapPin size={14} className="mt-0.5 text-gray-400 shrink-0" />
                        <span className="line-clamp-2">{order.address || "No address provided"}</span>
                      </p>
                      <p className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <Phone size={14} className="text-gray-400 shrink-0" />
                        <span>{order.phone || "N/A"}</span>
                      </p>
                    </div>
                  </td>

                  <td className="p-6">
                    <div className="space-y-2">
                      {order.items?.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 bg-gray-50 dark:bg-gray-900 p-2 rounded-2xl border border-gray-100 dark:border-gray-800 min-w-[240px]">
                          <div className="size-10 relative shrink-0">
                            <Image
                              src={item.meal?.image || "/placeholder.jpg"}
                              alt={item.meal?.name || "Meal"}
                              fill
                              className="rounded-xl object-cover border border-white dark:border-gray-800 shadow-sm"
                            />
                          </div>
                          <div className="overflow-hidden">
                            <p className="text-xs font-bold text-gray-900 dark:text-white truncate">{item.meal?.name || "Meal"}</p>
                            <p className="text-[10px] text-gray-500 font-medium">Qty: {item.quantity} × ৳{item.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>

                  <td className="p-6 text-right">
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex items-center gap-1.5 text-orange-600">
                        <CreditCard size={14} />
                        <p className="text-lg font-black tracking-tight">৳{order.totalAmount}</p>
                      </div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase">Paid Total</p>
                    </div>
                  </td>

                  <td className="p-6">
                    <div className="relative">
                      <select
                        className={`appearance-none w-full pl-4 pr-10 py-2.5 border rounded-2xl text-xs font-black uppercase tracking-wider outline-none transition-all cursor-pointer focus:ring-4 focus:ring-orange-500/10 ${getStatusStyle(order.status)}`}
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                      >
                        <option value="PLACED">Placed</option>
                        <option value="PREPARING">Preparing</option>
                        <option value="READY">Ready</option>
                        <option value="DELIVERED">Delivered</option>
                        <option value="CANCELLED">Cancelled</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                        <ChevronDown size={14} />
                      </div>
                    </div>
                    <div className="mt-2 flex items-center gap-1.5 px-3 py-1 rounded-full border bg-white dark:bg-gray-800 text-[10px] font-bold text-gray-400 justify-center">
                      <Package size={10} />
                      Update Status
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
