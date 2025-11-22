import React, { useState, useRef, useEffect } from "react";

interface PopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  placement?: "top" | "right" | "bottom" | "left";
  hover?: boolean;
  className?: string;
}

export const Popover = ({
  trigger,
  children,
  placement = "right",
  hover = true,
  className = "",
}: PopoverProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const onEnter = () => hover && setOpen(true);
  const onLeave = () => hover && setTimeout(() => setOpen(false), 120);

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div onClick={() => !hover && setOpen(!open)}>{trigger}</div>

      {open && (
        <div
          className="absolute z-50"
          style={{
            left: placement === "right" ? "100%" : undefined,
            transform: "translateX(8px)",
          }}
        >
          <div className="bg-zinc-900 border border-zinc-800 rounded-md p-3 
              shadow-xl animate-popBounce">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default Popover;
