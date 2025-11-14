import { Heart, Eye, MapPin, Bed, Bath, Maximize } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export interface PropertyCardProps {
  id: string;
  title: string;
  location: string;
  price: string;
  images: string[];
  bedrooms: number;
  bathrooms: number;
  area: number;
  views: number;
  isLiked?: boolean;
  onLike?: (id: string, liked: boolean) => void;
  onClick?: (id: string) => void;
}

export function PropertyCard({
  id,
  title,
  location,
  price,
  images,
  bedrooms,
  bathrooms,
  area,
  views,
  isLiked: initialLiked = false,
  onLike,
  onClick,
}: PropertyCardProps) {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    onLike?.(id, newLikedState);
  };

  const handleCardClick = () => {
    onClick?.(id);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Card
      className="overflow-hidden hover-elevate cursor-pointer"
      onClick={handleCardClick}
      data-testid={`card-property-${id}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={images[currentImageIndex]}
          alt={title}
          className="w-full h-full object-cover"
          data-testid={`img-property-${id}`}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-3 right-3 backdrop-blur-md bg-white/30 rounded-full hover:bg-white/50 ${
            isLiked ? "text-red-500" : "text-white"
          }`}
          onClick={handleLike}
          data-testid={`button-like-${id}`}
        >
          <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
        </Button>

        <div className="absolute bottom-3 left-3 flex items-center gap-2 backdrop-blur-sm bg-black/30 text-white px-2 py-1 rounded-md">
          <Eye className="h-3 w-3" />
          <span className="text-xs font-medium" data-testid={`text-views-${id}`}>
            {views}
          </span>
        </div>

        {images.length > 1 && (
          <>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
              {images.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === currentImageIndex
                      ? "w-6 bg-white"
                      : "w-1.5 bg-white/50"
                  }`}
                />
              ))}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 backdrop-blur-md bg-black/20 text-white rounded-full h-8 w-8 hover:bg-black/40"
              onClick={prevImage}
              data-testid={`button-prev-image-${id}`}
            >
              ‹
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 backdrop-blur-md bg-black/20 text-white rounded-full h-8 w-8 hover:bg-black/40"
              onClick={nextImage}
              data-testid={`button-next-image-${id}`}
            >
              ›
            </Button>
          </>
        )}
      </div>

      <div className="p-6 space-y-3">
        <div className="space-y-1">
          <h3 className="font-serif text-2xl font-medium" data-testid={`text-title-${id}`}>
            {title}
          </h3>
          <div className="flex items-center text-muted-foreground gap-1">
            <MapPin className="h-4 w-4" />
            <span className="text-sm" data-testid={`text-location-${id}`}>{location}</span>
          </div>
        </div>

        <div className="text-3xl font-bold text-primary" data-testid={`text-price-${id}`}>
          {price}
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground border-t pt-3">
          <div className="flex items-center gap-1" data-testid={`text-bedrooms-${id}`}>
            <Bed className="h-4 w-4" />
            <span>{bedrooms} bd</span>
          </div>
          <div className="flex items-center gap-1" data-testid={`text-bathrooms-${id}`}>
            <Bath className="h-4 w-4" />
            <span>{bathrooms} ba</span>
          </div>
          <div className="flex items-center gap-1" data-testid={`text-area-${id}`}>
            <Maximize className="h-4 w-4" />
            <span>{area} sqft</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
