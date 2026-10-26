import React, { useMemo, useState } from "react";
import {
  MdAdd,
  MdArrowDownward,
  MdArrowUpward,
  MdDelete,
  MdEdit,
  MdFileDownload,
  MdInbox,
  MdLocationOn,
  MdMail,
  MdUnfoldMore,
  MdVisibility,
} from "react-icons/md";
import DataTable from "components/ui/DataTable";
import SimpleDataTable from "components/ui/SimpleDataTable";
import FilterSelect from "components/ui/FilterSelect";
import { SearchInput } from "components/form";
import Button from "components/ui/buttons/Button";
import RowIconButton from "components/ui/buttons/RowIconButton";
import Progress from "components/progress";
import Tabs from "components/ui/Tabs";
import Badge from "components/ui/Badge";
import { useGuideT } from "../../hooks/useUiTemplate";
import GuideSection from "../GuideSection";
import ComponentShowcase from "../ComponentShowcase";

const STATUS_VARIANT = { active: "success", pending: "warning", inactive: "neutral" };

// [name key, group, location, joined (sortable ISO), status]
const ROWS = [
  [1, "a", "main",  "2026-10-24", "active"],
  [2, "b", "north", "2026-10-22", "pending"],
  [3, "c", "main",  "2026-10-19", "active"],
  [4, "a", "south", "2026-10-15", "inactive"],
  [5, "b", "north", "2026-10-11", "active"],
  [6, "c", "south", "2026-10-08", "pending"],
  [7, "a", "main",  "2026-10-02", "active"],
].map(([n, group, location, joined, status]) => ({ id: n, n, group, location, joined, status }));

const initials = (name) => name.split(" ").map((p) => p[0]).slice(0, 2).join("");
const fmtDate = (iso) => iso.split("-").reverse().join("/");

const StatusBadge = ({ status, label }) => <Badge variant={STATUS_VARIANT[status]} dot>{label}</Badge>;

const Person = ({ name, sub }) => (
  <span className="flex items-center gap-2.5">
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-500/10 text-xs font-bold text-brand-800">
      {initials(name)}
    </span>
    <span className="min-w-0">
      <span className="block truncate font-semibold text-slate-900">{name}</span>
      {sub && <span className="block truncate text-xs text-slate-400" dir="ltr">{sub}</span>}
    </span>
  </span>
);

/** Column header that toggles ascending / descending sort. */
const SortHeader = ({ label, field, sort, onSort }) => {
  const active = sort.field === field;
  const Icon = !active ? MdUnfoldMore : sort.dir === "asc" ? MdArrowUpward : MdArrowDownward;
  return (
    <button type="button" onClick={() => onSort(field)} className={`inline-flex items-center gap-1 ${active ? "text-slate-900" : ""}`}>
      {label}
      <Icon className={`h-3.5 w-3.5 ${active ? "text-brand-800" : "text-slate-300"}`} />
    </button>
  );
};

const Checkbox = (props) => <input type="checkbox" className="h-4 w-4 cursor-pointer rounded accent-brand-500" {...props} />;

