import { Dumbbell } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "../ui/skeleton";
import UserButton from "../UserButton";

const Navbar = () => {
  const { user, loading } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md ">
      <div className="max-w-6xl mx-auto px-6 h-16 text-foreground flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-foreground ">
          <Dumbbell className="w-6 h-6 text-accent" />
          <span className="font-semibold text-lg">GymAI</span>
        </Link>
        <nav>
          {loading ? (
            <Skeleton className="h-8 w-24 rounded-md" />
          ) : user ? (
            <Link to="/profile" className="flex">
              <Button
                size="sm"
                className="hover:bg-accent-hover hover:text-black/90"
              >
                My Plan
              </Button>
              <UserButton user={user} />
            </Link>
          ) : (
            <>
              <Link to="/auth/sign-in">
                <Button size="sm" className="hover:bg-accent-hover hover:text-black">
                  Sign In
                </Button>
              </Link>
              <Link to="/auth/sign-up">
                <Button size="sm" className="hover:bg-accent-hover hover:text-black">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
