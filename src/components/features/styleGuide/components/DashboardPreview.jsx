import React from "react";
import ReactApexChart from "react-apexcharts";
import { useTranslation } from "react-i18next";
import {
  MdDashboard,
  MdPeople,
  MdEvent,
  MdMail,
  MdBarChart,
  MdSettings,
  MdSearch,
  MdNotificationsNone,
  MdPendingActions,
  MdMenu,
  MdArrowForward,
  MdHelpOutline,
  MdTrendingUp,
  MdTrendingDown,
} from "react-icons/md";
import DataTable from "components/ui/DataTable";
import { donutOpts } from "components/charts/apexConfig";
import ClientLogo from "./ClientLogo";
import { useClientName, useGuideT, useUiTemplate } from "../hooks/useUiTemplate";

const NAV_GROUPS = [
  { key: "main", items: [{ key: "dashboard", Icon: MdDashboard }, { key: "reports", Icon: MdBarChart }] },
  {
    key: "manage",
    items: [
      { key: "members", Icon: MdPeople, badge: 14 },
      { key: "bookings", Icon: MdEvent },
      { key: "messages", Icon: MdMail, badge: 7 },
    ],
  },
  { key: "account", items: [{ key: "settings", Icon: MdSettings }] },
];

const STATUS_BADGE = {
  active:   "bg-green/10 text-green",
  pending:  "bg-amber-50 text-amber-600",
  inactive: "bg-slate-100 text-slate-500",
};

const initials = (name) => name.split(" ").map((n) => n[0]).slice(0, 2).join("");

const Card = ({ className = "", children }) => (
  <div className={`rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 ${className}`}>{children}</div>
);

const CardTitle = ({ title, sub, action }) => (
  <div className="mb-4 flex items-start justify-between gap-3">
    <div>
      <p className="text-sm font-bold text-slate-900">{title}</p>
      {sub && <p className="mt-0.5 text-xs text-slate-400">{sub}</p>}
    </div>
    {action}
  </div>
);

const sparkOpts = (color) => ({
  chart: { type: "area", sparkline: { enabled: true }, animations: { enabled: false } },
  stroke: { curve: "smooth", width: 2 },
  fill: { type: "gradient", gradient: { opacityFrom: 0.35, opacityTo: 0 } },
  colors: [color],
  tooltip: { enabled: false },
});

/**
 * A complete admin dashboard screen in the client's branding, built from the
 * live components (DataTable, charts) plus the template's own layout. The
 * sidebar is drawn here because the real one is fixed-position and tied to
 * auth/routes. Copy: styleGuide.dashboard.screen.* (override per client).
 * `bare` drops the window chrome (used in the phone frames).
 */
