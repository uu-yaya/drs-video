import type { Narration } from "../../registry/types";

export const narrations: Narration[] = [
  "user_preferences 是整套系统的控制台，字段太多我们拆上下半看。上半 10 个：内容类型 3 项、日记风格 4 项、隐私授权前 3 项。这一节核心原则只有一条——AI 永远不能自己改这里，任何写入都必须用户在 UI 上勾过。",
  "content_type.enabled 是用户勾选启用了哪些生成内容——轻反思、情感陪伴、日记之类，从 8 个枚举里选。这条只能在偏好页 UI 上主动勾选。哪怕 AI 觉得「你应该会喜欢日记」，也不许悄悄打开，必须用户自己点。",
  "content_type.priority 是用户拖拽出来的优先级排序。为什么需要——因为有几个内容类型同时想冒出来时，桌宠总得知道谁先说。规则简单：拖拽决定顺序，AI 不许动。多内容竞争时按这条数组从上往下走。",
  "content_type.user_feedback 不会直接把内容类型关掉，它只记反馈事件——点赞、点踩、口头说不喜欢，按 target 累计。我们故意拆开「开关」和「反馈」：开关只听用户显式操作，反馈只做权重学习，避免一次手滑误把内容类型关掉。",
  "diary_style.frequency 是日记多久写一次——daily、weekly、event_driven、off 四选一。偏好页 UI 写入。这里我们卡得特别死：AI 严禁自动修改日记频率，因为日记是有情感重量的产出，节奏被 AI 改一次，信任就崩了。",
  "diary_style.length 是日记长度偏好——short、medium、long。也是用户主动选。看起来鸡毛蒜皮，但它直接决定 AI 生成模板的字数预算，差一个档位用户读起来体感差异就很大。",
  "diary_style.focus 是日记重点——events、emotion、growth、mixed。你想要流水账型、情绪复盘型还是成长记录型，自己选。这条决定 AI 抓哪一类材料拼日记。AI 写不出 mixed 时只许降级到默认，绝不许改这条。",
  "quote_user_original 是「日记里能不能引用我说过的原话」。这条要生效，必须两个条件同时满足——privacy_grants.diary_quote 给了授权，并且对应原话本身被标了 quote_eligible=true。少一个 AI 就只能转述。",
  "privacy_grants.chat_content 决定首方对话能不能进长期画像，这是 P0 里的 P0。结构是 granted / granted_at / revoked_at 三元组——授没授、什么时候授的、什么时候撤的，都留账。默认 false，AI 一辈子不许自己翻这个开关。",
  "game_event_memory 是「游戏事件能不能进长期画像」。我们故意把它和实时反应拆开——桌宠当下安慰你「连死了别气」不需要授权，但要把这事沉淀到「这个用户抗压差」的长期画像，必须用户勾过。默认 false。",
  "behavior_data 是低敏行为信号——打字节奏、鼠标活跃度这类——能不能进画像。它的作用是辅助打扰判断和玩法风格推断，不读内容只读节奏。但默认还是 false，理由很简单：没勾过的开关一律按关处理，没有「合理推定」。",
];
