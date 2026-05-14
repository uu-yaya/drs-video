import type { Narration } from "../../registry/types";

export const narrations: Narration[] = [
  // step 0 — overview · 5 状态
  "每个维度判完会落到 5 个状态——matched、not_matched、uncertain、insufficient_evidence、not_authorized。这套分层就为一件事：把「证据够但不像」和「证据不够不知道」分开。后三种不进总分，避免数据少被判成不像 TA。",
  // step 1 — matched
  "第一个是 matched——证据足够，并且满足角色 trait 的要求。这种维度按 match_score 等于 1 进总分。UI 上会展示给用户看，比如「你像 TA 的地方在这里」。但每条 matched 必须基于具体的 evidence_ids，AI 不许凭空生成新事实。",
  // step 2 — not_matched
  "第二个是 not_matched——证据足够，但不满足要求，或者命中了反向信号。按 match_score 等于 0 进总分。UI 上默认折叠，原因是过度强调「你不像 TA」容易让用户感到被否定。我们在文案表达上专门避免任何羞辱性措辞。",
  // step 3 — uncertain
  "第三个是 uncertain——证据互相冲突，或者 AI judge 输出的置信度本身就低。这种维度不进总分。设计这个状态是为了防止「模棱两可硬塞结论」。宁可少一个维度参与计算，也不要把「不知道」当成「不像」写进结果里。",
  // step 4 — insufficient_evidence
  "第四个是 insufficient_evidence——用户已经授权了，但是相关数据还不够多，比如这个维度需要至少 2 条证据，目前只有 1 条。这种维度也不进总分。原因和上一条一样：数据不够就如实说「这个维度测不出来」，绝对不能默认判成「不像」。",
  // step 5 — not_authorized
  "第五个是 not_authorized——用户根本没授权这个维度需要的数据，比如你没开 VLM、没授权聊天进画像。这种维度也不进总分。这条最容易被产品偷懒处理成「没数据就当不符合」，但我们写死了不行——没授权不等于不像，要明确告诉用户「这块没测」。",
];
