import React from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "./Button";

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDestructive?: boolean;
}

export const ConfirmationModal = ({
  isOpen,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  isDestructive = false,
}: ConfirmationModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6">
          <div className="flex items-center mb-4">
            {isDestructive && (
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-4">
                <AlertTriangle className="text-red-600" size={20} />
              </div>
            )}
            <h3 className="text-lg font-bold text-neutral-900">{title}</h3>
          </div>
          <p className="text-neutral-600 mb-6">{message}</p>
          <div className="flex justify-end space-x-3">
            <Button variant="ghost" onClick={onCancel}>
              {cancelLabel}
            </Button>
            <Button
              variant={isDestructive ? "primary" : "outline"} // Using primary style but will override color via className if needed, or rely on variant logic. Actually Button.tsx might not have 'destructive'. Let's check Button.tsx later. For now, let's assume primary is dark.
              // If destructive, we might want red. Button component might generic.
              // Let's just use className overrides if Button supports it
              className={
                isDestructive
                  ? "!bg-red-600 hover:!bg-red-700 text-white border-transparent"
                  : ""
              }
              onClick={onConfirm}
            >
              {confirmLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
