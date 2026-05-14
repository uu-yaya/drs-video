import { MindMap, type MindMapBranch } from "../../components/MindMap";
import type { ChapterStepProps } from "../../registry/types";
import "./FieldsIdip.css";

const FIELDS: MindMapBranch[] = [
  {
    id: "snapshot",
    cn: "状态快照",
    en: "idip_snapshot",
    note: "P0 · SDK 推送",
    detail: {
      example: `{level:88, rank:"钻石二"}`,
      source: "记忆系统",
      production: "游戏 SDK 推送（首方接入）；状态变化 push / 周期心跳",
      boundary: "首方游戏 SDK；不含个人身份信息 / 付费 / 实名",
      priority: "P0",
      usage: "角色等级 / 段位 / 通关进度等基础状态",
    },
  },
  {
    id: "delta",
    cn: "状态变化",
    en: "idip_delta",
    note: "P1 · 增强派生",
    detail: {
      example: `{level:"+1", rank:"升 +1 段位"}`,
      source: "Memory Intelligence / Consumer Runtime",
      production: "缓存上一时点 snapshot，新 snapshot 到达逐字段对比",
      boundary: "首方游戏 SDK；不含个人身份信息 / 付费 / 实名",
      priority: "P1",
      usage: `"刚通关" / "段位掉了"`,
    },
  },
  {
    id: "anomaly",
    cn: "状态异常",
    en: "idip_anomaly",
    note: "P1 · 卡关识别",
    detail: {
      example: `[{type:"卡关", at:"..."}]`,
      source: "Memory Intelligence / Consumer Runtime",
      production: "基于 idip_delta / game_event 历史滑窗识别卡点",
      boundary: "首方游戏 SDK；不含个人身份信息 / 付费 / 实名",
      priority: "P1",
      usage: `"多次同一处失败" / "可能卡关"`,
    },
  },
  {
    id: "milestone",
    cn: "状态突破点",
    en: "idip_milestone[]",
    note: "P1 · 庆祝触发",
    detail: {
      example: `[{name:"首次到达钻石"}]`,
      source: "Memory Intelligence / 游戏 SDK",
      production: "基于 field_metadata 里程碑字段或合作游戏直接上报",
      boundary: "首方游戏 SDK；不含个人身份信息 / 付费 / 实名",
      priority: "P1",
      usage: "桌宠主动祝贺触发点",
    },
  },
  {
    id: "metadata",
    cn: "字段语义配置",
    en: "idip_field_metadata",
    note: "P0 · 游戏侧声明",
    detail: {
      example: `{level:{type:"int", milestone_type:"is_levelup"}}`,
      source: "记忆系统",
      production: "游戏侧声明的字段语义配置文件（JSON Schema）",
      boundary: "配置文件，无个人身份信息",
      priority: "P0",
      usage: "字段语义说明（数字含义）",
    },
  },
];

export default function FieldsIdipChapter({ step }: ChapterStepProps) {
  const activeIndex = step === 0 ? -1 : step - 1;
  const ord = step === 0
    ? "§ 3.5 · idip 字段表"
    : `§ 3.5 · ${String(step).padStart(2, "0")} / 05`;
  return (
    <div className="fi-scene">
      <MindMap
        rootLabel="idip 状态"
        rootEn="§ 3.5 IDIP"
        branches={FIELDS}
        activeIndex={activeIndex}
        ord={ord}
        title={step === 0 ? "idip 字段表 · 5 字段" : undefined}
        subtitle={step === 0 ? "首方游戏 SDK 推送 · 不存账号/付费/实名" : undefined}
        radiusScale={0.85}
      />
    </div>
  );
}
