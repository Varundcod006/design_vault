"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trash2, Upload, Save } from "lucide-react"
import { toast } from "sonner"
import { Client, Account, Databases, Storage } from "appwrite"

export default function CreateInspirationPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Initialize Appwrite
  const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("67b0397b000fa8add446")
  const databases = new Databases(client)
  const storage = new Storage(client)
  const account = new Account(client)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      await account.get()
    } catch (error) {
      console.error("Auth error:", error)
      router.push("/login")
      return
    }
  }

  const addTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      if (tags.length < 5) {
        setTags([...tags, tagInput.trim().toLowerCase()])
        setTagInput("")
      } else {
        toast.error("Maximum 5 tags allowed")
      }
    }
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file")
      return
    }

    try {
      const fileId = "unique()"
      const result = await storage.createFile(
        "67b3f86900370ab5c073", // Bucket ID
        fileId,
        file
      )

      const fileUrl = storage.getFileView(
        "67b3f86900370ab5c073",
        result.$id
      )

      // console.log(fileUrl);
      

      setImageUrl(fileUrl)
      toast.success("Image uploaded successfully!")
    } catch (error) {
      console.error("Upload error:", error)
      toast.error("Failed to upload image")
    }
  }

  const saveInspiration = async () => {
    console.log("Adding");
    
    if (!title.trim()) {
      toast.error("Title is required")
      return
    }

    if (!imageUrl) {
      toast.error("Please upload an image")
      return
    }

    if (tags.length === 0) {
      toast.error("Add at least one tag")
      return
    }

    setIsLoading(true)

    console.log(imageUrl);
    try {
      const user = await account.get()
      console.log("Trying");
      
      await databases.createDocument(
        "67b03a08002c73946ffd", // Database ID
        "67b03a24003834d22fb8", // Collection ID for inspirations
        "unique()", 
        {
          title,
          description,
          image_url: imageUrl,
          tags,
          // user_id: user.$id,
          // designer: user.name || "Anonymous",
          likes: 0
        }
      )

      toast.success("Inspiration post saved successfully!")
      router.push("/inspiration")
    } catch (error) {
      console.error("Save error:", error)
      toast.error("Failed to save inspiration post")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container max-w-4xl py-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Create Inspiration Post</h1>
          <p className="text-muted-foreground">
            Share your design work with the community
          </p>
        </div>

        <Card className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
                maxLength={100}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Image</label>
              <div className="flex items-center gap-4">
                <Button asChild variant="outline">
                  <label className="cursor-pointer">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Image
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                </Button>
                {imageUrl && (
                  <span className="text-sm text-muted-foreground">
                    Image uploaded successfully
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Tags</label>
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={addTag}
                placeholder="Add tags (press Enter)"
                maxLength={20}
              />
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => removeTag(tag)}
                  >
                    {tag}
                    <Trash2 className="h-3 w-3 ml-1" />
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <Button 
            onClick={saveInspiration} 
            className="w-full" 
            size="lg"
            disabled={isLoading}
          >
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? "Saving..." : "Save Inspiration"}
          </Button>
        </Card>
      </div>
    </div>
  )
}