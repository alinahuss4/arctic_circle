# Arctic Circle

## Overview
An autonomous payroll treasury agent built on Arc. Arctic Circle holds company funds in USDC, earns yield on idle capital between pay cycles, and distributes salaries to employees automatically on payday - no human intervention required.

## The Problem
Global payroll is slow, expensive, and opaque. Existing tools move money on a schedule but offer no yield optimisation, no policy enforcement, and no auditability. Finance teams can't explain to an auditor why money moved, only that it did.

## The Solution
Arctic Circle is a robot CFO. It watches live yield signals, enforces policy rules, executes payroll autonomously, and logs every decision with plain English reasoning.

**The full loop:**
- Company deposits payroll funds in USDC
- Agent moves idle funds into USYC to earn yield
- Agent pulls liquidity back before payday
- Agent checks policy rules and pays all employees automatically
- Every decision logged with full audit trail

## Tech Stack
- **Blockchain** - Arc, ETH-Sepolia
- **Wallets** - Circle Developer Controlled Wallets
- **Stablecoin** - USDC / USYC
- **Yield Oracle** - DeFi Llama
- **Backend** - Python, FastAPI
- **Database** - SQLite
