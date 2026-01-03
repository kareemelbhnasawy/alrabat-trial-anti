import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext";

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = () => {
    const success = login(password);
    if (success) {
      navigate("/admin");
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100">
      <div className="bg-white p-10 rounded-xl shadow-xl w-96 text-center">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-primary">Admin Portal</h1>
          <p className="text-neutral-400 text-sm">Alrabat Content Management</p>
        </div>
        <input
          type="password"
          placeholder="Password"
          className={`w-full p-3 border rounded mb-2 ${error ? "border-red-500" : "border-neutral-200"}`}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(false);
          }}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        />
        {error && (
          <p className="text-red-500 text-xs mb-4 text-left">
            Invalid password
          </p>
        )}

        <Button className="w-full" onClick={handleLogin}>
          Login
        </Button>
        <p className="text-xs text-neutral-400 mt-4">Hint: admin123</p>
      </div>
    </div>
  );
};
