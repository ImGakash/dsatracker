import React from "react";

export default function Theory({ children, className = "" }) {
  return (
    <div className={`theory-block ${className}`}>
      {children}
    </div>
  );
}