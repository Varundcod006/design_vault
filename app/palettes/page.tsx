'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Copy, Heart, Search, Tags } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Drawer } from 'vaul';
import { PaletteDetails } from '../components/palette-details';
import { Plus } from 'lucide-react';
import Link from 'next/link';

import { Client, Databases } from 'appwrite';

interface ColorPalette {
  id: string;
  colors: string[];
  tags: string[];
  likes?: number; // Optional likes for future use
}

export default function PalettesPage() {
  const [colorPalettes, setColorPalettes] = useState<ColorPalette[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [likedPalettes, setLikedPalettes] = useState<string[]>([]); // Using string ids
  const [selectedPalette, setSelectedPalette] = useState<ColorPalette | null>(
    null
  );

  const handleCopyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    toast.success(`Color ${color} copied to clipboard!`);
  };

  const handleCopyPalette = (colors: string[]) => {
    navigator.clipboard.writeText(colors.join(', '));
    toast.success('Palette copied to clipboard!');
  };

  const handleLikePalette = (id: string) => {
    setLikedPalettes((prev) =>
      prev.includes(id)
        ? prev.filter((paletteId) => paletteId !== id)
        : [...prev, id]
    );
    toast.success(
      likedPalettes.includes(id)
        ? 'Removed from favorites'
        : 'Added to favorites'
    );
  };

  const filteredPalettes = colorPalettes.filter((palette) =>
    palette.tags.some((tag) =>
      tag.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Appwrite Client and Database Interaction
  const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('67b0397b000fa8add446'); // Your project ID

  const databases = new Databases(client);

  const fetchPalettes = async () => {
    try {
      const result = await databases.listDocuments(
        '67b03a08002c73946ffd', // databaseId
        '67b03b1400375893bd39', // collectionId
        [] // queries (optional)
      );

      // Map the result documents into the ColorPalette format
      const fetchedPalettes: ColorPalette[] = result.documents.map(
        (doc: any) => ({
          id: doc.$id, // Use $id as the unique ID
          colors: doc.Colors || [], // "Colors" field from the response
          tags: doc.Tags || [], // "Tags" field from the response
          likes: doc.likes || 0, // Optional likes field, you can ignore if not needed
        })
      );

      setColorPalettes(fetchedPalettes);
    } catch (error) {
      console.error('Error fetching data from Appwrite:', error);
      toast.error('Failed to fetch palettes.');
    }
  };

  useEffect(() => {
    fetchPalettes();
  }, []);

  return (
    <div className="container py-8 px-24">
      <div className="flex flex-col items-center space-y-4 text-center mb-8">
        <h1 className="text-4xl font-bold">Color Palettes</h1>
        <p className="text-muted-foreground max-w-[600px]">
          Discover beautiful color combinations for your next project. Browse
          through our curated collection of color palettes.
        </p>
        <div className="w-full max-w-sm flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by tags..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {/* <Button asChild>
            <Link href="/create/palette" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Palette
            </Link>
          </Button> */}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPalettes.map((palette) => (
          <Card
            key={palette.id}
            className="p-4 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedPalette(palette)}
          >
            <div className="flex h-32 rounded-md overflow-hidden mb-4">
              {palette.colors.map((color, index) => (
                <div
                  key={index}
                  className="flex-1 relative group cursor-pointer transition-transform hover:scale-105"
                  style={{ backgroundColor: `#${color}` }} // Ensure color is prefixed with '#'
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopyColor(`#${color}`);
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 transition-opacity">
                    <span className="text-white text-sm font-mono bg-black/70 px-2 py-1 rounded">
                      #{color}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex flex-wrap gap-1">
                {palette.colors.map((color, index) => (
                  <code
                    key={index}
                    className="text-xs font-mono cursor-pointer hover:text-primary transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyColor(`#${color}`);
                    }}
                  >
                    #{color}
                  </code>
                ))}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopyPalette(palette.colors);
                  }}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLikePalette(palette.id);
                  }}
                >
                  <Heart
                    className={`h-4 w-4 ${
                      likedPalettes.includes(palette.id)
                        ? 'fill-current text-red-500'
                        : ''
                    }`}
                  />
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Tags className="h-4 w-4 text-muted-foreground" />
              <div className="flex flex-wrap gap-1">
                {palette.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Drawer.Root
        open={selectedPalette !== null}
        onOpenChange={(open) => !open && setSelectedPalette(null)}
      >
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content
            className="bg-background flex flex-col rounded-t-[10px] mt-24 fixed bottom-0 left-0 right-0 max-h-[96%]"
            aria-label="Color Palette Details"
          >
            <div className="p-4 bg-muted/40 rounded-t-[10px] flex-1 overflow-auto">
              <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-muted-foreground/20 mb-8" />
              {selectedPalette && (
                <PaletteDetails colors={selectedPalette.colors} />
              )}
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
}