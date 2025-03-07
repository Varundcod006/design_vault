import React from 'react'
import Image from 'next/image'
// import { Button, Badge } from '@/components/ui'
import {Button} from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Heart } from 'lucide-react'

interface InspirationDetailsProps {
  $id: string
  title: string
  description: string
  image_url: string
  tags: string[]
  isLiked: boolean
  onLike: () => void
}

const InspirationDetails: React.FC<InspirationDetailsProps> = ({
  $id,
  title,
  description,
  image_url,
  tags,
  isLiked,
  onLike,
}) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="relative w-full h-64">
        <Image
          src={image_url}
          alt={title}
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onLike}
          aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={`h-6 w-6 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
        </Button>
      </div>
      <p className="text-muted-foreground">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  )
}

export default InspirationDetails