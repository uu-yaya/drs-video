import { MindMap, type MindMapBranch } from "../../components/MindMap";
import type { ChapterStepProps } from "../../registry/types";
import "./FieldsBehavior1.css";

const FIELDS: MindMapBranch[] = [
  {
    id: "title",
    cn: "脱敏窗口标题",
    en: "window_title_redacted",
    note: "P0 · 去文件名/路径",
    detail: {
      example: `"在 IDE 编辑代码文件"`,
      source: "记忆系统",
      production: "OS 窗口 API 拿原标题 + 正则脱敏；每 1s + 标题变化推送",
      boundary: "脱敏：去文件名 / 路径 / URL / 用户名",
      priority: "P0",
      usage: `"在 IDE 编辑代码文件"`,
    },
  },
  {
    id: "fullscreen",
    cn: "游戏全屏",
    en: "is_fullscreen_game",
    note: "P0 · OS API",
    detail: {
      example: `false`,
      source: "记忆系统",
      production: "同 § 3.2 OS 窗口 API 直采",
      boundary: "仅 OS 公开 API",
      priority: "P0",
      usage: "全屏 = 闭嘴",
    },
  },
  {
    id: "ui_tags",
    cn: "界面语义标签",
    en: "ui_semantic_tags[]",
    note: "P1 · 白名单 + opt-in",
    detail: {
      example: `["error_dialog_visible", "confirm_button_visible"]`,
      source: "记忆系统 / Consumer Runtime",
      production: "OS Accessibility API + 规则映射；白名单 + opt-in；buffer ≤5min",
      boundary: "默认输出语义标签；只读公开控件文本；禁聊天/邮件/文档正文",
      priority: "P1",
      usage: `"屏幕上有错误弹窗"`,
    },
  },
  {
    id: "focus",
    cn: "焦点控件",
    en: "focused_element_role",
    note: "P1 · 仅控件类型",
    detail: {
      example: `button / text_field / title`,
      source: "记忆系统",
      production: "OS 控件 API 直采；焦点变化实时推送",
      boundary: "仅控件类型，不含内容",
      priority: "P1",
      usage: `"正在输入"不打扰`,
    },
  },
  {
    id: "intensity",
    cn: "输入强度",
    en: "input_intensity_level",
    note: "P0 · 桶化 · 无 keylog",
    detail: {
      example: `low / mid / high`,
      source: "Consumer Runtime",
      production: "桶化派生：10s/1min 滚动窗口；仅统计事件次数 / 区域",
      boundary: "桶化派生；绝不存原始按键；不形成 keylog",
      priority: "P0",
      usage: "专注 vs 休息判断",
    },
  },
  {
    id: "rhythm",
    cn: "打字节奏",
    en: "typing_rhythm_signal",
    note: "P1 · 派生",
    detail: {
      example: `steady / bursty / sparse`,
      source: "Consumer Runtime",
      production: "同 input_intensity_level 桶化派生",
      boundary: "桶化派生；绝不存原始按键；不形成 keylog",
      priority: "P1",
      usage: "专注 vs 休息判断",
    },
  },
  {
    id: "mouse",
    cn: "鼠标 burst",
    en: "mouse_activity_burst",
    note: "P1 · 派生",
    detail: {
      example: `true / false`,
      source: "Consumer Runtime",
      production: "同 input_intensity_level 桶化派生",
      boundary: "桶化派生；绝不存原始按键；不形成 keylog",
      priority: "P1",
      usage: "专注 vs 休息判断",
    },
  },
];

export default function FieldsBehavior1Chapter({ step }: ChapterStepProps) {
  const activeIndex = step === 0 ? -1 : step - 1;
  const ord = step === 0
    ? "§ 3.3 · 行为字段表 · 上半"
    : `§ 3.3 · ${String(step).padStart(2, "0")} / 07 · 上半`;
  return (
    <div className="fb1-scene">
      <MindMap
        rootLabel="行为 (1/2)"
        rootEn="§ 3.3 BEHAVIOR · A"
        branches={FIELDS}
        activeIndex={activeIndex}
        ord={ord}
        title={step === 0 ? "行为字段表 · 上半 7 字段" : undefined}
        subtitle={step === 0 ? "不记录键盘输入内容 · 只允许输入强度等低敏统计" : undefined}
        radiusScale={0.95}
      />
    </div>
  );
}
