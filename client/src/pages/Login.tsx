import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Lock, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [, setLocation] = useLocation();
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        toast({
          title: "Login successful",
          description: "Redirecting to messages...",
        });
        setTimeout(() => setLocation("/messages"), 500);
      } else {
        toast({
          title: "Invalid password",
          description: "Please try again.",
          variant: "destructive",
        });
        setPassword("");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to login. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <Lock className="w-6 h-6 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Admin Access</h1>
          <p className="text-muted-foreground">
            Enter your password to access the messages section
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="text-sm font-medium text-foreground">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 bg-card border-border"
              required
              disabled={isLoading}
              data-testid="input-password"
            />
          </div>

          <Button
            type="submit"
            className="w-full gap-2"
            disabled={isLoading}
            data-testid="button-login"
          >
            <LogIn className="w-4 h-4" />
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="pt-4 border-t border-border">
          <Button
            variant="ghost"
            className="w-full"
            onClick={() => setLocation("/")}
            data-testid="button-back-to-portfolio"
          >
            Back to Portfolio
          </Button>
        </div>
      </Card>
    </div>
  );
}
