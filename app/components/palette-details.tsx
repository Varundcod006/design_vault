"use client"

import { Copy, Download, Share2, Paintbrush, Code, Check, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

interface PaletteDetailsProps {
  colors: string[]
}

export function PaletteDetails({ colors }: PaletteDetailsProps) {
  const handleCopyColor = (color: string) => {
    navigator.clipboard.writeText(`#${color}`)
    toast.success(`Color #${color} copied to clipboard!`)
  }

  const handleCopyCSS = () => {
    const css = colors.map((color, index) => `--color-${index + 1}: #${color};`).join('\n')
    navigator.clipboard.writeText(css)
    toast.success('CSS variables copied to clipboard!')
  }

  const handleCopyTailwind = () => {
    const config = `{
  colors: {
${colors.map((color, index) => `    color${index + 1}: '#${color}'`).join(',\n')}
  }
}`
    navigator.clipboard.writeText(config)
    toast.success('Tailwind config copied to clipboard!')
  }

  const handleDownloadPalette = () => {
    const data = {
      colors: colors.map(color => `#${color}`),
      format: "hex",
      name: "My Color Palette",
      creator: "DesignVault"
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'palette.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    toast.success('Palette downloaded successfully!')
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Color Palette</h2>
          <p className="text-sm text-muted-foreground">
            {colors.length} colors in this palette
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={handleDownloadPalette}>
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {colors.map((color, index) => (
          <div
            key={color}
            className="group relative h-24 rounded-lg overflow-hidden"
            style={{ backgroundColor: `#${color}` }}
          >
            <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Palette className="h-4 w-4 text-white" />
                </div>
                <code className="font-mono text-sm bg-white/20 backdrop-blur-sm px-2 py-1 rounded text-white">
                  #{color}
                </code>
              </div>
              <Button
                variant="secondary"
                size="sm"
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/20"
                onClick={() => handleCopyColor(color)}
              >
                <Copy className="h-3 w-3 mr-1" />
                Copy
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Tabs defaultValue="css" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="css" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            CSS Variables
          </TabsTrigger>
          <TabsTrigger value="tailwind" className="flex items-center gap-2">
            <Paintbrush className="h-4 w-4" />
            Tailwind Config
          </TabsTrigger>
        </TabsList>
        <TabsContent value="css" className="space-y-4">
          <div className="relative">
            <pre className="p-4 rounded-lg bg-muted font-mono text-sm overflow-x-auto">
              {colors.map((color, index) => (
                `--color-${index + 1}: #${color};\n`
              ))}
            </pre>
            <Button
              size="sm"
              variant="secondary"
              className="absolute top-2 right-2"
              onClick={handleCopyCSS}
            >
              <Copy className="h-3 w-3 mr-1" />
              Copy
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="tailwind" className="space-y-4">
          <div className="relative">
            <pre className="p-4 rounded-lg bg-muted font-mono text-sm overflow-x-auto">
              {`{
  colors: {
${colors.map((color, index) => `    color${index + 1}: '#${color}'`).join(',\n')}
  }
}`}
            </pre>
            <Button
              size="sm"
              variant="secondary"
              className="absolute top-2 right-2"
              onClick={handleCopyTailwind}
            >
              <Copy className="h-3 w-3 mr-1" />
              Copy
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <div className="pt-4 border-t">
        <h3 className="font-semibold mb-3">Usage Tips</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-500" />
            Click on any color to copy its HEX code
          </li>
          <li className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-500" />
            Use the download button to save the palette
          </li>
          <li className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-500" />
            Copy CSS variables or Tailwind config for your project
          </li>
        </ul>
      </div>
    </div>
  )
}