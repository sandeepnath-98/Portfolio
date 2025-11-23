
import { useEffect, useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SiGithub } from "react-icons/si";
import { Star, GitFork, ExternalLink } from "lucide-react";

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  language: string | null;
}

export function ProjectsSection() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Fetch GitHub repositories
    const fetchRepos = async () => {
      try {
        // Replace 'username' with your actual GitHub username
        const response = await fetch('https://api.github.com/users/username/repos?sort=updated&per_page=6');
        const data = await response.json();
        
        // Ensure data is an array before setting state
        if (Array.isArray(data)) {
          setRepos(data);
        } else {
          console.error('GitHub API returned non-array data:', data);
          setRepos([]);
        }
      } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        setRepos([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRepos();

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-20 lg:py-32 relative overflow-hidden"
      data-testid="section-projects"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-chart-1/10 via-primary/5 to-chart-2/10" />
      <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-background/40 to-background/70" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Open source projects and contributions from my GitHub
          </p>
        </div>

        {isLoading ? (
          <div className="flex gap-6 overflow-x-auto pb-4 px-2 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="min-w-[350px] h-[400px] bg-card/50 rounded-2xl animate-pulse flex-shrink-0"
              />
            ))}
          </div>
        ) : (
          <div className="flex gap-6 overflow-x-auto pb-4 px-2 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent hover:scrollbar-thumb-primary/40">
            {repos.map((repo, index) => (
              <Card
                key={repo.id}
                className={`min-w-[350px] max-w-[350px] p-6 space-y-4 hover-elevate transition-all duration-300 flex flex-col flex-shrink-0 ${
                  isVisible ? "animate-scale-in" : "opacity-0"
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
                data-testid={`card-project-${repo.id}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 text-primary">
                    <SiGithub className="w-6 h-6" />
                    <h3 className="text-xl font-bold text-foreground truncate" data-testid={`text-project-name-${repo.id}`}>
                      {repo.name}
                    </h3>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed flex-grow line-clamp-3" data-testid={`text-project-description-${repo.id}`}>
                  {repo.description || "No description available"}
                </p>

                <div className="flex flex-wrap gap-2">
                  {repo.topics.slice(0, 4).map((topic, topicIndex) => (
                    <Badge key={topicIndex} variant="secondary" data-testid={`badge-topic-${repo.id}-${topicIndex}`}>
                      {topic}
                    </Badge>
                  ))}
                  {repo.language && (
                    <Badge variant="outline" data-testid={`badge-language-${repo.id}`}>
                      {repo.language}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    <span>{repo.stargazers_count}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork className="w-4 h-4" />
                    <span>{repo.forks_count}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    asChild
                  >
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={`link-repo-${repo.id}`}
                    >
                      View Code
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </Button>
                  {repo.homepage && (
                    <Button
                      size="sm"
                      className="flex-1"
                      asChild
                    >
                      <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid={`link-demo-${repo.id}`}
                      >
                        Live Demo
                      </a>
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            asChild
            className="gap-2"
          >
            <a
              href="https://github.com/username"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-github-profile"
            >
              <SiGithub className="w-5 h-5" />
              View All Projects on GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
