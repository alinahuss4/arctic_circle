# circle_client.py
# Your engineer fills in the real Circle API calls
# You use mock values until they're ready

import os
from dotenv import load_dotenv

load_dotenv()

TREASURY_WALLET_ID = os.getenv("TREASURY_WALLET_ID")
USYC_WALLET_ID = os.getenv("USYC_WALLET_ID")

def get_balances():
    # TODO: your engineer replaces this with real Circle API call
    return {
        "usdc_balance": 50000.0,
        "usyc_balance": 10000.0
    }

def deposit_to_usyc(amount):
    # TODO: your engineer replaces this with real Circle transfer
    print(f"[MOCK] Transferring {amount} USDC to USYC wallet")
    return {"status": "success", "amount": amount, "mock": True}

def withdraw_from_usyc(amount):
    # TODO: your engineer replaces this with real Circle transfer
    print(f"[MOCK] Withdrawing {amount} USDC from USYC wallet")
    return {"status": "success", "amount": amount, "mock": True}

def execute_payroll(employees):
    # TODO: your engineer replaces this with real Circle transfers
    results = []
    for emp in employees:
        print(f"[MOCK] Paying {emp['name']} {emp['salary']} USDC")
        results.append({
            "employee": emp["name"],
            "amount": emp["salary"],
            "status": "success",
            "mock": True
        })
    return results