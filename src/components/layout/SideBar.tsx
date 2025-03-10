import { Separator } from "@/components/ui/separator";
import {
  Bell,
  House,
  Instagram,
  Linkedin,
  Power,
  Twitter,
} from "lucide-react";

import { Link } from "react-router";
import { NavButton } from "./NavButton";
import { UserProfile } from "./UserProfile";

export const Sidebar = () => {
  return (
    <div 
      className="flex flex-1 bg-muted/50 text-foreground overflow-y-auto w-full sm:max-w-xs py-6 sm:py-8 px-4 sm:px-6 sticky top-0"
    >
      <div className="flex flex-col justify-between space-y-1 w-full">
        <div className="space-y-8">
          <div className="space-y-1">
            <NavButton label="Home" icon={House} to="/home" />
            <NavButton
              label="Notifications"
              icon={Bell}
              to="/notifications"
            />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">
              Social
            </p>
            <div className="space-y-1">
              <NavButton label="Twitter" icon={Twitter} to="/home" />
              <NavButton label="Instagram" icon={Instagram} to="/home" />
              <NavButton label="Linkedin" icon={Linkedin} to="/home" />
            </div>
          </div>
          <div>
            <NavButton label="Sign Out" icon={Power} to="/signout" />
          </div>
          <Separator className="bg-muted" />
          <Link to={`/u/malek`}>
            <UserProfile
              username={"Malek"}
              profilePicture={"https://picsum.photos/200?random=malek"}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};