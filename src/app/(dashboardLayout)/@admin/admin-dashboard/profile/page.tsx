import { getMeAction } from "@/actions/userauth.action";
import { BadgeCheck, Mail, Shield, User } from "lucide-react";

export default async function AdminProfilePage() {
  const { data: user } = await getMeAction();

  if (!user)
    return (
      <p className="text-red-400 text-center mt-10">Failed to load profile, Please login first</p>
    );
type Role = "ADMIN" | "PROVIDER" | "CUSTOMER";

const roleColor: Record<Role, string> = {
  ADMIN: "bg-red-600",
  PROVIDER: "bg-blue-600",
  CUSTOMER: "bg-green-600",
};

const color = roleColor[user.role as Role];


  const statusColor =
    user.status === "ACTIVE" ? "bg-green-500" : "bg-red-500";

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-6">
      <div className="w-full max-w-md backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-8 text-white">

        {/* Header */}
        <div className="flex items-center gap-5 mb-8">
          <div className="w-20 h-20 rounded-full bg-linear-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-3xl font-bold shadow-lg">
            {user.name.charAt(0)}
          </div>

          <div>
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-gray-400 text-sm flex items-center gap-2">
              <Mail size={14}/> {user.email}
            </p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-white/5 p-5 rounded-xl border border-white/10 space-y-3">
            <h2 className="text-lg font-semibold flex items-center gap-2 text-blue-400">
              <User size={18}/> Account Info
            </h2>

            <p className="flex justify-between text-sm">
              <span className="text-gray-400">Role</span>
              <span className={`px-3 py-1 text-xs rounded-full ${color}`}>
                {user.role}
              </span>
            </p>

            <p className="flex justify-between text-sm">
              <span className="text-gray-400">Status</span>
              <span className={`px-3 py-1 text-xs rounded-full ${statusColor}`}>
                {user.status}
              </span>
            </p>

            <p className="flex justify-between text-sm">
              <span className="text-gray-400">Joined</span>
              <span>{new Date(user.createdAt).toLocaleDateString()}</span>
            </p>
          </div>

          {/* Provider Section */}
          {user.providerProfile && (
            <div className="bg-white/5 p-5 rounded-xl border border-white/10 space-y-3">
              <h2 className="text-lg font-semibold flex items-center gap-2 text-purple-400">
                <Shield size={18}/> Provider Info
              </h2>

              <p className="flex justify-between text-sm">
                <span className="text-gray-400">Restaurant</span>
                <span>{user.providerProfile.restaurantName}</span>
              </p>

              <p className="flex justify-between text-sm">
                <span className="text-gray-400">Approval</span>
                <span className={`flex items-center gap-1 text-sm ${
                  user.providerProfile.isApproved
                    ? "text-green-400"
                    : "text-yellow-400"
                }`}>
                  <BadgeCheck size={16}/>
                  {user.providerProfile.isApproved ? "Approved" : "Pending"}
                </span>
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