const DashboardPreview = ({ bare = false }) => {
  const t = useGuideT();
  const s = (k, o) => t(`styleGuide.dashboard.screen.${k}`, o);
  const { i18n } = useTranslation();
  const { colors } = useUiTemplate();
  const clientName = useClientName();
  const userName = s("user_name");
  const accent = colors.accents?.[0]?.hex ?? colors.brand[300];

  const months = Array.from({ length: 6 }, (_, i) =>
    new Date(2026, 4 + i, 1).toLocaleString(i18n.language === "ar" ? "ar" : "en", { month: "short" })
  );

  const stats = [
    { key: "members",  value: "1,248", trend: 12, Icon: MdPeople,         spark: [30, 34, 33, 40, 44, 52] },
    { key: "bookings", value: "86",    trend: 4,  Icon: MdEvent,          spark: [20, 26, 22, 30, 28, 34] },
    { key: "requests", value: "14",    trend: -3, Icon: MdPendingActions, spark: [18, 16, 19, 15, 14, 13] },
    { key: "messages", value: "7",     trend: 2,  Icon: MdMail,           spark: [4, 6, 5, 7, 6, 8] },
  ];

  const segments = ["a", "b", "c"];
  const shares = [46, 32, 22];
  const donutColors = [colors.brand[500], accent, colors.brand[800]];

  const agenda = [
    { time: "09:00", key: "agenda_1", color: colors.brand[500] },
    { time: "11:30", key: "agenda_2", color: accent },
    { time: "14:00", key: "agenda_3", color: colors.accents?.[1]?.hex ?? colors.brand[700] },
  ];

  const rows = [
    { id: 1, name: s("row_1"), plan: "a", status: "active" },
    { id: 2, name: s("row_2"), plan: "b", status: "pending" },
    { id: 3, name: s("row_3"), plan: "c", status: "active" },
    { id: 4, name: s("row_4"), plan: "a", status: "inactive" },
  ];

  const columns = [
    {
      key: "name",
      label: s("col_name"),
      render: (r) => (
        <span className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-500/10 text-xs font-bold text-brand-800">
            {initials(r.name)}
          </span>
          <span className="min-w-0">
            <span className="block truncate font-semibold text-slate-900">{r.name}</span>
            <span className="block truncate text-xs text-slate-400">{s(`segment_${r.plan}`)}</span>
          </span>
        </span>
      ),
    },
    {
      key: "status",
      label: s("col_status"),
      align: "right",
      render: (r) => (
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_BADGE[r.status]}`}>
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {s(`status_${r.status}`)}
        </span>
      ),
    },
  ];

  const activity = [1, 2, 3, 4].map((n, i) => ({
    n,
    time: t(`styleGuide.dashboard.${["time_2h", "time_5h", "time_1d", "time_2d"][i]}`),
    dot: ["bg-green", "bg-amber-500", "bg-brand-500", "bg-slate-300"][i],
  }));

  const trendOpts = {
    chart: { type: "area", toolbar: { show: false }, zoom: { enabled: false }, fontFamily: "inherit" },
    colors: [colors.brand[500], "#CBD5E1"],
    stroke: { curve: "smooth", width: [3, 2], dashArray: [0, 5] },
    fill: { type: ["gradient", "solid"], opacity: [1, 0], gradient: { opacityFrom: 0.3, opacityTo: 0 } },
    dataLabels: { enabled: false },
    legend: { show: false },
    grid: { borderColor: "#F1F5F9", strokeDashArray: 4 },
    xaxis: { categories: months, axisBorder: { show: false }, axisTicks: { show: false }, labels: { style: { colors: "#94A3B8" } } },
    yaxis: { labels: { style: { colors: "#94A3B8" } } },
    tooltip: { theme: "dark" },
  };

  return (
    <div className={bare ? "" : "overflow-hidden rounded-2xl border border-slate-200 shadow-sm"}>
      {/* ── Window chrome ── */}
      {!bare && (
        <div className="flex items-center gap-1.5 border-b border-slate-200 bg-white px-4 py-2.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
        </div>
      )}

      <div className="flex bg-slate-50">
        {/* ── Sidebar ── */}
        <aside className="relative hidden w-60 shrink-0 flex-col overflow-hidden bg-ink lg:flex">
          <div className="pointer-events-none absolute -top-24 h-56 w-56 rounded-full bg-brand-500/20 blur-3xl ltr:-left-24 rtl:-right-24" />
          <div className="relative flex items-center gap-3 px-5 pb-6 pt-6">
            <ClientLogo variant="onDark" className="h-10 w-10 shrink-0 rounded-xl text-base ring-1 ring-white/15" />
            <p className="truncate text-sm font-bold text-white">{clientName}</p>
          </div>
          <nav className="relative flex-1 px-3">
            {NAV_GROUPS.map((group) => (
              <div key={group.key} className="mb-5">
                <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">{s(`group_${group.key}`)}</p>
                {group.items.map(({ key, Icon, badge }) => {
                  const active = key === "dashboard";
                  return (
                    <div
                      key={key}
                      className={`mb-0.5 flex items-center gap-3 rounded-xl px-3 py-2.5 ${
                        active ? "bg-brand-500 text-on-brand shadow-lg shadow-black/20" : "text-white/65"
                      }`}
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                      <span className="flex-1 truncate text-sm font-medium">{s(`nav_${key}`)}</span>
                      {badge && (
                        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold text-white/80">{badge}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </nav>
          <div className="relative m-3 rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/10">
            <MdHelpOutline className="h-6 w-6 text-brand-300" />
            <p className="mt-2 text-sm font-bold text-white">{s("help_title")}</p>
            <p className="mt-0.5 text-xs leading-relaxed text-white/55">{s("help_desc")}</p>
            <span className="mt-3 inline-flex rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-900">{s("help_cta")}</span>
          </div>
        </aside>

        {/* ── Main ── */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-white px-5 py-3.5">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-500 lg:hidden">
                <MdMenu className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-lg font-bold text-slate-900">{s("page_title")}</p>
                <p className="truncate text-xs text-slate-400">{s("date")}</p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <div className="hidden items-center gap-2 rounded-full bg-slate-50 px-3.5 py-2 text-sm text-slate-400 ring-1 ring-slate-100 md:flex">
                <MdSearch className="h-4 w-4" />
                <span className="w-40 truncate">{s("search")}</span>
              </div>
              <span className="relative flex h-9 w-9 items-center justify-center rounded-full text-slate-500 ring-1 ring-slate-100">
                <MdNotificationsNone className="h-5 w-5" />
                <span className="absolute end-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
              </span>
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-on-brand">
                  {initials(userName)}
                </span>
                <div className="hidden leading-tight sm:block">
                  <p className="text-xs font-semibold text-slate-900">{userName}</p>
                  <p className="text-[10px] text-slate-400">{s("user_role")}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 p-5">
            {/* Welcome banner + today's agenda */}
            <div className="grid gap-4 xl:grid-cols-3">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 p-6 text-on-brand xl:col-span-2">
                <div className="pointer-events-none absolute -bottom-16 h-48 w-48 rounded-full bg-white/10 ltr:-right-10 rtl:-left-10" />
                <div className="pointer-events-none absolute -top-10 h-32 w-32 rounded-full bg-white/10 ltr:right-28 rtl:left-28" />
                <p className="relative text-xs font-bold uppercase tracking-[0.2em] opacity-70">{s("date")}</p>
                <p className="relative mt-2 text-2xl font-black">{s("banner_title", { name: userName.split(" ")[0] })}</p>
                <p className="relative mt-1.5 max-w-md text-sm opacity-80">{s("banner_sub")}</p>
                <div className="relative mt-5 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-900">
                    {s("banner_cta")} <MdArrowForward className="h-4 w-4 rtl:rotate-180" />
                  </span>
                  <span className="inline-flex items-center rounded-full border border-current px-4 py-2 text-sm font-semibold opacity-90">
                    {s("banner_cta2")}
                  </span>
                </div>
              </div>

              <Card>
                <CardTitle title={s("today")} sub={s("date")} />
                <ul className="flex flex-col gap-3">
                  {agenda.map((a) => (
                    <li key={a.key} className="flex items-center gap-3">
                      <span className="w-11 shrink-0 font-mono text-xs text-slate-400" dir="ltr">{a.time}</span>
                      <span className="h-8 w-1 shrink-0 rounded-full" style={{ backgroundColor: a.color }} />
                      <span className="text-sm font-medium text-slate-700">{s(a.key)}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            {/* KPI cards with sparklines */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {stats.map(({ key, value, trend, Icon, spark }) => (
                <Card key={key} className="!p-4">
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 text-brand-800">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span
                      className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[11px] font-bold ${
                        trend >= 0 ? "bg-green/10 text-green" : "bg-red-50 text-red-600"
                      }`}
                      dir="ltr"
                    >
                      {trend >= 0 ? <MdTrendingUp className="h-3.5 w-3.5" /> : <MdTrendingDown className="h-3.5 w-3.5" />}
                      {trend >= 0 ? "+" : ""}{trend}%
                    </span>
                  </div>
                  <div className="mt-3 flex items-end justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-2xl font-black text-slate-900">{value}</p>
                      <p className="truncate text-xs text-slate-400">{s(`stat_${key}`)}</p>
                    </div>
                    <div className="w-20 shrink-0" dir="ltr">
                      <ReactApexChart type="area" series={[{ data: spark }]} options={sparkOpts(colors.brand[500])} height={40} />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Trend chart + breakdown */}
            <div className="grid gap-4 xl:grid-cols-3">
              <Card className="xl:col-span-2">
                <CardTitle
                  title={s("trend_title")}
                  sub={s("trend_sub")}
                  action={
                    <span className="flex rounded-full bg-slate-100 p-0.5 text-xs font-semibold">
                      <span className="rounded-full bg-white px-3 py-1 text-slate-900 shadow-sm">{s("range_6m")}</span>
                      <span className="px-3 py-1 text-slate-400">{s("range_1y")}</span>
                    </span>
                  }
                />
                <div className="mb-1 flex gap-4 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-brand-500" />{s("legend_this")}</span>
                  <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-slate-300" />{s("legend_last")}</span>
                </div>
                <div dir="ltr">
                  <ReactApexChart
                    type="area"
                    height={220}
                    options={trendOpts}
                    series={[
                      { name: s("legend_this"), data: [120, 168, 150, 210, 240, 286] },
                      { name: s("legend_last"), data: [100, 120, 132, 150, 170, 190] },
                    ]}
                  />
                </div>
              </Card>

              <Card>
                <CardTitle title={s("chart_title")} />
                <div dir="ltr">
                  <ReactApexChart type="donut" series={shares} options={donutOpts(segments.map((k) => s(`segment_${k}`)), donutColors)} height={170} />
                </div>
                <ul className="mt-3 flex flex-col gap-2">
                  {segments.map((k, i) => (
                    <li key={k} className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-slate-500">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: donutColors[i] }} />
                        {s(`segment_${k}`)}
                      </span>
                      <span className="font-bold text-slate-900">{shares[i]}%</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            {/* Latest records + activity */}
            <div className="grid gap-4 xl:grid-cols-5">
              <Card className="xl:col-span-3">
                <CardTitle title={s("table_title")} action={<span className="text-xs font-semibold text-brand-800">{s("view_all")}</span>} />
                <DataTable columns={columns} data={rows} pageSize={0} minWidth="min-w-0" />
              </Card>

              <Card className="xl:col-span-2">
                <CardTitle title={s("activity_title")} />
                <ol className="relative flex flex-col gap-4 border-slate-100 ltr:border-l ltr:pl-4 rtl:border-r rtl:pr-4">
                  {activity.map((a) => (
                    <li key={a.n} className="relative">
                      <span className={`absolute top-1.5 h-2.5 w-2.5 rounded-full ring-4 ring-white ltr:-left-[21px] rtl:-right-[21px] ${a.dot}`} />
                      <p className="text-sm text-slate-700">{s(`activity_${a.n}`)}</p>
                      <p className="mt-0.5 text-xs text-slate-400">{a.time}</p>
                    </li>
                  ))}
                </ol>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPreview;
