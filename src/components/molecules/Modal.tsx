import React from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center 
        p-4 bg-black/60 backdrop-blur-sm">

      <div className="relative w-full max-w-lg bg-zinc-950 
          border border-zinc-800/40 shadow-2xl overflow-hidden 
          animate-popBounce rounded-xl">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white"
        >
          <X size={20} />
        </button>

        {children}
      </div>
    </div>
  );
};
