export interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
  responsiveSize?: {
    mobile?: number | string;
    tablet?: number | string;
    desktop?: number | string;
  };
}