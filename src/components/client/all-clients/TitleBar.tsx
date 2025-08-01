"use client"
import React from 'react';
import Search from "./Search"

interface TitleBarProps {
  title: string;
  search?: boolean;
  onSearchChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  titleVariant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  titleComponent?: keyof React.JSX.IntrinsicElements;
  children?: React.ReactNode;
  className?: string;
}

const TitleBar = ({
  title,
  search = false,
  onSearchChange,
  titleVariant = "h1",
  titleComponent: Component = "h1",
  children,
  className = "",
}: TitleBarProps) => {
  const titleClasses = {
    h1: "text-4xl font-light",
    h2: "text-3xl font-light", 
    h3: "text-2xl font-medium",
    h4: "text-xl font-medium",
    h5: "text-lg font-medium",
    h6: "text-base font-medium"
  };

  return (
    <div className={`flex items-center justify-between mt-8 mb-6 gap-4 ${className}`}>
      <Component className={`${titleClasses[titleVariant]} text-gray-800 mb-2`}>
        {title}
      </Component>
      
      <div className="flex items-center gap-4">
        {children}
        {search && onSearchChange && (
          <Search onSearchChange={onSearchChange} placeholder="Kunde suchen" />
        )}
      </div>
    </div>
  );
};

export default TitleBar;