"use client";

import { User } from "@/services/userauth.service";
import {
  changeUserRoleAction,
  changeUserStatusAction,
} from "@/actions/userauth.action";
import { toast } from "sonner";
import { Mail, ShieldCheck, Activity, Store, ChevronDown } from "lucide-react";

export default function UsersTable({ users }: { users: User[] }) {
  const handleRoleChange = async (id: string, role: string) => {
    const t = toast.loading("Updating role...");
    await changeUserRoleAction(id, role);
    toast.success("Role updated successfully", { id: t });
  };

  const handleStatusChange = async (id: string, status: string) => {
    const t = toast.loading("Updating status...");
    await changeUserStatusAction(id, status);
    toast.success("User status updated", { id: t });
  };

  const getRoleStyle = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "bg-red-500/10 text-red-600 border-red-500/20";
      case "PROVIDER":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      default:
        return "bg-green-500/10 text-green-600 border-green-500/20";
    }
  };

  return (
    <div className="overflow-hidden bg-white dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-none">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-800">
          <thead className="bg-gray-50/50 dark:bg-gray-800/50">
            <tr>
              <th className="px-8 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">
                User Details
              </th>
              <th className="px-8 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">
                Role Management
              </th>
              <th className="px-8 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">
                Status
              </th>
              <th className="px-8 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">
                Entity Info
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
            {users.map((u) => (
              <tr
                key={u.id}
                className="hover:bg-gray-50/80 dark:hover:bg-gray-800/30 transition-all duration-200 group"
              >
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-600 font-bold text-xl border border-orange-500/20">
                      {u.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white leading-none">
                        {u.name}
                      </p>
                      <p className="text-sm text-gray-500 flex items-center gap-1.5 mt-1">
                        <Mail size={12} /> {u.email}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-8 py-6">
                  <div className="relative max-w-[160px]">
                    <select
                      defaultValue={u.role}
                      onChange={(e) => handleRoleChange(u.id, e.target.value)}
                      className="appearance-none w-full pl-4 pr-10 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all cursor-pointer"
                    >
                      <option value="CUSTOMER">Customer</option>
                      <option value="PROVIDER">Provider</option>
                      <option value="ADMIN">Admin</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <ChevronDown size={16} />
                    </div>
                  </div>
                  <div className="mt-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-full border ${getRoleStyle(u.role)}`}
                    >
                      <ShieldCheck size={10} /> {u.role}
                    </span>
                  </div>
                </td>

                <td className="px-8 py-6">
                  <div className="relative max-w-[140px]">
                    <select
                      defaultValue={u.status}
                      onChange={(e) => handleStatusChange(u.id, e.target.value)}
                      className="appearance-none w-full pl-4 pr-10 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all cursor-pointer"
                    >
                      <option value="ACTIVE">Active</option>
                      <option value="BLOCKED">Blocked</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <ChevronDown size={16} />
                    </div>
                  </div>
                  <div className="mt-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-full border ${
                        u.status === "ACTIVE"
                          ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                          : "bg-rose-500/10 text-rose-600 border-rose-500/20"
                      }`}
                    >
                      <Activity size={10} /> {u.status}
                    </span>
                  </div>
                </td>

                <td className="px-8 py-6">
                  {u.providerProfile ? (
                    <div className="space-y-1">
                      <p className="font-bold text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
                        <Store size={14} className="text-blue-500" />{" "}
                        {u.providerProfile.restaurantName}
                      </p>
                      <p
                        className={`text-[10px] font-bold uppercase ${u.providerProfile.isApproved ? "text-emerald-500" : "text-amber-500"}`}
                      >
                        {u.providerProfile.isApproved
                          ? "✓ Verified Merchant"
                          : "⌛ Pending Approval"}
                      </p>
                    </div>
                  ) : (
                    <span className="text-gray-400 italic text-sm">
                      Individual User
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
