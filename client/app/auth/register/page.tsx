"use client"

import { useState } from "react";
import Button from "@/app/components/ui/button";
import Input from "@/app/components/ui/input";
import RamjetLogo from "@/app/components/ui/logo";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { Register } from "@/app/lib/fetchrequests";
import { Create_session } from "@/app/lib/session";
import { useSearchParams } from "next/navigation";

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

export default function RegisterPage() {
  const searchparams = useSearchParams();
  const redirect = searchparams.get("redir");
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState({ 
    name: false, 
    email: false, 
    password: false, 
    confirmPassword: false 
  });

  const validateName = (value: string): string | undefined => {
    if (!value.trim()) return "Name is required";
    if (value.trim().length < 2) return "Name must be at least 2 characters";
    if (!/^[a-zA-Z\s'-]+$/.test(value)) return "Name can only contain letters, spaces, hyphens, and apostrophes";
    return undefined;
  };

  const validateEmail = (value: string): string | undefined => {
    if (!value) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email address";
    return undefined;
  };

  const validatePassword = (value: string): string | undefined => {
    if (!value) return "Password is required";
    if (value.length < 8) return "Password must be at least 8 characters";
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) return "Password must contain uppercase, lowercase, and number";
    return undefined;
  };

  const validateConfirmPassword = (value: string, pass: string): string | undefined => {
    if (!value) return "Please confirm your password";
    if (value !== pass) return "Passwords do not match";
    return undefined;
  };

  const handleNameChange = (value: string) => {
    setName(value);
    if (touched.name) {
      const error = validateName(value);
      setErrors(prev => ({ ...prev, name: error, general: undefined }));
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (touched.email) {
      const error = validateEmail(value);
      setErrors(prev => ({ ...prev, email: error, general: undefined }));
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (touched.password) {
      const error = validatePassword(value);
      setErrors(prev => ({ ...prev, password: error, general: undefined }));
    }
    // Re-validate confirm password if it was already touched
    if (touched.confirmPassword && confirmPassword) {
      const confirmError = validateConfirmPassword(confirmPassword, value);
      setErrors(prev => ({ ...prev, confirmPassword: confirmError }));
    }
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    if (touched.confirmPassword) {
      const error = validateConfirmPassword(value, password);
      setErrors(prev => ({ ...prev, confirmPassword: error, general: undefined }));
    }
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    
    let error: string | undefined;
    switch (field) {
      case "name":
        error = validateName(name);
        break;
      case "email":
        error = validateEmail(email);
        break;
      case "password":
        error = validatePassword(password);
        break;
      case "confirmPassword":
        error = validateConfirmPassword(confirmPassword, password);
        break;
    }
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleSubmit = async () => {
    setTouched({ name: true, email: true, password: true, confirmPassword: true });

    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(confirmPassword, password);

    if (nameError || emailError || passwordError || confirmPasswordError) {
      setErrors({ name: nameError, email: emailError, password: passwordError, confirmPassword: confirmPasswordError });
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const response = await Register({ name, email, password });

      if (response.status_code !== 200 && response.status_code !== 201) {
        setErrors({ general: response.message });
        return;
      }

    await Create_session(response.token as string, "EARLY");
      window.location.href = redirect || "/dashboard";

    } catch {
      setErrors({ general: "Network error. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 px-4">
      <div className="w-full max-w-md flex flex-col items-center gap-6">
        
        {/* Logo */}
        <RamjetLogo size="lg" animated={true} />

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
          <p className="text-gray-500 text-sm">
            A server-side caching system you can trust
          </p>
        </div>

        {/* General Error */}
        {errors.general && (
          <div className="w-full bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
            <span className="text-red-600 text-sm font-medium">{errors.general}</span>
          </div>
        )}

        {/* Form */}
        <div className="w-full flex flex-col gap-4">
          <Input
            variant={errors.name ? "error" : "filled"}
            size="md"
            label="Full Name"
            type="text"
            required
            placeholder="John Doe"
            value={name}
            onChange={handleNameChange}
            onBlur={() => handleBlur("name")}
            error={errors.name}
          />

          <Input
            variant={errors.email ? "error" : "filled"}
            size="md"
            label="Email"
            type="email"
            required
            placeholder="johndoe@example.com"
            value={email}
            onChange={handleEmailChange}
            onBlur={() => handleBlur("email")}
            error={errors.email}
          />

          <div className="relative">
            <Input
              variant={errors.password ? "error" : "filled"}
              size="md"
              label="Password"
              type={showPassword ? "text" : "password"}
              required
              placeholder="Create a password"
              value={password}
              onChange={handlePasswordChange}
              onBlur={() => handleBlur("password")}
              error={errors.password}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-8.5 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="relative">
            <Input
              variant={errors.confirmPassword ? "error" : "filled"}
              size="md"
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              required
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              onBlur={() => handleBlur("confirmPassword")}
              error={errors.confirmPassword}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-8.5 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <Button
            variant={isLoading ? "loading" : "primary"}
            size="lg"
            text={isLoading ? "Creating account..." : "Create account"}
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full mt-2"
          />
        </div>

        <p className="text-sm text-gray-500">
          Already have an account?{" "}
          <a href="/auth/login" className="text-orange-700 hover:text-orange-800 font-medium">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}