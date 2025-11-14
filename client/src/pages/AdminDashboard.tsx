import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AdminPropertyTable } from "@/components/AdminPropertyTable";
import { AdminPropertyForm } from "@/components/AdminPropertyForm";
import { Button } from "@/components/ui/button";
import { Home, LayoutDashboard, Plus, LogOut } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";
import image1 from "@assets/generated_images/Modern_luxury_home_exterior_45e62a23.png";
import image2 from "@assets/generated_images/Luxury_living_room_interior_f0ec0c2a.png";
import image3 from "@assets/generated_images/Luxury_modern_kitchen_interior_01523308.png";

function AdminDashboardContent() {
  const { user, logout } = useAuth();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<string | null>(null);

  const mockProperties = [
    {
      id: "1",
      title: "Modern Luxury Villa",
      location: "Beverly Hills, CA",
      price: "$2,450,000",
      bedrooms: 4,
      bathrooms: 3,
      area: 3200,
      views: 156,
      thumbnail: image1,
    },
    {
      id: "2",
      title: "Downtown Penthouse",
      location: "Manhattan, NY",
      price: "$3,200,000",
      bedrooms: 3,
      bathrooms: 2,
      area: 2400,
      views: 234,
      thumbnail: image2,
    },
    {
      id: "3",
      title: "Beachfront Estate",
      location: "Malibu, CA",
      price: "$5,800,000",
      bedrooms: 5,
      bathrooms: 4,
      area: 4500,
      views: 342,
      thumbnail: image3,
    },
  ];

  const handleEdit = (id: string) => {
    setEditingProperty(id);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (data: any, images: string[]) => {
    console.log("Property saved:", data, images);
    setIsFormOpen(false);
    setEditingProperty(null);
  };

  const sidebarStyle = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "4rem",
  };

  return (
    <SidebarProvider style={sidebarStyle as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-lg font-serif px-4 py-3">
                Elite Estates Admin
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="#" data-testid="link-dashboard">
                        <LayoutDashboard className="h-4 w-4" />
                        <span>Dashboard</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="#" data-testid="link-properties">
                        <Home className="h-4 w-4" />
                        <span>Properties</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => logout()} data-testid="button-logout">
                      <LogOut className="h-4 w-4" />
                      <span>Sair</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="flex flex-col flex-1">
          <header className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-4">
              <SidebarTrigger data-testid="button-sidebar-toggle" />
              <div>
                <p className="text-sm text-muted-foreground">
                  Bem-vindo, <span className="font-medium text-foreground">{user?.name || user?.email}</span>
                </p>
              </div>
            </div>
            <ThemeToggle />
          </header>

          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-semibold font-serif">Propriedades</h1>
                  <p className="text-muted-foreground mt-1">
                    Gerencie seus anúncios de imóveis
                  </p>
                </div>
                <Button
                  onClick={() => setIsFormOpen(true)}
                  data-testid="button-add-property"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Imóvel
                </Button>
              </div>

              <AdminPropertyTable
                properties={mockProperties}
                onEdit={handleEdit}
                onDelete={(id) => console.log("Delete:", id)}
                onPreview={(id) => console.log("Preview:", id)}
              />
            </div>
          </main>
        </div>
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">
              {editingProperty ? "Editar Imóvel" : "Adicionar Novo Imóvel"}
            </DialogTitle>
          </DialogHeader>
          <AdminPropertyForm
            onSubmit={handleFormSubmit}
            onCancel={() => {
              setIsFormOpen(false);
              setEditingProperty(null);
            }}
          />
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
}

export default function AdminDashboard() {
  return (
    <ProtectedRoute requiredRole="admin">
      <AdminDashboardContent />
    </ProtectedRoute>
  );
}
