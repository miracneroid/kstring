import LeftSidebar from "@/components/LeftSidebar";
import MainFeed from "@/components/MainFeed";
import RightSidebar from "@/components/RightSidebar";

export default function Home() {
  return (
    <div className="flex justify-center min-h-screen">
      {/* Left Sidebar */}
      <div className="flex justify-end shrink-0">
        <LeftSidebar />
      </div>

      {/* Main Feed */}
      <MainFeed />

      {/* Right Sidebar */}
      <RightSidebar />
    </div>
  );
}
