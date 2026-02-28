import datetime
from signals import get_usdc_yield
from policies import check_policies
from logger import log_decision
from config import TOTAL_PAYROLL, YIELD_THRESHOLD, PAY_DAY, DAYS_BEFORE_PAYROLL_PREP

def days_until_payday():
    today = datetime.date.today()
    pay_date = today.replace(day=PAY_DAY)
    if pay_date <= today:
        if today.month == 12:
            pay_date = pay_date.replace(year=today.year+1, month=1)
        else:
            pay_date = pay_date.replace(month=today.month+1)
    return (pay_date - today).days

def evaluate(usdc_balance, usyc_balance):
    yield_rate = get_usdc_yield()
    days_to_pay = days_until_payday()
    total = usdc_balance + usyc_balance
    reasoning = []
    action = "monitor"
    execution = None

    # payday
    if days_to_pay == 0:
        action = "execute_payroll"
        reasoning.append(
            f"Pay day. Treasury holds {usdc_balance:.0f} USDC. "
            f"Total payroll: {TOTAL_PAYROLL} USDC."
        )
        policy = check_policies(action, usdc_balance, usyc_balance)
        if not policy["approved"]:
            action = "blocked"
            reasoning += policy["violations"]
        else:
            reasoning.append("All policy checks passed. Executing payroll.")

    # pre-payroll prep
    elif days_to_pay <= DAYS_BEFORE_PAYROLL_PREP:
        needed = TOTAL_PAYROLL * 1.1
        if usdc_balance < needed:
            shortfall = needed - usdc_balance
            action = "withdraw_from_usyc"
            reasoning.append(
                f"Payroll in {days_to_pay} days. Need {needed:.0f} USDC. "
                f"Currently have {usdc_balance:.0f} USDC. "
                f"Withdrawing {shortfall:.0f} from USYC."
            )
        else:
            action = "monitor"
            reasoning.append(
                f"Payroll in {days_to_pay} days. "
                f"Liquidity sufficient at {usdc_balance:.0f} USDC."
            )

    # yield optimisation
    elif yield_rate > YIELD_THRESHOLD:
        excess = usdc_balance - (TOTAL_PAYROLL * 1.5)
        if excess > 0:
            action = "deposit_to_usyc"
            reasoning.append(
                f"Yield at {yield_rate:.1f}%, above {YIELD_THRESHOLD}% threshold. "
                f"Payroll not due for {days_to_pay} days. "
                f"Moving {excess:.0f} USDC excess to USYC."
            )
            policy = check_policies(action, usdc_balance, usyc_balance, excess)
            if not policy["approved"]:
                action = "blocked"
                reasoning += policy["violations"]
        else:
            action = "monitor"
            reasoning.append(
                f"Yield attractive at {yield_rate:.1f}% but no excess "
                f"funds above payroll buffer to deploy."
            )

    # hold
    else:
        reasoning.append(
            f"Yield at {yield_rate:.1f}%, below {YIELD_THRESHOLD}% threshold. "
            f"Holding in USDC. Payroll in {days_to_pay} days."
        )

    approved = action != "blocked"
    log_decision(
        action=action,
        approved=approved,
        reasoning=reasoning,
        usdc=usdc_balance,
        usyc=usyc_balance,
        yield_rate=yield_rate,
        violations=[] if approved else reasoning
    )

    return {
        "action": action,
        "reasoning": reasoning,
        "usdc_balance": usdc_balance,
        "usyc_balance": usyc_balance,
        "yield_rate": yield_rate,
        "days_to_payday": days_to_pay
    }

# test it
if __name__ == "__main__":
    result = evaluate(usdc_balance=50000, usyc_balance=10000)
    print(f"Action: {result['action']}")
    print(f"Reasoning: {result['reasoning']}")