import Button from "../ui/button";
import RamjetLogo from "../ui/logo";
import { motion  } from "framer-motion";

export default function NavBar(){
   
    return    <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100"
      >
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <RamjetLogo size="md" animated={false} />
        
          </div>
          <div className="flex items-center gap-4">
            <a href="/auth/login" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Sign in
            </a>
            <Button 
              variant="primary" 
              size="sm" 
              text="Get Started" 
              onClick={() => window.location.href = "/auth/register"}
            />
          </div>
        </div>
      </motion.nav>
}