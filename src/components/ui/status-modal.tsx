"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import Link from "next/link";
import { ReactNode } from "react";

interface StatusModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  status: "success" | "failed";
  title: ReactNode;
  description: ReactNode;
  actionLabel: string;
  actionHref?: string;
  onAction?: () => void;
}

export function StatusModal({
  isOpen,
  onOpenChange,
  status,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
}: StatusModalProps) {
  const isSuccess = status === "success";

  const borderColor = isSuccess ? "border-[#D5E4A6]" : "border-red-300";
  const bgCircleColor = isSuccess ? "bg-[#F4F7F4]" : "bg-red-50";
  const innerCircleColor = isSuccess ? "bg-[#99BD4A]" : "bg-red-500";
  const buttonColor = isSuccess
    ? "bg-[#99BD4A] hover:bg-[#87A840]"
    : "bg-red-500 hover:bg-red-600";

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className={`sm:max-w-[450px] p-8 overflow-hidden bg-white rounded-[24px] border-0 border-b-[12px] ${borderColor} shadow-2xl flex flex-col items-center text-center`}
      >
        <div
          className={`w-24 h-24 ${bgCircleColor} rounded-full flex items-center justify-center mb-4 mt-2`}
        >
          <div
            className={`w-14 h-14 ${innerCircleColor} rounded-full flex items-center justify-center shadow-md`}
          >
            {isSuccess ? (
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 6L9 17L4 12"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
        </div>

        <h3 className="text-[22px] font-extrabold text-[#0F172A] mb-3 leading-tight">
          {title}
        </h3>

        <div className="text-[#6B7280] text-[15px] leading-relaxed mb-8 px-2">
          {description}
        </div>

        {actionHref ? (
          <Link
            href={actionHref}
            onClick={() => {
              if (onAction) onAction();
              else onOpenChange(false);
            }}
            className={`w-full py-4 ${buttonColor} text-white rounded-xl font-bold text-[16px] transition-colors shadow-sm flex items-center justify-center`}
          >
            {actionLabel}
          </Link>
        ) : (
          <button
            onClick={() => {
              if (onAction) onAction();
              else onOpenChange(false);
            }}
            className={`w-full py-4 ${buttonColor} text-white rounded-xl font-bold text-[16px] transition-colors shadow-sm flex items-center justify-center`}
          >
            {actionLabel}
          </button>
        )}
      </DialogContent>
    </Dialog>
  );
}
