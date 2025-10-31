//Member 2 – Dashboard Header
// --- Member 2 START ---
// File: DashboardHeader.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { User, LogOut, TrendingUp } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const DashboardHeader = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ name: "User" });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("userData") || "{}");
    if (!stored || localStorage.getItem("isAuthenticated") !== "true") {
      navigate("/signup");
    } else setUserData(stored);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userData");
    navigate("/signup");
    toast({ title: "Logged out", description: "You have logged out" });
  };

  return (
    <header className="border-b border-border bg-card/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <TrendingUp className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">StockPro</h1>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span>{userData.name}</span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
// --- Member 2 END ---
