const pixelStyle: React.CSSProperties = {
  imageRendering: 'pixelated',
}

export function CoinIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={pixelStyle} aria-hidden="true">
      {/* Outer ring */}
      <rect x="12" y="2" width="2" height="2" fill="#FBBF24" />
      <rect x="14" y="2" width="2" height="2" fill="#FBBF24" />
      <rect x="16" y="2" width="2" height="2" fill="#FBBF24" />
      <rect x="18" y="2" width="2" height="2" fill="#FBBF24" />
      <rect x="8" y="4" width="2" height="2" fill="#FBBF24" />
      <rect x="10" y="4" width="2" height="2" fill="#FBBF24" />
      <rect x="20" y="4" width="2" height="2" fill="#FBBF24" />
      <rect x="22" y="4" width="2" height="2" fill="#FBBF24" />
      <rect x="6" y="6" width="2" height="2" fill="#FBBF24" />
      <rect x="24" y="6" width="2" height="2" fill="#FBBF24" />
      <rect x="4" y="8" width="2" height="2" fill="#FBBF24" />
      <rect x="26" y="8" width="2" height="2" fill="#FBBF24" />
      <rect x="4" y="10" width="2" height="2" fill="#FBBF24" />
      <rect x="26" y="10" width="2" height="2" fill="#FBBF24" />
      <rect x="2" y="12" width="2" height="2" fill="#FBBF24" />
      <rect x="28" y="12" width="2" height="2" fill="#FBBF24" />
      <rect x="2" y="14" width="2" height="2" fill="#FBBF24" />
      <rect x="28" y="14" width="2" height="2" fill="#FBBF24" />
      <rect x="2" y="16" width="2" height="2" fill="#FBBF24" />
      <rect x="28" y="16" width="2" height="2" fill="#FBBF24" />
      <rect x="2" y="18" width="2" height="2" fill="#FBBF24" />
      <rect x="28" y="18" width="2" height="2" fill="#FBBF24" />
      <rect x="4" y="20" width="2" height="2" fill="#FBBF24" />
      <rect x="26" y="20" width="2" height="2" fill="#FBBF24" />
      <rect x="4" y="22" width="2" height="2" fill="#FBBF24" />
      <rect x="26" y="22" width="2" height="2" fill="#FBBF24" />
      <rect x="6" y="24" width="2" height="2" fill="#FBBF24" />
      <rect x="24" y="24" width="2" height="2" fill="#FBBF24" />
      <rect x="8" y="26" width="2" height="2" fill="#FBBF24" />
      <rect x="10" y="26" width="2" height="2" fill="#FBBF24" />
      <rect x="20" y="26" width="2" height="2" fill="#FBBF24" />
      <rect x="22" y="26" width="2" height="2" fill="#FBBF24" />
      <rect x="12" y="28" width="2" height="2" fill="#FBBF24" />
      <rect x="14" y="28" width="2" height="2" fill="#FBBF24" />
      <rect x="16" y="28" width="2" height="2" fill="#FBBF24" />
      <rect x="18" y="28" width="2" height="2" fill="#FBBF24" />
      {/* $ sign center */}
      <rect x="14" y="8" width="2" height="2" fill="#92400E" />
      <rect x="16" y="8" width="2" height="2" fill="#92400E" />
      <rect x="12" y="10" width="2" height="2" fill="#92400E" />
      <rect x="14" y="10" width="2" height="2" fill="#92400E" />
      <rect x="12" y="12" width="2" height="2" fill="#92400E" />
      <rect x="14" y="14" width="2" height="2" fill="#92400E" />
      <rect x="16" y="14" width="2" height="2" fill="#92400E" />
      <rect x="18" y="16" width="2" height="2" fill="#92400E" />
      <rect x="16" y="18" width="2" height="2" fill="#92400E" />
      <rect x="18" y="18" width="2" height="2" fill="#92400E" />
      <rect x="14" y="20" width="2" height="2" fill="#92400E" />
      <rect x="16" y="20" width="2" height="2" fill="#92400E" />
    </svg>
  )
}

