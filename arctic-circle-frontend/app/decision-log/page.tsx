'use client'

import { useState, useRef, useEffect } from 'react'
import { ShieldIcon, ChartBarsIcon, CoinIcon } from '@/components/pixel-icons'
import { getTreasury, getSignals, getDecisions } from '@/lib/api'

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

interface Decision {
  id: number | string
  timestamp: string
  action: string
  reasoning: string[]
  position: Record<string, unknown> | null
  yield_rate: number
  execution: Record<string, unknown> | null
}

type FilterAction = 'ALL' | 'DEPOSIT' | 'WITHDRAW' | 'PAYROLL' | 'BLOCKED' | 'MONITOR'
const FILTER_ACTIONS: FilterAction[] = ['ALL', 'DEPOSIT', 'WITHDRAW', 'PAYROLL', 'BLOCKED', 'MONITOR']

function PolicyPanel({ treasury, signals }: { treasury: TreasuryData; signals: SignalData }) {
  type PolicyStatus = 'SAFE' | 'AT RISK' | 'BREACHED'

  function StatusBadge({ status }: { status: PolicyStatus }) {
    const styles = { 'SAFE': 'bg-[rgba(52,211,153,0.15)] text-usyc', 'AT RISK': 'bg-[rgba(251,191,36,0.15)] text-amber', 'BREACHED': 'bg-[rgba(248,113,113,0.15)] text-alert-red' }
    return <span className={`inline-block rounded-[3px] px-2 py-0.5 font-sans text-[11px] font-medium ${styles[status]}`}>{status}</span>
  }



  const TOTAL_PAYROLL = treasury.total_payroll
  const liqPct = treasury.liquidity_ratio * 100
  const usycPct = treasury.usyc_ratio * 100
  const hasPayrollBuffer = treasury.usdc >= TOTAL_PAYROLL * 1.1

  const policies: { icon: React.ReactNode; label: string; rule: string; current: string; threshold: string; status: PolicyStatus }[] = [
    { icon: <ShieldIcon size={20} safe={liqPct >= 40} />, label: 'Min Liquidity', rule: 'Keep >= 40% in USDC', current: `${liqPct.toFixed(1)}%`, threshold: '40%', status: liqPct >= 40 ? 'SAFE' : 'BREACHED' },
    { icon: <ShieldIcon size={20} safe={usycPct <= 60} />, label: 'Max USYC Cap', rule: 'Never exceed 60% in USYC', current: `${usycPct.toFixed(1)}%`, threshold: '60%', status: usycPct <= 60 ? 'SAFE' : 'BREACHED' },
    { icon: <ChartBarsIcon size={20} />, label: 'Yield Threshold', rule: 'Deploy only if APY > 4%', current: `${signals.yield_rate.toFixed(2)}%`, threshold: '4%', status: 'SAFE' },
    { icon: <CoinIcon size={20} />, label: 'Payroll Buffer', rule: 'Maintain 110% of payroll in USDC', current: `$${treasury.usdc.toLocaleString('en-US', { minimumFractionDigits: 0 })}`, threshold: `$${(TOTAL_PAYROLL * 1.1).toLocaleString()}`, status: hasPayrollBuffer ? 'SAFE' : 'AT RISK' },
  ]

  return (
    <section className="rounded-[4px] border border-border bg-card p-5">
      <p className="mb-4 font-sans text-[11px] font-medium uppercase tracking-wider text-muted-foreground">ACTIVE POLICIES</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {policies.map((p, i) => (
          <div key={i} className="rounded-[4px] border border-border bg-background p-4">
            <div className="mb-2">{p.icon}</div>
            <p className="font-sans text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{p.label}</p>
            <p className="mt-1 font-sans text-[12px] text-foreground">{p.rule}</p>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="font-sans text-[14px] font-bold text-foreground">{p.current}</span>
              <span className="font-sans text-[11px] text-muted-foreground">vs {p.threshold}</span>
            </div>
            <div className="mt-2"><StatusBadge status={p.status} /></div>
          </div>
        ))}
      </div>
    </section>
  )
}

