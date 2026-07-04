# Assessment Report: Cash Flow AI Agent

## Selected Model

The selected reasoning model for the product concept is **Qwen 3.6 Plus**.

For this proof of concept, no live model API is called. The Qwen layer is represented by deterministic Python functions that generate repeatable recommendations and executive summaries from forecast and risk outputs.

## Why Qwen

Qwen 3.6 Plus is positioned as the target model because the use case requires structured reasoning over financial context, disciplined summarization, and multilingual enterprise readiness. Treasury teams need recommendations that are explainable, consistent, and grounded in data rather than creative generation.

The implementation keeps the model boundary modular. A future Qwen integration can replace the mock functions without changing the Streamlit UI, forecast engine, or risk analysis module.

## Project Overview

Cash Flow AI Agent is an AI-powered finance assistant that forecasts company cash flow, identifies liquidity risks, and produces executive recommendations.

The prototype accepts cash flow CSV data, calculates daily and cumulative cash movement, projects future balances over 30, 60, and 90 days, classifies liquidity risk, and generates an executive summary suitable for leadership review.

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

## Landing Page

The landing page is designed as a minimal enterprise SaaS product page. It uses black and white styling, thin borders, large whitespace, restrained typography, and a compact dashboard mockup.

Primary sections include:

- Navigation
- Hero
- Problem
- Solution
- Workflow
- Benefits
- Departments
- Risk & Governance
- Call To Action
- Footer

## Departments Benefiting

- Treasury: cash visibility, liquidity planning, reserve discipline.
- Finance leadership: concise executive summaries and risk posture.
- Accounts receivable: prioritization of overdue collections.
- Accounts payable: timing decisions for discretionary and non-critical spend.
- Risk and governance: consistent review process and model boundary documentation.
- Operations: early visibility into cash constraints that could affect execution.

## Risks and Limitations

The current proof of concept is offline and deterministic. It does not send financial data to an external model and does not integrate a live Qwen API. The following risks apply primarily to the final live AI agent that would use production financial systems and model inference.

- Privacy: real financial data would require strict data minimization, retention policies, and controls over what is sent to the model layer.
- Security: production use would need identity management, access control, encryption, audit logging, and secure integration with finance systems.
- Model accuracy: Qwen outputs would need to be evaluated against historical cash flow outcomes and reviewed for forecast usefulness.
- Local hardware cost: if the final agent uses private or local inference, hardware requirements may increase implementation and operating cost.
- Integration difficulty: ERP, banking, accounting, and receivables systems may require custom connectors and data normalization.
- Hallucination risk: live model responses would need grounded prompts, deterministic validation checks, and human approval for material recommendations.
- Reliability: production use would require monitoring, fallback workflows, error handling, and service availability targets.
- Forecasting limits: the current average daily movement method is intentionally simple and may miss seasonality, payment timing, and one-off cash events.

## Recommendation

Proceed with an internal pilot focused on treasury and finance leadership. The first pilot should validate forecast usefulness, recommendation quality, and operational fit before connecting live financial systems or enabling automated decision support.

## Prompts Used

Prompt templates are stored in the `prompts/` directory:

- `forecasting.md`
- `risk_analysis.md`
- `executive_summary.md`

These prompts define how a future Qwen integration should reason over forecasts, liquidity thresholds, and executive communications.

## Future Enhancements

- Replace the mock Qwen layer with a secure Qwen API adapter.
- Add scenario-based forecasts with confidence bands.
- Include customer payment behavior and vendor payment schedules.
- Connect ERP, accounting, and bank data sources.
- Add governance features such as approval states and audit logs.
- Generate PDF and board-pack summaries.
