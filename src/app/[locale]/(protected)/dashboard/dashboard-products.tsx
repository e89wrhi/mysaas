'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from '@/components/ui/drawer';
import Image from 'next/image';
import { Product } from '@/types';
import { Copy, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface Props {
  products: Product[];
  onDelete?: (id: string) => void;
}

export default function ProductsGrid({ products, onDelete }: Props) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDrawer = (product: Product) => {
    setSelectedProduct(product);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setSelectedProduct(null);
    setIsDrawerOpen(false);
  };

  const handleCopy = (product: Product) => {
    navigator.clipboard.writeText(JSON.stringify(product));
    toast('Product copied!');
  };

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setIsDialogOpen(true);
  };

  const confirmDelete = () => {
    if (!productToDelete?.id) return; // Guard against undefined

    onDelete?.(productToDelete.id); // call parent handler or API
    setIsDialogOpen(false);
    setProductToDelete(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden relative">
            <div
              className="aspect-square relative cursor-pointer"
              onClick={() => handleOpenDrawer(product)}
            >
              <Image
                src={product.image_url}
                alt="Product"
                fill
                className="object-cover"
              />
            </div>

            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Platform: {product.platform}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="flex items-center justify-between">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    product.status === 'ready'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : product.status === 'uploaded'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                  }`}
                >
                  {product.status}
                </span>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="outline">
                      Options
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleCopy(product)}>
                      <Copy className="mr-2 h-4 w-4" /> Copy
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDeleteClick(product)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Drawer for product details */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Product Details</DrawerTitle>
            <DrawerClose onClick={handleCloseDrawer} />
          </DrawerHeader>
          {selectedProduct && (
            <CardContent className="space-y-4">
              <div className="w-full h-64 relative rounded-lg overflow-hidden">
                <Image
                  src={selectedProduct.image_url}
                  alt={selectedProduct.title || ``}
                  fill
                  className="object-cover"
                />
              </div>
              <p>
                <strong>Platform:</strong> {selectedProduct.platform}
              </p>
              <p>
                <strong>Title:</strong> {selectedProduct.title}
              </p>
              <p>
                <strong>Description:</strong>{' '}
                {selectedProduct.description || 'No description'}
              </p>
              <p>
                <strong>Tags:</strong>{' '}
                {selectedProduct.tags?.join(', ') || 'None'}
              </p>
              <p>
                <strong>Category:</strong> {selectedProduct.category || 'N/A'}
              </p>
              <p>
                <strong>Price:</strong>{' '}
                {selectedProduct.price ? `$${selectedProduct.price}` : 'N/A'}
              </p>
              <p>
                <strong>Listing Data:</strong>{' '}
                {selectedProduct.listing_data
                  ? JSON.stringify(selectedProduct.listing_data)
                  : 'N/A'}
              </p>
              <p>
                <strong>Status:</strong> {selectedProduct.status}
              </p>
            </CardContent>
          )}
        </DrawerContent>
      </Drawer>

      {/* ShadCN Delete Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
          </DialogHeader>
          <p className="py-4">
            Are you sure you want to delete{' '}
            <strong>{productToDelete?.title}</strong>?
          </p>
          <DialogFooter className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
