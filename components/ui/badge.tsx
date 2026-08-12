import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 gap-1 [&_svg]:size-3",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-destructive text-destructive-foreground",
        success: "border-transparent bg-success text-success-foreground",
        warning: "border-transparent bg-warning text-warning-foreground",
        outline: "text-foreground border-border",
        // Status-specific soft colors (see lib/status.ts for mapping)
        slate: "border-transparent bg-slate-200 text-slate-800",
        amber: "border-transparent bg-amber-100 text-amber-800",
        blue: "border-transparent bg-blue-100 text-blue-800",
        purple: "border-transparent bg-purple-100 text-purple-800",
        green: "border-transparent bg-green-100 text-green-800",
        emerald: "border-transparent bg-emerald-200 text-emerald-900",
        red: "border-transparent bg-red-100 text-red-800",
        gray: "border-transparent bg-gray-200 text-gray-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";
  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
