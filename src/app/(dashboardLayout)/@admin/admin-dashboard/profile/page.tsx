import { getMeAction } from "@/actions/userauth.action";
import { BadgeCheck, Mail, Shield, User } from "lucide-react";
import { UpdateProfileModal } from "@/components/modules/shared/profile/UpdateProfileModal";

export default async function AdminProfilePage() {
  const { data: user } = await getMeAction();

  if (!user)
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <p className="text-red-400 text-center">Failed to load profile, Please login first</p>
      </div>
    );

  type Role = "ADMIN" | "PROVIDER" | "CUSTOMER";

  const roleColor: Record<Role, string> = {
    ADMIN: "bg-red-500/10 text-red-500 border-red-500/20",
    PROVIDER: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    CUSTOMER: "bg-green-500/10 text-green-500 border-green-500/20",
  };

  const statusColor =
    user.status === "ACTIVE" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500";

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 dark:shadow-none overflow-hidden">
        
        {/* Banner Decor */}
        <div className="h-32 bg-linear-to-r from-red-600 to-red-800 relative">
          <div className="absolute -bottom-12 left-8 md:left-12">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white dark:bg-gray-950 p-1.5 shadow-xl">
              <div className="w-full h-full rounded-full bg-linear-to-tr from-red-500 to-red-700 flex items-center justify-center text-3xl md:text-5xl font-bold text-white border-4 border-white dark:border-gray-950">
                {user.name.charAt(0)}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-16 pb-10 px-8 md:px-12">
          {/* Header Info */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="space-y-1">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                {user.name}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <Mail size={16} /> {user.email}
              </p>
            </div>
            
            <UpdateProfileModal initialName={user.name} />
          </div>

          {/* Info Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-3xl border border-gray-100 dark:border-gray-700/50 space-y-4">
              <h2 className="text-lg font-bold flex items-center gap-2 text-red-500">
                <User size={20} /> Admin Identity
              </h2>

              <div className="space-y-3">
                <p className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Account Role</span>
                  <span className={`px-4 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border ${roleColor[user.role as Role]}`}>
                    {user.role}
                  </span>
                </p>

                <p className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Account Status</span>
                  <span className={`px-4 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${statusColor}`}>
                    {user.status}
                  </span>
                </p>

                <p className="flex justify-between items-center text-sm pt-2 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-gray-500 dark:text-gray-400">Member Since</span>
                  <span className="font-medium text-gray-700 dark:text-gray-200">{new Date(user.createdAt).toLocaleDateString("en-US", { month: 'long', year: 'numeric' })}</span>
                </p>
              </div>
            </div>

            {/* Provider Section (If Admin is also a provider, unlikely but handled) */}
            {user.providerProfile && (
              <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-3xl border border-gray-100 dark:border-gray-700/50 space-y-4">
                <h2 className="text-lg font-bold flex items-center gap-2 text-blue-500">
                  <Shield size={20} /> Associated Profile
                </h2>

                <div className="space-y-3">
                  <p className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Restaurant</span>
                    <span className="font-bold text-gray-800 dark:text-gray-100">{user.providerProfile.restaurantName}</span>
                  </p>

                  <p className="flex justify-between items-center text-sm pt-2 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-gray-500 dark:text-gray-400">Verification</span>
                    <span className={`flex items-center gap-1.5 text-sm font-bold ${
                      user.providerProfile.isApproved
                        ? "text-green-500"
                        : "text-yellow-500"
                    }`}>
                      <BadgeCheck size={18} />
                      {user.providerProfile.isApproved ? "Verified Merchant" : "Pending Approval"}
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
