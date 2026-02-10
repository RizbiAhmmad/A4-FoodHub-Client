import { getAllOrdersAction } from "@/actions/order.action";

export default async function AdminOrdersPage() {
  const { data: orders } = await getAllOrdersAction();

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">📦 All Orders</h1>
        <p className="text-muted-foreground text-sm">
          Overview of all customer orders in the system
        </p>
      </div>

      {/* Table Container */}
      <div className="rounded-2xl border bg-background shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr className="text-left">
                <th className="p-4 font-semibold">Order</th>
                <th className="p-4 font-semibold">Customer</th>
                <th className="p-4 font-semibold">Provider</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Amount</th>
              </tr>
            </thead>

            <tbody>
              {orders?.map((order) => (
                <tr
                  key={order.id}
                  className="border-t hover:bg-muted/40 transition-colors"
                >
                  {/* Order ID */}
                  <td className="p-4 font-medium text-primary">
                    #{order.id.slice(0, 8)}
                  </td>

                  {/* Customer */}
                  <td className="p-4">{order.customer?.name || "-"}</td>

                  {/* Provider */}
                  <td className="p-4">{order.provider?.restaurantName || "-"}</td>

                  {/* Date */}
                  <td className="p-4 text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                  {/* Status Badge */}
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-medium ${
                        order.status === "DELIVERED"
                          ? "bg-green-500/15 text-green-600"
                          : order.status === "CANCELLED"
                          ? "bg-red-500/15 text-red-600"
                          : order.status === "PREPARING"
                          ? "bg-blue-500/15 text-blue-600"
                          : "bg-yellow-500/15 text-yellow-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  {/* Amount */}
                  <td className="p-4 text-right font-semibold text-lg">
                    ৳ {order.totalAmount}
                  </td>
                </tr>
              ))}

              {!orders?.length && (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center p-10 text-muted-foreground"
                  >
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
