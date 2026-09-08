import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function CheckIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.1 3.1 6.8-6.8a1 1 0 0 1 1.4 0Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function AlertIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm0 5a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0V8a1 1 0 0 1 1-1Zm0 7.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function AlertOutlineIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
      {...props}
    >
      <circle cx="10" cy="10" r="8" />
      <path d="M10 6v5M10 13.5v.01" />
    </svg>
  );
}

export function EyeIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
      {...props}
    >
      <path d="M2 10s3-5 8-5 8 5 8 5-3 5-8 5-8-5-8-5Z" />
      <circle cx="10" cy="10" r="2" />
    </svg>
  );
}

export function EyeOffIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
      {...props}
    >
      <path d="M2 10s3-5 8-5 8 5 8 5-3 5-8 5-8-5-8-5Z" />
      <path d="M4 16 16 4" />
    </svg>
  );
}

export function LogoutIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
      {...props}
    >
      <path d="M6 4H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h2M10 6l3 4-3 4M13 10H6" />
    </svg>
  );
}

export function SpinnerIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2" />
      <path d="M17 10a7 7 0 0 0-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
