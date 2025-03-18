
import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef, useState, useRef, useEffect } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'outline' | 'premium';
  interactive?: boolean;
  noPadding?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(({
  className,
  variant = 'default',
  interactive = false,
  noPadding = false,
  children,
  ...props
}, ref) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    
    const { clientX, clientY } = e;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    
    const x = (clientX - left) / width;
    const y = (clientY - top) / height;
    
    setCoords({ x, y });
  };

  const variantStyles = {
    default: "bg-card text-card-foreground shadow-sm",
    glass: "glass-card text-white border-white/10",
    outline: "bg-transparent border border-border",
    premium: "bg-card-gradient text-card-foreground backdrop-blur-sm border border-white/10 shadow-premium"
  };
  
  const paddingStyles = noPadding ? "" : "p-6";
  
  useEffect(() => {
    if (interactive && cardRef.current) {
      cardRef.current.style.setProperty('--px', coords.x.toString());
      cardRef.current.style.setProperty('--py', coords.y.toString());
      cardRef.current.style.setProperty('--active', isHovered ? '1' : '0');
    }
  }, [coords, isHovered, interactive]);

  return (
    <div
      ref={(node) => {
        // Forward the ref and also assign to cardRef
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
        cardRef.current = node;
      }}
      className={cn(
        "relative rounded-lg overflow-hidden",
        variantStyles[variant],
        paddingStyles,
        interactive && "character-card transition-all duration-200 hover:translate-y-[-5px]",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => interactive && setIsHovered(true)}
      onMouseLeave={() => interactive && setIsHovered(false)}
      {...props}
    >
      {interactive && (
        <div className="card-shine absolute inset-0 w-full h-full opacity-0 z-10 pointer-events-none" />
      )}
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;
