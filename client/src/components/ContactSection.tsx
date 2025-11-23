
import { useEffect, useState, useRef } from "react";
import { SiInstagram, SiLinkedin, SiGithub, SiYoutube, SiSpotify } from "react-icons/si";
import { Mail, ArrowUp, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

interface SocialLink {
  platform: string;
  url: string;
  icon: React.ReactNode;
  label: string;
}

const socialLinks: SocialLink[] = [
  {
    platform: "youtube",
    url: "https://youtube.com",
    icon: <SiYoutube className="w-5 h-5" />,
    label: "YouTube",
  },
  {
    platform: "github",
    url: "https://github.com",
    icon: <SiGithub className="w-5 h-5" />,
    label: "GitHub",
  },
  {
    platform: "npmdemon",
    url: "https://npm.io",
    icon: <SiSpotify className="w-5 h-5" />,
    label: "npm.demon",
  },
  {
    platform: "instagram",
    url: "https://instagram.com",
    icon: <SiInstagram className="w-5 h-5" />,
    label: "Instagram",
  },
  {
    platform: "spotify",
    url: "https://spotify.com",
    icon: <SiSpotify className="w-5 h-5" />,
    label: "Spotify",
  },
];

export function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 lg:py-32 bg-background"
      data-testid="section-contact"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl lg:text-6xl font-bold text-foreground">
            Contact Me
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach out!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Side - Contact Form */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-6">
              <Mail className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-bold text-foreground">Send a Message</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-card border-border"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-card border-border"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-foreground">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="What's this about?"
                  value={formData.subject}
                  onChange={handleChange}
                  className="bg-card border-border"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project or idea..."
                  value={formData.message}
                  onChange={handleChange}
                  className="bg-card border-border min-h-[150px]"
                  required
                />
              </div>

              <Button type="submit" size="lg" className="w-full gap-2">
                <Send className="w-5 h-5" />
                Send Message
              </Button>
            </form>
          </div>

          {/* Right Side - Contact Info & Social Links */}
          <div className="space-y-8">
            {/* Email Section */}
            <Card className="p-6 bg-card/50 border-border">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Email</h4>
                  <a
                    href="mailto:hello@example.com"
                    className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
                    data-testid="link-email"
                  >
                    hello@example.com
                  </a>
                </div>
              </div>
            </Card>

            {/* Connect with me */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-foreground">Connect with me</h3>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((link, index) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group ${
                      isVisible ? "animate-fade-in" : "opacity-0"
                    }`}
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                    data-testid={`link-${link.platform}`}
                    aria-label={link.label}
                  >
                    <Card className="p-4 bg-card/50 border-border hover:border-primary hover:bg-card transition-all duration-300 flex items-center gap-3">
                      <div className="text-foreground group-hover:text-primary transition-colors">
                        {link.icon}
                      </div>
                      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {link.label}
                      </span>
                    </Card>
                  </a>
                ))}
              </div>
            </div>

            {/* Open to Work */}
            <Card className="p-6 bg-gradient-to-br from-primary/10 to-chart-2/10 border-primary/20">
              <h3 className="text-xl font-bold text-foreground mb-3">Open to Work</h3>
              <p className="text-muted-foreground leading-relaxed">
                I'm currently looking for exciting opportunities in full-stack development. Direct but minimally-used collaborative open-source projects are also welcome!
              </p>
            </Card>
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
