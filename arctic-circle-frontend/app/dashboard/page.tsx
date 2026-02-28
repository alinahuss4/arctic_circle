'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, ReferenceLine,
} from 'recharts'
import { CoinIcon, ScrollIcon, HourglassIcon, ChartBarsIcon, WarningIcon, ShieldIcon } from '@/components/pixel-icons'

// ===== DECISION LOG DATA (last 4) =====
const MOCK_RECENT_LOG = [
  {
    id: 1,
    timestamp: '2026-02-28T09:00:01Z',
    action: 'deposit_to_usyc',
    reasoning: ['Yield at 6.2%, above 4% threshold.', 'Payroll not due for 28 days.', 'Excess funds detected: $12,400 USDC.', 'Moving to USYC for yield optimisation.'],
    execution: { amount: 12400 },
  },
  {
    id: 2,
    timestamp: '2026-02-28T08:00:01Z',
    action: 'monitor',
    reasoning: ['Yield at 3.8%, below 4% threshold.', 'Holding in USDC. Payroll in 28 days.'],
    execution: null,
  },
  {
    id: 3,
    timestamp: '2026-02-27T09:00:01Z',
    action: 'blocked',
    reasoning: ['Payroll day. Treasury holds 22000 USDC.', 'Insufficient USDC for payroll.', 'Payroll blocked pending rebalance.'],
    execution: null,
  },
  {
    id: 4,
    timestamp: '2026-02-26T09:00:01Z',
    action: 'withdraw_from_usyc',
    reasoning: ['Payroll in 2 days. Need 26950 USDC.', 'Withdrawing 8450 from USYC.', 'Pre-payroll rebalance initiated.'],
    execution: { amount: 8450 },
  },
]

// ===== MOCK DATA =====
const MOCK_TREASURY = {
  usdc: 18500,
  usyc: 12400,
  total: 30900,
  liquidity_ratio: 0.60,
  usyc_ratio: 0.40,
}

const MOCK_SIGNALS = {
  yield_rate: 6.2,
}

const yieldHistory = [
  { date: 'Feb 19', apy: 3.2 },
  { date: 'Feb 20', apy: 3.8 },
  { date: 'Feb 21', apy: 4.1 },
  { date: 'Feb 22', apy: 5.3 },
  { date: 'Feb 23', apy: 4.9 },
  { date: 'Feb 24', apy: 5.8 },
  { date: 'Feb 25', apy: 6.2 },
  { date: 'Feb 26', apy: 5.9 },
  { date: 'Feb 27', apy: 6.1 },
  { date: 'Feb 28', apy: 6.2 },
]

const MOCK_POLICIES = [
  { name: 'Min Liquidity', rule: 'Keep >= 40% in USDC', status: 'SAFE' as const },
  { name: 'Max USYC Cap', rule: 'Never exceed 60% in USYC', status: 'SAFE' as const },
  { name: 'Yield Threshold', rule: 'Deploy only if APY > 4%', status: 'SAFE' as const },
  { name: 'Payroll Buffer', rule: '110% of payroll in USDC before payday', status: 'AT RISK' as const },
]



// ===== Interfaces =====
interface TreasuryData {
  usdc: number
  usyc: number
  total: number
  liquidity_ratio: number
  usyc_ratio: number
}

interface SignalData {
  yield_rate: number
}

function CountUpValue({ value, prefix = '$', decimals = 2 }: { value: number; prefix?: string; decimals?: number }) {
  const [display, setDisplay] = useState(0)
  const animRef = useRef<number | null>(null)

  useEffect(() => {
    const duration = 600
    const start = performance.now()

    function animate(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(value * eased)
      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate)
      }
    }
    animRef.current = requestAnimationFrame(animate)
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [value])

  return (
    <span className="count-up">
      {prefix}{display.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
    </span>
  )
}

