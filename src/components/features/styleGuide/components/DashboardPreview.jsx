import React from "react";
import ReactApexChart from "react-apexcharts";
import {
  MdDashboard,
  MdPeople,
  MdEvent,
  MdMail,
  MdBarChart,
  MdSettings,
  MdSearch,
  MdNotificationsNone,
  MdWavingHand,
  MdFileDownload,
  MdPendingActions,
} from "react-icons/md";
import PageHeader from "components/ui/PageHeader";
import Button from "components/ui/buttons/Button";
import DataTable from "components/ui/DataTable";
import NotificationsFeed from "components/ui/dashboard/NotificationsFeed";
import StatCard from "views/admin/default/components/StatCard";
import { donutOpts } from "components/charts/apexConfig";
import ClientLogo from "./ClientLogo";
import { useClientName, useGuideT, useUiTemplate } from "../hooks/useUiTemplate";

const NAV = [
  { key: "dashboard", Icon: MdDashboard },
  { key: "members",   Icon: MdPeople },
  { key: "bookings",  Icon: MdEvent },
  { key: "messages",  Icon: MdMail },
  { key: "reports",   Icon: MdBarChart },
  { key: "settings",  Icon: MdSettings },
];

const STATUS_BADGE = {
  active:   "bg-green/10 text-green",
  pending:  "bg-amber-50 text-amber-600",
  inactive: "bg-slate-100 text-slate-500",
};

const initials = (name) => name.split(" ").map((n) => n[0]).slice(0, 2).join("");

/**
 * A complete admin dashboard screen in the client's branding, built from the
 * live dashboard components. The sidebar mirrors components/sidebar styling
 * (the real one is fixed-position and tied to auth/routes).
 * Copy: styleGuide.dashboard.screen.* (override per client under uiTemplates).
 */
