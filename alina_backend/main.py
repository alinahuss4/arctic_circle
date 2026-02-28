from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from decisions import evaluate
from logger import get_recent_decisions, init_db
from signals import get_usdc_yield
from circle_client import get_balances
from config import EMPLOYEES
import threading
import time

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"])

init_db()

def agent_loop():
    while True:
        balances = get_balances()
        evaluate(
            usdc_balance=balances["usdc_balance"],
            usyc_balance=balances["usyc_balance"]
        )
        time.sleep(60)

threading.Thread(target=agent_loop, daemon=True).start()

@app.get("/treasury")
def treasury():
    balances = get_balances()
    return {
        "usdc_balance": balances["usdc_balance"],
        "usyc_balance": balances["usyc_balance"],
        "total": balances["usdc_balance"] + balances["usyc_balance"]
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