export function LogoIcon({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      style={pixelStyle}
      aria-hidden="true"
    >
      {/* Mountain fill - left slope */}
      <rect x="6" y="20" width="2" height="2" fill="#1E3A8A" />
      <rect x="8" y="18" width="2" height="2" fill="#1E3A8A" />
      <rect x="8" y="20" width="2" height="2" fill="#1E3A8A" />
      <rect x="10" y="16" width="2" height="2" fill="#2563EB" />
      <rect x="10" y="18" width="2" height="2" fill="#2563EB" />
      <rect x="10" y="20" width="2" height="2" fill="#2563EB" />
      <rect x="12" y="14" width="2" height="2" fill="#3B82F6" />
      <rect x="12" y="16" width="2" height="2" fill="#3B82F6" />
      <rect x="12" y="18" width="2" height="2" fill="#3B82F6" />
      <rect x="12" y="20" width="2" height="2" fill="#3B82F6" />
      <rect x="14" y="12" width="2" height="2" fill="#60A5FA" />
      <rect x="14" y="14" width="2" height="2" fill="#60A5FA" />
      <rect x="14" y="16" width="2" height="2" fill="#60A5FA" />
      <rect x="14" y="18" width="2" height="2" fill="#60A5FA" />
      <rect x="14" y="20" width="2" height="2" fill="#60A5FA" />

      {/* Mountain fill - right slope */}
      <rect x="16" y="14" width="2" height="2" fill="#3B82F6" />
      <rect x="16" y="16" width="2" height="2" fill="#3B82F6" />
      <rect x="16" y="18" width="2" height="2" fill="#3B82F6" />
      <rect x="16" y="20" width="2" height="2" fill="#3B82F6" />
      <rect x="18" y="16" width="2" height="2" fill="#2563EB" />
      <rect x="18" y="18" width="2" height="2" fill="#2563EB" />
      <rect x="18" y="20" width="2" height="2" fill="#2563EB" />
      <rect x="20" y="18" width="2" height="2" fill="#1E40AF" />
      <rect x="20" y="20" width="2" height="2" fill="#1E40AF" />
      <rect x="22" y="20" width="2" height="2" fill="#1E3A8A" />

      {/* Snow caps */}
      <rect x="14" y="10" width="2" height="2" fill="#ffbef7" />
      <rect x="12" y="12" width="2" height="2" fill="#ffc8f2" />
      <rect x="16" y="12" width="2" height="2" fill="#fbc5ff" />

      {/* Base */}
      <rect x="4" y="22" width="2" height="2" fill="#1E3A8A" />
      <rect x="6" y="22" width="2" height="2" fill="#1E3A8A" />
      <rect x="8" y="22" width="2" height="2" fill="#1E3A8A" />
      <rect x="10" y="22" width="2" height="2" fill="#1E3A8A" />
      <rect x="12" y="22" width="2" height="2" fill="#1E3A8A" />
      <rect x="14" y="22" width="2" height="2" fill="#1E3A8A" />
      <rect x="16" y="22" width="2" height="2" fill="#1E3A8A" />
      <rect x="18" y="22" width="2" height="2" fill="#1E3A8A" />
      <rect x="20" y="22" width="2" height="2" fill="#1E3A8A" />
      <rect x="22" y="22" width="2" height="2" fill="#1E3A8A" />
      <rect x="24" y="22" width="2" height="2" fill="#1E3A8A" />

      {/* Pixel dissolve */}
      <rect x="24" y="16" width="2" height="2" fill="#860cab" />
      <rect x="26" y="14" width="2" height="2" fill="#ffb2f7" />
      <rect x="28" y="12" width="2" height="2" fill="#ff64fa" />
      <rect x="26" y="18" width="2" height="2" fill="#ff6cb6" />
    </svg>
  )
}

