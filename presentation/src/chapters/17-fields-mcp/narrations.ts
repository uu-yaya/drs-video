import type { Narration } from "../../registry/types";

export const narrations: Narration[] = [
  // step 0 — overview
  "MCP 这块定位很特殊——它是桌宠拿外部 app 上下文的唯一通道。一共 6 个字段：app 标识、元数据摘要、任务标题、app 自生成摘要、摘要来源类型、已授权 app 列表。原则只有一条：app 主动报、用户单独授权、只接元数据和摘要，正文一律拒收。",
  // step 1 — mcp_app_id
  "mcp_app_id 就是 app 自己上报的身份 ID，比如 dida365。我们靠这个区分进来的数据是哪家 app 推的。它本身不带任何用户内容，纯元数据，但所有后续的授权校验、字段解析都得先认这个 ID，所以放在第一位。",
  // step 2 — metadata_summary
  "metadata_summary 是 app 主动暴露的高度概括信息，比如「今天有 3 个待办、2 个已完成」。我们要的就是这种数量、状态、时间段层面的事实。原始任务标题、正文一概不在这层。桌宠靠这个就能做轻量提醒，不用真的去翻你的待办内容。",
  // step 3 — task_titles
  "task_titles 比 metadata 多一档——具体到每条任务的标题，比如「周报」「游戏日常任务」。要拿到这一层，必须用户单独给这个 app 勾过授权。哪怕授权了，我们也只读标题，正文、评论、附件全部不碰。桌宠这才能在对话里精确说出你今天有什么任务。",
  // step 4 — app_generated_summary
  "app_generated_summary 是 app 自己生成的一段自然语言摘要，比如「今天主要是日常任务和一项周报」。注意是 app 自己产的，不是我们去读它的内容算出来的。它的存在是给桌宠一个能直接念出来的句子，但每条都必须带 source_type 标明来源类型，否则不收。",
  // step 5 — summary_source_type
  "summary_source_type 是上一字段的关键守门员——MCP payload 里必填。我们只认三个白名单值：任务状态摘要、公开活动摘要、平台状态摘要。聊天、邮件、会议、文档正文摘要一律拒收。这个字段就是为了堵死「app 把正文洗成摘要绕过来」这条路。",
  // step 6 — authorized_sources
  "authorized_sources 记录的是用户到底给哪些 app 开了 MCP 通道。默认是空——你不勾，桌宠就一个外部 app 都看不到。每次勾选都会写进 consent ledger 留痕，撤回之后立刻停止读取。这是 MCP 整条链路的总闸，从产品上必须做得非常显眼。",
];
