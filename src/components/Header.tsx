
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/90 backdrop-blur-sm sticky top-0 z-40 w-full border-b border-border/40">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center">
            <div className="bg-gradient-to-r from-bizpurple-400 to-bizblue-400 h-8 w-8 rounded-md flex items-center justify-center text-white font-bold mr-2">
              BW
            </div>
            <span className="font-semibold text-xl tracking-tight text-bizblue-600">BizWhisper</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground">
            Home
          </Link>
          <Link to="/chat" className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground">
            Chat
          </Link>
        </nav>
        
        <div className="hidden md:flex items-center gap-4">
          <Link to="/login">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>
          <Link to="/signup">
            <Button variant="default" size="sm" className="bg-gradient-to-r from-bizpurple-500 to-bizblue-500 hover:from-bizpurple-600 hover:to-bizblue-600">
              Sign Up
            </Button>
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-border/40 py-4 z-50">
          <div className="container flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/chat" 
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Chat
            </Link>
            <div className="pt-2 flex flex-col space-y-2">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" size="sm" className="w-full">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                <Button variant="default" size="sm" className="w-full bg-gradient-to-r from-bizpurple-500 to-bizblue-500 hover:from-bizpurple-600 hover:to-bizblue-600">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
