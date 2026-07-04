import {
  ArrowRight,
  Banknote,
  BarChart3,
  Building2,
  Check,
  ClipboardCheck,
  FileText,
  LockKeyhole,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import type { ReactNode } from "react";

const forecastMetrics = [
  ["Current Cash", "AED 5.2M"],
  ["30 Day Forecast", "AED 4.8M"],
  ["60 Day Forecast", "AED 4.1M"],
  ["90 Day Forecast", "AED 3.6M"],
];

const recommendations = [
  "Follow up overdue invoices",
  "Delay non-essential spending",
  "Maintain cash reserve",
];

const workflow = [
  "Financial Data",
  "Data Processing",
  "Forecast",
  "Risk Analysis",
  "Recommendations",
  "Executive Summary",
];

const departments = [
  "Treasury",
  "Finance Leadership",
  "Accounts Receivable",
  "Accounts Payable",
  "Risk & Governance",
  "Operations",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      <Navigation />
      <Hero />
      <Problem />
      <Solution />
      <WorkflowSection />
      <Benefits />
      <Departments />
      <Governance />
      <CallToAction />
      <Footer />
    </main>
  );
}

function Navigation() {
  return (
    <header className="sticky top-0 z-20 border-b border-neutral-200 bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <a className="flex items-center gap-2 text-sm font-semibold" href="#">
          <Banknote className="h-5 w-5" aria-hidden="true" />
          Cash Flow AI Agent
        </a>
        <div className="hidden items-center gap-8 text-sm text-neutral-700 md:flex">
          <a href="#solution">Solution</a>
          <a href="#workflow">Workflow</a>
          <a href="#governance">Governance</a>
        </div>
        <a
          className="rounded-md border border-black px-4 py-2 text-sm font-medium transition hover:bg-black hover:text-white"
          href="#pilot"
        >
          Start Pilot
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="border-b border-neutral-200">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">
        <div className="flex flex-col justify-center">
          <p className="mb-6 text-sm font-medium uppercase tracking-wide text-neutral-500">
            Enterprise treasury intelligence
          </p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-tight tracking-normal md:text-7xl">
            Forecast Cash Flow Before It Becomes a Problem
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-neutral-700">
            An AI-powered treasury assistant that forecasts liquidity,
            identifies financial risks and supports better financial decisions.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              className="inline-flex items-center justify-center gap-2 rounded-md bg-black px-5 py-3 text-sm font-medium text-white"
              href="#pilot"
            >
              Start Internal Pilot
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              className="inline-flex items-center justify-center rounded-md border border-neutral-300 px-5 py-3 text-sm font-medium"
              href="#demo"
            >
              View Demo
            </a>
          </div>
        </div>
        <DashboardMockup />
      </div>
    </section>
  );
}

