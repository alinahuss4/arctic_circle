EMPLOYEES = [
    {"id": "EMP001", "name": "Alice", "wallet_id": "TBD", "salary": 5000},
    {"id": "EMP002", "name": "Bob",   "wallet_id": "TBD", "salary": 4500},
    {"id": "EMP003", "name": "Carol", "wallet_id": "TBD", "salary": 6000},
    {"id": "EMP004", "name": "Dave",  "wallet_id": "TBD", "salary": 3500},
    {"id": "EMP005", "name": "Eve",   "wallet_id": "TBD", "salary": 5500},
]

TOTAL_PAYROLL = sum(e["salary"] for e in EMPLOYEES)  # 24500
MIN_LIQUIDITY_RATIO = 0.40
MAX_USYC_RATIO = 0.60
YIELD_THRESHOLD = 4.0
PAY_DAY = 28
DAYS_BEFORE_PAYROLL_PREP = 2