function FilterBar({ activeFilter, setActiveFilter, dateFrom, setDateFrom, dateTo, setDateTo, search, setSearch }: {
  activeFilter: FilterAction; setActiveFilter: (f: FilterAction) => void
  dateFrom: string; setDateFrom: (v: string) => void
  dateTo: string; setDateTo: (v: string) => void
  search: string; setSearch: (v: string) => void
}) {
  return (
    <div className="flex flex-col gap-4 rounded-[4px] border border-border bg-card p-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap gap-2">
        {FILTER_ACTIONS.map(action => (
          <button key={action} onClick={() => setActiveFilter(action)}
            className={`rounded-[3px] px-3 py-1.5 font-sans text-[12px] font-medium transition-colors ${activeFilter === action ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground' : 'border border-border bg-card text-muted-foreground hover:border-primary hover:text-primary'}`}>
            {action}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <label className="font-sans text-[12px] text-muted-foreground" htmlFor="date-from">From</label>
          <input id="date-from" type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="rounded-[4px] border border-border bg-input px-2 py-1 font-sans text-[13px] text-foreground focus:border-primary focus:outline-none" />
        </div>
        <div className="flex items-center gap-2">
          <label className="font-sans text-[12px] text-muted-foreground" htmlFor="date-to">To</label>
          <input id="date-to" type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="rounded-[4px] border border-border bg-input px-2 py-1 font-sans text-[13px] text-foreground focus:border-primary focus:outline-none" />
        </div>
        <input type="text" placeholder="Search reasoning..." value={search} onChange={e => setSearch(e.target.value)} className="rounded-[4px] border border-border bg-input px-3 py-1.5 font-sans text-[13px] text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none" />
      </div>
    </div>
  )
}

function DecisionCard({ decision, defaultExpanded }: { decision: Decision; defaultExpanded: boolean }) {
  const [expanded, setExpanded] = useState(defaultExpanded)
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState(0)

  useEffect(() => { if (contentRef.current) setContentHeight(contentRef.current.scrollHeight) }, [expanded])

  const action = (decision.action || '').toUpperCase()
  const reasoningLines = decision.reasoning || []

  let borderColor = '#8B7FA8'
  let badgeBg = 'bg-[rgba(139,127,168,0.15)]'
  let badgeText = 'text-muted-foreground'

  if (['DEPOSIT_TO_USYC', 'EXECUTE_PAYROLL', 'WITHDRAW_FROM_USYC'].includes(action)) {
    borderColor = '#34D399'; badgeBg = 'bg-[rgba(52,211,153,0.15)]'; badgeText = 'text-usyc'
  } else if (action === 'BLOCKED') {
    borderColor = '#F87171'; badgeBg = 'bg-[rgba(248,113,113,0.15)]'; badgeText = 'text-alert-red'
  }

  const amount = decision.execution && typeof decision.execution === 'object' && 'amount' in decision.execution
    ? `$${Number(decision.execution.amount).toLocaleString('en-US')}` : '-'

  return (
    <div className="cursor-pointer rounded-[4px] border border-border bg-card transition-all hover:-translate-y-[1px] hover:shadow-[0_0_12px_rgba(192,132,252,0.1)]"
      style={{ borderLeftWidth: '3px', borderLeftColor: borderColor }}
      onClick={() => setExpanded(e => !e)} role="button" tabIndex={0}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setExpanded(v => !v) }}
      aria-expanded={expanded}>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <span className={`rounded-[3px] px-2 py-0.5 font-sans text-[12px] font-medium uppercase ${badgeBg} ${badgeText}`}>{action.replace(/_/g, ' ')}</span>
          {amount !== '-' && <span className="font-sans text-[12px] text-foreground">{amount}</span>}
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[13px] text-muted-foreground">{decision.timestamp}</span>
          <span className="font-sans text-[14px] text-muted-foreground">{expanded ? '\u25B2' : '\u25BC'}</span>
        </div>
      </div>

      {!expanded && (
        <div className="px-4 pb-2">
          <p className="truncate font-sans text-[13px] text-muted-foreground">{reasoningLines[0] || 'No reasoning provided'}</p>
        </div>
      )}

      <div style={{ maxHeight: expanded ? `${contentHeight}px` : '0px', overflow: 'hidden', transition: 'max-height 0.3s ease-in-out' }}>
        <div ref={contentRef} className="border-t border-border px-4 py-4">
          <div className="mb-4 grid grid-cols-2 gap-x-6 gap-y-3">
            <div>
              <p className="font-sans text-[11px] font-medium uppercase tracking-wider text-muted-foreground">AMOUNT</p>
              <p className="font-sans text-[14px] text-foreground">{amount}</p>
            </div>
            <div>
              <p className="font-sans text-[11px] font-medium uppercase tracking-wider text-muted-foreground">YIELD AT DECISION</p>
              <p className="font-sans text-[14px] text-foreground">{decision.yield_rate ? `${decision.yield_rate}%` : '-'}</p>
            </div>
            <div>
              <p className="font-sans text-[11px] font-medium uppercase tracking-wider text-muted-foreground">POSITION</p>
              <p className="font-mono text-[12px] text-muted-foreground">
                {decision.position ? `USDC: $${Number((decision.position as Record<string, number>).usdc).toLocaleString()} | USYC: $${Number((decision.position as Record<string, number>).usyc).toLocaleString()}` : '-'}
              </p>
            </div>
            <div>
              <p className="font-sans text-[11px] font-medium uppercase tracking-wider text-muted-foreground">POLICY RESULT</p>
              <p className="font-sans text-[14px] text-foreground">{action.replace(/_/g, ' ')}</p>
            </div>
          </div>
          <div>
            <p className="mb-2 font-sans text-[11px] font-medium uppercase tracking-wider text-muted-foreground">AGENT REASONING</p>
            <div className="flex flex-col gap-1">
              {reasoningLines.map((line, i) => {
                const lineColor = action === 'BLOCKED' ? 'text-alert-red' : borderColor === '#34D399' ? 'text-usyc' : 'text-muted-foreground'
                return (
                  <p key={i} className={`typewriter-line font-sans text-[14px] ${lineColor}`} style={{ animationDelay: `${i * 0.15}s`, opacity: 0 }}>
                    {String(i + 1).padStart(2, '0')}. {line}
                  </p>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DecisionLogPage() {
  const [activeFilter, setActiveFilter] = useState<FilterAction>('ALL')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [search, setSearch] = useState('')
  const [treasury, setTreasury] = useState<TreasuryData>({ usdc: 0, usyc: 0, total: 0, liquidity_ratio: 0, usyc_ratio: 0 })
  const [signals, setSignals] = useState<SignalData>({ yield_rate: 0 })
  const [decisions, setDecisions] = useState<Decision[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const [t, s, d] = await Promise.all([getTreasury(), getSignals(), getDecisions()])
        setTreasury(t)
        setSignals(s)
        setDecisions(d)
      } catch (e) {
        console.error('Failed to load decision log data', e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const filteredDecisions = decisions
    .filter(d => {
      if (activeFilter !== 'ALL') {
        const action = (d.action || '').toUpperCase()
        if (activeFilter === 'DEPOSIT' && !action.includes('DEPOSIT')) return false
        if (activeFilter === 'WITHDRAW' && !action.includes('WITHDRAW')) return false
        if (activeFilter === 'PAYROLL' && !action.includes('PAYROLL')) return false
        if (activeFilter === 'BLOCKED' && action !== 'BLOCKED') return false
        if (activeFilter === 'MONITOR' && action !== 'MONITOR') return false
      }
      if (dateFrom && d.timestamp < dateFrom) return false
      if (dateTo && d.timestamp > dateTo + 'T23:59:59') return false
      if (search) {
        const reasoningText = d.reasoning.join(' ')
        if (!reasoningText.toLowerCase().includes(search.toLowerCase())) return false
      }
      return true
    })
    .sort((a, b) => (b.timestamp || '').localeCompare(a.timestamp || ''))

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="font-sans text-[14px] text-muted-foreground">Loading decisions...</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <PolicyPanel treasury={treasury} signals={signals} />
      <div className="mt-6">
        <FilterBar activeFilter={activeFilter} setActiveFilter={setActiveFilter} dateFrom={dateFrom} setDateFrom={setDateFrom} dateTo={dateTo} setDateTo={setDateTo} search={search} setSearch={setSearch} />
      </div>
      <div className="mt-6 flex flex-col gap-4">
        {filteredDecisions.length === 0 ? (
          <p className="py-12 text-center font-sans text-[14px] text-muted-foreground">No decisions match your filters</p>
        ) : (
          filteredDecisions.map(d => <DecisionCard key={d.id} decision={d} defaultExpanded={false} />)
        )}
      </div>
    </div>
  )
}