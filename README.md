# Cash Flow AI Agent

An enterprise-style AI finance assistant proof of concept for forecasting company cash flow, identifying liquidity risk, and generating executive recommendations.

The application is designed for an AI Research Intern assessment and uses **Qwen 3.6 Plus** as the target reasoning model. No real LLM API is integrated. AI-like outputs are simulated through deterministic Python functions so the project runs fully offline while keeping the architecture ready for a future Qwen API adapter.

## Project Overview

Cash Flow AI Agent helps finance and treasury teams understand where cash is moving, how liquidity may change over the next 30, 60, and 90 days, and what actions leadership should consider.

The repository contains:

- A minimal enterprise SaaS landing page built with Next.js 15, TypeScript, Tailwind CSS, and Lucide Icons.
- A Streamlit prototype that ingests cash flow data, forecasts balances, scores liquidity risk, and generates deterministic executive recommendations.
- Prompt templates and an assessment report documenting the model choice, workflow, and business value.

## Business Problem

Finance teams often discover liquidity pressure after it has already affected operations. Data exists across invoices, payables, bank movements, and planning files, but the signal is difficult to interpret quickly.

This proof of concept shows how an AI assistant can help teams:

- Forecast cash position before pressure becomes critical.
- Identify low, medium, and high liquidity risk early.
- Translate financial signals into clear executive actions.
- Create consistent treasury reporting without relying on manual spreadsheet interpretation.

## Solution

The solution combines deterministic forecasting logic with a mock Qwen reasoning layer. The mock layer is intentionally simple and replaceable, making it possible to connect a real Qwen API later without rewriting the product workflow.

## Architecture

```text
User
|
v
Streamlit UI
|
v
Forecast Engine
|
v
Risk Analysis
|
v
Recommendation Engine
|
v
(Mock Qwen Layer)
|
v
Dashboard
```

## Workflow

```text
Financial Data
|
v
Data Processing
|
v
Forecast
|
v
Risk Analysis
|
v
Recommendations
|
v
Executive Summary
```

## How the Prototype Works

The Streamlit prototype is designed to behave like an AI treasury assistant while remaining fully offline and deterministic.

1. The user uploads a CSV file with `date`, `inflows`, and `outflows` columns. If no file is uploaded, the app uses `prototype/sample_cashflow.csv`.
2. `forecasting.py` loads and validates the data, converts dates and numeric fields, and sorts the records by date.
3. The app calculates daily net cash flow using `inflows - outflows`.
4. The app calculates cumulative cash by adding daily net cash movement to an opening balance of `AED 5,000,000`.
5. The app calculates the average daily cash movement from the historical data.
6. The app forecasts 30, 60, and 90 day future cash balances using the average daily movement.
7. `risk_analysis.py` classifies liquidity risk as `Low`, `Medium`, or `High` based on projected cash thresholds.
8. `recommendations.py` generates deterministic recommendations and an executive summary using rule-based logic.
9. `app.py` displays KPI cards, historical and forecast charts, recommendations, and the executive summary.

The financial calculations are performed in Python code, not by a language model. This makes the prototype explainable, repeatable, and safe to run during assessment.

## Mock Qwen Layer

The project uses **Qwen 3.6 Plus** as the target reasoning model, but it does not call a real Qwen API. Instead, the mock Qwen layer is represented by deterministic functions in `prototype/recommendations.py`.

Current mock functions:

- `generate_recommendations()`
- `generate_executive_summary()`

These functions simulate the type of business guidance a Qwen-powered finance assistant would produce. They inspect structured forecast outputs such as current cash, 30/60/90 day forecasts, average daily movement, and liquidity risk.

## How Qwen Can Replace the Mock Layer

A future live implementation would keep the forecasting and risk logic deterministic, then replace only the recommendation and summary layer with a Qwen API adapter.

The future flow would be:

```text
Streamlit UI
|
v
Forecast Engine
|
v
Risk Analysis
|
v
Qwen API Adapter
|
v
Executive Recommendations
|
v
Dashboard
```

The app would create a structured context object:

```python
context = {
    "current_cash": current_cash,
    "average_daily_movement": average_daily_movement,
    "forecast_30": forecasts[30],
    "forecast_60": forecasts[60],
    "forecast_90": forecasts[90],
    "liquidity_risk": risk,
    "lowest_projected_cash": lowest_projected_cash,
}
```

That context would be sent to Qwen with the prompt templates in the `prompts/` directory. Qwen would be responsible for interpretation, recommendations, and executive language. Python would remain responsible for the financial math.

This separation is intentional. It reduces hallucination risk because the model does not invent the numbers; it only explains and reasons over values produced by deterministic code.

## Features

- CSV upload for cash flow data.
- Daily net cash flow calculation.
- Cumulative cash position calculation.
- 30, 60, and 90 day cash forecasts.
- Liquidity risk classification.
- KPI cards for executive review.
- Historical and forecast Plotly charts.
- Deterministic AI recommendations.
- Deterministic executive summary.
- Modular Python services ready for a future Qwen API integration.

## Technology Stack

Landing page:

- Next.js 15
- React
- TypeScript
- Tailwind CSS
- Lucide Icons

Prototype:

- Python
- Streamlit
- Pandas
- NumPy
- Plotly

## Installation

Create a Python environment and install the prototype dependencies:

```bash
pip install -r requirements.txt
```

Install landing page dependencies:

```bash
cd landing
npm install
```

## Running

Run the Streamlit prototype:

```bash
streamlit run prototype/app.py
```

Run the landing page:

```bash
cd landing
npm run dev
```

Then open the local URL printed by Next.js.

## Sample Data

The prototype includes:

- `prototype/sample_cashflow.csv`
- `prototype/sample_data.csv`

Both contain sample daily inflows and outflows suitable for demonstrating the dashboard.

## Screenshots

Add assessment screenshots to:

```text
docs/Screenshots/
```

Suggested screenshots:

- Landing page hero and workflow sections.
- Streamlit KPI dashboard.
- Historical cash chart.
- Forecast chart and recommendations.

## Future Improvements

- Replace the deterministic mock Qwen layer with a real Qwen API adapter.
- Add scenario planning for optimistic, base, and conservative forecasts.
- Connect to accounting systems, ERP platforms, and banking feeds.
- Add user roles, audit trails, and approval workflows.
- Improve forecasting with seasonality, payment terms, and customer behavior modeling.
- Export board-ready PDF reports.
