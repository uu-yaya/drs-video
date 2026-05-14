import type { Narration } from "../../registry/types";

export const narrations: Narration[] = [
  "高光下半 7 个字段管的是「这条高光怎么活、怎么共享、怎么死」——触发来源、隐私级别、置顶、证据 ID、is_active 和它的两个伴生字段。所有数据对象都用同一套生命周期约定，高光只是其中一个落地。",
  "source 记的是这条高光是被什么触发出来的——idip 里程碑、episode 打分到阈值、或者用户主动点星，三选一。这里我们故意排除了一个来源：角色相似度结果不许生成高光，否则就成了「桌宠用相似度证明自己相似度」的自证循环。",
  "privacy_level 只有两档——private 和 shareable。新生成的高光默认就是 private，只有用户主动点了分享按钮，才会派生出一份 shareable 副本。private 那份永远不进分享卡片，这是我们对「不会意外晒出去」的兜底承诺。",
  "pinned 是个朴素的布尔，但它必须由用户在偏好设置页的 UI 上手动操作，AI 一行代码都碰不到。原因是「置顶」对用户来说是带情感重量的——值得记一辈子的那种瞬间，由 AI 自动判断的话很容易翻车。",
  "evidence_ids 是这条高光指向哪些底层证据——game_event_xx、idip_milestone_xx 这类 ID 数组。系统直接把上游 ID 写进来，不复制原文。后面分享卡片、复盘、甚至角色相似度的解释，全靠这数组反查实证，断了就成了空话。",
  "is_active 默认 true，用户删了、否定了、替换了，就翻成 false。和别的对象一样——false 之后不展示、不引用、也不能再当角色相似度的证据。我们不真删数据，是为了下次 AI 别再总结出同样错的高光。",
  "inactive_reason 跟 profile_meta 一套枚举：user_deleted、user_rejected、user_replaced、expired、conflict_with_newer_evidence。只有 is_active=false 的时候才填。所有「为什么挂了」的解释都得回到这五个标签上。",
  "inactive_at 写的是这条高光被删除、否定、替换或者过期的那个时刻。系统戳，但它支撑两件事——一是用户要恢复的时候我们能精确还原顺序，二是用户问「这条什么时候不见的」时我们能直接答出来。",
];
