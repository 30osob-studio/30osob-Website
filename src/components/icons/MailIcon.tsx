import type { IconProps } from "../../types/icon";

export const MailIcon: React.FC<IconProps> = ({
  size = 24,
  color = "currentColor",
  className = "",
  responsiveSize,
}) => {
  if (responsiveSize) {
    return (
      <>
        <div className="flex sm:hidden">
          <svg
            viewBox="0 0 24 24"
            stroke={color}
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            preserveAspectRatio="xMidYMid meet"
            style={{
              width: responsiveSize.mobile,
              height: responsiveSize.mobile,
            }}
          >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        </div>
        <div className="hidden sm:flex md:hidden">
          <svg
            viewBox="0 0 24 24"
            stroke={color}
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            preserveAspectRatio="xMidYMid meet"
            style={{
              width: responsiveSize.tablet,
              height: responsiveSize.tablet,
            }}
          >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        </div>
        <div className="hidden md:flex">
          <svg
            viewBox="0 0 24 24"
            stroke={color}
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            preserveAspectRatio="xMidYMid meet"
            style={{
              width: responsiveSize.desktop,
              height: responsiveSize.desktop,
            }}
          >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        </div>
      </>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      width={typeof size === 'number' ? size : undefined}
      height={typeof size === 'number' ? size : undefined}
      stroke={color}
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      style={typeof size === 'string' ? { width: size, height: size } : undefined}
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  );
};
