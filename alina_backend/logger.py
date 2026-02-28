import sqlite3
import json
from datetime import datetime

DB_PATH = "payroll.db"

def init_db():
    conn = sqlite3.connect(DB_PATH)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS decisions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT,
            action TEXT,
            approved INTEGER,
            reasoning TEXT,
            usdc_balance REAL,
            usyc_balance REAL,
            yield_rate REAL,
            violations TEXT,
            execution TEXT
        )
    """)
    conn.commit()
    conn.close()

def log_decision(action, approved, reasoning, usdc, usyc, yield_rate, violations=None, execution=None):
    conn = sqlite3.connect(DB_PATH)
    conn.execute(
        "INSERT INTO decisions VALUES (NULL,?,?,?,?,?,?,?,?,?)",
        (
            datetime.utcnow().isoformat(),
            action,
            1 if approved else 0,
            " ".join(reasoning),
            usdc,
            usyc,
            yield_rate,
            json.dumps(violations or []),
            json.dumps(execution) if execution else None
        )
    )
    conn.commit()
    conn.close()

def get_recent_decisions(limit=20):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.execute(
        "SELECT * FROM decisions ORDER BY timestamp DESC LIMIT ?", (limit,)
    )
    columns = [d[0] for d in cursor.description]
    rows = [dict(zip(columns, row)) for row in cursor.fetchall()]
    conn.close()
    return rows