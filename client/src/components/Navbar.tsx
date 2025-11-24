import { useState, useEffect } from "react";
import { Code2, Menu, X, Sun, Moon, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export function Navbar() {
  const [, setLocation] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return saved ? saved === 'dark' : true;
    }
    return true;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: "Home", id: "home" },
    { label: "Skills", id: "skills" },
    { label: "Timeline", id: "timeline" },
    { label: "Projects", id: "projects" },
    { label: "Hackathons", id: "hackathons" },
    { label: "Hobbies", id: "hobbies" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
      data-testid="navbar"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-3 hover-elevate active-elevate-2 rounded-md px-3 py-2 -ml-3"
            data-testid="button-logo"
          >
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Code2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">My Portfolio</span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Button
                key={link.id}
                variant="ghost"
                onClick={() => scrollToSection(link.id)}
                data-testid={`link-${link.id}`}
              >
                {link.label}
              </Button>
            ))}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLocation("/login")}
              data-testid="button-messages"
              title="View Messages (Admin)"
            >
              <Mail className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
              className="ml-2"
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border-b border-border animate-fade-in" data-testid="mobile-menu">
          <div className="px-6 py-4 space-y-2">
            {navLinks.map((link) => (
              <Button
                key={link.id}
                variant="ghost"
                className="w-full justify-start"
                onClick={() => scrollToSection(link.id)}
                data-testid={`link-mobile-${link.id}`}
              >
                {link.label}
              </Button>
            ))}
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                setLocation("/login");
                setIsMobileMenuOpen(false);
              }}
              data-testid="button-mobile-messages"
            >
              <Mail className="w-5 h-5 mr-2" />
              Messages (Admin)
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={toggleTheme}
              data-testid="button-mobile-theme-toggle"
            >
              {isDark ? (
                <>
                  <Sun className="w-5 h-5 mr-2" />
                  Light Mode
                </>
              ) : (
                <>
                  <Moon className="w-5 h-5 mr-2" />
                  Dark Mode
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}