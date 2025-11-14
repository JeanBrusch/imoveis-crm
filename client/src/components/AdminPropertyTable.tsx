import { Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

export interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  views: number;
  thumbnail: string;
}

export interface AdminPropertyTableProps {
  properties: Property[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onPreview: (id: string) => void;
}

export function AdminPropertyTable({
  properties,
  onEdit,
  onDelete,
  onPreview,
}: AdminPropertyTableProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = () => {
    if (deleteId) {
      onDelete(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Views</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {properties.map((property) => (
              <TableRow key={property.id} data-testid={`row-property-${property.id}`}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      src={property.thumbnail}
                      alt={property.title}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <p className="font-medium" data-testid={`text-title-${property.id}`}>
                        {property.title}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell data-testid={`text-location-${property.id}`}>
                  {property.location}
                </TableCell>
                <TableCell className="font-semibold" data-testid={`text-price-${property.id}`}>
                  {property.price}
                </TableCell>
                <TableCell>
                  <div className="text-sm text-muted-foreground">
                    {property.bedrooms} bd · {property.bathrooms} ba · {property.area} sqft
                  </div>
                </TableCell>
                <TableCell data-testid={`text-views-${property.id}`}>
                  {property.views}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onPreview(property.id)}
                      data-testid={`button-preview-${property.id}`}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(property.id)}
                      data-testid={`button-edit-${property.id}`}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteId(property.id)}
                      data-testid={`button-delete-${property.id}`}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Property</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this property? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-delete">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-testid="button-confirm-delete"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
