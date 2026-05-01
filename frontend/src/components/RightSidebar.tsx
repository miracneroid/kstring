"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Search, MoreHorizontal } from "lucide-react";
import { trendingTopics, suggestedUsers } from "@/lib/mock-data";
import { useState } from "react";

export default function RightSidebar() {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <aside className="sticky top-0 h-screen overflow-y-auto w-[350px] pl-6 pr-2 py-1 hidden lg:flex flex-col gap-4 scrollbar-thin">
      {/* Search Bar */}
      <div className="sticky top-0 pt-1 pb-3 bg-background z-10">
        <div
          className={`flex items-center gap-3 rounded-full border px-4 py-2 transition-colors ${
            searchFocused
              ? "border-[#1d9bf0] bg-background"
              : "border-transparent bg-[#202327]"
          }`}
        >
          <Search
            className={`h-[18px] w-[18px] shrink-0 ${
              searchFocused ? "text-[#1d9bf0]" : "text-muted-foreground"
            }`}
          />
          <Input
            placeholder="Search"
            className="border-0 bg-transparent p-0 h-auto text-[15px] placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </div>
      </div>

      {/* Subscribe to Premium */}
      <div className="rounded-2xl border border-border bg-background p-4">
        <h2 className="text-[20px] font-extrabold text-foreground mb-1">
          Subscribe to Premium
        </h2>
        <p className="text-[15px] text-foreground leading-5 mb-3">
          Subscribe to unlock new features and if eligible, receive a share of revenue.
        </p>
        <Button className="bg-[#1d9bf0] hover:bg-[#1a8cd8] text-white font-bold rounded-full px-4 h-9 text-[15px] cursor-pointer">
          Subscribe
        </Button>
      </div>

      {/* What's Happening / Trends */}
      <div className="rounded-2xl border border-border bg-background overflow-hidden">
        <h2 className="text-[20px] font-extrabold text-foreground px-4 py-3">
          What&apos;s happening
        </h2>
        {trendingTopics.map((topic, i) => (
          <div key={i}>
            <button className="w-full text-left px-4 py-3 hover:bg-white/[0.03] transition-colors cursor-pointer">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[13px] text-muted-foreground leading-4">
                    {topic.category}
                  </p>
                  <p className="text-[15px] font-bold text-foreground mt-0.5">
                    {topic.title}
                  </p>
                  <p className="text-[13px] text-muted-foreground mt-0.5">
                    {topic.posts} posts
                  </p>
                </div>
                <div className="p-1.5 -m-1.5 rounded-full hover:bg-[#1d9bf0]/10 hover:text-[#1d9bf0] text-muted-foreground transition-colors">
                  <MoreHorizontal className="h-[18px] w-[18px]" />
                </div>
              </div>
            </button>
            {i < trendingTopics.length - 1 && <Separator />}
          </div>
        ))}
        <button className="w-full text-left px-4 py-3 text-[15px] text-[#1d9bf0] hover:bg-white/[0.03] transition-colors cursor-pointer">
          Show more
        </button>
      </div>

      {/* Who to Follow */}
      <div className="rounded-2xl border border-border bg-background overflow-hidden">
        <h2 className="text-[20px] font-extrabold text-foreground px-4 py-3">
          Who to follow
        </h2>
        {suggestedUsers.map((user, i) => (
          <div key={i}>
            <button className="w-full text-left px-4 py-3 hover:bg-white/[0.03] transition-colors flex items-center gap-3 cursor-pointer">
              <Avatar className="h-10 w-10 shrink-0">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-[#1d9bf0]/20 text-[#1d9bf0] font-semibold">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-[15px] font-bold text-foreground truncate hover:underline">
                    {user.name}
                  </span>
                  {user.verified && (
                    <svg
                      viewBox="0 0 22 22"
                      className="h-[18px] w-[18px] shrink-0 fill-[#1d9bf0]"
                    >
                      <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.69-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.636.433 1.221.878 1.69.47.446 1.055.752 1.69.883.635.13 1.294.083 1.902-.143.271.586.702 1.084 1.24 1.438.54.354 1.167.551 1.813.568.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.225 1.261.276 1.894.146.634-.13 1.219-.435 1.69-.88.445-.47.75-1.055.88-1.69.13-.635.083-1.294-.14-1.9.588-.273 1.088-.704 1.444-1.244.354-.543.551-1.174.569-1.82zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
                    </svg>
                  )}
                </div>
                <p className="text-[13px] text-muted-foreground truncate">
                  @{user.handle}
                </p>
              </div>
              <Button
                variant="secondary"
                className="bg-foreground text-background hover:bg-foreground/90 font-bold rounded-full h-8 px-4 text-[13px] shrink-0 cursor-pointer"
              >
                Follow
              </Button>
            </button>
            {i < suggestedUsers.length - 1 && <Separator />}
          </div>
        ))}
        <button className="w-full text-left px-4 py-3 text-[15px] text-[#1d9bf0] hover:bg-white/[0.03] transition-colors cursor-pointer">
          Show more
        </button>
      </div>

      {/* Footer Links */}
      <div className="px-4 pb-4 flex flex-wrap gap-x-3 gap-y-0.5 text-[13px] text-muted-foreground">
        <a href="#" className="hover:underline">Terms of Service</a>
        <a href="#" className="hover:underline">Privacy Policy</a>
        <a href="#" className="hover:underline">Cookie Policy</a>
        <a href="#" className="hover:underline">Accessibility</a>
        <a href="#" className="hover:underline">Ads info</a>
        <a href="#" className="hover:underline">More</a>
        <span>© 2026 X Corp.</span>
      </div>
    </aside>
  );
}
