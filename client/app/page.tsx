
"use client"
import Button from "./components/layout/button";
import Input from "./components/layout/input";
import RamjetLogo from "./components/layout/logo";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50">
     <Button variant="primary" size="md" text="Submit"  />
<Button variant="loading" size="sm" />
<Button variant="outlined" size="sm" text="Cancel" disabled={true} />
<Button variant="secondary" size="lg" text="Click me" className="ml-4" />

// Default input
<Input placeholder="Enter name" />

// Outlined with label
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

// Filled and disabled
<Input 
  variant="filled" 
  size="sm" 
  label="Username" 
  disabled 
  value="johndoe" 
/>



// Default - medium, animated, with text
<RamjetLogo />

// Small, static
<RamjetLogo size="sm" animated={false} />

// Large, icon only
<RamjetLogo size="lg" showText={false} />

// Extra large with custom class
<RamjetLogo size="xl" className="my-8" />
    </div>
  );
}
