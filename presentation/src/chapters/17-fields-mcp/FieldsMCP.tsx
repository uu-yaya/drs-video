import { MindMap, type MindMapBranch } from "../../components/MindMap";
import type { ChapterStepProps } from "../../registry/types";
import "./FieldsMCP.css";

const FIELDS: MindMapBranch[] = [
  {
    id: "app_id",
    cn: "app 标识",
    en: "mcp_app_id",
    note: "P1",
    detail: {
      example: `"dida365"`,
      source: "记忆系统",
      production: "MCP SDK 直采（app 自身上报 ID）",
      boundary: "仅 app 元数据",
      priority: "P1",
      usage: "标识哪个 app 的 MCP 数据",
    },
  },
  {
    id: "metadata",
    cn: "元数据摘要",
    en: "metadata_summary",
    note: "P1 · 数量/状态",
    detail: {
      example: `"今天有 3 个待办，2 个已完成"`,
      source: "记忆系统",
      production: "app 主动通过 MCP server 暴露数量/状态/时间段元数据",
      boundary: "不含原始标题 / 正文",
      priority: "P1",
      usage: "桌宠轻量提醒",
    },
  },
  {
    id: "task_titles",
    cn: "任务标题",
    en: "task_titles[]",
    note: "P1 · 仅标题",
    detail: {
      example: `["周报", "游戏日常任务"]`,
      source: "记忆系统",
      production: "app 主动暴露标题字段；用户单 app 授权后读取",
      boundary: "仅授权 app 的条目标题；不读正文 / 评论 / 附件",
      priority: "P1",
      usage: "桌宠可引用具体任务",
    },
  },
  {
    id: "app_summary",
    cn: "app 自生成摘要",
    en: "app_generated_summary",
    note: "P1 · 带 source_type",
    detail: {
      example: `"今天主要是日常任务和一项周报"`,
      source: "记忆系统",
      production: "app 自己生成或暴露的摘要字段；不绕权限读正文",
      boundary: "必须带 summary_source_type；禁聊天/邮件/文档/会议正文摘要",
      priority: "P1",
      usage: "桌宠自然语言引用",
    },
  },
  {
    id: "source_type",
    cn: "摘要来源类型",
    en: "summary_source_type",
    note: "P1 · 白名单 3 类",
    detail: {
      example: `task_status_summary`,
      source: "记忆系统",
      production: "MCP payload 必填；记忆系统按白名单校验",
      boundary: "仅允许 task / public_activity / platform_status_summary",
      priority: "P1",
      usage: "防止摘要绕过正文边界",
    },
  },
  {
    id: "authorized",
    cn: "已授权 app",
    en: "authorized_sources[]",
    note: "P1 · consent ledger",
    detail: {
      example: `[{source:"dida365", granted:true}]`,
      source: "记忆系统",
      production: "偏好设置单 app 主动勾选；memory consent ledger 持久化",
      boundary: "默认空；撤回后不再读取该 app 数据",
      priority: "P1",
      usage: "标识桌宠允许接入的 MCP app",
    },
  },
];

export default function FieldsMCPChapter({ step }: ChapterStepProps) {
  const activeIndex = step === 0 ? -1 : step - 1;
  const ord = step === 0
    ? "§ 3.4 · MCP 字段表"
    : `§ 3.4 · ${String(step).padStart(2, "0")} / 06`;
  return (
    <div className="fm-scene">
      <MindMap
        rootLabel="MCP 通道"
        rootEn="§ 3.4 MCP"
        branches={FIELDS}
        activeIndex={activeIndex}
        ord={ord}
        title={step === 0 ? "MCP 字段表 · 6 字段" : undefined}
        subtitle={step === 0 ? "用户单 app 勾选 + 固定字段白名单 · 不读消息/邮件/文档正文" : undefined}
        radiusScale={0.9}
      />
    </div>
  );
}
