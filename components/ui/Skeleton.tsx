// components/ui/Skeleton.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn("animate-pulse rounded-md bg-gray-200", className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Skeleton.displayName = "Skeleton";
