/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SellerSidebarD from "@/main/seller/_components/SellerSidebarD";
import SellerNavbarD from "@/main/seller/_components/SellerNavbarD";
import { Loader2, ExternalLink, AlertCircle } from "lucide-react";
import { toast } from "react-toastify";
import { useGetMeQuery } from "@/redux/fetures/users.api";
import { useLazyGetOnboardingLinkQuery } from "@/redux/fetures/payments.api";

const SellerDashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const { data: userData, isLoading: isUserLoading } = useGetMeQuery();
  const [triggerOnboarding, { isLoading: isLinkLoading }] =
    useLazyGetOnboardingLinkQuery();

  const isStripeVerified = userData?.data?.sellerProfile?.isStripeVerified;

  const handleStripeOnboarding = async () => {
    try {
      const res = await triggerOnboarding().unwrap();
      if (res?.url) {
        window.location.href = res.url; 
      }
    } catch (err: any) {
      console.log(err)
      toast.error("Failed to get onboarding link. Please try again.");
    }
  };

  if (isUserLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white">
        <Loader2 className="animate-spin text-[#0064AE]" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F7FA] flex font-sans text-slate-900 overflow-hidden">
      <SellerSidebarD
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      <div className="flex-1 flex flex-col min-w-0 h-screen transition-all duration-300 overflow-hidden">
        <SellerNavbarD setIsMobileOpen={setIsMobileOpen} />

        <main className="flex-1 overflow-y-auto custom-scrollbar">
          <div
            className={`ml-0 duration-500 transition-all mx-auto ${isCollapsed ? "lg:ml-20" : "lg:ml-65"}`}
          >
            {isStripeVerified ? (
              <Outlet />
            ) : (
              <div className="p-8 flex items-center justify-center min-h-[85vh]">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="max-w-md w-full relative group"
                >
                  {/* Background Decorative Glow */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-[45px] blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>

                  <div className="relative bg-white p-10 rounded-[40px] shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] border border-slate-100 text-center">
                    {/* Icon with Floating Animation */}
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="w-24 h-24 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner"
                    >
                      <div className="relative">
                        <AlertCircle
                          size={48}
                          className="text-[#0064AE]"
                          strokeWidth={1.5}
                        />
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5 }}
                          className="absolute -top-1 -right-1 w-5 h-5 bg-amber-400 rounded-full border-4 border-white"
                        />
                      </div>
                    </motion.div>

                    <h2 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
                      Activate Payments
                    </h2>

                    <p className="text-slate-500 mb-10 font-medium leading-relaxed px-2 text-sm lg:text-base">
                      Your seller profile is ready! Now, connect with{" "}
                      <span className="text-slate-900 font-bold">Stripe</span>{" "}
                      to securely receive earnings and manage your business.
                    </p>

                    {/* Premium Button */}
                    <button
                      onClick={handleStripeOnboarding}
                      disabled={isLinkLoading}
                      className="relative w-full group overflow-hidden cursor-pointer"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#0064AE] to-blue-500 transition-all duration-300 group-hover:scale-105"></div>
                      <div className="relative py-4 px-6 flex items-center justify-center gap-3 text-white font-bold text-lg rounded-2xl transition-all active:scale-[0.98] disabled:opacity-80">
                        {isLinkLoading ? (
                          <Loader2 className="animate-spin" size={24} />
                        ) : (
                          <>
                            <span>Get Started with Stripe</span>
                            <ExternalLink
                              size={20}
                              className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                            />
                          </>
                        )}
                      </div>
                    </button>

                    {/* Trust Badges */}
                    <div className="mt-8 pt-8 border-t border-slate-50 flex flex-col items-center gap-4">
                      <div className="flex items-center gap-6 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[3px]">
                          Secure Payments via Stripe Connect
                        </p>
                      </div>

                      <div className="flex gap-2">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-slate-200"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </main>

        <footer className="h-10 bg-white border-t border-slate-200 px-8 flex items-center justify-between shrink-0">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            Finn Admin v2.0
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#219618] rounded-full" />
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">
              Systems Online
            </span>
          </div>
        </footer>
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[55] lg:hidden"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default SellerDashboardLayout;
