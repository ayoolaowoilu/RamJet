"use client"

import Button from "@/app/components/layout/button";
import Input from "@/app/components/layout/input";
import RamjetLogo from "@/app/components/layout/logo";


export default function Page(){


     return (
         <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50">
              
                   <RamjetLogo />
                   <br />
                   Login Page
                   <br />
                 <Input
  variant="filled" 
  size="md" 
  label="Email" 
  type="email" 
  required 
  disabled
/>

// Error state
<Input 
  variant="error" 
  label="Password" 
  type="password" 
  error="Password must be 8+ characters" 
/>

<Button variant="secondary" size="lg" />
         </div>
     )
}