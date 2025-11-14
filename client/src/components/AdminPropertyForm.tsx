import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, X } from "lucide-react";
import { useState } from "react";

const propertySchema = z.object({
  title: z.string().min(1, "Title is required"),
  location: z.string().min(1, "Location is required"),
  price: z.string().min(1, "Price is required"),
  bedrooms: z.coerce.number().min(1, "At least 1 bedroom"),
  bathrooms: z.coerce.number().min(1, "At least 1 bathroom"),
  area: z.coerce.number().min(1, "Area is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

type PropertyFormData = z.infer<typeof propertySchema>;

export interface AdminPropertyFormProps {
  initialData?: Partial<PropertyFormData>;
  onSubmit: (data: PropertyFormData, images: string[]) => void;
  onCancel?: () => void;
}

export function AdminPropertyForm({
  initialData,
  onSubmit,
  onCancel,
}: AdminPropertyFormProps) {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const form = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: initialData?.title || "",
      location: initialData?.location || "",
      price: initialData?.price || "",
      bedrooms: initialData?.bedrooms || 1,
      bathrooms: initialData?.bathrooms || 1,
      area: initialData?.area || 0,
      description: initialData?.description || "",
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const imageUrls = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setSelectedImages((prev) => [...prev, ...imageUrls]);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (data: PropertyFormData) => {
    onSubmit(data, selectedImages);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Modern Luxury Villa"
                    {...field}
                    data-testid="input-title"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Beverly Hills, CA"
                    {...field}
                    data-testid="input-location"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    placeholder="$2,450,000"
                    {...field}
                    data-testid="input-price"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="area"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Area (sqft)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="3200"
                    {...field}
                    data-testid="input-area"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bedrooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bedrooms</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="4"
                    {...field}
                    data-testid="input-bedrooms"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bathrooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bathrooms</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="3"
                    {...field}
                    data-testid="input-bathrooms"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the property features, amenities, and highlights..."
                  className="min-h-[120px]"
                  {...field}
                  data-testid="input-description"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-3">
          <FormLabel>Property Images</FormLabel>
          <div className="border-2 border-dashed rounded-lg p-8 text-center">
            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-2">
              Drag and drop images or click to upload
            </p>
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="max-w-xs mx-auto"
              data-testid="input-images"
            />
          </div>

          {selectedImages.length > 0 && (
            <div className="grid grid-cols-4 gap-4">
              {selectedImages.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Property ${index + 1}`}
                    className="w-full aspect-square object-cover rounded-md"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeImage(index)}
                    data-testid={`button-remove-image-${index}`}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-3 justify-end">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              data-testid="button-cancel"
            >
              Cancel
            </Button>
          )}
          <Button type="submit" data-testid="button-submit">
            {initialData ? "Update Property" : "Create Property"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