function getDaysUntilPayday() {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const payday = new Date(year, month, 28)
  if (now > payday) {
    payday.setMonth(payday.getMonth() + 1)
  }
  return Math.ceil((payday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
}

// ===== Treasury Overview Section =====
function TreasuryOverview({ treasury }: { treasury: TreasuryData }) {
  const pieData = [
    { name: 'Liquid USDC', value: treasury.usdc, color: '#60A5FA' },
    { name: 'USYC Position', value: treasury.usyc, color: '#34D399' },
  ]

  return (
    <section className="flex flex-col gap-3 lg:flex-row">
      {/* Total Treasury Card */}
      <div className="group relative w-full rounded-[4px] border border-border bg-card p-3 transition-all hover:-translate-y-[1px] hover:shadow-[0_0_24px_rgba(192,132,252,0.2)] lg:w-2/5">
        <div className="absolute top-3 right-3">
          <CoinIcon size={22} />
        </div>
        <p className="font-sans text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          TOTAL TREASURY
        </p>
        <p className="mt-1 font-sans text-[28px] font-bold leading-tight text-foreground">
          <CountUpValue value={treasury.total} />
        </p>
        <p className="mt-0.5 font-sans text-[11px] text-muted-foreground">USDC + USYC combined</p>
        <div className="mt-2 flex gap-2">
          <span className="inline-flex items-center rounded-[3px] border border-border px-2 py-0.5 font-sans text-[11px] font-medium text-usdc">
            USDC ${treasury.usdc.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
          <span className="inline-flex items-center rounded-[3px] border border-border px-2 py-0.5 font-sans text-[11px] font-medium text-usyc">
            USYC ${treasury.usyc.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="group w-full rounded-[4px] border border-border bg-card p-3 transition-all hover:-translate-y-[1px] hover:shadow-[0_0_24px_rgba(192,132,252,0.2)] lg:w-3/5">
        <p className="mb-2 font-sans text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          BREAKDOWN BY ACCOUNT & CURRENCY
        </p>
        <div className="flex items-center gap-4">
          <div className="h-[140px] w-[140px] flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={60}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload
                      const pct = ((d.value / treasury.total) * 100).toFixed(1)
                      return (
                        <div className="rounded-[4px] border border-border bg-card px-3 py-2 shadow-lg">
                          <p className="font-sans text-[12px] font-medium text-foreground">{d.name}</p>
                          <p className="font-sans text-[11px] text-muted-foreground">
                            ${d.value.toLocaleString('en-US', { minimumFractionDigits: 2 })} ({pct}%)
                          </p>
                        </div>
                      )
                    }
                    return null
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col gap-2">
            {pieData.map((entry, i) => {
              const pct = ((entry.value / treasury.total) * 100).toFixed(1)
              return (
                <div key={i} className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 flex-shrink-0 rounded-[1px]" style={{ background: entry.color }} />
                  <div>
                    <p className="font-sans text-[12px] text-foreground">{entry.name}</p>
                    <p className="font-sans text-[11px] text-muted-foreground">
                      ${entry.value.toLocaleString('en-US', { minimumFractionDigits: 2 })} - {pct}%
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

// ===== Payday Card Section =====
function PaydayCard({ treasury }: { treasury: TreasuryData }) {
  const daysRemaining = 28
  const requiredAmount = 24500

  const fundsSufficient = treasury.usdc >= requiredAmount
  const insufficient = !fundsSufficient

  const cardBg = insufficient ? 'bg-[rgba(248,113,113,0.08)]' : 'bg-card'
  const cardBorder = insufficient ? 'border-alert-red' : 'border-border'
  const cardShadow = insufficient ? 'shadow-[0_0_24px_rgba(248,113,113,0.2)]' : ''
  const countdownColor = insufficient ? 'text-alert-red' : 'text-foreground'

  return (
    <Link href="/payroll" className="block">
      <div className={`group relative flex flex-col gap-4 rounded-[4px] border ${cardBorder} ${cardBg} p-3 transition-all hover:-translate-y-[1px] hover:shadow-[0_0_24px_rgba(192,132,252,0.2)] lg:flex-row lg:items-center lg:justify-between ${cardShadow}`}>

        {/* Left side */}
        <div>
          <div className="flex items-center gap-2">
            <HourglassIcon size={16} />
            <p className="font-sans text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              NEXT PAYROLL
            </p>
          </div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className={`font-sans text-[32px] font-bold leading-none ${countdownColor}`}>
              {daysRemaining}
            </span>
            <span className="font-sans text-[16px] text-muted-foreground">days</span>
          </div>
          <p className="mt-0.5 font-sans text-[11px] text-muted-foreground">
            Payroll date: 28th of every month
          </p>

          {/* Warning underneath the day count */}
          {insufficient && (
            <div className="mt-2 flex items-center gap-1.5">
              <WarningIcon size={24} />
              <span className="font-sans text-[11px] font-medium text-alert-red">
                Liquid USDC is ${(requiredAmount - treasury.usdc).toLocaleString('en-US', { minimumFractionDigits: 2 })} short of payroll requirement
              </span>
            </div>
          )}
        </div>

        {/* Right side */}
        <div className="lg:text-right">
          <p className="font-sans text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            REQUIRED FOR PAYDAY
          </p>
          <p className="mt-0.5 font-sans text-[22px] font-bold text-foreground">
            $24,500.00 <span className="text-[14px] text-muted-foreground">USDC</span>
          </p>
          <div className="mt-1 flex flex-col gap-0.5">
            <p className="font-sans text-[12px] text-usyc">
              Treasury total: ${treasury.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
            <p className={`font-sans text-[12px] ${treasury.usdc >= requiredAmount ? 'text-usyc' : 'text-alert-red'}`}>
              Liquid USDC: ${treasury.usdc.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="mt-2">
            {insufficient ? (
              <span className="inline-block rounded-[3px] bg-[rgba(248,113,113,0.15)] px-2.5 py-0.5 font-sans text-[11px] font-medium text-alert-red">
                INSUFFICIENT FUNDS
              </span>
            ) : (
              <span className="inline-block rounded-[3px] bg-[rgba(52,211,153,0.15)] px-2.5 py-0.5 font-sans text-[11px] font-medium text-usyc">
                FUNDS SUFFICIENT
              </span>
            )}
          </div>
        </div>

        <span className="absolute right-3 bottom-2 font-sans text-[10px] text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
          {'View Payroll ->'}
        </span>
      </div>
    </Link>
  )
}

// ===== Yield Breakdown Section =====
function YieldBreakdown({ treasury, signals }: { treasury: TreasuryData; signals: SignalData }) {
  const [tick, setTick] = useState(0)
  const daysRemaining = 28

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1000)
    return () => clearInterval(id)
  }, [])

  const yieldPerMin = (treasury.usyc * (signals.yield_rate / 100)) / 525960
  const totalYieldAccumulated = yieldPerMin * tick / 60
  const percentDeployed = treasury.total > 0 ? ((treasury.usyc / treasury.total) * 100).toFixed(1) : '0'
  const estEarningsBeforePayday = (treasury.usyc * (signals.yield_rate / 100) / 365) * daysRemaining

  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 lg:flex-row">
        {/* USYC Position */}
        <div className="group relative w-full rounded-[4px] border border-border bg-card p-3 transition-all hover:-translate-y-[1px] hover:shadow-[0_0_24px_rgba(192,132,252,0.2)] lg:w-1/2">
          <div className="absolute top-3 right-3">
            <HourglassIcon size={20} />
          </div>
          <p className="font-sans text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            USYC POSITION
          </p>
          <p className="mt-1 font-sans text-[24px] font-bold text-usyc">
            ${treasury.usyc.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
          <p className="mt-0.5 font-sans text-[13px] font-medium text-secondary">
            +${(yieldPerMin + totalYieldAccumulated).toFixed(6)} / min
          </p>
          <p className="mt-1 font-sans text-[11px] text-muted-foreground">
            {percentDeployed}% of total treasury deployed to yield
          </p>
        </div>

        {/* Yield Rates */}
        <div className="group relative w-full rounded-[4px] border border-border bg-card p-3 transition-all hover:-translate-y-[1px] hover:shadow-[0_0_24px_rgba(192,132,252,0.2)] lg:w-1/2">
          <div className="absolute top-3 right-3">
            <ChartBarsIcon size={20} />
          </div>
          <p className="font-sans text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            YIELD RATES
          </p>
          <div className="mt-1">
            <p className="font-sans text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              CURRENT APY
            </p>
            <p className="mt-0.5 font-sans text-[22px] font-bold text-primary">
              {signals.yield_rate.toFixed(2)}%
            </p>
            <p className="font-sans text-[11px] text-muted-foreground">Via DeFi Llama</p>
          </div>
          <div className="mt-2 border-t border-border pt-2">
            <p className="font-sans text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              EST. EARNINGS BEFORE PAYDAY
            </p>
            <p className="mt-0.5 font-sans text-[20px] font-bold text-usyc">
              +${estEarningsBeforePayday.toFixed(2)}
            </p>
            <p className="font-sans text-[11px] text-muted-foreground">
              Over next {daysRemaining} days at current APY
            </p>
          </div>
          <p className="mt-2 border-t border-border pt-2 font-sans text-[10px] text-muted-foreground">
            {'Agent deploys excess USDC to USYC when APY > 4% and payroll is >2 days away'}
          </p>
        </div>
      </div>

      {/* Yield History Line Chart */}
      <div className="rounded-[4px] border border-border bg-header-bg p-3">
        <p className="mb-2 font-sans text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          YIELD RATE HISTORY
        </p>
        <div className="h-[160px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={yieldHistory} margin={{ top: 8, right: 12, left: 0, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2D2B55" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fill: '#8B7FA8', fontSize: 11, fontFamily: 'Space Grotesk' }}
                axisLine={{ stroke: '#2D2B55' }}
                tickLine={false}
              />
              <YAxis
                domain={[2, 7]}
                tick={{ fill: '#8B7FA8', fontSize: 11, fontFamily: 'Space Grotesk' }}
                axisLine={{ stroke: '#2D2B55' }}
                tickLine={false}
                tickFormatter={(v) => `${v}%`}
                width={40}
              />
              <ReferenceLine
                y={4}
                stroke="#FBBF24"
                strokeDasharray="6 4"
                label={{
                  value: 'Deploy threshold',
                  position: 'right',
                  fill: '#FBBF24',
                  fontSize: 10,
                  fontFamily: 'Space Grotesk',
                }}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-[4px] border border-border bg-card px-3 py-2 shadow-lg">
                        <p className="font-sans text-[12px] font-medium text-foreground">{label}</p>
                        <p className="font-sans text-[11px] text-primary">APY: {Number(payload[0].value).toFixed(1)}%</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Line
                type="monotone"
                dataKey="apy"
                stroke="#C084FC"
                strokeWidth={2}
                dot={{ fill: '#F472B6', r: 3, stroke: 'none' }}
                activeDot={{ fill: '#F472B6', r: 5, stroke: '#C084FC', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  )
}

// // ===== Detailed Breakdown =====
// function DetailedBreakdown({ treasury }: { treasury: TreasuryData }) {
//   return (
//     <section className="rounded-[4px] border border-border bg-card p-3">
//       <p className="mb-2 font-sans text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
//         DETAILED BREAKDOWN
//       </p>
//       <div className="grid grid-cols-2 gap-x-6 gap-y-2 lg:grid-cols-4">
//         <div>
//           <p className="font-sans text-[10px] font-medium uppercase tracking-wider text-muted-foreground">LIQUID: USDC</p>
//           <p className="font-sans text-[14px] font-bold text-usdc">${treasury.usdc.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
//         </div>
//         <div>
//           <p className="font-sans text-[10px] font-medium uppercase tracking-wider text-muted-foreground">LIQUID: EURC</p>
//           <p className="font-sans text-[14px] font-bold text-foreground">$0.00</p>
//         </div>
//         <div>
//           <p className="font-sans text-[10px] font-medium uppercase tracking-wider text-muted-foreground">NON-LIQUID: USYC</p>
//           <p className="font-sans text-[14px] font-bold text-usyc">${treasury.usyc.toLocaleString('en-US', { minimumFractionDigits: 2 })} <span className="text-[10px] font-normal text-muted-foreground">at 6.2% APY</span></p>
//         </div>
//         <div>
//           <p className="font-sans text-[10px] font-medium uppercase tracking-wider text-muted-foreground">COMBINED</p>
//           <p className="font-sans text-[14px] font-bold text-foreground">${treasury.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
//         </div>
//       </div>
//       <div className="mt-2 flex gap-4 border-t border-border pt-2">
//         <p className="font-sans text-[11px] text-muted-foreground">
//           Total liquid: <span className="font-medium text-usdc">${treasury.usdc.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
//         </p>
//         <p className="font-sans text-[11px] text-muted-foreground">
//           Total non-liquid: <span className="font-medium text-usyc">${treasury.usyc.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
//         </p>
//         <p className="font-sans text-[11px] text-muted-foreground">
//           Combined: <span className="font-medium text-foreground">${treasury.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
//         </p>
//       </div>
//     </section>
//   )
// }

// ===== Decision Log Summary Card =====
function DecisionLogSummary() {
  const [expanded, setExpanded] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight)
    }
  }, [expanded])

  function getActionStyle(action: string) {
    const a = action.toUpperCase()
    if (['DEPOSIT_TO_USYC', 'WITHDRAW_FROM_USYC'].includes(a)) {
      return { border: '#34D399', badge: 'bg-[rgba(52,211,153,0.15)] text-usyc' }
    }
    if (a === 'BLOCKED') {
      return { border: '#F87171', badge: 'bg-[rgba(248,113,113,0.15)] text-alert-red' }
    }
    return { border: '#8B7FA8', badge: 'bg-[rgba(139,127,168,0.15)] text-muted-foreground' }
  }

  function formatTime(ts: string) {
    const d = new Date(ts)
    const month = d.toLocaleString('en-US', { month: 'short' })
    const day = d.getDate()
    const hours = String(d.getHours()).padStart(2, '0')
    const mins = String(d.getMinutes()).padStart(2, '0')
    return `${month} ${day}, ${hours}:${mins}`
  }

  return (
    <section className="group relative mt-3 rounded-[4px] border border-border bg-card p-3 transition-all hover:-translate-y-[1px] hover:shadow-[0_0_24px_rgba(192,132,252,0.2)]">
      {/* Card header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ScrollIcon size={18} />
          <p className="font-sans text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            DECISION LOG
          </p>
          <span className="rounded-[3px] bg-[rgba(192,132,252,0.15)] px-1.5 py-0.5 font-sans text-[11px] font-medium text-primary">
            {MOCK_RECENT_LOG.length} recent
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/decision-log"
            onClick={e => e.stopPropagation()}
            className="font-sans text-[11px] text-muted-foreground transition-colors hover:text-primary"
          >
            {'View all ->'}
          </Link>
          <button
            onClick={() => setExpanded(e => !e)}
            className="flex h-6 w-6 items-center justify-center rounded-[3px] border border-border bg-background transition-colors hover:border-primary"
            aria-expanded={expanded}
            aria-label="Toggle decision log details"
          >
            <span className="text-[12px] text-muted-foreground" style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', display: 'inline-block', transition: 'transform 0.2s ease' }}>
              {'\u25BC'}
            </span>
          </button>
        </div>
      </div>

      {/* Summary row (always visible) */}
      <div className="mt-2 flex flex-wrap items-center gap-2">
        {MOCK_POLICIES.map((p, i) => (
          <span key={i} className={`inline-flex items-center gap-1.5 rounded-[3px] border border-border px-2 py-0.5 font-sans text-[11px] ${
            p.status === 'SAFE' ? 'text-usyc' : 'text-amber'
          }`}>
            <ShieldIcon size={12} safe={p.status === 'SAFE'} />
            {p.name}: {p.status}
          </span>
        ))}
      </div>

      {/* Expandable content */}
      <div
        style={{
          maxHeight: expanded ? `${contentHeight}px` : '0px',
          overflow: 'hidden',
          transition: 'max-height 0.3s ease-in-out',
        }}
      >
        <div ref={contentRef} className="mt-3 flex flex-col gap-3 border-t border-border pt-3 lg:flex-row">
          {/* Left: Policy list */}
          <div className="w-full rounded-[4px] border border-border bg-background p-4 lg:w-2/5">
            <p className="mb-3 font-sans text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              ACTIVE POLICIES
            </p>
            <div className="flex flex-col gap-2">
              {MOCK_POLICIES.map((p, i) => (
                <div key={i} className="flex items-center justify-between rounded-[3px] border border-border bg-card px-3 py-2">
                  <div className="flex items-center gap-2">
                    <ShieldIcon size={14} safe={p.status === 'SAFE'} />
                    <span className="font-sans text-[12px] text-foreground">{p.name}</span>
                  </div>
                  <span className={`rounded-[3px] px-2 py-0.5 font-sans text-[11px] font-medium ${
                    p.status === 'SAFE'
                      ? 'bg-[rgba(52,211,153,0.15)] text-usyc'
                      : 'bg-[rgba(251,191,36,0.15)] text-amber'
                  }`}>
                    {p.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Last 4 decision logs */}
          <div className="w-full rounded-[4px] border border-border bg-background p-4 lg:w-3/5">
            <p className="mb-3 font-sans text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              RECENT DECISIONS
            </p>
            <div className="flex flex-col gap-2">
              {MOCK_RECENT_LOG.map(d => {
                const style = getActionStyle(d.action)
                const amount = d.execution && typeof d.execution === 'object' && 'amount' in d.execution
                  ? `$${Number(d.execution.amount).toLocaleString('en-US')}`
                  : null
                return (
                  <div
                    key={d.id}
                    className="rounded-[3px] border border-border bg-card px-3 py-2"
                    style={{ borderLeftWidth: '3px', borderLeftColor: style.border }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`rounded-[3px] px-2 py-0.5 font-sans text-[11px] font-medium uppercase ${style.badge}`}>
                          {d.action.replace(/_/g, ' ')}
                        </span>
                        {amount && (
                          <span className="font-sans text-[11px] text-foreground">{amount}</span>
                        )}
                      </div>
                      <span className="font-mono text-[11px] text-muted-foreground">{formatTime(d.timestamp)}</span>
                    </div>
                    <p className="mt-1 truncate font-sans text-[12px] text-muted-foreground">
                      {d.reasoning[0]}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ===== Main Dashboard Page =====
export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-3">
      {/* Section 1: Treasury Overview */}
      <TreasuryOverview treasury={MOCK_TREASURY} />

      {/* Section 2: Decision Log Summary */}
      <DecisionLogSummary />

      {/* Section 3: Payday Card */}
      <div className="mt-3">
        <PaydayCard treasury={MOCK_TREASURY} />
      </div>

      {/* Section 3: Yield Breakdown */}
      <div className="mt-3">
        <YieldBreakdown treasury={MOCK_TREASURY} signals={MOCK_SIGNALS} />
      </div>

      {/* Section 4: Detailed Breakdown */}
      {/* <div className="mt-3">
        <DetailedBreakdown treasury={MOCK_TREASURY} />
      </div> */}
    </div>
  )
}
