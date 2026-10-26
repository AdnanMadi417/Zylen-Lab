import React from "react";
import { useGuideT } from "../../hooks/useUiTemplate";
import { MdAdd, MdEvent, MdArticle, MdPeople } from "react-icons/md";
import QuickActionsGrid from "components/ui/dashboard/QuickActionsGrid";
import NotificationsFeed from "components/ui/dashboard/NotificationsFeed";
import PendingTasksList from "components/ui/dashboard/PendingTasksList";
import GuideSection from "../GuideSection";
import ComponentShowcase from "../ComponentShowcase";

const DashboardSection = () => {
  const t = useGuideT();
  const s = (k) => t(`styleGuide.dashboard.${k}`);

  // `to` points back at the guide itself so clicks in the demo are harmless.
  const actions = [
    { label: s("action_project"), icon: <MdAdd className="h-5 w-5" />, to: "/style-guide#dashboard" },
    { label: s("action_event"), icon: <MdEvent className="h-5 w-5" />, to: "/style-guide#dashboard" },
    { label: s("action_news"), icon: <MdArticle className="h-5 w-5" />, to: "/style-guide#dashboard" },
    { label: s("action_users"), icon: <MdPeople className="h-5 w-5" />, to: "/style-guide#dashboard" },
  ];

  return (
    <GuideSection id="dashboard" title={s("title")} intro={s("intro")}>
      <ComponentShowcase
        title="QuickActionsGrid"
        description={s("quick_desc")}
        code={`<QuickActionsGrid actions={[{ label: "New project", icon: <MdAdd />, to: "/admin/projects/create" }]} />`}
      >
        <QuickActionsGrid actions={actions} />
      </ComponentShowcase>

      <div className="grid gap-8 lg:grid-cols-2">
        <ComponentShowcase
          title="NotificationsFeed"
          description={s("feed_desc")}
          code={`<NotificationsFeed items={[{ id: 1, message: "…", time: "2h ago", type: "approved" }]} />`}
        >
          <NotificationsFeed
            items={[
              { id: 1, message: s("feed_1"), time: s("time_2h"), type: "approved" },
              { id: 2, message: s("feed_2"), time: s("time_5h"), type: "pending" },
              { id: 3, message: s("feed_3"), time: s("time_1d"), type: "rejected" },
              { id: 4, message: s("feed_4"), time: s("time_2d"), type: "info" },
            ]}
          />
        </ComponentShowcase>

        <ComponentShowcase
          title="PendingTasksList"
          description={s("tasks_desc")}
          code={`<PendingTasksList tasks={[{ id: 1, label: "Review 4 applications", to: "/admin/applications" }]} />`}
        >
          <PendingTasksList
            tasks={[
              { id: 1, label: s("task_1") },
              { id: 2, label: s("task_2") },
              { id: 3, label: s("task_3") },
            ]}
          />
        </ComponentShowcase>
      </div>
    </GuideSection>
  );
};

export default DashboardSection;
