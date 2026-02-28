def get_usdc_yield():
    try:
        response = requests.get("https://yields.llama.fi/pools")
        pools = response.json()["data"]
        usdc_pools = [
            p for p in pools
            if "USDC" in p["symbol"] 
            and p["apy"] is not None 
            and 1 < p["apy"] < 20  # only realistic yield rates
            and p["tvlUsd"] > 1000000  # only pools with >$1m TVL
        ]
        if not usdc_pools:
            return 4.5
        best = max(usdc_pools, key=lambda p: p["apy"])
        print(f"Best USDC yield: {best['apy']}% on {best['project']}")
        return float(best["apy"])
    except:
        return 4.5