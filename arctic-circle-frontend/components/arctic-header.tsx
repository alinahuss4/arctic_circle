'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogoIcon, CoinIcon, RobotIcon, ChartBarsIcon, ScrollIcon, PersonIcon } from './pixel-icons'
import { useArcticToast } from './arctic-toast'

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: 'chart' },
  { label: 'Decision Log', href: '/decision-log', icon: 'scroll' },
  { label: 'Payroll', href: '/payroll', icon: 'person' },
]

function NavIcon({ type, size }: { type: string; size: number }) {
  switch (type) {
    case 'chart': return <ChartBarsIcon size={size} />
    case 'scroll': return <ScrollIcon size={size} />
    case 'person': return <PersonIcon size={size} />
    default: return null
  }
}

export function ArcticSidebar({ agentOnline }: { agentOnline: boolean }) {
  const pathname = usePathname()

  return (
    <aside className="fixed top-0 left-0 z-40 flex h-screen w-[200px] flex-col border-r border-border bg-header-bg">
      {/* Logo */}
      <div className="flex items-center gap-2 px-5 pt-5 pb-6">
        <LogoIcon size={100} />
        <span className="font-sans text-[18px] font-bold text-foreground">ArcTic</span>
      </div>

      {/* Nav links */}
      <nav className="flex flex-1 flex-col gap-1 px-3" aria-label="Main navigation">
        {NAV_ITEMS.map(item => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-[4px] px-3 py-2.5 font-sans text-[13px] font-medium transition-colors ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-primary/5 hover:text-foreground'
              }`}
            >
              <NavIcon type={item.icon} size={18} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Agent status at bottom */}
      <div className="border-t border-border px-4 py-4">
        <div className="flex items-center gap-2">
          <RobotIcon size={18} online={agentOnline} />
          <span className={`font-sans text-[12px] font-medium ${agentOnline ? 'text-usyc' : 'text-alert-red'}`}>
            {agentOnline ? 'Agent Online' : 'Agent Paused'}
          </span>
          <span
            className={`inline-block h-1.5 w-1.5 rounded-full ${agentOnline ? 'bg-usyc pulse-dot' : 'bg-alert-red'}`}
            aria-hidden="true"
          />
        </div>
      </div>
    </aside>
  )
}

export function ArcticTopBar() {
  const [utcTime, setUtcTime] = useState('')
  const { addToast } = useArcticToast()

  useEffect(() => {
    function updateClock() {
      const now = new Date()
      setUtcTime(now.toUTCString().replace('GMT', 'UTC'))
    }
    updateClock()
    const interval = setInterval(updateClock, 1000)
    return () => clearInterval(interval)
  }, [])

  function handleTriggerAgent() {
    addToast('Agent cycle triggered successfully', 'success')
  }

  return (
    <div className="flex h-[40px] items-center justify-between border-b border-border bg-header-bg px-5">
      <span className="font-mono text-[12px] text-muted-foreground">{utcTime}</span>
      <button
        onClick={handleTriggerAgent}
        className="rounded-[3px] border border-border bg-card px-3 py-1 font-sans text-[11px] font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
      >
        Trigger Agent
      </button>
    </div>
  )
}
