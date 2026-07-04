"""Streamlit prototype for Cash Flow AI Agent."""

from __future__ import annotations

from pathlib import Path

import pandas as pd
import plotly.graph_objects as go
import streamlit as st

from forecasting import (
    calculate_net_cash,
    create_forecast_dataframe,
    forecast_cash,
    load_data,
)
from recommendations import generate_executive_summary, generate_recommendations
from risk_analysis import calculate_liquidity_risk, risk_explanation


SAMPLE_DATA_PATH = Path(__file__).with_name("sample_cashflow.csv")
OPENING_CASH = 5_000_000


def format_aed(value: float) -> str:
    """Format a numeric value as AED."""
    return f"AED {value:,.0f}"


def create_historical_chart(dataframe: pd.DataFrame) -> go.Figure:
    """Build a minimal historical cash position chart."""
    figure = go.Figure()
    figure.add_trace(
        go.Scatter(
            x=dataframe["date"],
            y=dataframe["cumulative_cash"],
            mode="lines",
            line={"color": "black", "width": 2},
            name="Historical Cash",
        )
    )
    return apply_chart_style(figure, "Historical Cash Position")


def create_forecast_chart(dataframe: pd.DataFrame) -> go.Figure:
    """Build a minimal forecasted cash position chart."""
    figure = go.Figure()
    figure.add_trace(
        go.Scatter(
            x=dataframe["date"],
            y=dataframe["forecast_cash"],
            mode="lines",
            line={"color": "black", "width": 2},
            name="Forecast Cash",
        )
    )
    return apply_chart_style(figure, "Forecasted Cash Position")


def apply_chart_style(figure: go.Figure, title: str) -> go.Figure:
    """Apply a consistent black and white enterprise chart style."""
    figure.update_layout(
        title=title,
        plot_bgcolor="white",
        paper_bgcolor="white",
        font={"color": "black"},
        margin={"l": 32, "r": 24, "t": 56, "b": 32},
        xaxis={"showgrid": False, "linecolor": "black"},
        yaxis={"showgrid": True, "gridcolor": "#E5E5E5", "linecolor": "black"},
        legend={"orientation": "h", "y": -0.2},
    )
    return figure


def render_kpis(current_cash: float, forecasts: dict[int, float], risk: str) -> None:
    """Render executive KPI cards."""
    columns = st.columns(5)
    values = [
        ("Current Cash", format_aed(current_cash)),
        ("30 Day Forecast", format_aed(forecasts[30])),
        ("60 Day Forecast", format_aed(forecasts[60])),
        ("90 Day Forecast", format_aed(forecasts[90])),
        ("Liquidity Risk", risk),
    ]

    for column, (label, value) in zip(columns, values):
        with column:
            st.metric(label, value)


def main() -> None:
    """Run the Streamlit application."""
    st.set_page_config(
        page_title="Cash Flow AI Agent",
        layout="wide",
    )

    st.title("Cash Flow AI Agent")
    st.caption("Offline Qwen 3.6 Plus mock prototype for treasury forecasting.")

    uploaded_file = st.file_uploader(
        "Upload sample_cashflow.csv",
        type=["csv"],
        help="Expected columns: date, inflows, outflows.",
    )

    source = uploaded_file if uploaded_file is not None else SAMPLE_DATA_PATH

    try:
        raw_data = load_data(source)
    except ValueError as error:
        st.error(str(error))
        return

    cashflow = calculate_net_cash(raw_data, opening_cash=OPENING_CASH)
    current_cash = float(cashflow["cumulative_cash"].iloc[-1])
    average_daily_movement = float(cashflow["net_cash_flow"].mean())
    forecasts = forecast_cash(current_cash, average_daily_movement)
    forecast_dataframe = create_forecast_dataframe(
        last_date=pd.Timestamp(cashflow["date"].iloc[-1]),
        current_cash=current_cash,
        average_daily_movement=average_daily_movement,
    )
    risk = calculate_liquidity_risk(forecasts)
    lowest_projected_cash = min(forecasts.values())
    recommendations = generate_recommendations(
        current_cash=current_cash,
        forecast_values=forecasts,
        average_daily_movement=average_daily_movement,
        liquidity_risk=risk,
    )
    executive_summary = generate_executive_summary(
        current_cash=current_cash,
        forecast_values=forecasts,
        liquidity_risk=risk,
        recommendations=recommendations,
    )

    render_kpis(current_cash, forecasts, risk)

    st.divider()

    chart_columns = st.columns(2)
    with chart_columns[0]:
        st.plotly_chart(create_historical_chart(cashflow), use_container_width=True)
    with chart_columns[1]:
        st.plotly_chart(
            create_forecast_chart(forecast_dataframe),
            use_container_width=True,
        )

    st.divider()

    summary_column, recommendations_column = st.columns([1.2, 0.8])
    with summary_column:
        st.subheader("Executive Summary")
        st.write(executive_summary)
        st.caption(risk_explanation(risk, lowest_projected_cash))

    with recommendations_column:
        st.subheader("Recommendations")
        for recommendation in recommendations:
            st.write(f"- {recommendation}")

    with st.expander("Processed cash flow data"):
        st.dataframe(cashflow, use_container_width=True, hide_index=True)


if __name__ == "__main__":
    main()
