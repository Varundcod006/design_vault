"use client";

import Image from "next/image";
import { ExternalLink, Heart, Tags, Calendar, Eye, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useEffect } from "react";

interface InspirationDetailsProps {
  $id: string;
  title: string;
  description: string;
  image_url: string;
  tags: string[];
  likes: number;
  views: number;
  isLiked: boolean;
  onLike: () => void;
  onView?: () => void;
  $createdAt?: string;
}

export function InspirationDetails({
  title,
  description,
  image_url,
  tags,
  likes,
  views,
  isLiked,
  onLike,
  onView,
  $createdAt,
}: InspirationDetailsProps) {
  // Track views on component mount
  useEffect(() => {
    onView?.();
  }, [onView]);

  const formatCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 px-4 sm:px-6 lg:px-8">
      {/* Image Section */}
      <div className="relative aspect-video w-full overflow-hidden rounded-lg">
        <Image
          src={image_url}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content Section */}
      <div className="space-y-6">
        {/* Title and Actions */}
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4 sm:gap-6">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-bold">{title}</h2>
            {$createdAt && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {format(new Date($createdAt), "MMMM d, yyyy")}
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onLike}
              aria-label={isLiked ? "Unlike" : "Like"}
            >
              <Heart
                className={`h-5 w-5 ${
                  isLiked ? "fill-current text-red-500" : ""
                }`}
              />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Share">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Description */}
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          {description}
        </p>

        {/* Likes and Views */}
        <div className="flex items-center gap-4 py-4 border-y">
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-red-500" />
            <span className="text-sm font-medium">
              {formatCount(likes)} {likes === 1 ? "like" : "likes"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">
              {formatCount(views)} {views === 1 ? "view" : "views"}
            </span>
          </div>
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <h3 className="font-semibold">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-sm">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* View Full Size Button */}
        <div className="flex justify-end">
          <Button className="gap-2" asChild>
            <a href={image_url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              View Full Size
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}