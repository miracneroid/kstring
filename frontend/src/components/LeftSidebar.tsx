"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Home,
  Search,
  Bell,
  Mail,
  Users,
  Bookmark,
  ListChecks,
  UserCircle,
  MoreHorizontal,
  Feather,
  Sparkles,
  CircleEllipsis,
} from "lucide-react";
import { currentUser } from "@/lib/mock-data";
import { useState } from "react";

const navItems = [
  { icon: Home, label: "Home", href: "/", active: true },
  { icon: Search, label: "Explore", href: "/explore" },
  { icon: Bell, label: "Notifications", href: "/notifications", badge: 3 },
  { icon: Mail, label: "Messages", href: "/messages" },
  { icon: ListChecks, label: "Lists", href: "/lists" },
  { icon: Bookmark, label: "Bookmarks", href: "/bookmarks" },
  { icon: Users, label: "Communities", href: "/communities" },
  { icon: Sparkles, label: "Premium", href: "/premium" },
  { icon: UserCircle, label: "Profile", href: "/profile" },
  { icon: CircleEllipsis, label: "More", href: "#" },
];

export default function LeftSidebar() {
  const [activeItem, setActiveItem] = useState("Home");

  return (
    <header className="sticky top-0 h-screen flex flex-col justify-between py-1 px-2 w-[275px] xl:w-[275px] lg:w-[88px]">
      {/* Top section */}
      <div className="flex flex-col gap-0.5">
        {/* Twitter/X Logo */}
        <Link
          href="/"
          className="p-3 rounded-full hover:bg-accent transition-colors w-fit"
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7 fill-foreground">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </Link>

        {/* Navigation */}
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.label;
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveItem(item.label);
                }}
                className="group flex items-center gap-5 px-3 py-3 rounded-full hover:bg-accent transition-colors w-fit"
              >
                <div className="relative">
                  <Icon
                    className={`h-[26px] w-[26px] ${
                      isActive ? "stroke-[2.5]" : "stroke-[1.5]"
                    }`}
                  />
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 h-[18px] min-w-[18px] px-1 flex items-center justify-center rounded-full bg-[#1d9bf0] text-white text-[11px] font-bold">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span
                  className={`text-xl hidden xl:inline ${
                    isActive ? "font-bold" : "font-normal"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Post Button */}
        <Button
          className="mt-4 bg-[#1d9bf0] hover:bg-[#1a8cd8] text-white font-bold rounded-full py-3 h-[52px] text-[17px] hidden xl:flex cursor-pointer"
        >
          Post
        </Button>
        <Button
          className="mt-4 bg-[#1d9bf0] hover:bg-[#1a8cd8] text-white rounded-full p-3 h-[52px] w-[52px] xl:hidden flex items-center justify-center cursor-pointer"
        >
          <Feather className="h-6 w-6" />
        </Button>
      </div>

      {/* User Profile at bottom */}
      <button className="flex items-center gap-3 p-3 rounded-full hover:bg-accent transition-colors w-full mb-3 cursor-pointer">
        <Avatar className="h-10 w-10">
          <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
          <AvatarFallback className="bg-[#1d9bf0]/20 text-[#1d9bf0] font-semibold">
            {currentUser.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 text-left hidden xl:block min-w-0">
          <p className="text-[15px] font-bold leading-5 truncate">{currentUser.name}</p>
          <p className="text-[15px] text-muted-foreground leading-5 truncate">
            @{currentUser.handle}
          </p>
        </div>
        <MoreHorizontal className="h-5 w-5 text-foreground hidden xl:block shrink-0" />
      </button>
    </header>
  );
}
