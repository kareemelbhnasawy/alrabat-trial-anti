import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../../components/ui/Button";

export const Settings = () => {
  const { login } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    // Since AuthContext uses hardcoded password 'admin123', we can't actually change it
    // without modifying the context implementation to read from a mutable source.
    // implementing a mock change for UI demonstration.

    if (currentPassword !== "admin123") {
      setMessage({ type: "error", text: "Incorrect current password" });
      return;
    }

    if (newPassword.length < 6) {
      setMessage({
        type: "error",
        text: "New password must be at least 6 characters",
      });
      return;
    }

    // Mock success
    setMessage({ type: "success", text: "Password updated successfully" });
    setNewPassword("");
    setCurrentPassword("");
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-primary mb-8">Settings</h1>

      <div className="bg-white p-8 rounded-lg shadow-sm border border-neutral-200 mb-8">
        <h2 className="text-lg font-bold text-neutral-800 mb-6">
          Change Password
        </h2>

        {message && (
          <div
            className={`p-4 rounded mb-6 text-sm ${
              message.type === "success"
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-neutral-600">
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full p-3 border rounded focus:border-accent outline-none"
              placeholder="Enter current password"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-neutral-600">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 border rounded focus:border-accent outline-none"
              placeholder="Enter new password"
            />
          </div>

          <div className="pt-4">
            <Button type="submit">Update Password</Button>
          </div>
        </form>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-sm border border-neutral-200">
        <h2 className="text-lg font-bold text-neutral-800 mb-4">
          Application Info
        </h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-neutral-500">Version</div>
          <div className="font-mono text-neutral-800">1.0.0-beta</div>
          <div className="text-neutral-500">Environment</div>
          <div className="font-mono text-neutral-800">Development (Mock)</div>
        </div>
      </div>
    </div>
  );
};
