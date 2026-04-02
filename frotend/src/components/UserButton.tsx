import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth";

type UserProps = {
  user: {
    name: string;
    image?: string;
  };
};

const UserButton = ({ user }: UserProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex items-center gap-2 px-2 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.image} />
            <AvatarFallback>
              {user.name?.charAt(0).concat(user.name.charAt(1))}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col text-left leading-tight">
            <span className="text-sm font-medium">{user.name}</span>
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="center" className="w-56 mt-4">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem>Settings</DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="text-red-500"
          onClick={async () => {
            await authClient.signOut();
            window.location.reload();
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
