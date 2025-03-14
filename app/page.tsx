'use client'
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Palette, Layout, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Client, Databases, Account} from "appwrite";

interface Stats {
  colorPalettes: number;
  uiDesigns: number;
  activeUsers: number;
  dailyInspirations: number;
}
// import Logo from "../public/Logo/Logo.png"

export default function Home() {
  const [stats, setStats] = useState<Stats>({
    colorPalettes: 0,
    uiDesigns: 0,
    activeUsers: 0,
    dailyInspirations: 0,
  });

  // Appwrite Client and Database Interaction
  const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
    .setProject("67b0397b000fa8add446"); // Your project ID

  const account = new Account(client);
  // const users = new Users(client);

  const databases = new Databases(client);

  const fetchStats = async () => {
    try {
      // Fetch stats from your backend (e.g., Appwrite)
      const ColorPallets = await databases.listDocuments(
        "67b03a08002c73946ffd", // databaseId
        "67b03b1400375893bd39", // collectionId
        [] // queries (optional)
      );

      const Designs = await databases.listDocuments(
        "67b03a08002c73946ffd", // databaseId
        "67b03a24003834d22fb8", // collectionId
        [] // queries (optional)
      );

      // Assuming the result contains the stats data
      const fetchedStats: Stats = {
        colorPalettes: ColorPallets.total || 0,
        uiDesigns: Designs.total || 0,
        activeUsers: ColorPallets.total || 0,
        dailyInspirations: ColorPallets.total || 0,
      };

      setStats(fetchedStats);

    } catch (error) {
      console.error("Error fetching stats data:", error);
    }
  };

  useEffect(() => {
    fetchStats();

    // const getUsers = async () => {
    //   try {
    //     const response = await users.list();
    //     console.log(response); // This will print the list of users
    //   } catch (error) {
    //     console.error("Error listing users:", error);
    //   }
    // }
    // getUsers()

  }, [])


  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center px-4 sm:px-16">
        {/* <div className="absolute inset-0 noise opacity-[0.03]"  />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5"/> */}

        <div className="container relative space-y-20">
          <div className="max-w-[64rem] mx-auto space-y-8 text-center">


            <div data-layer="My Tag" className="MyTag glow" style={{ width: '50%', height: '100%', justifyContent: 'center', alignItems: 'center', gap: 16, display: 'inline-flex', paddingTop: "60px" }}>
              <div data-layer="Profile" className="Profile" style={{
                width: 52, height: 52, position: 'relative', overflow: 'hidden', borderRadius: 100,

              }}>
                <div data-layer="Background" className="Background" style={{
                  width: 52, height: 52, left: 0, top: 0, position: 'absolute', background: 'linear-gradient(156deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 100%)', borderRadius: 9999,

                }} />
                <img data-layer="Image" className="Image" style={{ width: 52, height: 52, left: 1, top: 4, position: 'absolute' }} src={"https://www.figma.com/file/Ziwkb2v67jyEVeYofxYTax/image/f0ba28847fd9686f1caad6da0378f4a9c975b215"} />
              </div>
              <div data-layer="Texts" className="Texts" style={{ width: 166, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 5, display: 'inline-flex' }}>
                <div data-layer="Name" className="Name" style={{ alignSelf: 'stretch', color: 'white', fontSize: 16, textAlign: 'left', fontWeight: '700', wordWrap: 'break-word' }}>Rajendrashinh jadeja</div>
                <div data-layer="username" className="Username" style={{ alignSelf: 'stretch', opacity: 0.60, color: 'white', fontSize: 12, fontWeight: '400', wordWrap: 'break-word', textAlign: "left" }}>@rpjadeja168</div>
              </div>
            </div>


            <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
              Welcome to the world of
              <span className="text-primary block mt-2">Design</span>
            </h1>

            <p className="max-w-[42rem] mx-auto leading-normal text-muted-foreground text-base sm:text-xl sm:leading-8">
              Discover stunning color palettes and get inspired by the latest UI
              design trends. Perfect for designers and developers.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 glow" >
              <Button asChild size="lg" >
                <Link href="/palettes" className="gap-2">
                  Explore Palettes
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="glass">
                <Link href="/inspiration">Get Inspired</Link>
              </Button>
            </div>
            <br className='w-12' />
            <div className="inline-block p-1 mx-auto">
              <div className="glass px-4 py-1.5 rounded-full text-sm font-medium">
                ✨ Your Gateway to Stunning Design
              </div>
            </div>


          </div>
          <hr />

          {/* Stats */}


          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { label: 'Color Palettes', value: stats.colorPalettes },
              { label: 'UI Designs', value: stats.uiDesigns },
              // { label: 'Active Users', value: stats.activeUsers },
              // { label: 'Daily Inspirations', value: stats.dailyInspirations },
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
      <section className="container space-y-12 py-24 px-4 sm:px-8 md:px-16">
        <div className="max-w-[58rem] mx-auto text-center space-y-4 glow">
          <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl">
            Just for you.!
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Everything you need to create beautiful designs
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
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