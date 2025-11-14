import { HeroSection } from "@/components/HeroSection";
import { PropertyCard } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MessageCircle } from "lucide-react";
import { useState } from "react";
import { ChatWindow } from "@/components/ChatWindow";
import heroImage from "@assets/generated_images/Modern_apartment_building_exterior_766f1d62.png";
import image1 from "@assets/generated_images/Modern_luxury_home_exterior_45e62a23.png";
import image2 from "@assets/generated_images/Luxury_living_room_interior_f0ec0c2a.png";
import image3 from "@assets/generated_images/Luxury_modern_kitchen_interior_01523308.png";
import realtorAvatar from "@assets/generated_images/Professional_realtor_portrait_d3a2320f.png";

export default function HomePage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<any[]>([]);

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

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-background/80 border-b">
        <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
          <h1 className="text-2xl font-bold font-serif" data-testid="text-logo">
            Elite Estates
          </h1>
          <div className="flex items-center gap-2">
            <Button variant="ghost" data-testid="button-login">
              Login
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="pt-16 md:pt-20">
        <HeroSection
          backgroundImage={heroImage}
          onSearch={(query) => console.log("Search:", query)}
        />

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-semibold font-serif mb-3">
                Featured Properties
              </h2>
              <p className="text-muted-foreground text-lg">
                Explore our handpicked selection of luxury homes
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
        </section>
      </div>

      <Button
        size="lg"
        className="fixed bottom-6 right-6 rounded-full h-14 w-14 shadow-lg"
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
    </div>
  );
}
