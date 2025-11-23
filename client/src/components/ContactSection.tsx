import { useEffect, useState, useRef } from "react";
import { SiInstagram, SiLinkedin, SiGithub } from "react-icons/si";
import { Mail, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SocialLink {
  platform: string;
  url: string;
  icon: React.ReactNode;
  label: string;
}

const socialLinks: SocialLink[] = [
  {
    platform: "github",
    url: "https://github.com",
    icon: <SiGithub className="w-8 h-8" />,
    label: "GitHub",
  },
  {
    platform: "linkedin",
    url: "https://linkedin.com",
    icon: <SiLinkedin className="w-8 h-8" />,
    label: "LinkedIn",
  },
  {
    platform: "instagram",
    url: "https://instagram.com",
    icon: <SiInstagram className="w-8 h-8" />,
    label: "Instagram",
  },
];

export function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 lg:py-32 bg-card/30"
      data-testid="section-contact"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
              Let's Connect
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Feel free to reach out for collaborations, opportunities, or just a friendly chat
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Mail className="w-5 h-5" />
            <a
              href="mailto:hello@example.com"
              className="text-lg hover:text-primary transition-colors"
              data-testid="link-email"
            >
              hello@example.com
            </a>
          </div>

          <div className="flex justify-center gap-6 pt-8">
            {socialLinks.map((link, index) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative ${
                  isVisible ? "animate-bounce-in" : "opacity-0"
                }`}
                style={{
                  animationDelay: `${index * 150}ms`,
                }}
                data-testid={`link-${link.platform}`}
                aria-label={link.label}
              >
                <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-card border-2 border-border flex items-center justify-center text-foreground hover-elevate active-elevate-2 transition-colors duration-300 group-hover:border-primary group-hover:text-primary">
                  {link.icon}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <footer className="mt-20 pt-8 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © 2024 My Portfolio. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Built with React, TypeScript, and Tailwind CSS
            </p>
          </div>
        </div>
      </footer>

      {showScrollTop && (
        <Button
          size="icon"
          className="fixed bottom-8 right-8 rounded-full shadow-lg animate-bounce-in"
          onClick={scrollToTop}
          data-testid="button-scroll-top"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      )}
    </section>
  );
}
