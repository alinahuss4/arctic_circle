from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from decisions import evaluate
from logger import get_recent_decisions, init_db
from signals import get_usdc_yield
from config import EMPLOYEES
import threading
import time

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"])

init_db()

# Mock balances until Circle wallets are ready
treasury_state = {
    "usdc_balance": 50000.0,
    "usyc_balance": 10000.0
}

def agent_loop():
    while True:
        evaluate(
            usdc_balance=treasury_state["usdc_balance"],
            usyc_balance=treasury_state["usyc_balance"]
        )
        time.sleep(60)

threading.Thread(target=agent_loop, daemon=True).start()

@app.get("/treasury")
def treasury():
    return {
        "usdc_balance": treasury_state["usdc_balance"],
        "usyc_balance": treasury_state["usyc_balance"],
        "total": treasury_state["usdc_balance"] + treasury_state["usyc_balance"]
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
    result = evaluate(
        usdc_balance=treasury_state["usdc_balance"],
        usyc_balance=treasury_state["usyc_balance"]
    )
    return result