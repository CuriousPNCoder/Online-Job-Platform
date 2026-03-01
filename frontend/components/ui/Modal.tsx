"use client";

import { ReactNode } from "react";

type Props = {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
};

export const Modal = ({ isOpen, title, children, onClose }: Props): JSX.Element | null => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-lg bg-white p-5 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-brand-900">{title}</h3>
          <button className="text-slate-500" onClick={onClose}>
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
