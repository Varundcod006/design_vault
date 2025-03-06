import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Palette, Layout, TrendingUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 noise opacity-[0.03]" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />

        <div className="container relative space-y-20">
          <div className="max-w-[64rem] mx-auto space-y-8 text-center">
            <div className="glow inline-block p-1">
              <div className="glass px-4 py-1.5 rounded-full text-sm font-medium">
                ✨ Your Gateway to Stunning Design
              </div>
            </div>

            <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
              Welcome to the world of
              <span className="text-primary block mt-2">Design</span>
            </h1>

            <p className="max-w-[42rem] mx-auto leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Discover stunning color palettes and get inspired by the latest UI
              design trends. Perfect for designers and developers.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="glow">
                <Link href="/palettes" className="gap-2">
                  Explore Palettes
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="glass">
                <Link href="/inspiration">Get Inspired</Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { label: 'Color Palettes', value: '2,000+' },
              { label: 'UI Designs', value: '5,000+' },
              { label: 'Active Users', value: '10,000+' },
              { label: 'Daily Inspirations', value: '100+' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="glass rounded-lg p-4 text-center space-y-1"
              >
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container space-y-12 py-24 px-24">
        <div className="max-w-[58rem] mx-auto text-center space-y-4">
          <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl">
            Just for you.!
          </h2>
          <p className="text-muted-foreground sm:text-lg">
            Everything you need to create beautiful designs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 m3">
          {[
            {
              icon: Palette,
              title: 'Color Palettes',
              description:
                'Explore thousands of beautiful color combinations curated by designers worldwide.',
            },
            {
              icon: Layout,
              title: 'UI Inspiration',
              description:
                'Get inspired by the latest UI design trends and creative solutions from top designers.',
            },
            {
              icon: TrendingUp,
              title: 'Trending Designs',
              description:
                'Stay updated with the most popular and trending designs in the community.',
            },
          ].map((feature) => (
            <Card
              key={feature.title}
              className="glass group p-6 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="space-y-4">
                <div className="glow inline-block p-0.5 rounded-lg">
                  <div className="glass rounded-lg p-2">
                    <feature.icon className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
