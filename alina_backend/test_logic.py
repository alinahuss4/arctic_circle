from signals import get_usdc_yield
from policies import check_policies
from logger import init_db, log_decision, get_recent_decisions

init_db()

# Test signal
yield_rate = get_usdc_yield()
print(f"Current yield: {yield_rate}%")

# Test policy — should pass
result = check_policies("deposit_to_usyc", usdc_balance=50000, usyc_balance=10000, amount=5000)
print(f"Policy check (should pass): {result}")

# Test policy — should fail (insufficient funds)
result = check_policies("execute_payroll", usdc_balance=10000, usyc_balance=20000)
print(f"Policy check (should fail): {result}")

# Test logger
log_decision(
    action="deposit_to_usyc",
    approved=True,
    reasoning=["Yield at 5.2%, above 4% threshold. Payroll not due for 10 days. Moving excess to USYC."],
    usdc=50000,
    usyc=10000,
    yield_rate=yield_rate
)

print(f"Recent decisions: {get_recent_decisions()}")