export function ScrollIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={pixelStyle} aria-hidden="true">
      {/* Top roll */}
      <rect x="8" y="2" width="2" height="2" fill="#C084FC" />
      <rect x="10" y="2" width="2" height="2" fill="#C084FC" />
      <rect x="12" y="2" width="2" height="2" fill="#C084FC" />
      <rect x="14" y="2" width="2" height="2" fill="#C084FC" />
      <rect x="16" y="2" width="2" height="2" fill="#C084FC" />
      <rect x="18" y="2" width="2" height="2" fill="#C084FC" />
      <rect x="20" y="2" width="2" height="2" fill="#C084FC" />
      <rect x="22" y="2" width="2" height="2" fill="#C084FC" />
      <rect x="6" y="4" width="2" height="2" fill="#A855F7" />
      <rect x="24" y="4" width="2" height="2" fill="#A855F7" />
      <rect x="8" y="4" width="16" height="2" fill="#C084FC" />
      {/* Body */}
      <rect x="8" y="6" width="2" height="2" fill="#E9D5FF" />
      <rect x="10" y="6" width="14" height="2" fill="#F3E8FF" />
      <rect x="8" y="8" width="16" height="2" fill="#F3E8FF" />
      <rect x="8" y="10" width="16" height="2" fill="#F3E8FF" />
      <rect x="8" y="12" width="16" height="2" fill="#F3E8FF" />
      <rect x="8" y="14" width="16" height="2" fill="#F3E8FF" />
      <rect x="8" y="16" width="16" height="2" fill="#F3E8FF" />
      <rect x="8" y="18" width="16" height="2" fill="#F3E8FF" />
      <rect x="8" y="20" width="16" height="2" fill="#F3E8FF" />
      <rect x="8" y="22" width="16" height="2" fill="#F3E8FF" />
      {/* Text lines */}
      <rect x="10" y="8" width="8" height="2" fill="#C084FC" />
      <rect x="10" y="12" width="12" height="2" fill="#C084FC" />
      <rect x="10" y="16" width="10" height="2" fill="#C084FC" />
      <rect x="10" y="20" width="6" height="2" fill="#C084FC" />
      {/* Bottom roll */}
      <rect x="8" y="24" width="16" height="2" fill="#C084FC" />
      <rect x="6" y="24" width="2" height="2" fill="#A855F7" />
      <rect x="24" y="24" width="2" height="2" fill="#A855F7" />
      <rect x="8" y="26" width="16" height="2" fill="#C084FC" />
    </svg>
  )
}

export function PersonIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={pixelStyle} aria-hidden="true">
      {/* Head */}
      <rect x="12" y="2" width="2" height="2" fill="#F472B6" />
      <rect x="14" y="2" width="2" height="2" fill="#F472B6" />
      <rect x="16" y="2" width="2" height="2" fill="#F472B6" />
      <rect x="18" y="2" width="2" height="2" fill="#F472B6" />
      <rect x="12" y="4" width="2" height="2" fill="#F472B6" />
      <rect x="14" y="4" width="2" height="2" fill="#EC4899" />
      <rect x="16" y="4" width="2" height="2" fill="#EC4899" />
      <rect x="18" y="4" width="2" height="2" fill="#F472B6" />
      <rect x="12" y="6" width="2" height="2" fill="#F472B6" />
      <rect x="14" y="6" width="2" height="2" fill="#F472B6" />
      <rect x="16" y="6" width="2" height="2" fill="#F472B6" />
      <rect x="18" y="6" width="2" height="2" fill="#F472B6" />
      <rect x="12" y="8" width="8" height="2" fill="#F472B6" />
      {/* Neck */}
      <rect x="14" y="10" width="4" height="2" fill="#F472B6" />
      {/* Body */}
      <rect x="8" y="12" width="2" height="2" fill="#F472B6" />
      <rect x="10" y="12" width="2" height="2" fill="#F472B6" />
      <rect x="12" y="12" width="2" height="2" fill="#F472B6" />
      <rect x="14" y="12" width="2" height="2" fill="#F472B6" />
      <rect x="16" y="12" width="2" height="2" fill="#F472B6" />
      <rect x="18" y="12" width="2" height="2" fill="#F472B6" />
      <rect x="20" y="12" width="2" height="2" fill="#F472B6" />
      <rect x="22" y="12" width="2" height="2" fill="#F472B6" />
      <rect x="8" y="14" width="16" height="2" fill="#EC4899" />
      <rect x="8" y="16" width="16" height="2" fill="#EC4899" />
      <rect x="10" y="18" width="12" height="2" fill="#EC4899" />
      <rect x="10" y="20" width="12" height="2" fill="#EC4899" />
      {/* Legs */}
      <rect x="10" y="22" width="4" height="2" fill="#F472B6" />
      <rect x="18" y="22" width="4" height="2" fill="#F472B6" />
      <rect x="10" y="24" width="4" height="2" fill="#F472B6" />
      <rect x="18" y="24" width="4" height="2" fill="#F472B6" />
      <rect x="10" y="26" width="4" height="2" fill="#F472B6" />
      <rect x="18" y="26" width="4" height="2" fill="#F472B6" />
    </svg>
  )
}

