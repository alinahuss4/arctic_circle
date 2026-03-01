from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from decisions import evaluate
from logger import get_recent_decisions, init_db
from signals import get_usdc_yield
from circle_client import get_balances
from config import EMPLOYEES, TOTAL_PAYROLL
import os
import threading
import time

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:3000",
    "http://127.0.0.1:30...",
    "https://de-fi-hackathon.vercel.app"
]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

init_db()

def agent_loop():
    while True:
        balances = get_balances()
        evaluate(
            usdc_balance=balances["usdc_balance"],
            usyc_balance=balances["usyc_balance"]
        )
        time.sleep(300)

threading.Thread(target=agent_loop, daemon=True).start()

@app.get("/treasury")
def treasury():
    balances = get_balances()
    return {
        "usdc_balance": balances["usdc_balance"],
        "usyc_balance": balances["usyc_balance"],
        "total": balances["usdc_balance"] + balances["usyc_balance"],
        "total_payroll": TOTAL_PAYROLL
    }

@app.get("/signals")
def signals():
    return {"yield_rate": get_usdc_yield()}

@app.get("/decisions")
def decisions():
    return get_recent_decisions()

@app.get("/employees")
def employees():
    return EMPLOYEES

@app.post("/trigger")
def trigger():
    balances = get_balances()
    result = evaluate(
        usdc_balance=balances["usdc_balance"],
        usyc_balance=balances["usyc_balance"]
    )
    return result

@app.get("/transactions/{tx_id}")
def get_transaction(tx_id: str):
    import requests as req
    r = req.get(
        f"https://api.circle.com/v1/w3s/transactions/{tx_id}",
        headers={"Authorization": f"Bearer {os.getenv('CIRCLE_API_KEY')}"}
    )
    data = r.json()["data"]["transaction"]
    blockchain = data.get("blockchain", "")
    tx_hash = data.get("txHash")

    explorer_url = None
    if tx_hash:
        if "ARC" in blockchain:
            explorer_url = f"https://testnet.arcscan.app/tx/{tx_hash}"
        elif "SEPOLIA" in blockchain:
            explorer_url = f"https://sepolia.etherscan.io/tx/{tx_hash}"

    return {
        "tx_id": tx_id,
        "state": data.get("state"),
        "tx_hash": tx_hash,
        "blockchain": blockchain,
        "amounts": data.get("amounts"),
        "explorer_url": explorer_url,
    }
    import requests as req
    r = req.post("http://localhost:3001/bridge", json=payload, timeout=120)
    return r.json()
