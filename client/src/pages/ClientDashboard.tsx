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
import { PropertyCard } from "@/components/PropertyCard";
import { ChatWindow } from "@/components/ChatWindow";
import { Button } from "@/components/ui/button";
import { Home, Heart, MessageCircle, LogOut, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import image1 from "@assets/generated_images/Modern_luxury_home_exterior_45e62a23.png";
import image2 from "@assets/generated_images/Luxury_living_room_interior_f0ec0c2a.png";
import image3 from "@assets/generated_images/Luxury_modern_kitchen_interior_01523308.png";
import realtorAvatar from "@assets/generated_images/Professional_realtor_portrait_d3a2320f.png";

export default function ClientDashboard() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const mockProperties = [
    {
      id: "1",
      title: "Modern Luxury Villa",
      location: "Beverly Hills, CA",
      price: "$2,450,000",
      images: [image1, image2, image3],
      bedrooms: 4,
      bathrooms: 3,
      area: 3200,
      views: 156,
    },
    {
      id: "2",
      title: "Downtown Penthouse",
      location: "Manhattan, NY",
      price: "$3,200,000",
      images: [image2, image1, image3],
      bedrooms: 3,
      bathrooms: 2,
      area: 2400,
      views: 234,
    },
    {
      id: "3",
      title: "Beachfront Estate",
      location: "Malibu, CA",
      price: "$5,800,000",
      images: [image3, image2, image1],
      bedrooms: 5,
      bathrooms: 4,
      area: 4500,
      views: 342,
    },
    {
      id: "4",
      title: "Urban Loft",
      location: "Brooklyn, NY",
      price: "$1,850,000",
      images: [image2, image3, image1],
      bedrooms: 2,
      bathrooms: 2,
      area: 1800,
      views: 89,
    },
    {
      id: "5",
      title: "Mountain Retreat",
      location: "Aspen, CO",
      price: "$4,200,000",
      images: [image1, image3, image2],
      bedrooms: 6,
      bathrooms: 5,
      area: 5200,
      views: 198,
    },
    {
      id: "6",
      title: "Coastal Villa",
      location: "Miami Beach, FL",
      price: "$3,750,000",
      images: [image3, image1, image2],
      bedrooms: 4,
      bathrooms: 3,
      area: 3800,
      views: 276,
    },
  ];

  const handleSendMessage = (message: string) => {
    const newMessage = {
      id: Date.now().toString(),
      text: message,
      sender: "client" as const,
      timestamp: new Date(),
    };
    setChatMessages((prev) => [...prev, newMessage]);

    setTimeout(() => {
      const realtorMessage = {
        id: (Date.now() + 1).toString(),
        text: "Thank you for your message! I'll get back to you shortly.",
        sender: "realtor" as const,
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, realtorMessage]);
    }, 1000);
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
                Elite Estates
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="#" data-testid="link-browse">
                        <Home className="h-4 w-4" />
                        <span>Browse Properties</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="#" data-testid="link-favorites">
                        <Heart className="h-4 w-4" />
                        <span>Favorites</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="#" data-testid="link-messages">
                        <MessageCircle className="h-4 w-4" />
                        <span>Messages</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="#" data-testid="link-logout">
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="flex flex-col flex-1">
          <header className="flex items-center justify-between p-4 border-b gap-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger data-testid="button-sidebar-toggle" />
            </div>
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search properties..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                  data-testid="input-search"
                />
              </div>
            </div>
            <ThemeToggle />
          </header>

          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              <div>
                <h1 className="text-3xl font-semibold font-serif">
                  Explore Properties
                </h1>
                <p className="text-muted-foreground mt-1">
                  Discover your perfect home from our curated collection
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    {...property}
                    onLike={(id, liked) =>
                      console.log(`Property ${id} liked: ${liked}`)
                    }
                    onClick={(id) => console.log(`Property ${id} clicked`)}
                  />
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>

      <Button
        size="lg"
        className="fixed bottom-6 right-6 rounded-full h-14 w-14 shadow-lg z-50"
        onClick={() => setIsChatOpen(true)}
        data-testid="button-open-chat"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      <ChatWindow
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        realtorName="Sarah Johnson"
        realtorAvatar={realtorAvatar}
        realtorOnline={true}
        messages={chatMessages}
        onSendMessage={handleSendMessage}
      />
    </SidebarProvider>
  );
}
