"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Search, Tags, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { Drawer } from "vaul";
import { InspirationDetails } from "../components/inspiration-details";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Client, Databases, Storage, Query } from "appwrite";

interface DesignInspiration {
  $id: string;
  title: string;
  description: string;
  image_url: string;
  tags: string[];
  likes: number;
  views: number;
}

// Appwrite setup
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67b0397b000fa8add446");

const databases = new Databases(client);
const storage = new Storage(client);

export default function InspirationPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [likedDesigns, setLikedDesigns] = useState<string[]>([]);
  const [designs, setDesigns] = useState<DesignInspiration[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDesign, setSelectedDesign] =
    useState<DesignInspiration | null>(null);

  // Fetch designs from Appwrite
  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const response = await databases.listDocuments(
          "67b03a08002c73946ffd",
          "67b03a24003834d22fb8",
          [Query.orderDesc("$createdAt")]
        );

        // Map the response to match DesignInspiration structure
        const formattedDesigns: DesignInspiration[] = response.documents.map(
          (doc) => ({
            $id: doc.$id,
            title: doc.title,
            description: doc.description,
            image_url: doc.image_url,
            tags: doc.tags,
            likes: doc.likes,
            views: doc.views,
            owner: doc.owner_id,
          })
        );

        setDesigns(formattedDesigns);
        console.log(formattedDesigns);
      } catch (error) {
        toast.error("Failed to fetch designs");
      } finally {
        setLoading(false);
      }
    };

    fetchDesigns();
  }, []);

  const handleLikeDesign = (id: string) => {
    setLikedDesigns((prev) =>
      prev.includes(id)
        ? prev.filter((designId) => designId !== id)
        : [...prev, id]
    );
    toast.success(
      likedDesigns.includes(id)
        ? "Removed from favorites"
        : "Added to favorites"
    );
  };

  const filteredDesigns = designs.filter(
    (design) =>
      design.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      design.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      design.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-8 px-4 sm:px-16 md:px-18 lg:px-24 mx-auto">
      {/* Header Section */}
      <div className="flex flex-col items-center space-y-4 text-center mb-8 sm:mb-16">
        <h1 className="text-3xl sm:text-4xl font-bold">UI Inspiration</h1>
        <p className="text-muted-foreground max-w-[600px] text-sm sm:text-base">
          Get inspired by the latest UI design trends and creative solutions from
          top designers around the world.
        </p>
        <div className="w-full max-w-sm flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search designs..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid auto-rows-[200px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredDesigns.map((design, index) => {
            const isWide = index % 3 === 0;
            const isTall = index % 4 === 0;
            const cardClassName = `
              ${isWide ? "md:col-span-2" : ""} 
              ${isTall ? "row-span-2" : ""} 
              transition-all duration-300
            `;

            return (
              <Card
                key={design.$id}
                className={`${cardClassName} group cursor-pointer overflow-hidden hover:shadow-xl`}
                onClick={() => setSelectedDesign(design)}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={design.image_url}
                    alt={design.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 opacity-100">
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-semibold line-clamp-1">
                            {design.title}
                          </h3>
                          <p className="text-sm text-white/80 line-clamp-1">
                            {design.description}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-white hover:text-white/80"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLikeDesign(design.$id);
                          }}
                        >
                          <Heart
                            className={`h-4 w-4 ${
                              likedDesigns.includes(design.$id)
                                ? "fill-red-500 text-red-500"
                                : ""
                            }`}
                          />
                        </Button>
                      </div>
                      {/* Tags Section (Optional) */}
                      {/* <div className="flex items-center gap-2 overflow-hidden">
                        <Tags className="h-3 w-3 text-white/70 flex-shrink-0" />
                        <div className="flex flex-wrap gap-1 overflow-hidden">
                          {design.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs bg-white/10 hover:bg-white/20 text-white border-none backdrop-blur-sm"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Drawer for Design Details */}
      <Drawer.Root
        open={selectedDesign !== null}
        onOpenChange={(open) => !open && setSelectedDesign(null)}
      >
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content
            className="bg-background flex flex-col rounded-t-[10px] mt-24 fixed bottom-0 left-0 right-0 max-h-[96%]"
            aria-label={
              selectedDesign
                ? `Design Details: ${selectedDesign.title}`
                : "Design Details"
            }
          >
            <div className="p-4 bg-muted/40 rounded-t-[10px] flex-1 overflow-auto">
              <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-muted-foreground/20 mb-8" />
              {selectedDesign && (
                <InspirationDetails
                  {...selectedDesign}
                  isLiked={likedDesigns.includes(selectedDesign.$id)}
                  onLike={() => handleLikeDesign(selectedDesign.$id)}
                />
              )}
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
}