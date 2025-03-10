import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const UserProfile = ({
  username,
  profilePicture,
}: {
  username: string;
  profilePicture: string;
}) => {
  return (
    <div className="flex items-center space-x-3 ps-2">
      <Avatar className="h-10 w-10">
        <AvatarImage src={profilePicture} alt={username} />
        <AvatarFallback>{username.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm font-medium">
          {username}
        </p>
      </div>
    </div>
  );
};