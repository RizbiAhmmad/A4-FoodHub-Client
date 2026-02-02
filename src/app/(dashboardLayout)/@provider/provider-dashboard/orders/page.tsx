import { getProviderOrdersAction } from "@/actions/order.action";
import { ProviderOrder } from "@/services/order.service";
import Image from "next/image";

export default async function ProviderOrdersPage() {
  const res = await getProviderOrdersAction();
  const orders: ProviderOrder[] = res.data || [];

  if (!orders.length) {
    return (
      <p className="text-center py-10 text-lg text-gray-400">
        No orders received yet
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="p-3 border-b border-gray-700">Order ID</th>

            <th className="p-3 border-b border-gray-700">Customer</th>
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
              <td className="p-3 border-b border-gray-700">
                {order.id.slice(0, 8)}
              </td>

              <td className="p-3 border-b border-gray-700">
                {order.customer?.name}
              </td>
              <td className="p-3 border-b border-gray-700">
                {order.customer?.phone}
              </td>
              <td className="p-3 border-b border-gray-700">
                <div className="flex flex-col gap-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-10 h-10 relative shrink-0">
                        <Image
                          src={item.meal?.image || "/placeholder.jpg"}
                          alt={item.meal?.name || "Meal"}
                          fill
                          className="rounded object-cover"
                        />
                      </div>
                      <div className="text-sm">
                        {item.meal?.name} | Qty: {item.quantity} | ৳{" "}
                        {item.price}
                      </div>
                    </div>
                  ))}
                </div>
              </td>
              <td className="p-3 border-b border-gray-700 text-right font-semibold text-orange-400">
                ৳ {order.totalAmount}
              </td>
              <td className="p-3 border-b border-gray-700">
                <span
                  className={`px-2 py-1 rounded-full text-sm font-medium ${
                    order.status === "DELIVERED"
                      ? "bg-green-600 text-white"
                      : order.status === "CANCELLED"
                        ? "bg-red-600 text-white"
                        : "bg-yellow-500 text-black"
                  }`}
                >
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
