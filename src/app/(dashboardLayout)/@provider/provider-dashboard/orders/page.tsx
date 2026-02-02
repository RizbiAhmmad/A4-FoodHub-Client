"use client";

import { useState, useEffect } from "react";
import { ProviderOrder } from "@/services/order.service";
import { getProviderOrdersAction, updateOrderStatusAction } from "@/actions/order.action";
import Image from "next/image";

export default function ProviderOrdersTable() {
  const [orders, setOrders] = useState<ProviderOrder[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch provider orders on mount
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
    try {
      const res = await updateOrderStatusAction(orderId, status);
      if (res?.error) throw new Error(res.error.message);

      // Update frontend state with new status
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status } : order
        )
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Failed to update status");
      }
    }
  };

  if (loading) {
    return <p className="text-center py-10 text-lg text-gray-400">Loading orders...</p>;
  }

  if (!orders.length) {
    return <p className="text-center py-10 text-lg text-gray-400">No orders yet</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="p-3 border-b border-gray-700">Order ID</th>
            <th className="p-3 border-b border-gray-700">Customer</th>
            <th className="p-3 border-b border-gray-700">Address</th>
            <th className="p-3 border-b border-gray-700">Phone</th>
            <th className="p-3 border-b border-gray-700">Items</th>
            <th className="p-3 border-b border-gray-700 text-right">Total</th>
            <th className="p-3 border-b border-gray-700">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className="bg-gray-900 text-gray-200 hover:bg-gray-800 transition"
            >
              <td className="p-3 border-b border-gray-700">{order.id.slice(0, 8)}</td>
              <td className="p-3 border-b border-gray-700">{order.customer?.name || "-"}</td>
              <td className="p-3 border-b border-gray-700">{order.address || "-"}</td>
              <td className="p-3 border-b border-gray-700">{order.phone || "-"}</td>
              <td className="p-3 border-b border-gray-700">
                {order.items?.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 mb-1">
                    <div className="w-10 h-10 relative shrink-0">
                      <Image
                        src={item.meal?.image || "/placeholder.jpg"}
                        alt={item.meal?.name || "Meal"}
                        fill
                        className="rounded object-cover"
                      />
                    </div>
                    <div className="text-sm">
                      {item.meal?.name || "Meal"} | Qty: {item.quantity} | ৳ {item.price}
                    </div>
                  </div>
                ))}
              </td>
              <td className="p-3 border-b border-gray-700 text-right font-semibold text-orange-400">
                ৳ {order.totalAmount}
              </td>
              <td className="p-3 border-b border-gray-700">
                <select
                  className={`px-2 py-1 rounded-full text-sm font-medium border ${
                    order.status === "DELIVERED"
                      ? "bg-green-600 text-white border-green-600"
                      : order.status === "CANCELLED"
                      ? "bg-red-600 text-white border-red-600"
                      : "bg-yellow-500 text-black border-yellow-500"
                  }`}
                  value={order.status}
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                >
                  <option value="PLACED">PLACED</option>
                  <option value="PREPARING">PREPARING</option>
                  <option value="READY">READY</option>
                  <option value="DELIVERED">DELIVERED</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
