import { MindMap, type MindMapBranch } from "../../components/MindMap";
import type { ChapterStepProps } from "../../registry/types";
import "./FieldsPrefs2.css";

const FIELDS: MindMapBranch[] = [
  {
    id: "pg_vlm",
    cn: "VLM 授权",
    en: "vlm_visual",
    note: "P1 · 按 app",
    detail: {
      example: `{granted:false, app_scope:[]}`,
      source: "用户显式授权 / 撤回（consent ledger）",
      production: "用户按 app 实例开启；默认关",
      boundary: "仅当前授权窗口 + 短期 buffer；不存原图",
      priority: "P1",
      usage: "游戏场景语义",
    },
  },
  {
    id: "pg_ui",
    cn: "UI 文字读取授权",
    en: "ui_text_reading",
    note: "P1 · 按 app",
    detail: {
      example: `{granted:false, app_scope:[]}`,
      source: "用户显式授权 / 撤回（consent ledger）",
      production: "用户按 app 实例开启；默认关",
      boundary: "只读界面文字；不读聊天 / 邮件 / 文档 / 密码",
      priority: "P1",
      usage: "界面提示理解",
    },
  },
  {
    id: "pg_audio",
    cn: "音频氛围授权",
    en: "system_audio_music",
    note: "EXT",
    detail: {
      example: `{granted:false, ...}`,
      source: "用户显式授权 / 撤回（consent ledger）",
      production: "用户主动开启；默认关；仅音乐 / 氛围语义",
      boundary: "不存原始音频；不做人声转写；不采集通话",
      priority: "扩展",
      usage: "桌宠感知音乐 / 氛围",
    },
  },
  {
    id: "pg_mcp",
    cn: "MCP 授权列表",
    en: "mcp_sources[]",
    note: "P1 · 单 app",
    detail: {
      example: `[{source:"steam", granted:true}]`,
      source: "用户显式授权 / 撤回（consent ledger）",
      production: "用户单 app 勾选 / 撤回；不拆字段级",
      boundary: "默认空；仅授权 app 的字段白名单",
      priority: "P1",
      usage: "外部 app 元数据 / 任务标题 / 摘要",
    },
  },
  {
    id: "pg_infer",
    cn: "AI 推断画像授权",
    en: "profile_inference",
    note: "P0 · 可暂停",
    detail: {
      example: `{granted:true, granted_at:"..."}`,
      source: "用户显式授权 / 撤回（consent ledger）",
      production: "用户允许产品内大模型生成推断画像项",
      boundary: "关闭后不新增 AI 推断；summary 停自动重写",
      priority: "P0",
      usage: "AI 推断画像项写回",
    },
  },
  {
    id: "pg_char",
    cn: "角色相似度授权",
    en: "character_similarity",
    note: "P1 · 每次同意",
    detail: {
      example: `{granted:false, ...}`,
      source: "用户显式授权 / 撤回（consent ledger）",
      production: "用户主动触发并同意本次测定",
      boundary: "默认 false；不做后台周期性测定",
      priority: "P1",
      usage: "§ 3.13 角色相似度测定",
    },
  },
  {
    id: "pg_quote",
    cn: "引用原话授权",
    en: "diary_quote",
    note: "P1 · 默认 false",
    detail: {
      example: `{granted:false, ...}`,
      source: "用户显式授权 / 撤回（consent ledger）",
      production: "用户主动开启；仍需 quote_eligible=true",
      boundary: "默认 false",
      priority: "P1",
      usage: "日记 / 高光分享引用原话",
    },
  },
  {
    id: "dp_revoke",
    cn: "撤回时是否删除",
    en: "delete_on_revoke",
    note: "P0 · ask/delete",
    detail: {
      example: "ask / delete_now",
      source: "用户选择（memory 持久化）",
      production: "用户选择；撤回时弹确认",
      boundary: "撤回授权与删除历史分开表达",
      priority: "P0",
      usage: "避免误删",
    },
  },
  {
    id: "dp_reset",
    cn: "画像清空时间",
    en: "profile_reset_at",
    note: "P0",
    detail: {
      example: `"2026-05-12T16:00:00Z"`,
      source: "用户删除操作（memory 记录）",
      production: "用户点「清空画像」时记录",
      boundary: "清空后 AI 不能用旧画像",
      priority: "P0",
      usage: "重置画像",
    },
  },
  {
    id: "mc_resummarize",
    cn: "重新总结请求",
    en: "resummarize_requested_at",
    note: "P0 · 用户触发",
    detail: {
      example: `"2026-05-12T16:05:00Z"`,
      source: "用户请求（memory 记录）",
      production: "用户点「重新总结我」或对桌宠说时记录",
      boundary: "只由用户触发",
      priority: "P0",
      usage: "触发画像重新总结",
    },
  },
  {
    id: "mc_rules",
    cn: "以后别这样记",
    en: "do_not_remember_rules[]",
    note: "P0 · 锁定 AI",
    detail: {
      example: `["不要根据一次连败总结我心态差"]`,
      source: "用户更正（memory 记录）",
      production: "用户编辑或对桌宠说「以后别这样记」时写入",
      boundary: "用户更正优先；AI 不得覆盖",
      priority: "P0",
      usage: "约束后续 AI 推断画像项",
    },
  },
];

export default function FieldsPrefs2Chapter({ step }: ChapterStepProps) {
  const activeIndex = step === 0 ? -1 : step - 1;
  const ord = step === 0
    ? "§ 3.12 · 用户偏好字段表 · 下半"
    : `§ 3.12 · ${String(step).padStart(2, "0")} / 11 · 下半`;
  return (
    <div className="fpr2-scene">
      <MindMap
        rootLabel="用户偏好 (2/2)"
        rootEn="§ 3.12 PREFS · B"
        branches={FIELDS}
        activeIndex={activeIndex}
        ord={ord}
        title={step === 0 ? "用户偏好字段表 · 下半 11 字段" : undefined}
        subtitle={step === 0 ? "隐私授权剩余 7 项 · 删除策略 · 记忆控制" : undefined}
        radiusScale={1.05}
      />
    </div>
  );
}
