# test_integration.py
from circle_client import get_balances, deposit_to_usyc, withdraw_from_usyc, execute_payroll
from decisions import evaluate
from config import EMPLOYEES

print("=== Testing circle_client ===")

# Test balances
balances = get_balances()
print(f"Balances: {balances}")
assert "usdc_balance" in balances
assert "usyc_balance" in balances
print("✓ get_balances works")

# Test deposit
result = deposit_to_usyc(1000)
print(f"Deposit result: {result}")
assert result["status"] == "success"
print("✓ deposit_to_usyc works")

# Test withdraw
result = withdraw_from_usyc(1000)
print(f"Withdraw result: {result}")
assert result["status"] == "success"
print("✓ withdraw_from_usyc works")

# Test payroll
result = execute_payroll(EMPLOYEES)
print(f"Payroll result: {result}")
assert len(result) == 5
assert all(r["status"] == "success" for r in result)
print("✓ execute_payroll works")

print("\n=== Testing decisions.py ===")

# Test evaluate picks up balances automatically
result = evaluate()
print(f"Action: {result['action']}")
print(f"Reasoning: {result['reasoning']}")
print(f"Execution: {result['execution']}")
assert "action" in result
assert "reasoning" in result
print("✓ evaluate works end to end")

print("\n=== All tests passed ===")