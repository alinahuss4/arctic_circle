from config import MIN_LIQUIDITY_RATIO, MAX_USYC_RATIO, TOTAL_PAYROLL

def check_policies(action, usdc_balance, usyc_balance, amount=0):
    total = usdc_balance + usyc_balance
    violations = []

    if action == "deposit_to_usyc":
        post_usyc_ratio = (usyc_balance + amount) / total
        post_liquidity = (usdc_balance - amount) / total
        if post_usyc_ratio > MAX_USYC_RATIO:
            violations.append(
                f"Would exceed max USYC exposure of {MAX_USYC_RATIO*100}%. "
                f"Post-deposit ratio would be {post_usyc_ratio*100:.1f}%."
            )
        if post_liquidity < MIN_LIQUIDITY_RATIO:
            violations.append(
                f"Would breach minimum liquidity buffer of {MIN_LIQUIDITY_RATIO*100}%. "
                f"Post-deposit liquidity would be {post_liquidity*100:.1f}%."
            )

    if action == "execute_payroll":
        if usdc_balance < TOTAL_PAYROLL * 1.1:
            violations.append(
                f"Insufficient funds. Need {TOTAL_PAYROLL * 1.1:.0f} USDC "
                f"(payroll + 10% buffer). Have {usdc_balance:.0f} USDC."
            )

    return {
        "approved": len(violations) == 0,
        "violations": violations
    }