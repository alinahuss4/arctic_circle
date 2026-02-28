from circle_client import get_balances, deposit_to_usyc, withdraw_from_usyc, execute_payroll
from decisions import evaluate
from logger import init_db
from config import EMPLOYEES

init_db()

print("=== Testing circle_client ===")

balances = get_balances()
print(f"Balances: {balances}")
assert "usdc_balance" in balances
assert "usyc_balance" in balances
print("✓ get_balances works")

result = deposit_to_usyc(0.01)
print(f"Deposit result: {result}")
assert result["status"] == "success"
print("✓ deposit_to_usyc works")

result = withdraw_from_usyc(0.01)
print(f"Withdraw result: {result}")
assert result["status"] == "success"
print("✓ withdraw_from_usyc works")

# Use tiny amounts so we don't drain the wallet
test_employees = [{**emp, "salary": 0.01} for emp in EMPLOYEES]
result = execute_payroll(test_employees)
print(f"Payroll result: {result}")
assert len(result) == len(EMPLOYEES)
assert all(r["status"] == "success" for r in result)
print("✓ execute_payroll works")

print("\n=== Testing decisions.py ===")

result = evaluate()
print(f"Action: {result['action']}")
print(f"Reasoning: {result['reasoning']}")
print(f"Execution: {result['execution']}")
assert "action" in result
assert "reasoning" in result
print("✓ evaluate works end to end")

print("\n=== All tests passed ===")