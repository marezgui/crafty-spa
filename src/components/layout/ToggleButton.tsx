import { ButtonHTMLAttributes } from "react";
import { Button } from "@/components/ui/button";

interface BarProps {
  className?: string;
  active?: boolean;
  isTop?: boolean;
}

const Bar = ({ className, active, isTop }: BarProps) => {
  const baseClasses = "block absolute w-5 h-0.5 rounded-full bg-current mx-auto left-0.5 transition-all duration-120";
  const topClasses = active 
    ? "top-[0.6875rem] rotate-45" 
    : "top-[0.4375rem]";
  const bottomClasses = active 
    ? "bottom-[0.6875rem] -rotate-45" 
    : "bottom-[0.4375rem]";
  
  return (
    <span 
      className={`${baseClasses} ${isTop ? topClasses : bottomClasses} ${className || ""}`}
    />
  );
};

const ToggleIcon = ({ active }: { active: boolean }) => {
  return (
    <span
      data-active={active ? "" : undefined}
      className="block w-6 h-6 relative pointer-events-none"
      aria-hidden="true"
    >
      <Bar isTop active={active} />
      <Bar active={active} />
    </span>
  );
};

interface ToggleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isOpen: boolean;
  className?: string;
}

export const ToggleButton = ({ isOpen, className, ...buttonProps }: ToggleButtonProps) => {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={`relative text-[color:var(--on-accent)] z-[var(--z-skipLink)] ${className || ""}`}
      {...buttonProps}
    >
      <ToggleIcon active={isOpen} />
    </Button>
  );
};