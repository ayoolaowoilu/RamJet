"use client"

import { useState } from "react";
import Button from "@/app/components/layout/button";
import Input from "@/app/components/layout/input";
import RamjetLogo from "@/app/components/layout/logo";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Login } from "@/app/lib/fetchrequests";
import { Create_session } from "@/app/lib/session";
import { useSearchParams } from "next/navigation";

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export default function LoginPage() {
  const searchparams = useSearchParams()
  const redirect = searchparams.get("redir")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });
  const [rememberMe, setRememberMe] = useState(false)

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
  };

  const handleEmailBlur = () => {
    setTouched(prev => ({ ...prev, email: true }));
    const error = validateEmail(email);
    setErrors(prev => ({ ...prev, email: error }));
  };

  const handlePasswordBlur = () => {
    setTouched(prev => ({ ...prev, password: true }));
    const error = validatePassword(password);
    setErrors(prev => ({ ...prev, password: error }));
  };

  const handleSubmit = async () => {
    setTouched({ email: true, password: true });

    const emailError = validateEmail(email);
    // const passwordError = validatePassword(password);

    // if (emailError || passwordError) {
    //   setErrors({ email: emailError, password: passwordError });
    //   return;
    // }

    setIsLoading(true);
    setErrors({});

    try {
      const response = await Login({email,password})

      if (response.status_code !== 200){
          setErrors({general:response.message})
          return;
      }

    
   await Create_session(response.token as string,rememberMe ? "LATE" : "EARLY" )
     
     window.location.href = redirect || "/dashboard"


    } catch(error) {
        console.log(error)
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
          <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
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
            variant={errors.email ? "error" : "filled"}
            size="md"
            label="Email"
            type="email"
            required
            placeholder="johndoe@example.com"
            value={email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
            error={errors.email}
          />

          <div className="relative">
            <Input
              variant={errors.password ? "error" : "filled"}
              size="md"
              label="Password"
              type={showPassword ? "text" : "password"}
              required
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
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

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" value={rememberMe ? 1 : 0} onChange={(e)=>{
                    let event = e.target.checked
                    console.log(event)
                    setRememberMe(event)
              }}  className="rounded border-gray-300" />
              <span className="text-gray-600">Remember me</span>
            </label>
            <a href="/forgot-password" className="text-orange-700 hover:text-orange-800 font-medium">
              Forgot password?
            </a>
          </div>

          <Button
            variant={isLoading ? "loading" : "primary"}
            size="lg"
            text={isLoading ? "Signing in..." : "Sign in"}
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full mt-2"
          />
        </div>

        <p className="text-sm text-gray-500">
          Don't have an account?{" "}
          <a href="/auth/register" className="text-orange-700 hover:text-orange-800 font-medium">
            Create one
          </a>
        </p>
      </div>
    </div>
  );
}