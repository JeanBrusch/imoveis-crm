import { LoginForm } from "@/components/LoginForm";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function LoginPage() {
  const handleLogin = (data: { email: string; password: string }) => {
    console.log("Login attempt:", data);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-background/80 border-b">
        <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
          <h1 className="text-2xl font-bold font-serif">Elite Estates</h1>
          <ThemeToggle />
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 pt-20">
        <LoginForm onSubmit={handleLogin} />
      </div>
    </div>
  );
}
