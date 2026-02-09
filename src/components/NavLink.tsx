// components/NavLink.tsx
import { NavLink as RouterNavLink } from "react-router-dom";
import { forwardRef } from "react";
import { cn } from "../lib/utils";

// Use React’s built-in utility to infer props of RouterNavLink
type RouterNavLinkProps = React.ComponentPropsWithoutRef<typeof RouterNavLink>;

// Extend with our custom className props
interface NavLinkProps extends Omit<RouterNavLinkProps, "className"> {
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ className, activeClassName, pendingClassName, ...props }, ref) => {
    // className as a function for React Router v6
    const combinedClassName = ({ isActive, isPending }: { isActive: boolean; isPending: boolean }) =>
      cn(className, isActive ? activeClassName : "", isPending ? pendingClassName : "");

    return <RouterNavLink ref={ref} {...props} className={combinedClassName} />;
  }
);

NavLink.displayName = "NavLink";

export { NavLink };
