"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MessageCircle,
  Repeat2,
  Heart,
  BarChart2,
  Bookmark,
  Share,
  MoreHorizontal,
} from "lucide-react";
import { useState } from "react";

export interface TweetData {
  id: string;
  user: {
    name: string;
    handle: string;
    avatar: string;
    verified?: boolean;
  };
  content: string;
  image?: string;
  time: string;
  replies: number;
  retweets: number;
  likes: number;
  views: number;
  bookmarked?: boolean;
  liked?: boolean;
  retweeted?: boolean;
}

interface TweetCardProps {
  tweet: TweetData;
}

function formatCount(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return n.toString();
}

export default function TweetCard({ tweet }: TweetCardProps) {
  const [liked, setLiked] = useState(tweet.liked ?? false);
  const [likeCount, setLikeCount] = useState(tweet.likes);
  const [retweeted, setRetweeted] = useState(tweet.retweeted ?? false);
  const [retweetCount, setRetweetCount] = useState(tweet.retweets);
  const [bookmarked, setBookmarked] = useState(tweet.bookmarked ?? false);

  return (
    <article className="flex gap-3 px-4 py-3 border-b border-border hover:bg-white/[0.03] transition-colors cursor-pointer">
      {/* Avatar */}
      <Avatar className="h-10 w-10 shrink-0">
        <AvatarImage src={tweet.user.avatar} alt={tweet.user.name} />
        <AvatarFallback className="bg-primary/20 text-primary text-sm font-semibold">
          {tweet.user.name.charAt(0)}
        </AvatarFallback>
      </Avatar>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Header Row */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 min-w-0 text-[15px]">
            <span className="font-bold text-foreground truncate hover:underline">
              {tweet.user.name}
            </span>
            {tweet.user.verified && (
              <svg viewBox="0 0 22 22" className="h-[18px] w-[18px] shrink-0 fill-[#1d9bf0]">
                <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.69-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.636.433 1.221.878 1.69.47.446 1.055.752 1.69.883.635.13 1.294.083 1.902-.143.271.586.702 1.084 1.24 1.438.54.354 1.167.551 1.813.568.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.225 1.261.276 1.894.146.634-.13 1.219-.435 1.69-.88.445-.47.75-1.055.88-1.69.13-.635.083-1.294-.14-1.9.588-.273 1.088-.704 1.444-1.244.354-.543.551-1.174.569-1.82zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
              </svg>
            )}
            <span className="text-muted-foreground truncate">@{tweet.user.handle}</span>
            <span className="text-muted-foreground shrink-0">·</span>
            <span className="text-muted-foreground shrink-0 hover:underline">{tweet.time}</span>
          </div>
          <button className="p-1.5 -m-1.5 rounded-full text-muted-foreground hover:text-[#1d9bf0] hover:bg-[#1d9bf0]/10 transition-colors">
            <MoreHorizontal className="h-[18px] w-[18px]" />
          </button>
        </div>

        {/* Tweet Body */}
        <p className="text-[15px] leading-5 mt-0.5 whitespace-pre-wrap break-words text-foreground">
          {tweet.content}
        </p>

        {/* Tweet Image */}
        {tweet.image && (
          <div className="mt-3 rounded-2xl overflow-hidden border border-border">
            <img
              src={tweet.image}
              alt="Tweet media"
              className="w-full max-h-[510px] object-cover"
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-3 max-w-[425px] -ml-2">
          {/* Reply */}
          <button className="group flex items-center gap-1 text-muted-foreground">
            <div className="p-2 rounded-full group-hover:bg-[#1d9bf0]/10 group-hover:text-[#1d9bf0] transition-colors">
              <MessageCircle className="h-[18px] w-[18px]" />
            </div>
            <span className="text-[13px] group-hover:text-[#1d9bf0] transition-colors">
              {tweet.replies > 0 && formatCount(tweet.replies)}
            </span>
          </button>

          {/* Retweet */}
          <button
            className="group flex items-center gap-1 text-muted-foreground"
            onClick={(e) => {
              e.stopPropagation();
              setRetweeted(!retweeted);
              setRetweetCount(retweeted ? retweetCount - 1 : retweetCount + 1);
            }}
          >
            <div
              className={`p-2 rounded-full group-hover:bg-[#00ba7c]/10 transition-colors ${
                retweeted ? "text-[#00ba7c]" : "group-hover:text-[#00ba7c]"
              }`}
            >
              <Repeat2 className="h-[18px] w-[18px]" />
            </div>
            <span
              className={`text-[13px] transition-colors ${
                retweeted ? "text-[#00ba7c]" : "group-hover:text-[#00ba7c]"
              }`}
            >
              {retweetCount > 0 && formatCount(retweetCount)}
            </span>
          </button>

          {/* Like */}
          <button
            className="group flex items-center gap-1 text-muted-foreground"
            onClick={(e) => {
              e.stopPropagation();
              setLiked(!liked);
              setLikeCount(liked ? likeCount - 1 : likeCount + 1);
            }}
          >
            <div
              className={`p-2 rounded-full group-hover:bg-[#f91880]/10 transition-colors ${
                liked ? "text-[#f91880]" : "group-hover:text-[#f91880]"
              }`}
            >
              <Heart
                className={`h-[18px] w-[18px] transition-transform ${
                  liked ? "fill-[#f91880] scale-110" : ""
                }`}
              />
            </div>
            <span
              className={`text-[13px] transition-colors ${
                liked ? "text-[#f91880]" : "group-hover:text-[#f91880]"
              }`}
            >
              {likeCount > 0 && formatCount(likeCount)}
            </span>
          </button>

          {/* Views */}
          <button className="group flex items-center gap-1 text-muted-foreground">
            <div className="p-2 rounded-full group-hover:bg-[#1d9bf0]/10 group-hover:text-[#1d9bf0] transition-colors">
              <BarChart2 className="h-[18px] w-[18px]" />
            </div>
            <span className="text-[13px] group-hover:text-[#1d9bf0] transition-colors">
              {tweet.views > 0 && formatCount(tweet.views)}
            </span>
          </button>

          {/* Bookmark + Share */}
          <div className="flex items-center">
            <button
              className="group text-muted-foreground"
              onClick={(e) => {
                e.stopPropagation();
                setBookmarked(!bookmarked);
              }}
            >
              <div
                className={`p-2 rounded-full group-hover:bg-[#1d9bf0]/10 transition-colors ${
                  bookmarked ? "text-[#1d9bf0]" : "group-hover:text-[#1d9bf0]"
                }`}
              >
                <Bookmark
                  className={`h-[18px] w-[18px] ${bookmarked ? "fill-[#1d9bf0]" : ""}`}
                />
              </div>
            </button>
            <button className="group text-muted-foreground">
              <div className="p-2 rounded-full group-hover:bg-[#1d9bf0]/10 group-hover:text-[#1d9bf0] transition-colors">
                <Share className="h-[18px] w-[18px]" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
