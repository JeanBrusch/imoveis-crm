import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export interface HeroSectionProps {
  backgroundImage: string;
  onSearch?: (query: string) => void;
}

export function HeroSection({ backgroundImage, onSearch }: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch?.(searchQuery);
    }
  };

  return (
    <div className="relative h-[80vh] overflow-hidden">
      <img
        src={backgroundImage}
        alt="Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      
      <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-4">
          Find Your Dream Home
        </h1>
        <p className="text-xl md:text-2xl text-center mb-8 max-w-2xl opacity-90">
          Discover luxury properties in the most sought-after locations
        </p>
        
        <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md rounded-lg p-2 flex gap-2">
          <Input
            placeholder="Search by location, property type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1 bg-white text-foreground border-0"
            data-testid="input-search"
          />
          <Button
            onClick={handleSearch}
            size="lg"
            data-testid="button-search"
          >
            <Search className="h-5 w-5 mr-2" />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}
