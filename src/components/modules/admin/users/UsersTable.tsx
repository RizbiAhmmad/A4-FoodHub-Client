"use client";

import { User } from "@/services/userauth.service";
import { changeUserRoleAction, changeUserStatusAction } from "@/actions/userauth.action";
import { toast } from "sonner";

export default function UsersTable({ users }: { users: User[] }) {
  const handleRoleChange = async (id: string, role: string) => {
    const t = toast.loading("Updating role...");
    await changeUserRoleAction(id, role);
    toast.success("Role updated", { id: t });
  };

  const handleStatusChange = async (id: string, status: string) => {
    const t = toast.loading("Updating status...");
    await changeUserStatusAction(id, status);
    toast.success("Status updated", { id: t });
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "bg-red-600 text-white";
      case "PROVIDER":
        return "bg-blue-600 text-white";
      case "CUSTOMER":
      default:
        return "bg-green-600 text-white";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-600 text-white";
      case "BLOCKED":
        return "bg-red-600 text-white";
      default:
        return "bg-gray-600 text-white";
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-700 shadow-md">
      <table className="min-w-full divide-y divide-gray-700 text-white">
        <thead className="bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Role</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Provider</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700 bg-gray-900">
          {users.map((u) => (
            <tr key={u.id} className="hover:bg-gray-800 transition-colors">
              <td className="px-6 py-4 text-sm font-medium">{u.name}</td>
              <td className="px-6 py-4 text-sm">{u.email}</td>

              <td className="px-6 py-4 space-y-1">
                <select
                  defaultValue={u.role}
                  onChange={(e) => handleRoleChange(u.id, e.target.value)}
                  className="select select-bordered select-sm w-full bg-gray-700 text-white border-gray-600"
                >
                  <option value="CUSTOMER">CUSTOMER</option>
                  <option value="PROVIDER">PROVIDER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
                <span className={`inline-block px-2 py-1 text-xs rounded-full ${getRoleColor(u.role)}`}>
                  {u.role}
                </span>
              </td>

              <td className="px-6 py-4 space-y-1">
                <select
                  defaultValue={u.status}
                  onChange={(e) => handleStatusChange(u.id, e.target.value)}
                  className="select select-bordered select-sm w-full bg-gray-700 text-white border-gray-600"
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="BLOCKED">BLOCKED</option>
                </select>
                <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusColor(u.status)}`}>
                  {u.status}
                </span>
              </td>

              <td className="px-6 py-4 text-sm">
                {u.providerProfile
                  ? `${u.providerProfile.restaurantName} (${u.providerProfile.isApproved ? "Approved" : "Pending"})`
                  : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
