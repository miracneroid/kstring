"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Image as ImageIcon,
  ListOrdered,
  Smile,
  CalendarClock,
  MapPin,
} from "lucide-react";
import TweetCard from "@/components/TweetCard";
import { currentUser, mockTweets } from "@/lib/mock-data";
import { useState } from "react";

export default function MainFeed() {
  const [activeTab, setActiveTab] = useState<"foryou" | "following">("foryou");
  const [tweetText, setTweetText] = useState("");

  const composeActions = [
    { icon: ImageIcon, label: "Media", color: "#1d9bf0" },
    { icon: ListOrdered, label: "Poll", color: "#1d9bf0" },
    { icon: Smile, label: "Emoji", color: "#1d9bf0" },
    { icon: CalendarClock, label: "Schedule", color: "#1d9bf0" },
    { icon: MapPin, label: "Location", color: "#1d9bf0" },
  ];

  return (
    <main className="border-x border-border min-h-screen w-full max-w-[600px]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-md">
        {/* Title Bar */}
        <div className="px-4 pt-3 pb-0">
          <h1 className="text-[20px] font-bold text-foreground">Home</h1>
        </div>

        {/* Tabs */}
        <div className="flex mt-1">
          <button
            className={`flex-1 text-center py-3 text-[15px] font-medium relative transition-colors hover:bg-white/[0.03] cursor-pointer ${
              activeTab === "foryou" ? "text-foreground font-bold" : "text-muted-foreground"
            }`}
            onClick={() => setActiveTab("foryou")}
          >
            For you
            {activeTab === "foryou" && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-[#1d9bf0] rounded-full" />
            )}
          </button>
          <button
            className={`flex-1 text-center py-3 text-[15px] font-medium relative transition-colors hover:bg-white/[0.03] cursor-pointer ${
              activeTab === "following"
                ? "text-foreground font-bold"
                : "text-muted-foreground"
            }`}
            onClick={() => setActiveTab("following")}
          >
            Following
            {activeTab === "following" && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-[#1d9bf0] rounded-full" />
            )}
          </button>
        </div>
        <Separator />
      </div>

      {/* Compose Tweet */}
      <div className="flex gap-3 px-4 py-3 border-b border-border">
        <Avatar className="h-10 w-10 shrink-0 mt-1">
          <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
          <AvatarFallback className="bg-[#1d9bf0]/20 text-[#1d9bf0] font-semibold">
            {currentUser.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <textarea
            placeholder="What is happening?!"
            value={tweetText}
            onChange={(e) => setTweetText(e.target.value)}
            className="w-full bg-transparent text-[20px] text-foreground placeholder:text-muted-foreground resize-none border-0 outline-none py-2 min-h-[52px]"
            rows={1}
          />
          <Separator className="mb-3" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 -ml-2">
              {composeActions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.label}
                    className="p-2 rounded-full hover:bg-[#1d9bf0]/10 transition-colors cursor-pointer"
                    title={action.label}
                  >
                    <Icon
                      className="h-5 w-5"
                      style={{ color: action.color }}
                    />
                  </button>
                );
              })}
            </div>
            <Button
              className={`bg-[#1d9bf0] hover:bg-[#1a8cd8] text-white font-bold rounded-full px-5 h-9 text-[15px] cursor-pointer ${
                !tweetText.trim() ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!tweetText.trim()}
            >
              Post
            </Button>
          </div>
        </div>
      </div>

      {/* Show something between compose and tweets */}
      <button className="w-full py-3 text-[15px] text-[#1d9bf0] hover:bg-white/[0.03] transition-colors border-b border-border cursor-pointer">
        Show 42 posts
      </button>

      {/* Tweet Feed */}
      <div>
        {mockTweets.map((tweet) => (
          <TweetCard key={tweet.id} tweet={tweet} />
        ))}
      </div>
    </main>
  );
}
