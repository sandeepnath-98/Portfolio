import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Mail, Calendar, User, MessageSquare, LogOut } from "lucide-react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import type { Message } from "@shared/schema";

async function fetchMessages(): Promise<Message[]> {
  const response = await fetch("/api/messages");
  if (response.status === 401) {
    throw new Error("Unauthorized");
  }
  if (!response.ok) throw new Error("Failed to fetch messages");
  return response.json();
}

export default function Messages() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { data: messages = [], isLoading, error } = useQuery({
    queryKey: ["/api/messages"],
    queryFn: fetchMessages,
  });

  useEffect(() => {
    if (error?.message === "Unauthorized") {
      setLocation("/login");
    }
  }, [error, setLocation]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      toast({
        title: "Logged out",
        description: "You have been logged out.",
      });
      setLocation("/");
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to logout.",
        variant: "destructive",
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              className="gap-2"
              onClick={() => setLocation("/")}
              data-testid="button-back"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Portfolio
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={handleLogout}
              disabled={isLoggingOut}
              data-testid="button-logout"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
              Message Inbox
            </h1>
            <p className="text-lg text-muted-foreground">
              {messages.length} {messages.length === 1 ? "message" : "messages"} received
            </p>
          </div>
        </div>

        {error && (
          <Card className="p-6 bg-destructive/10 border-destructive">
            <p className="text-destructive">Failed to load messages. Please try again later.</p>
          </Card>
        )}

        {isLoading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card
                key={i}
                className="p-6 h-40 bg-muted/50 animate-pulse"
                data-testid={`skeleton-message-${i}`}
              />
            ))}
          </div>
        )}

        {!isLoading && messages.length === 0 && (
          <Card className="p-12 text-center space-y-4">
            <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground" />
            <div>
              <h3 className="text-lg font-semibold text-foreground">No messages yet</h3>
              <p className="text-muted-foreground">
                Messages from your portfolio contact form will appear here.
              </p>
            </div>
          </Card>
        )}

        <div className="space-y-4">
          {messages.map((message, index) => (
            <Card
              key={message.id}
              className="p-6 hover-elevate transition-all duration-300 space-y-4"
              data-testid={`message-card-${message.id}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold text-foreground" data-testid={`text-sender-${message.id}`}>
                      {message.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <a
                      href={`mailto:${message.email}`}
                      className="hover:text-primary transition-colors"
                      data-testid={`link-email-${message.id}`}
                    >
                      {message.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <time data-testid={`text-date-${message.id}`}>
                    {formatDate(message.createdAt)}
                  </time>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-foreground" data-testid={`text-subject-${message.id}`}>
                  {message.subject}
                </h4>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap" data-testid={`text-message-${message.id}`}>
                  {message.message}
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  data-testid={`button-reply-${message.id}`}
                >
                  <a href={`mailto:${message.email}?subject=Re: ${encodeURIComponent(message.subject)}`}>
                    Reply
                  </a>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
