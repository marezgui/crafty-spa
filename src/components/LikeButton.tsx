import { Heart } from "lucide-react";
import { Button } from "./ui/button";

export const LikeButton = () => {
  return (
    <Button
      variant="ghost"
    >
    <Heart /> 42
    </Button>
  );
};