export function RobotIcon({ size = 24, online = true }: { size?: number; online?: boolean }) {
  const mouthColor = online ? '#34D399' : '#F87171'
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={pixelStyle} aria-hidden="true">
      {/* Antenna */}
      <rect x="14" y="0" width="4" height="2" fill="#8B7FA8" />
      <rect x="15" y="2" width="2" height="2" fill="#8B7FA8" />
      {/* Head */}
      <rect x="8" y="4" width="16" height="2" fill="#C084FC" />
      <rect x="8" y="6" width="2" height="2" fill="#C084FC" />
      <rect x="22" y="6" width="2" height="2" fill="#C084FC" />
      <rect x="8" y="8" width="2" height="2" fill="#C084FC" />
      <rect x="22" y="8" width="2" height="2" fill="#C084FC" />
      {/* Eyes */}
      <rect x="12" y="6" width="2" height="2" fill="#60A5FA" />
      <rect x="14" y="6" width="2" height="2" fill="#60A5FA" />
      <rect x="18" y="6" width="2" height="2" fill="#60A5FA" />
      <rect x="20" y="6" width="2" height="2" fill="#60A5FA" />
      {/* Mouth */}
      <rect x="12" y="10" width="2" height="2" fill={mouthColor} />
      <rect x="14" y="10" width="2" height="2" fill={mouthColor} />
      <rect x="16" y="10" width="2" height="2" fill={mouthColor} />
      <rect x="18" y="10" width="2" height="2" fill={mouthColor} />
      <rect x="8" y="10" width="2" height="2" fill="#C084FC" />
      <rect x="22" y="10" width="2" height="2" fill="#C084FC" />
      <rect x="8" y="12" width="16" height="2" fill="#C084FC" />
      {/* Body */}
      <rect x="10" y="14" width="12" height="2" fill="#A855F7" />
      <rect x="10" y="16" width="12" height="2" fill="#A855F7" />
      <rect x="10" y="18" width="12" height="2" fill="#A855F7" />
      <rect x="10" y="20" width="12" height="2" fill="#A855F7" />
      {/* Arms */}
      <rect x="6" y="14" width="2" height="2" fill="#C084FC" />
      <rect x="6" y="16" width="2" height="2" fill="#C084FC" />
      <rect x="24" y="14" width="2" height="2" fill="#C084FC" />
      <rect x="24" y="16" width="2" height="2" fill="#C084FC" />
      {/* Legs */}
      <rect x="12" y="22" width="2" height="2" fill="#A855F7" />
      <rect x="18" y="22" width="2" height="2" fill="#A855F7" />
      <rect x="12" y="24" width="2" height="2" fill="#A855F7" />
      <rect x="18" y="24" width="2" height="2" fill="#A855F7" />
    </svg>
  )
}

