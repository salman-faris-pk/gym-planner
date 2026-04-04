import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Settings, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth";
import { useNavigate } from "react-router-dom";

type UserProps = {
  user: {
    name: string;
    image?: string;
  };
};

const UserButton = ({ user }: UserProps) => {
  const navigate = useNavigate();
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button  className="hover:bg-accent-hover flex items-center gap-2 px-2 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none">
          <Avatar className="h-7 w-7">
            <AvatarImage src={user.image} />
            <AvatarFallback>
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col text-left leading-tight hover:text-black">
            <span className="text-sm font-medium">{user.name}</span>
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={8} className="w-52 mt-4">
        <DropdownMenuLabel className="bg-gray-700 rounded-sm">My Account</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onSelect={() => {
            navigate("/profile");
          }}
          className="flex items-center gap-2"
        >
          <Settings className="h-4 w-4" />
          Settings
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="text-red-500/80 flex items-center gap-2"
          onClick={async () => {
            await authClient.signOut();
            window.location.reload();
          }}
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
