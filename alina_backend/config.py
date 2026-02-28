EMPLOYEES = [
    {"id": "EMP001", "name": "Alice", "wallet_id": "c31bf9de-643d-5cd6-9f14-a745eafbe3cc", "wallet_address": "0x1b24b82dc40fbe6f9776919f9fc4369332b3119c", "salary": 5000},
    {"id": "EMP002", "name": "Bob",   "wallet_id": "8b74b058-e619-5f2c-972c-1ee8d15f8497", "wallet_address": "0x3f61fd9149191043dae254a3d067df1bd784a0ad", "salary": 4500},
]

TOTAL_PAYROLL = sum(e["salary"] for e in EMPLOYEES)  # 9500
MIN_LIQUIDITY_RATIO = 0.40
MAX_USYC_RATIO = 0.60
YIELD_THRESHOLD = 4.0
PAY_DAY = 28
DAYS_BEFORE_PAYROLL_PREP = 2