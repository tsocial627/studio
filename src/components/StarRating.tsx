import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps extends React.HTMLAttributes<HTMLDivElement> {
  rating: number;
  totalStars?: number;
  size?: number;
  fill?: boolean;
  onRate?: (rating: number) => void;
  disabled?: boolean;
}

export function StarRating({
  rating,
  totalStars = 5,
  size = 16,
  fill = true,
  onRate,
  className,
  disabled = false,
  ...props
}: StarRatingProps) {
  const isInteractive = onRate && !disabled;
  return (
    <div
      className={cn("flex items-center gap-1", isInteractive && 'cursor-pointer', disabled && 'opacity-50', className)}
      {...props}
    >
      {[...Array(totalStars)].map((_, i) => {
        const starValue = i + 1;
        return (
          <Star
            key={i}
            size={size}
            className={cn(
              "transition-colors",
              starValue <= rating
                ? "text-yellow-400"
                : "text-gray-300",
              fill && starValue <= rating && "fill-yellow-400",
              isInteractive && "hover:text-yellow-300"
            )}
            onClick={() => isInteractive && onRate?.(starValue)}
          />
        );
      })}
    </div>
  );
}