function DashboardMockup() {
  return (
    <div
      id="demo"
      className="rounded-lg border border-neutral-200 bg-white p-5 shadow-[0_24px_80px_rgba(0,0,0,0.08)]"
    >
      <div className="mb-6 flex items-center justify-between border-b border-neutral-200 pb-4">
        <div>
          <p className="text-sm font-medium">Treasury Dashboard</p>
          <p className="mt-1 text-xs text-neutral-500">Qwen 3.6 Plus mock layer</p>
        </div>
        <span className="rounded-md border border-neutral-200 px-3 py-1 text-xs">
          Offline POC
        </span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {forecastMetrics.map(([label, value]) => (
          <div className="rounded-md border border-neutral-200 p-4" key={label}>
            <p className="text-xs text-neutral-500">{label}</p>
            <p className="mt-2 text-2xl font-semibold">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-md border border-neutral-200 p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Liquidity Risk</p>
          <span className="rounded-md border border-black px-3 py-1 text-sm font-medium">
            Low
          </span>
        </div>
        <div className="mt-5 h-24 border-b border-l border-neutral-300">
          <div className="flex h-full items-end gap-2 px-3">
            {[68, 62, 58, 51, 47, 42].map((height) => (
              <div
                className="w-full border border-black bg-white"
                key={height}
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 rounded-md border border-neutral-200 p-4">
        <p className="text-sm font-medium">Recommendations</p>
        <div className="mt-4 space-y-3">
          {recommendations.map((item) => (
            <div className="flex items-start gap-3 text-sm" key={item}>
              <Check className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Problem() {
  return (
    <Section
      eyebrow="Problem"
      title="Liquidity pressure is often visible too late."
      description="Finance teams still rely on fragmented exports, static spreadsheets, and manual judgment to understand cash risk. That slows decisions when receivables slip, payables accelerate, or reserves fall below target."
    />
  );
}

function Solution() {
  return (
    <section id="solution" className="border-b border-neutral-200">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
            Solution
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-normal">
            A treasury assistant built around forecasts, risk, and action.
          </h2>
          <p className="mt-6 text-lg leading-8 text-neutral-700">
            Cash Flow AI Agent converts daily inflows and outflows into an
            executive dashboard with projected cash balances, liquidity risk,
            recommendations, and a concise summary.
          </p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <Feature
            icon={<BarChart3 className="h-5 w-5" />}
            title="Forecast"
            text="Projects cash balances across 30, 60, and 90 day planning windows."
          />
          <Feature
            icon={<ShieldCheck className="h-5 w-5" />}
            title="Assess"
            text="Classifies liquidity risk with simple, explainable treasury thresholds."
          />
          <Feature
            icon={<FileText className="h-5 w-5" />}
            title="Recommend"
            text="Produces deterministic guidance that can later be replaced by Qwen."
          />
        </div>
      </div>
    </section>
  );
}

function WorkflowSection() {
  return (
    <section id="workflow" className="border-b border-neutral-200">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mb-12 flex items-end justify-between gap-8">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
              Workflow
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-normal">
              From finance data to executive recommendations.
            </h2>
          </div>
          <Workflow className="hidden h-8 w-8 md:block" aria-hidden="true" />
        </div>
        <div className="grid gap-3 md:grid-cols-6">
          {workflow.map((step, index) => (
            <div className="rounded-md border border-neutral-200 p-4" key={step}>
              <p className="text-xs text-neutral-500">0{index + 1}</p>
              <p className="mt-5 text-sm font-medium">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section className="border-b border-neutral-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-3 lg:px-8">
        <Feature
          icon={<ClipboardCheck className="h-5 w-5" />}
          title="Decision clarity"
          text="Turns cash movements into concrete actions for leadership and treasury teams."
        />
        <Feature
          icon={<BarChart3 className="h-5 w-5" />}
          title="Early visibility"
          text="Highlights future liquidity pressure before it becomes operationally disruptive."
        />
        <Feature
          icon={<LockKeyhole className="h-5 w-5" />}
          title="Offline first"
          text="Runs without a live LLM integration while preserving a clean model boundary."
        />
      </div>
    </section>
  );
}

function Departments() {
  return (
    <section className="border-b border-neutral-200">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
          Departments
        </p>
        <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-normal">
          Built for teams that manage liquidity, obligations, and operational timing.
        </h2>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map((department) => (
            <div
              className="flex items-center gap-3 rounded-md border border-neutral-200 p-4"
              key={department}
            >
              <Building2 className="h-5 w-5" aria-hidden="true" />
              <span className="text-sm font-medium">{department}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Governance() {
  const risks = [
    "Privacy controls are required before processing real financial records.",
    "Security reviews are needed for identity, access, storage, and audit logging.",
    "Model accuracy must be validated against historical cash flow outcomes.",
    "Local hardware can increase cost if private inference is required at scale.",
    "ERP, banking, and accounting integrations may be difficult across legacy systems.",
    "Hallucination risk requires grounded prompts, deterministic checks, and human review.",
    "Reliability depends on data quality, system monitoring, and fallback workflows.",
  ];

  return (
    <section id="governance" className="border-b border-neutral-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
            Risk & Governance
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-normal">
            Clear model boundaries for a responsible pilot.
          </h2>
          <p className="mt-6 text-lg leading-8 text-neutral-700">
            The offline prototype keeps AI behavior deterministic. A final live
            Qwen agent would require enterprise controls for privacy, security,
            accuracy, reliability, and implementation cost.
          </p>
        </div>
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Feature
              icon={<ShieldCheck className="h-5 w-5" />}
              title="Deterministic outputs"
              text="The prototype uses repeatable Python rules instead of a live LLM API."
            />
            <Feature
              icon={<LockKeyhole className="h-5 w-5" />}
              title="Replaceable Qwen layer"
              text="Mock recommendations are isolated so a real Qwen adapter can be added later."
            />
          </div>
          <div className="rounded-md border border-neutral-200 p-6">
            <h3 className="text-lg font-semibold">
              Final live agent risks and limitations
            </h3>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {risks.map((risk) => (
                <div className="flex items-start gap-3 text-sm leading-6" key={risk}>
                  <Check className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{risk}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CallToAction() {
  return (
    <section id="pilot" className="border-b border-neutral-200">
      <div className="mx-auto max-w-7xl px-6 py-20 text-center lg:px-8">
        <h2 className="mx-auto max-w-3xl text-4xl font-semibold tracking-normal">
          Start with treasury visibility. Expand when the signal proves useful.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-neutral-700">
          Pilot the workflow with sample cash flow data, validate the executive
          outputs, and prepare the architecture for a secure Qwen integration.
        </p>
        <div className="mt-10">
          <a
            className="inline-flex items-center justify-center gap-2 rounded-md bg-black px-5 py-3 text-sm font-medium text-white"
            href="#"
          >
            Start Internal Pilot
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-neutral-500 md:flex-row md:items-center md:justify-between lg:px-8">
      <p>Cash Flow AI Agent</p>
      <p>Enterprise AI finance proof of concept</p>
    </footer>
  );
}

function Section({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="border-b border-neutral-200">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
            {eyebrow}
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-normal">{title}</h2>
          <p className="mt-6 text-lg leading-8 text-neutral-700">{description}</p>
        </div>
      </div>
    </section>
  );
}

function Feature({
  icon,
  title,
  text,
}: {
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-md border border-neutral-200 p-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-md border border-neutral-200">
        {icon}
      </div>
      <h3 className="mt-6 text-lg font-semibold">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-neutral-700">{text}</p>
    </div>
  );
}
