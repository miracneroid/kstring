import { TweetData } from "@/components/TweetCard";

export const currentUser = {
  name: "Joydeep",
  handle: "joydeep_dev",
  avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Joydeep",
  bio: "Building things with code ✨",
  following: 342,
  followers: 1289,
};

export const mockTweets: TweetData[] = [
  {
    id: "1",
    user: {
      name: "Elon Musk",
      handle: "elonmusk",
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Elon",
      verified: true,
    },
    content: "The algorithm is open source. Transparency is the path to trust. 🚀",
    time: "2h",
    replies: 4523,
    retweets: 12400,
    likes: 89200,
    views: 4500000,
  },
  {
    id: "2",
    user: {
      name: "Sarah Chen",
      handle: "sarahcodes",
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Sarah",
      verified: false,
    },
    content:
      "Just shipped my first open-source project! 🎉\n\nAfter 3 months of late nights, weekends, and way too much coffee — it's finally live.\n\nStar it if you want to support independent devs ⭐",
    time: "4h",
    replies: 87,
    retweets: 234,
    likes: 1456,
    views: 23400,
  },
  {
    id: "3",
    user: {
      name: "TechCrunch",
      handle: "TechCrunch",
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=TechCrunch",
      verified: true,
    },
    content:
      "BREAKING: OpenAI announces GPT-5 with unprecedented reasoning capabilities. The model reportedly scores 95% on the MATH benchmark and passes the bar exam with a near-perfect score.",
    time: "6h",
    replies: 2341,
    retweets: 8932,
    likes: 24500,
    views: 1200000,
  },
  {
    id: "4",
    user: {
      name: "Alex Rivera",
      handle: "alexrivera",
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Alex",
    },
    content:
      "Hot take: TypeScript is the best thing that happened to JavaScript.\n\nI will not be taking questions at this time. 😤",
    time: "8h",
    replies: 342,
    retweets: 567,
    likes: 3421,
    views: 45000,
  },
  {
    id: "5",
    user: {
      name: "NASA",
      handle: "NASA",
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=NASA",
      verified: true,
    },
    content:
      "The James Webb Space Telescope captured stunning new images of the Carina Nebula. The level of detail is absolutely breathtaking. 🌌\n\nThese cosmic cliffs are about 7 light-years high.",
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80",
    time: "10h",
    replies: 1245,
    retweets: 15600,
    likes: 67800,
    views: 8900000,
  },
  {
    id: "6",
    user: {
      name: "Dan Abramov",
      handle: "dan_abramov",
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Dan",
      verified: true,
    },
    content:
      "React Server Components are not a replacement for client components. They're a new tool in your toolbox.\n\nUse them when it makes sense. Don't force everything into one paradigm.",
    time: "12h",
    replies: 456,
    retweets: 1234,
    likes: 5678,
    views: 234000,
  },
  {
    id: "7",
    user: {
      name: "Priya Sharma",
      handle: "priyabuilds",
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Priya",
    },
    content:
      "Day 47 of #100DaysOfCode 🔥\n\nBuilt a full-stack app with Next.js + Prisma + Postgres today. Auth, CRUD, and deployed to Vercel.\n\nFeeling unstoppable.",
    time: "14h",
    replies: 23,
    retweets: 45,
    likes: 312,
    views: 4500,
  },
  {
    id: "8",
    user: {
      name: "The Verge",
      handle: "verge",
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Verge",
      verified: true,
    },
    content:
      "Apple is reportedly working on a foldable iPhone that could launch as early as 2027. The device is said to feature a 7.5-inch display when unfolded.",
    time: "16h",
    replies: 876,
    retweets: 2345,
    likes: 8765,
    views: 567000,
  },
];

export const trendingTopics = [
  { category: "Technology · Trending", title: "#GPT5", posts: "125K" },
  { category: "Trending in India", title: "Next.js", posts: "45.2K" },
  { category: "Programming · Trending", title: "Rust", posts: "34.1K" },
  { category: "Technology · Trending", title: "#OpenSource", posts: "28.3K" },
  { category: "Business · Trending", title: "NVIDIA", posts: "89.4K" },
  { category: "Science · Trending", title: "#SpaceX", posts: "67.8K" },
];

export const suggestedUsers = [
  {
    name: "Guillermo Rauch",
    handle: "raaborhe",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Guillermo",
    verified: true,
  },
  {
    name: "Kent C. Dodds",
    handle: "kentcdodds",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Kent",
    verified: true,
  },
  {
    name: "Cassidy Williams",
    handle: "cassidoo",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Cassidy",
    verified: true,
  },
];