export function LightningIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={pixelStyle} aria-hidden="true">
      <rect x="16" y="2" width="2" height="2" fill="#FBBF24" />
      <rect x="14" y="4" width="2" height="2" fill="#FBBF24" />
      <rect x="16" y="4" width="2" height="2" fill="#FBBF24" />
      <rect x="12" y="6" width="2" height="2" fill="#FBBF24" />
      <rect x="14" y="6" width="2" height="2" fill="#FBBF24" />
      <rect x="10" y="8" width="2" height="2" fill="#FBBF24" />
      <rect x="12" y="8" width="2" height="2" fill="#FBBF24" />
      <rect x="8" y="10" width="2" height="2" fill="#FBBF24" />
      <rect x="10" y="10" width="2" height="2" fill="#FBBF24" />
      <rect x="8" y="12" width="2" height="2" fill="#FBBF24" />
      <rect x="10" y="12" width="2" height="2" fill="#FBBF24" />
      <rect x="12" y="12" width="2" height="2" fill="#FBBF24" />
      <rect x="14" y="12" width="2" height="2" fill="#FBBF24" />
      <rect x="16" y="12" width="2" height="2" fill="#FBBF24" />
      <rect x="18" y="12" width="2" height="2" fill="#FBBF24" />
      <rect x="20" y="12" width="2" height="2" fill="#FBBF24" />
      <rect x="16" y="14" width="2" height="2" fill="#FBBF24" />
      <rect x="18" y="14" width="2" height="2" fill="#FBBF24" />
      <rect x="18" y="16" width="2" height="2" fill="#FBBF24" />
      <rect x="20" y="16" width="2" height="2" fill="#FBBF24" />
      <rect x="20" y="18" width="2" height="2" fill="#FBBF24" />
      <rect x="22" y="18" width="2" height="2" fill="#FBBF24" />
      <rect x="22" y="20" width="2" height="2" fill="#FBBF24" />
      <rect x="24" y="20" width="2" height="2" fill="#FBBF24" />
      <rect x="14" y="14" width="2" height="2" fill="#F59E0B" />
      <rect x="16" y="16" width="2" height="2" fill="#F59E0B" />
    </svg>
  )
}

export function WarningIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={pixelStyle} aria-hidden="true">
      {/* Triangle */}
      <rect x="14" y="4" width="4" height="2" fill="#F87171" />
      <rect x="12" y="6" width="8" height="2" fill="#F87171" />
      <rect x="10" y="8" width="12" height="2" fill="#F87171" />
      <rect x="8" y="10" width="16" height="2" fill="#F87171" />
      <rect x="6" y="12" width="20" height="2" fill="#F87171" />
      <rect x="4" y="14" width="24" height="2" fill="#F87171" />
      <rect x="4" y="16" width="24" height="2" fill="#F87171" />
      <rect x="2" y="18" width="28" height="2" fill="#F87171" />
      <rect x="2" y="20" width="28" height="2" fill="#F87171" />
      <rect x="2" y="22" width="28" height="2" fill="#F87171" />
      {/* Exclamation */}
      <rect x="14" y="8" width="4" height="2" fill="#0D0D14" />
      <rect x="14" y="10" width="4" height="2" fill="#0D0D14" />
      <rect x="14" y="12" width="4" height="2" fill="#0D0D14" />
      <rect x="14" y="14" width="4" height="2" fill="#0D0D14" />
      <rect x="14" y="18" width="4" height="2" fill="#0D0D14" />
    </svg>
  )
}

