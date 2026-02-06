/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ViewUserProps {
  user: any | null;
  isOpen: boolean;
  onClose: () => void;
}

const ViewUser = ({ user, isOpen, onClose }: ViewUserProps) => {
  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-black text-slate-800 tracking-tight">
            User Profile Details
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center py-6">
          <img
            src={user.image}
            className="w-24 h-24 rounded-full border-4 border-slate-50 shadow-sm mb-4"
            alt={user.name}
          />
          <h3 className="text-lg font-bold text-slate-900">{user.name}</h3>
          <p className="text-[#0064AE] font-semibold text-sm">{user.email}</p>

          <div className="grid grid-cols-2 gap-4 w-full mt-8 border-t pt-6">
            <div className="bg-slate-50 p-3 rounded-xl">
              <p className="text-[10px] font-black text-slate-400 uppercase">
                Account Type
              </p>
              <p className="font-bold text-slate-700">{user.accountType}</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl">
              <p className="text-[10px] font-black text-slate-400 uppercase">
                Phone
              </p>
              <p className="font-bold text-slate-700">{user.phone}</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl col-span-2">
              <p className="text-[10px] font-black text-slate-400 uppercase">
                Total Bids
              </p>
              <p className="font-bold text-slate-700">{user.bids} items</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewUser;
