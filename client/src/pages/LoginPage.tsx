import { useEffect } from "react";
import { LoginForm } from "@/components/LoginForm";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const { login, isLoggingIn, loginError, user } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        setLocation("/admin");
      } else {
        setLocation("/dashboard");
      }
    }
  }, [user, setLocation]);

  // Show error toast
  useEffect(() => {
    if (loginError) {
      toast({
        title: "Erro ao fazer login",
        description: loginError instanceof Error 
          ? loginError.message 
          : "Verifique suas credenciais e tente novamente",
        variant: "destructive",
      });
    }
  }, [loginError, toast]);

  const handleLogin = (data: { email: string; password: string }) => {
    login(data);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-background/80 border-b">
        <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
          <h1 className="text-2xl font-bold font-serif" data-testid="text-logo">
            Elite Estates
          </h1>
          <ThemeToggle />
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 pt-20">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif font-semibold mb-2">
              Bem-vindo de volta
            </h2>
            <p className="text-muted-foreground">
              Faça login para acessar sua conta
            </p>
          </div>

          <LoginForm onSubmit={handleLogin} isLoading={isLoggingIn} />

          <div className="text-center text-sm text-muted-foreground">
            <p className="mb-2">Dados de teste:</p>
            <p>
              <strong>Admin:</strong> admin@imoveiscrm.com / admin123
            </p>
            <p>
              <strong>Cliente:</strong> cliente@exemplo.com / cliente123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
