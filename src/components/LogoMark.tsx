type LogoMarkProps = {
  className?: string;
  title?: string;
};

export function LogoMark({ className = "h-11 w-11", title = "AgentLedger logo" }: LogoMarkProps) {
  return (
    <svg className={className} viewBox="0 0 44 44" role="img" aria-labelledby="agentledger-logo-title" fill="none" xmlns="http://www.w3.org/2000/svg">
      <title id="agentledger-logo-title">{title}</title>
      <rect x="2.5" y="2.5" width="39" height="39" rx="12.5" fill="#07142E" />
      <rect x="2.5" y="2.5" width="39" height="39" rx="12.5" stroke="url(#agentledger-logo-border)" strokeWidth="1.5" />
      <path d="M9 32L18.3 12L27.6 32" stroke="url(#agentledger-logo-a)" strokeWidth="4.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.1 25.8L16 28.7L21.1 22.7" stroke="#67E8F9" strokeWidth="3.1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M28.2 12.5V32H37" stroke="url(#agentledger-logo-l)" strokeWidth="4.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19.2 32H23.5" stroke="#38BDF8" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M27.3 32H30.8" stroke="#6366F1" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M34.2 32H37" stroke="#8B5CF6" strokeWidth="3.5" strokeLinecap="round" />
      <defs>
        <linearGradient id="agentledger-logo-border" x1="6" y1="5" x2="39" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1E3A8A" />
          <stop offset="0.45" stopColor="#38BDF8" stopOpacity="0.55" />
          <stop offset="1" stopColor="#7C3AED" stopOpacity="0.75" />
        </linearGradient>
        <linearGradient id="agentledger-logo-a" x1="9" y1="12" x2="28" y2="33" gradientUnits="userSpaceOnUse">
          <stop stopColor="#67E8F9" />
          <stop offset="0.55" stopColor="#38BDF8" />
          <stop offset="1" stopColor="#6366F1" />
        </linearGradient>
        <linearGradient id="agentledger-logo-l" x1="29" y1="12" x2="38" y2="33" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60A5FA" />
          <stop offset="0.55" stopColor="#6366F1" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
    </svg>
  );
}
