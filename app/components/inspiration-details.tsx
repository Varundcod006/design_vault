"use client"

import Image from "next/image"
import { ExternalLink, Heart, Tags, Calendar, Eye, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

interface InspirationDetailsProps {
  $id: string
  title: string
  description: string
  image_url: string
  tags: string[]
  likes: number
  isLiked: boolean
  onLike: () => void
  $createdAt?: string
}

export function InspirationDetails({
  title,
  description,
  image_url,
  tags,
  likes,
  isLiked,
  onLike,
  $createdAt
}: InspirationDetailsProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg">
        <Image
          src={image_url}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold">{title}</h2>
            {$createdAt && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {format(new Date($createdAt), 'MMMM d, yyyy')}
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onLike}
            >
              <Heart 
                className={`h-5 w-5 ${isLiked ? "fill-current text-red-500" : ""}`}
              />
            </Button>
            <Button variant="ghost" size="icon">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <p className="text-lg text-muted-foreground leading-relaxed">
          {description}
        </p>

        <div className="flex items-center gap-4 py-4 border-y">
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-red-500" />
            <span className="text-sm font-medium">{likes} likes</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">1.2k views</span>
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
          <Button className="gap-2">
            <ExternalLink className="h-4 w-4" />
            View Full Size
          </Button>
        </div>
      </div>
    </div>
  )
}