import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NavButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: LucideIcon;
  label: string;
  to: string;
  endElement?: ReactNode;
  className?: string;
};

export const NavButton = ({
  icon: Icon,
  label,
  to,
  endElement,
  className,
  ...props
}: NavButtonProps) => {
  return (
    <Button
      variant="ghost"
      className={cn("justify-start w-full", className)}
      {...props}
    >
      <div className="flex items-center gap-3">
        <Icon className="h-6 w-6 text-muted-foreground" />
        <Link to={to}>
          <span>{label}</span>
        </Link>
        {endElement && <div>{endElement}</div>}
      </div>
    </Button>
  );
};