const DashboardPreview = () => {
  const t = useGuideT();
  const s = (k, o) => t(`styleGuide.dashboard.screen.${k}`, o);
  const { colors } = useUiTemplate();
  const clientName = useClientName();
  const userName = s("user_name");

  const stats = [
    { key: "members",  value: "1,248", trend: 12, Icon: MdPeople,         iconBg: "bg-brand-500/10", iconColor: "text-brand-800" },
    { key: "bookings", value: "86",    trend: 4,  Icon: MdEvent,          iconBg: "bg-blue-50",      iconColor: "text-blue-500" },
    { key: "requests", value: "14",    trend: -3, Icon: MdPendingActions, iconBg: "bg-amber-50",     iconColor: "text-amber-500" },
    { key: "messages", value: "7",              Icon: MdMail,           iconBg: "bg-navy-50",      iconColor: "text-navy-700" },
  ];

  const segments = ["a", "b", "c"];
  const series = [46, 32, 22];
  const chartColors = [colors.brand[500], colors.accents?.[0]?.hex ?? colors.brand[300], colors.brand[800]];

  const rows = [
    { id: 1, name: s("row_1"), plan: "a", date: "26/10/2026", status: "active" },
    { id: 2, name: s("row_2"), plan: "b", date: "25/10/2026", status: "pending" },
    { id: 3, name: s("row_3"), plan: "c", date: "24/10/2026", status: "active" },
    { id: 4, name: s("row_4"), plan: "a", date: "22/10/2026", status: "inactive" },
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
          <span className="font-semibold text-slate-900">{r.name}</span>
        </span>
      ),
    },
    { key: "plan", label: s("col_plan"), render: (r) => <span className="text-slate-500">{s(`segment_${r.plan}`)}</span> },
    { key: "date", label: s("col_date"), render: (r) => <span className="text-slate-500" dir="ltr">{r.date}</span> },
    {
      key: "status",
      label: s("col_status"),
      render: (r) => (
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_BADGE[r.status]}`}>
          {s(`status_${r.status}`)}
        </span>
      ),
    },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
      {/* ── Window chrome ── */}
      <div className="flex items-center gap-1.5 border-b border-slate-200 bg-white px-4 py-2.5" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
      </div>

      <div className="flex bg-slate-50">
        {/* ── Sidebar ── */}
        <aside className="hidden w-56 shrink-0 flex-col border-slate-100 bg-white ltr:border-r rtl:border-l lg:flex">
          <div className="flex items-center gap-3 px-5 pb-4 pt-6">
            <ClientLogo className="h-10 w-10 shrink-0 rounded-xl text-base" />
            <p className="truncate text-sm font-bold text-navy-700">{clientName}</p>
          </div>
          <div className="mx-5 h-px bg-gray-100" />
          <nav className="flex-1 px-3 py-5">
            {NAV.map(({ key, Icon }, i) => (
              <div
                key={key}
                className={`mb-0.5 flex items-center gap-3 rounded-xl px-3 py-2.5 ${i === 0 ? "bg-brand-500/10" : ""}`}
              >
                <Icon className={`h-5 w-5 shrink-0 ${i === 0 ? "text-brand-800" : "text-gray-400"}`} />
                <span className={`text-sm font-medium ${i === 0 ? "text-brand-800" : "text-navy-700"}`}>
                  {s(`nav_${key}`)}
                </span>
              </div>
            ))}
          </nav>
          <div className="mx-5 h-px bg-gray-100" />
          <div className="flex items-center gap-3 px-7 py-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
              {initials(userName)}
            </span>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-navy-700">{userName}</p>
              <p className="truncate text-[10px] text-gray-400">{s("user_role")}</p>
            </div>
          </div>
        </aside>

        {/* ── Main ── */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-white px-5 py-3">
            <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-slate-50 px-3.5 py-2 text-sm text-slate-400 sm:max-w-xs">
              <MdSearch className="h-4 w-4 shrink-0" />
              <span className="truncate">{s("search")}</span>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <span className="relative flex h-9 w-9 items-center justify-center rounded-full text-slate-500">
                <MdNotificationsNone className="h-5 w-5" />
                <span className="absolute end-2 top-2 h-2 w-2 rounded-full bg-brand-500 ring-2 ring-white" />
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-on-brand">
                {initials(userName)}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4 p-5">
            <PageHeader
              className="!mb-0"
              icon={<MdWavingHand className="h-5 w-5" />}
              title={s("welcome", { name: userName.split(" ")[0] })}
              subtitle={s("welcome_sub")}
              actions={<Button variant="ghost" icon={<MdFileDownload className="h-4 w-4" />} text={s("export")} />}
            />

            <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
              {stats.map(({ key, Icon, ...rest }) => (
                <StatCard key={key} label={s(`stat_${key}`)} icon={Icon} {...rest} />
              ))}
            </div>

            <div className="grid gap-4 xl:grid-cols-5">
              <div className="rounded-2xl bg-white p-5 shadow-sm xl:col-span-2">
                <p className="mb-2 text-sm font-bold text-slate-900">{s("chart_title")}</p>
                <ReactApexChart
                  type="donut"
                  series={series}
                  options={donutOpts(segments.map((k) => s(`segment_${k}`)), chartColors)}
                  height={170}
                />
                <ul className="mt-3 flex flex-col gap-2">
                  {segments.map((k, i) => (
                    <li key={k} className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-slate-500">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: chartColors[i] }} />
                        {s(`segment_${k}`)}
                      </span>
                      <span className="font-bold text-navy-700">{series[i]}%</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-white p-5 shadow-sm xl:col-span-3">
                <p className="mb-4 text-sm font-bold text-slate-900">{s("activity_title")}</p>
                <NotificationsFeed
                  items={[
                    { id: 1, message: s("activity_1"), time: t("styleGuide.dashboard.time_2h"), type: "approved" },
                    { id: 2, message: s("activity_2"), time: t("styleGuide.dashboard.time_5h"), type: "pending" },
                    { id: 3, message: s("activity_3"), time: t("styleGuide.dashboard.time_1d"), type: "info" },
                    { id: 4, message: s("activity_4"), time: t("styleGuide.dashboard.time_2d"), type: "info" },
                  ]}
                />
              </div>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="mb-4 text-sm font-bold text-slate-900">{s("table_title")}</p>
              <DataTable columns={columns} data={rows} pageSize={4} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPreview;
