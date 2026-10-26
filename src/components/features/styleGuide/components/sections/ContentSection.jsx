import React from "react";
import { MdInfoOutline, MdEdit, MdDelete } from "react-icons/md";
import Avatar, { AvatarGroup } from "components/ui/Avatar";
import Badge from "components/ui/Badge";
import Tooltip from "components/ui/Tooltip";
import Skeleton from "components/ui/Skeleton";
import RowIconButton from "components/ui/buttons/RowIconButton";
import MiniCalendar from "components/calendar/MiniCalendar";
import { useGuideT } from "../../hooks/useUiTemplate";
import GuideSection from "../GuideSection";
import ComponentShowcase from "../ComponentShowcase";

const PEOPLE = [1, 2, 3, 4, 5, 6, 7];

const ContentSection = () => {
  const t = useGuideT();
  const s = (k) => t(`styleGuide.content.${k}`);
  const name = (n) => t(`styleGuide.tables.row_${n}`);

  return (
    <GuideSection id="content" title={s("title")} intro={s("intro")}>
      <div className="grid gap-8 lg:grid-cols-2">
        <ComponentShowcase
          title="Avatar · AvatarGroup"
          description={s("avatar_desc")}
          code={`
<Avatar name="Aisha Rahman" size="lg" status="online" />
<AvatarGroup people={members} max={4} />`}
        >
          <div className="flex flex-col gap-6">
            <div className="flex items-end gap-4">
              {["sm", "md", "lg", "xl"].map((size, i) => (
                <Avatar key={size} name={name(i + 1)} size={size} />
              ))}
            </div>
            <div className="flex items-center gap-4">
              <Avatar name={name(1)} status="online" />
              <Avatar name={name(2)} status="away" />
              <Avatar name={name(3)} status="offline" />
              <span className="h-8 w-px bg-slate-200" />
              <AvatarGroup people={PEOPLE.map((n) => ({ name: name(n) }))} max={4} />
            </div>
          </div>
        </ComponentShowcase>

        <ComponentShowcase
          title="Badge"
          description={s("badge_desc")}
          code={`
<Badge variant="success" dot>Active</Badge>
<Badge solid>New</Badge>`}
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              {["neutral", "brand", "success", "warning", "danger", "info"].map((v) => (
                <Badge key={v} variant={v}>{s(`badge_${v}`)}</Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {["success", "warning", "danger"].map((v) => (
                <Badge key={v} variant={v} dot>{s(`status_${v}`)}</Badge>
              ))}
              <Badge solid>{s("badge_new")}</Badge>
            </div>
          </div>
        </ComponentShowcase>

        <ComponentShowcase title="Tooltip" description={s("tooltip_desc")} code={`<Tooltip label="Edit"><RowIconButton icon={<MdEdit />} /></Tooltip>`}>
          <div className="flex items-center gap-6 pt-8">
            <Tooltip label={s("tooltip_edit")}>
              <RowIconButton icon={<MdEdit className="h-4 w-4" />} variant="primary" />
            </Tooltip>
            <Tooltip label={s("tooltip_delete")}>
              <RowIconButton icon={<MdDelete className="h-4 w-4" />} variant="danger" />
            </Tooltip>
            <Tooltip label={s("tooltip_info")}>
              <span tabIndex={0} className="inline-flex items-center gap-1 text-sm text-slate-500 outline-none">
                {s("tooltip_hover")} <MdInfoOutline className="h-4 w-4 text-slate-400" />
              </span>
            </Tooltip>
          </div>
        </ComponentShowcase>

        <ComponentShowcase title="Skeleton" description={s("skeleton_desc")} code={`<Skeleton className="h-4 w-40" />`}>
          <div className="flex flex-col gap-4">
            {[0, 1].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
                <div className="flex flex-1 flex-col gap-2">
                  <Skeleton className="h-3.5 w-1/3" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
              </div>
            ))}
            <Skeleton className="h-24 w-full rounded-2xl" />
          </div>
        </ComponentShowcase>
      </div>

      <ComponentShowcase title="MiniCalendar" description={s("calendar_desc")} code={`<MiniCalendar />`} canvas="muted">
        <div className="max-w-sm">
          <MiniCalendar />
        </div>
      </ComponentShowcase>
    </GuideSection>
  );
};

export default ContentSection;
