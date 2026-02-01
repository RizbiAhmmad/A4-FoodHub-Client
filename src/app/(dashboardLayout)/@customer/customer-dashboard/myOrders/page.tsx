import { getOrdersAction } from "@/actions/order.action";
import { Order } from "@/services/order.service";
import Image from "next/image";

export default async function MyOrdersPage() {
  const res = await getOrdersAction();
  const orders: Order[] = res.data || [];

  if (!orders.length) {
    return <p className="text-center py-10 text-lg text-gray-300">No orders yet</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-lg text-white">
              Order #{order.id}
            </h3>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                order.status === "DELIVERED"
                  ? "bg-green-600 text-white"
                  : order.status === "CANCELLED"
                  ? "bg-red-600 text-white"
                  : "bg-yellow-500 text-black"
              }`}
            >
              {order.status}
            </span>
          </div>

          <p className="text-sm text-gray-300 mb-4">
            Address: {order.address} | Phone: {order.phone}
          </p>

          <div className="space-y-4">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-16 h-16 relative shrink-0">
                  <Image
                    src={item.meal?.image || "/placeholder.jpg"}
                    alt={item.meal?.name || "Meal"}
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-white">{item.meal?.name}</p>
                  <p className="text-sm text-gray-300">
                    Quantity: {item.quantity} | Price: ৳ {item.meal?.price ?? 0}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
