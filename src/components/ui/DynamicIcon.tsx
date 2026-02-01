import React from "react";
import * as LucideIcons from "lucide-react";
import { cn } from "../../lib/utils";

interface DynamicIconProps {
  iconName: string;
  className?: string;
  logoUrl?: string | null;
  altText?: string;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({
  iconName,
  className,
  logoUrl,
  altText,
}) => {
  if (logoUrl) {
    return (
      <img
        src={logoUrl}
        alt={altText || iconName}
        className={cn("object-contain", className)}
      />
    );
  }

  // Fallback to Lucide Icon
  // @ts-ignore
  const IconComponent = LucideIcons[iconName];

  if (!IconComponent) {
    console.warn(`Icon ${iconName} not found in LucideIcons`);
    return <LucideIcons.HelpCircle className={className} />;
  }

  return <IconComponent className={className} />;
};
