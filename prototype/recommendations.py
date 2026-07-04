"""Deterministic recommendation and mock Qwen summary layer."""

from __future__ import annotations


def generate_recommendations(
    current_cash: float,
    forecast_values: dict[int, float],
    average_daily_movement: float,
    liquidity_risk: str,
) -> list[str]:
    """Generate deterministic treasury recommendations from forecast signals."""
    recommendations: list[str] = []
    lowest_forecast = min(forecast_values.values())

    if average_daily_movement < 0:
        recommendations.append("Reduce discretionary spending until cash movement stabilizes.")

    if lowest_forecast < 0:
        recommendations.append("Accelerate receivables collection to prevent a negative cash position.")

    if liquidity_risk == "High":
        recommendations.append("Review supplier payment timing and defer non-critical outflows.")
        recommendations.append("Prepare a short-term liquidity action plan for finance leadership.")
    elif liquidity_risk == "Medium":
        recommendations.append("Follow up overdue invoices and protect the operating cash reserve.")
        recommendations.append("Delay non-essential spending until the 60 day forecast improves.")
    else:
        recommendations.append("Maintain the current reserve policy and monitor weekly cash movement.")
        recommendations.append("Continue standard collections follow-up for overdue invoices.")

    if forecast_values[90] < current_cash:
        recommendations.append("Track the 90 day cash trend in weekly treasury reviews.")

    return _deduplicate(recommendations)


def generate_executive_summary(
    current_cash: float,
    forecast_values: dict[int, float],
    liquidity_risk: str,
    recommendations: list[str],
) -> str:
    """Simulate a Qwen-generated executive summary with deterministic text."""
    trend = "decline" if forecast_values[90] < current_cash else "remain stable"
    primary_action = recommendations[0] if recommendations else "Maintain current controls."

    return (
        "Qwen 3.6 Plus mock summary: "
        f"Current cash is AED {current_cash:,.0f}. "
        f"The 30, 60, and 90 day forecasts are AED {forecast_values[30]:,.0f}, "
        f"AED {forecast_values[60]:,.0f}, and AED {forecast_values[90]:,.0f}. "
        f"Liquidity risk is classified as {liquidity_risk}. "
        f"Cash is expected to {trend} over the forecast window. "
        f"Recommended next step: {primary_action}"
    )


def _deduplicate(items: list[str]) -> list[str]:
    """Keep recommendation order stable while removing duplicates."""
    seen: set[str] = set()
    unique_items: list[str] = []

    for item in items:
        if item not in seen:
            seen.add(item)
            unique_items.append(item)

    return unique_items
