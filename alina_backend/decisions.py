import datetime
from signals import get_usdc_yield
from policies import check_policies
from logger import log_decision, init_db
from circle_client import get_balances, deposit_to_usyc, withdraw_from_usyc, execute_payroll
from config import TOTAL_PAYROLL, YIELD_THRESHOLD, PAY_DAY, DAYS_BEFORE_PAYROLL_PREP, EMPLOYEES

def days_until_payday():
    today = datetime.date.today()
    pay_date = today.replace(day=PAY_DAY)
    if pay_date <= today:
        if today.month == 12:
            pay_date = pay_date.replace(year=today.year+1, month=1)
        else:
            pay_date = pay_date.replace(month=today.month+1)
    return (pay_date - today).days

def evaluate(usdc_balance=None, usyc_balance=None):
    if usdc_balance is None or usyc_balance is None:
        balances = get_balances()
        usdc_balance = balances["usdc_balance"]
        usyc_balance = balances["usyc_balance"]

    yield_rate = get_usdc_yield()
    days_to_pay = days_until_payday()
    reasoning = []
    action = "monitor"
    execution = None

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
            execution = execute_payroll(EMPLOYEES)

    elif days_to_pay <= DAYS_BEFORE_PAYROLL_PREP:
        needed = TOTAL_PAYROLL * 1.1
        if usdc_balance < needed:
            shortfall = needed - usdc_balance
            action = "withdraw_from_usyc"
            reasoning.append(
                f"Payroll in {days_to_pay} days. Need {needed:.0f} USDC. "
                f"Withdrawing {shortfall:.0f} from USYC."
            )
            execution = withdraw_from_usyc(shortfall)
        else:
            action = "monitor"
            reasoning.append(
                f"Payroll in {days_to_pay} days. "
                f"Liquidity sufficient at {usdc_balance:.0f} USDC."
            )

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
                execution = deposit_to_usyc(excess)
        else:
            action = "monitor"
            reasoning.append(
                f"Yield attractive at {yield_rate:.1f}% but no excess "
                f"funds above payroll buffer to deploy."
            )
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
        violations=[] if approved else reasoning,
        execution=execution
    )

    return {
        "action": action,
        "reasoning": reasoning,
        "usdc_balance": usdc_balance,
        "usyc_balance": usyc_balance,
        "yield_rate": yield_rate,
        "days_to_payday": days_to_pay,
        "execution": execution
    }

if __name__ == "__main__":
    init_db()
    result = evaluate()
    print(f"Action: {result['action']}")
    print(f"Reasoning: {result['reasoning']}")