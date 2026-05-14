import { MindMap, type MindMapBranch } from "../../components/MindMap";
import type { ChapterStepProps } from "../../registry/types";
import "./BoundaryRedlines.css";

const REDLINES: MindMapBranch[] = [
  {
    id: "recall",
    cn: "Recall 式后台截图",
    en: "NO RECALL",
    note: "不接",
    detail: {
      example: "Windows Recall / 后台持续全屏截图",
      boundary: "不使用 Recall 作为数据源；不做后台持续全屏截图",
      usage: "杜绝隐式录屏式记忆",
    },
  },
  {
    id: "keyboard",
    cn: "键盘文本 / keylog",
    en: "NO KEYLOG",
    note: "不存",
    detail: {
      example: "按键字符、输入文本、剪贴板内容",
      boundary: "不记录按键字符、输入文本、keylog",
      production: "只允许输入强度、节奏等低敏统计",
    },
  },
  {
    id: "third-party",
    cn: "第三方正文",
    en: "NO 3RD-PARTY",
    note: "不读",
    detail: {
      example: "微信 / 邮件 / 飞书文档 / 会议正文",
      boundary: "不读取、不长期保存、不进入画像",
      production: "MCP 只允许授权 app 白名单字段和来源校验摘要",
    },
  },
  {
    id: "raw-frame",
    cn: "原始截图 / 音频",
    en: "NO RAW FRAME",
    note: "不上传 · 不训练",
    detail: {
      example: "原始截图 / 原始系统音频 / raw OS context",
      boundary: "不进入长期记忆、不上传、不作为模型训练数据",
      usage: "VLM / 音频只回写语义结果，原始 buffer 即用即丢",
    },
  },
  {
    id: "voice",
    cn: "人声 / 转写 / 通话",
    en: "NO VOICE",
    note: "不采 · 不转 · 不写",
    detail: {
      example: "麦克风人声、ASR 转写、通话 / 会议内容",
      boundary: "不采集、不转写、不回写",
      usage: "系统音频只允许提取音乐 / 氛围等低敏语义",
    },
  },
];

export default function BoundaryRedlinesChapter({ step }: ChapterStepProps) {
  const activeIndex = step === 0 ? -1 : step - 1;
  const ord = step === 0
    ? "§ 1.2.4 · 5 条死禁红线"
    : `§ 1.2.4 · ${String(step).padStart(2, "0")} / 05`;
  return (
    <div className="br-scene">
      <MindMap
        rootLabel="禁止采集与回写"
        rootEn="FORBIDDEN"
        branches={REDLINES}
        activeIndex={activeIndex}
        ord={ord}
        title={step === 0 ? "5 条死禁红线" : undefined}
        subtitle={step === 0 ? "不是承诺 · 字段表里逐项落地" : undefined}
        radiusScale={0.9}
      />
    </div>
  );
}
