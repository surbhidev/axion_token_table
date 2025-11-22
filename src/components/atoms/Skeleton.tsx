import React from "react";

export const Skeleton = ({ className = "" }) => {
  return (
    <div
      className={`animate-shimmer bg-gradient-to-r 
      from-zinc-800 via-zinc-700 to-zinc-800 
      bg-[length:200%_100%] rounded-md ${className}`}
    />
  );
};
