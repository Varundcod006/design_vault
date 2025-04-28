"use client";

import Image from "next/image";
import { ExternalLink, Heart, Tags, Calendar, Eye, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import type { NextApiRequest, NextApiResponse } from 'next';
import { Client, Users } from 'node-appwrite';

interface UserDetails {
  name?: string;
  email?: string;
  $id: string;
  prefs?: {
    website?: string;
  };
}

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
  owner?: string;
}

// Initialize Appwrite client
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
  .setProject('67b0397b000fa8add446')
  .setKey('standard_cadaa2e60f26d335ebf33e1ec18e4d335cca05795637b13f0776ac1bb0d8017e2a159b53352538543c6c64c4f7d420ce333a0b9d5c623d7035d0c59eda8bb2298ef017784358af71557e4e85862630bf7b0e1ce1435bbd3fe51577db05f6bf87e032c010f7ff1ec72b385415a5459503a2031d934c05ff86fd47b9f7c3f5ebf4');

const users = new Users(client);

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
  owner,
}: InspirationDetailsProps) {
  const [ownerDetails, setOwnerDetails] = useState<UserDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    onView?.();
  }, [onView]);

  useEffect(() => {
    const fetchOwnerDetails = async () => {
      if (!owner) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        console.log('Fetching owner details for:', owner);
        
        // Use the users API to get specific user details
        const res = await users.get(owner);
        console.log('Received owner details:', res);
        
        setOwnerDetails(res);
      } catch (error) {
        console.error('Error fetching owner details:', error);
        setError('Failed to load author details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOwnerDetails();
  }, [owner]);

  const formatCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count;
  };

  const ExternalLinkButton = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Button className="gap-2" variant="outline" asChild>
      <a href={href} target="_blank" rel="noopener noreferrer">
        <ExternalLink className="h-4 w-4" />
        {children}
      </a>
    </Button>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 px-4 sm:px-6 lg:px-8">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg">
        <Image
          src={image_url}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="space-y-6">
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
                className={`h-5 w-5 ${isLiked ? "fill-current text-red-500" : ""}`}
              />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Share">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          {description}
        </p>

        {/* Author Section with Loading and Error States */}
        <div className="flex items-center justify-between py-4 border-t">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Author:</span>
            {isLoading ? (
              <span className="text-muted-foreground">Loading...</span>
            ) : error ? (
              <span className="text-red-500">{error}</span>
            ) : ownerDetails ? (
              <span>{ownerDetails.name || 'Anonymous'}</span>
            ) : (
              <span className="text-muted-foreground">No author information</span>
            )}
          </div>
          {ownerDetails?.prefs?.website && !isLoading && !error && (
            <ExternalLinkButton href={ownerDetails.prefs.website}>
              Visit Author's Website
            </ExternalLinkButton>
          )}
        </div>

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

        <div className="flex justify-end">
          <ExternalLinkButton href={image_url}>
            View Full Size
          </ExternalLinkButton>
        </div>
      </div>
    </div>
  );
}