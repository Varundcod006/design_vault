"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { HexColorPicker } from "react-colorful"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trash2, Plus, Save } from "lucide-react"
import { toast } from "sonner"
import { Client, Account, Databases } from "appwrite"

export default function CreatePalettePage() {
  const [colors, setColors] = useState<string[]>(["#000000"])
  const [currentColor, setCurrentColor] = useState("#000000")
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Initialize Appwrite
  const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("67b0397b000fa8add446")
  const databases = new Databases(client)
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

  const addColor = () => {
    if (colors.length < 6) {
      setColors([...colors, currentColor])
    } else {
      toast.error("Maximum 6 colors allowed in a palette")
    }
  }

  const removeColor = (index: number) => {
    setColors(colors.filter((_, i) => i !== index))
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
    setTags(tags.filter((t) => t !== tag))
  }

  const savePalette = async () => {
    if (colors.length < 2) {
      toast.error("Add at least 2 colors to the palette")
      return
    }

    if (tags.length === 0) {
      toast.error("Add at least one tag")
      return
    }

    setIsLoading(true)

    try {
      const user = await account.get()
      
      // Remove '#' from colors before saving
      const formattedColors = colors.map(color => color.replace("#", ""))
      
      await databases.createDocument(
        "67b03a08002c73946ffd", // Database ID
        "67b03b1400375893bd39", // Collection ID for palettes
        "unique()", 
        {
          Colors: formattedColors,
          Tags: tags,
          // user_id: user.$id,
          Likes: 0
        }
      )

      toast.success("Palette saved successfully!")
      router.push("/palettes")
    } catch (error) {
      console.error("Save error:", error)
      toast.error("Failed to save palette")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container max-w-4xl py-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Create Color Palette</h1>
          <p className="text-muted-foreground">
            Create a beautiful color palette by adding up to 6 colors
          </p>
        </div>

        <Card className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 space-y-4">
                <HexColorPicker
                  color={currentColor}
                  onChange={setCurrentColor}
                />
                <div className="flex gap-2">
                  <Input
                    value={currentColor}
                    onChange={(e) => setCurrentColor(e.target.value)}
                    className="font-mono"
                  />
                  <Button onClick={addColor} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex-1">
                <div className="space-y-2">
                  {colors.map((color, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-2 rounded-md"
                      style={{ backgroundColor: color }}
                    >
                      <div className="flex-1 bg-background/90 backdrop-blur-sm rounded px-2 py-1">
                        <code className="text-sm font-mono">{color}</code>
                      </div>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => removeColor(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
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
            onClick={savePalette} 
            className="w-full" 
            size="lg"
            disabled={isLoading}
          >
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? "Saving..." : "Save Palette"}
          </Button>
        </Card>
      </div>
    </div>
  )
}