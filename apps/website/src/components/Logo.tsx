interface LogoProps {
  className?: string;
  variant?: "full" | "wordmark" | "icon";
}

export function Logo({ className = "", variant = "full" }: LogoProps) {
  if (variant === "icon") {
    return (
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="MEJDAR logo"
      >
        {/* M shape with table/doorway geometry */}
        <rect width="40" height="40" rx="8" fill="currentColor" />
        <path
          d="M10 28V14l5 8 5-8v14"
          stroke="#F3EFE6"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M22 28V14l5 8 5-8v14"
          stroke="#F3EFE6"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Table/doorway base */}
        <line
          x1="9"
          y1="30"
          x2="31"
          y2="30"
          stroke="#006D6D"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 180 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="MEJDAR Hospitality Systems"
    >
      {/* Icon mark */}
      <rect width="40" height="40" rx="8" fill="currentColor" />
      <path
        d="M10 28V14l5 8 5-8v14"
        stroke="#F3EFE6"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M22 28V14l5 8 5-8v14"
        stroke="#F3EFE6"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <line
        x1="9"
        y1="30"
        x2="31"
        y2="30"
        stroke="#006D6D"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Wordmark */}
      <text
        x="50"
        y="22"
        fontFamily="DM Sans, system-ui, sans-serif"
        fontSize="18"
        fontWeight="700"
        fill="currentColor"
        letterSpacing="0.05em"
      >
        MEJDAR
      </text>
      <text
        x="50"
        y="35"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="9"
        fontWeight="400"
        fill="currentColor"
        opacity="0.6"
        letterSpacing="0.12em"
      >
        HOSPITALITY SYSTEMS
      </text>
    </svg>
  );
}
