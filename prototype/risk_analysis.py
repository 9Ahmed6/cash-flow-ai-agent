"""Liquidity risk scoring for the Cash Flow AI Agent prototype."""

from __future__ import annotations


def calculate_liquidity_risk(
    forecast_values: dict[int, float],
    medium_threshold: float = 2_000_000,
    high_threshold: float = 0,
) -> str:
    """Classify liquidity risk based on the lowest projected cash balance."""
    lowest_projected_cash = min(forecast_values.values())

    if lowest_projected_cash <= high_threshold:
        return "High"
    if lowest_projected_cash < medium_threshold:
        return "Medium"
    return "Low"


def risk_explanation(risk_level: str, lowest_projected_cash: float) -> str:
    """Return a concise explanation for the liquidity risk rating."""
    formatted_cash = f"AED {lowest_projected_cash:,.0f}"

    if risk_level == "High":
        return (
            f"Projected cash falls to {formatted_cash}, indicating potential "
            "liquidity pressure that requires immediate management attention."
        )
    if risk_level == "Medium":
        return (
            f"Projected cash reaches {formatted_cash}, which is above zero but "
            "below the preferred reserve threshold."
        )
    return (
        f"Projected cash remains healthy at a low point of {formatted_cash}, "
        "leaving sufficient operating flexibility."
    )
