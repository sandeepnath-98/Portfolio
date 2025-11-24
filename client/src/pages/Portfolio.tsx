import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { SkillsSection } from "@/components/SkillsSection";
import { TimelineSection } from "@/components/TimelineSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { HackathonSection } from "@/components/HackathonSection";
import { HobbiesSection } from "@/components/HobbiesSection";
import { ContactSection } from "@/components/ContactSection";

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <SkillsSection />
      <TimelineSection />
      <ProjectsSection />
      <HackathonSection />
      <HobbiesSection />
      <ContactSection />
    </div>
  );
}
