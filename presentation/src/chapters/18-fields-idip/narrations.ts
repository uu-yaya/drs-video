import type { Narration } from "../../registry/types";

export const narrations: Narration[] = [
  // step 0 — overview
  "idip 是合作游戏主动报给我们的状态——你练到几级、卡在第几章、这周任务做了几个。一共 5 个字段：状态快照、状态变化、状态异常、突破点、字段语义配置。我们没有去爬游戏后端，全部是首方 SDK 推过来的，所以账号、付费、实名这些一概拿不到。",
  // step 1 — idip_snapshot
  "idip_snapshot 是当前时点的游戏状态全景——等级、段位、周任务进度。靠首方游戏 SDK 在状态变化时推、加上周期心跳兜底。桌宠靠这个理解你「现在在哪」。强约束：只接受游戏内进度字段，账号信息、付费记录、实名信息一律不在 schema 里。",
  // step 2 — idip_delta
  "idip_delta 是把上一时点的 snapshot 和新到的 snapshot 逐字段比一遍，算出「哪儿涨了哪儿掉了」。比如等级 +1、段位升一级。它存在的意义是给桌宠一个动作触发点——「你刚通关」「你刚掉段」，反应才能立刻跟上。是派生信号，不存原始 snapshot 历史。",
  // step 3 — idip_anomaly
  "idip_anomaly 是基于 delta 和事件流再往上识别异常——同一关反复失败、关键进度长时间停滞，就标记为「卡关」。规则按游戏类型校准过，不是一刀切。桌宠看到这个信号会主动安慰，而不是泛泛地问「今天怎么样」。判定逻辑也都留版本号，方便回查。",
  // step 4 — idip_milestone
  "idip_milestone 是「值得庆祝的瞬间」——比如首次到达钻石、首次通关。来源有两种：游戏侧通过字段语义配置标里程碑字段、或者直接显式上报一条 milestone。我们要它单独抽出来，是为了让桌宠能主动祝贺，而不是等你说出来才意识到。",
  // step 5 — idip_field_metadata
  "idip_field_metadata 是游戏侧自己声明的一份 JSON Schema——告诉记忆系统每个字段叫什么、什么类型、单位是什么、哪些能算里程碑。这个字段非常关键，因为我们对游戏内数据的解释完全依赖它，记忆系统自己绝不去猜「level 是什么意思」。",
];
