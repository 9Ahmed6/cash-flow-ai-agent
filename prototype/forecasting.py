"""Forecasting utilities for the Cash Flow AI Agent prototype."""

from __future__ import annotations

from pathlib import Path
from typing import IO

import pandas as pd


REQUIRED_COLUMNS = {"date", "inflows", "outflows"}


def load_data(source: str | Path | IO[bytes] | IO[str]) -> pd.DataFrame:
    """Load and validate cash flow data from a CSV source."""
    dataframe = pd.read_csv(source)
    dataframe.columns = [column.strip().lower() for column in dataframe.columns]

    missing_columns = REQUIRED_COLUMNS.difference(dataframe.columns)
    if missing_columns:
        missing = ", ".join(sorted(missing_columns))
        raise ValueError(f"Missing required column(s): {missing}")

    dataframe = dataframe.loc[:, ["date", "inflows", "outflows"]].copy()
    dataframe["date"] = pd.to_datetime(dataframe["date"], errors="coerce")
    dataframe["inflows"] = pd.to_numeric(dataframe["inflows"], errors="coerce")
    dataframe["outflows"] = pd.to_numeric(dataframe["outflows"], errors="coerce")
    dataframe = dataframe.dropna(subset=["date", "inflows", "outflows"])

    if dataframe.empty:
        raise ValueError("No valid cash flow rows were found in the CSV file.")

    return dataframe.sort_values("date").reset_index(drop=True)


def calculate_net_cash(dataframe: pd.DataFrame, opening_cash: float = 5_000_000) -> pd.DataFrame:
    """Calculate daily net cash flow and cumulative cash balance."""
    cashflow = dataframe.copy()
    cashflow["net_cash_flow"] = cashflow["inflows"] - cashflow["outflows"]
    cashflow["cumulative_cash"] = opening_cash + cashflow["net_cash_flow"].cumsum()
    return cashflow


def forecast_cash(
    current_cash: float,
    average_daily_movement: float,
    forecast_days: tuple[int, ...] = (30, 60, 90),
) -> dict[int, float]:
    """Forecast future cash balances using average daily cash movement."""
    return {
        days: current_cash + (average_daily_movement * days)
        for days in forecast_days
    }


def create_forecast_dataframe(
    last_date: pd.Timestamp,
    current_cash: float,
    average_daily_movement: float,
    horizon_days: int = 90,
) -> pd.DataFrame:
    """Create a daily forecast dataframe for charting."""
    forecast_dates = pd.date_range(
        start=last_date + pd.Timedelta(days=1),
        periods=horizon_days,
        freq="D",
    )
    forecast = pd.DataFrame({"date": forecast_dates})
    forecast["forecast_cash"] = [
        current_cash + (average_daily_movement * day)
        for day in range(1, horizon_days + 1)
    ]
    return forecast