/** Full-featured table: status tabs, search, filter, sort, selection, bulk and row actions. */
const ManagedTable = () => {
  const t = useGuideT();
  const s = (k, o) => t(`styleGuide.tables.${k}`, o);
  const [tab, setTab] = useState("all");
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [sort, setSort] = useState({ field: "joined", dir: "desc" });
  const [selected, setSelected] = useState([]);

  const rows = useMemo(
    () => ROWS.map((r) => ({ ...r, name: s(`row_${r.n}`), email: `${s(`row_${r.n}`).split(" ")[0].toLowerCase()}@example.com` })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t]
  );

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = rows.filter(
      (r) =>
        (tab === "all" || r.status === tab) &&
        (!location || r.location === location) &&
        (!q || r.name.toLowerCase().includes(q))
    );
    const sorted = [...filtered].sort((a, b) => String(a[sort.field]).localeCompare(String(b[sort.field])));
    return sort.dir === "asc" ? sorted : sorted.reverse();
  }, [rows, tab, location, query, sort]);

  const onSort = (field) =>
    setSort((cur) => ({ field, dir: cur.field === field && cur.dir === "asc" ? "desc" : "asc" }));

  const allSelected = visible.length > 0 && visible.every((r) => selected.includes(r.id));
  const toggleAll = () => setSelected(allSelected ? [] : visible.map((r) => r.id));
  const toggle = (id) => setSelected((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  const count = (status) => rows.filter((r) => status === "all" || r.status === status).length;

  const columns = [
    {
      key: "select",
      label: <Checkbox checked={allSelected} onChange={toggleAll} aria-label={s("select_all")} />,
      headerClass: "w-10",
      stopPropagation: true,
      render: (r) => <Checkbox checked={selected.includes(r.id)} onChange={() => toggle(r.id)} aria-label={r.name} />,
    },
    {
      key: "name",
      label: <SortHeader label={s("col_name")} field="name" sort={sort} onSort={onSort} />,
      render: (r) => <Person name={r.name} sub={r.email} />,
    },
    { key: "group", label: s("col_group"), render: (r) => <span className="text-slate-600">{s(`group_${r.group}`)}</span> },
    {
      key: "location",
      label: s("col_location"),
      render: (r) => (
        <span className="inline-flex items-center gap-1 text-slate-500">
          <MdLocationOn className="h-3.5 w-3.5 text-slate-300" /> {s(`location_${r.location}`)}
        </span>
      ),
    },
    {
      key: "joined",
      label: <SortHeader label={s("col_joined")} field="joined" sort={sort} onSort={onSort} />,
      render: (r) => <span className="text-slate-500" dir="ltr">{fmtDate(r.joined)}</span>,
    },
    { key: "status", label: s("col_status"), render: (r) => <StatusBadge status={r.status} label={s(`status_${r.status}`)} /> },
    {
      key: "actions",
      label: "",
      align: "right",
      stopPropagation: true,
      render: () => (
        <span className="inline-flex gap-0.5">
          <RowIconButton icon={<MdVisibility className="h-4 w-4" />} title={s("action_view")} />
          <RowIconButton icon={<MdEdit className="h-4 w-4" />} title={s("action_edit")} variant="primary" />
          <RowIconButton icon={<MdDelete className="h-4 w-4" />} title={s("action_delete")} variant="danger" />
        </span>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Status tabs */}
      <Tabs
        value={tab}
        onChange={(key) => { setTab(key); setSelected([]); }}
        tabs={["all", "active", "pending", "inactive"].map((key) => ({ key, label: s(`tab_${key}`), count: count(key) }))}
      />

      {/* Toolbar — or bulk actions while rows are selected */}
      {selected.length > 0 ? (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-brand-50 px-4 py-2.5 ring-1 ring-brand-500/20">
          <p className="text-sm font-semibold text-brand-900">{s("selected", { count: selected.length })}</p>
          <div className="flex gap-2">
            <Button variant="secondary" icon={<MdMail className="h-4 w-4" />} text={s("bulk_message")} />
            <Button variant="danger" icon={<MdDelete className="h-4 w-4" />} text={s("action_delete")} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <SearchInput value={query} onChange={setQuery} placeholder={s("search")} className="sm:max-w-xs sm:flex-1" />
          <FilterSelect
            value={location}
            onChange={setLocation}
            icon={<MdLocationOn className="h-4 w-4" />}
            options={[
              { value: "", label: s("all_locations") },
              ...["main", "north", "south"].map((l) => ({ value: l, label: s(`location_${l}`) })),
            ]}
          />
          <div className="flex gap-2 sm:ms-auto">
            <Button variant="ghost" icon={<MdFileDownload className="h-4 w-4" />} text={s("export")} />
            <Button icon={<MdAdd className="h-4 w-4" />} text={s("add")} />
          </div>
        </div>
      )}

      <DataTable
        columns={columns}
        data={visible}
        pageSize={5}
        minWidth="min-w-[760px]"
        emptyIcon={<MdInbox />}
        emptyTitle={s("no_results")}
        emptyDesc={s("no_results_desc")}
      />
    </div>
  );
};

/** Compact summary table with numbers and inline progress. */
const SummaryTable = () => {
  const t = useGuideT();
  const s = (k) => t(`styleGuide.tables.${k}`);
  const data = [
    { id: "a", total: 48, target: 60 },
    { id: "b", total: 36, target: 40 },
    { id: "c", total: 22, target: 40 },
  ];
  return (
    <SimpleDataTable
      pageSize={0}
      minWidth="min-w-[420px]"
      data={data}
      columns={[
        { key: "group", label: s("col_group"), render: (r) => <span className="font-semibold text-slate-900">{s(`group_${r.id}`)}</span> },
        { key: "total", label: s("col_total"), align: "right", render: (r) => <span className="font-mono text-slate-700">{r.total}/{r.target}</span> },
        {
          key: "progress",
          label: s("col_progress"),
          headerClass: "w-40",
          render: (r) => <Progress value={Math.round((r.total / r.target) * 100)} color="brand" />,
        },
      ]}
    />
  );
};

/** On phones, rows become stacked cards. */
const MobileCards = () => {
  const t = useGuideT();
  const s = (k) => t(`styleGuide.tables.${k}`);
  return (
    <div className="mx-auto flex max-w-sm flex-col gap-3">
      {ROWS.slice(0, 3).map((r) => (
        <div key={r.id} className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-start justify-between gap-3">
            <Person name={s(`row_${r.n}`)} sub={s(`group_${r.group}`)} />
            <StatusBadge status={r.status} label={s(`status_${r.status}`)} />
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1"><MdLocationOn className="h-3.5 w-3.5" /> {s(`location_${r.location}`)}</span>
            <span dir="ltr">{fmtDate(r.joined)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

const TablesSection = () => {
  const t = useGuideT();
  const s = (k) => t(`styleGuide.tables.${k}`);

  return (
    <GuideSection id="tables" title={s("title")} intro={s("intro")}>
      <ComponentShowcase
        title={`${s("managed_name")} · DataTable`}
        description={s("managed_desc")}
        code={`
<DataTable
  columns={[
    { key: "select", label: <Checkbox …/>, render: (r) => <Checkbox …/> },
    { key: "name", label: <SortHeader field="name" …/>, render: (r) => r.name },
    { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
  ]}
  data={rows}
  pageSize={5}
/>`}
      >
        <ManagedTable />
      </ComponentShowcase>

      <div className="grid gap-8 lg:grid-cols-2">
        <ComponentShowcase title={s("empty_name")} description={s("empty_desc")} code={`<DataTable data={[]} emptyTitle="No results" … />`}>
          <DataTable columns={[]} data={[]} emptyIcon={<MdInbox />} emptyTitle={s("no_results")} emptyDesc={s("no_results_desc")} />
        </ComponentShowcase>
        <ComponentShowcase title={s("loading_name")} description={s("loading_desc")} code={`<DataTable loading … />`}>
          <DataTable columns={[]} data={[]} loading />
        </ComponentShowcase>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <ComponentShowcase title={`${s("summary_name")} · SimpleDataTable`} description={s("summary_desc")} code={`<SimpleDataTable pageSize={0} columns={…} data={…} />`}>
          <SummaryTable />
        </ComponentShowcase>
        <ComponentShowcase title={s("mobile_name")} description={s("mobile_desc")} canvas="muted">
          <MobileCards />
        </ComponentShowcase>
      </div>
    </GuideSection>
  );
};

export default TablesSection;