export function ChartBarsIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={pixelStyle} aria-hidden="true">
      {/* Bar 1 - green */}
      <rect x="4" y="14" width="6" height="2" fill="#34D399" />
      <rect x="4" y="16" width="6" height="2" fill="#34D399" />
      <rect x="4" y="18" width="6" height="2" fill="#34D399" />
      <rect x="4" y="20" width="6" height="2" fill="#34D399" />
      <rect x="4" y="22" width="6" height="2" fill="#34D399" />
      <rect x="4" y="24" width="6" height="2" fill="#34D399" />
      {/* Bar 2 - blue */}
      <rect x="12" y="8" width="6" height="2" fill="#60A5FA" />
      <rect x="12" y="10" width="6" height="2" fill="#60A5FA" />
      <rect x="12" y="12" width="6" height="2" fill="#60A5FA" />
      <rect x="12" y="14" width="6" height="2" fill="#60A5FA" />
      <rect x="12" y="16" width="6" height="2" fill="#60A5FA" />
      <rect x="12" y="18" width="6" height="2" fill="#60A5FA" />
      <rect x="12" y="20" width="6" height="2" fill="#60A5FA" />
      <rect x="12" y="22" width="6" height="2" fill="#60A5FA" />
      <rect x="12" y="24" width="6" height="2" fill="#60A5FA" />
      {/* Bar 3 - purple */}
      <rect x="20" y="4" width="6" height="2" fill="#C084FC" />
      <rect x="20" y="6" width="6" height="2" fill="#C084FC" />
      <rect x="20" y="8" width="6" height="2" fill="#C084FC" />
      <rect x="20" y="10" width="6" height="2" fill="#C084FC" />
      <rect x="20" y="12" width="6" height="2" fill="#C084FC" />
      <rect x="20" y="14" width="6" height="2" fill="#C084FC" />
      <rect x="20" y="16" width="6" height="2" fill="#C084FC" />
      <rect x="20" y="18" width="6" height="2" fill="#C084FC" />
      <rect x="20" y="20" width="6" height="2" fill="#C084FC" />
      <rect x="20" y="22" width="6" height="2" fill="#C084FC" />
      <rect x="20" y="24" width="6" height="2" fill="#C084FC" />
      {/* Base line */}
      <rect x="2" y="26" width="28" height="2" fill="#8B7FA8" />
    </svg>
  )
}

export function HourglassIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={pixelStyle} aria-hidden="true">
      {/* Top bar */}
      <rect x="6" y="2" width="20" height="2" fill="#C084FC" />
      <rect x="8" y="4" width="16" height="2" fill="#C084FC" />
      {/* Top triangle / sand */}
      <rect x="10" y="6" width="12" height="2" fill="#FBBF24" />
      <rect x="12" y="8" width="8" height="2" fill="#FBBF24" />
      <rect x="14" y="10" width="4" height="2" fill="#FBBF24" />
      {/* Waist */}
      <rect x="14" y="12" width="4" height="2" fill="#C084FC" />
      <rect x="14" y="14" width="4" height="2" fill="#C084FC" />
      {/* Bottom triangle / sand */}
      <rect x="14" y="16" width="4" height="2" fill="#FBBF24" />
      <rect x="12" y="18" width="8" height="2" fill="#FBBF24" />
      <rect x="10" y="20" width="12" height="2" fill="#FBBF24" />
      {/* Bottom bar */}
      <rect x="8" y="22" width="16" height="2" fill="#C084FC" />
      <rect x="6" y="24" width="20" height="2" fill="#C084FC" />
      {/* Frame sides */}
      <rect x="8" y="6" width="2" height="2" fill="#C084FC" />
      <rect x="22" y="6" width="2" height="2" fill="#C084FC" />
      <rect x="10" y="8" width="2" height="2" fill="#C084FC" />
      <rect x="20" y="8" width="2" height="2" fill="#C084FC" />
      <rect x="12" y="10" width="2" height="2" fill="#C084FC" />
      <rect x="18" y="10" width="2" height="2" fill="#C084FC" />
      <rect x="12" y="16" width="2" height="2" fill="#C084FC" />
      <rect x="18" y="16" width="2" height="2" fill="#C084FC" />
      <rect x="10" y="18" width="2" height="2" fill="#C084FC" />
      <rect x="20" y="18" width="2" height="2" fill="#C084FC" />
      <rect x="8" y="20" width="2" height="2" fill="#C084FC" />
      <rect x="22" y="20" width="2" height="2" fill="#C084FC" />
    </svg>
  )
}

