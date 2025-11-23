import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import developerPhoto from "@assets/generated_images/professional_developer_headshot_portrait.png";

export function HeroSection() {
  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = "/api/cv/download";
    link.download = "Developer_CV.pdf";
    link.click();
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center pt-16"
      data-testid="section-hero"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6 animate-slide-in-left">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold text-foreground leading-tight">
                Hi, I'm{" "}
                <span className="bg-gradient-to-r from-primary via-chart-2 to-chart-3 bg-clip-text text-transparent">
                  John Doe
                </span>
              </h1>
              <p className="text-2xl lg:text-3xl font-semibold text-muted-foreground">
                Full Stack Developer
              </p>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              Passionate about creating elegant solutions to complex problems.
              Specialized in building scalable web applications with modern
              technologies and best practices.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                size="lg"
                onClick={() => {
                  const element = document.getElementById("contact");
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
                data-testid="button-contact"
              >
                Get In Touch
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  const element = document.getElementById("skills");
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
                data-testid="button-view-work"
              >
                View My Work
              </Button>
            </div>
          </div>

          <div className="flex flex-col items-center gap-8">
            <div className="relative animate-slide-up">
              <div className="animate-float">
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-chart-2 to-chart-3 rounded-full blur-2xl opacity-30" />
                
                <div className="relative w-72 h-72 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl">
                  <img
                    src={developerPhoto}
                    alt="Developer"
                    className="w-full h-full object-cover"
                    data-testid="img-developer"
                  />
                </div>

                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-chart-2 to-chart-3 rounded-full blur-xl opacity-60" />
                <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-br from-primary via-chart-1 to-chart-2 rounded-full blur-xl opacity-60" />
              </div>
            </div>

            <Button
              size="lg"
              variant="outline"
              className="gap-2 border-2 animate-fade-in"
              style={{ animationDelay: "1s" }}
              onClick={handleDownloadCV}
              data-testid="button-download-cv"
            >
              <Download className="w-5 h-5" />
              Download CV
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
