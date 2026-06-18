type LogoMarkProps = {
  className?: string;
  title?: string;
};

export function LogoMark({ className = "h-11 w-11", title = "AgentLedger logo" }: LogoMarkProps) {
  return (
    <svg className={className} viewBox="0 0 44 44" role="img" aria-labelledby="agentledger-logo-title" fill="none" xmlns="http://www.w3.org/2000/svg">
      <title id="agentledger-logo-title">{title}</title>
      <rect x="2" y="2" width="40" height="40" rx="13" fill="url(#agentledger-logo-gradient)" />
      <rect x="2" y="2" width="40" height="40" rx="13" stroke="rgba(255,255,255,0.34)" strokeWidth="1.5" />
      <path d="M13 14.5H28" stroke="white" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M13 22H23" stroke="white" strokeOpacity="0.88" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M13 29.5H20" stroke="white" strokeOpacity="0.72" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M26.5 28.2L30.1 31.8L36 23.8" stroke="#ECFEFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <defs>
        <linearGradient id="agentledger-logo-gradient" x1="6" y1="6" x2="38" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#22D3EE" />
          <stop offset="0.52" stopColor="#2563EB" />
          <stop offset="1" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
    </svg>
  );
}