export function ShieldIcon({ size = 24, safe = true }: { size?: number; safe?: boolean }) {
  const color = safe ? '#60A5FA' : '#F87171'
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={pixelStyle} aria-hidden="true">
      {/* Shield outline */}
      <rect x="4" y="2" width="24" height="2" fill={color} />
      <rect x="4" y="4" width="2" height="2" fill={color} />
      <rect x="26" y="4" width="2" height="2" fill={color} />
      <rect x="4" y="6" width="2" height="2" fill={color} />
      <rect x="26" y="6" width="2" height="2" fill={color} />
      <rect x="4" y="8" width="2" height="2" fill={color} />
      <rect x="26" y="8" width="2" height="2" fill={color} />
      <rect x="4" y="10" width="2" height="2" fill={color} />
      <rect x="26" y="10" width="2" height="2" fill={color} />
      <rect x="4" y="12" width="2" height="2" fill={color} />
      <rect x="26" y="12" width="2" height="2" fill={color} />
      <rect x="6" y="14" width="2" height="2" fill={color} />
      <rect x="24" y="14" width="2" height="2" fill={color} />
      <rect x="6" y="16" width="2" height="2" fill={color} />
      <rect x="24" y="16" width="2" height="2" fill={color} />
      <rect x="8" y="18" width="2" height="2" fill={color} />
      <rect x="22" y="18" width="2" height="2" fill={color} />
      <rect x="10" y="20" width="2" height="2" fill={color} />
      <rect x="20" y="20" width="2" height="2" fill={color} />
      <rect x="12" y="22" width="2" height="2" fill={color} />
      <rect x="18" y="22" width="2" height="2" fill={color} />
      <rect x="14" y="24" width="4" height="2" fill={color} />
      {/* Keyhole */}
      <rect x="14" y="8" width="4" height="2" fill={color} />
      <rect x="12" y="10" width="2" height="2" fill={color} />
      <rect x="18" y="10" width="2" height="2" fill={color} />
      <rect x="14" y="12" width="4" height="2" fill={color} />
      <rect x="15" y="14" width="2" height="2" fill={color} />
      <rect x="15" y="16" width="2" height="2" fill={color} />
    </svg>
  )
}

export function FlyingMoneyIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={pixelStyle} aria-hidden="true">
      {/* Bill */}
      <rect x="6" y="10" width="20" height="2" fill="#34D399" />
      <rect x="6" y="12" width="20" height="2" fill="#34D399" />
      <rect x="6" y="14" width="20" height="2" fill="#34D399" />
      <rect x="6" y="16" width="20" height="2" fill="#34D399" />
      <rect x="6" y="18" width="20" height="2" fill="#34D399" />
      <rect x="6" y="20" width="20" height="2" fill="#34D399" />
      {/* $ on bill */}
      <rect x="14" y="12" width="4" height="2" fill="#065F46" />
      <rect x="14" y="16" width="4" height="2" fill="#065F46" />
      {/* Left wing */}
      <rect x="2" y="6" width="2" height="2" fill="#A7F3D0" />
      <rect x="4" y="8" width="2" height="2" fill="#A7F3D0" />
      <rect x="0" y="8" width="2" height="2" fill="#A7F3D0" />
      <rect x="2" y="10" width="2" height="2" fill="#A7F3D0" />
      {/* Right wing */}
      <rect x="28" y="6" width="2" height="2" fill="#A7F3D0" />
      <rect x="26" y="8" width="2" height="2" fill="#A7F3D0" />
      <rect x="30" y="8" width="2" height="2" fill="#A7F3D0" />
      <rect x="28" y="10" width="2" height="2" fill="#A7F3D0" />
    </svg>
  )
}
