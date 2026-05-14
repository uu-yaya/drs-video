import type { Narration } from "../../registry/types";

export const narrations: Narration[] = [
  // step 0 — overview
  "VLM 是看屏幕画面的能力，4 个字段——单 app 开关、app 类别、场景语义标签、用户可见摘要。它能识别你这局是在打 BOSS 还是过剧情，但隐私敏感、算力贵。所以我们做了三道闸：默认关、按 app 单独开、开启时 UI 必须显示「正在看屏幕」。原图当场丢，不上传不训练。",
  // step 1 — vlm_enabled_for_this_app_instance
  "这个字段就是 VLM 的最外层物理开关——必须在那个具体 app 的桌宠设置里手动打开。默认是关的，而且授权粒度小到「单个 app 实例」：你在 A 游戏开了，并不意味着 B 游戏也开。我们卡这么细，是因为屏幕识别一旦泛化就回不来了。",
  // step 2 — app_category
  "app_category 标识当前授权的 app 属于哪一类——目前只支持 game。其他类别比如办公软件、浏览器，我们故意没开。原因是 VLM 的场景理解能力还没强到能在所有界面都安全使用，先在游戏窗口跑通、再考虑下一类，不一次性放出去。",
  // step 3 — semantic_tags
  "semantic_tags 是 VLM 输出的场景标签，比如 boss_fight、low_hp、scene_funny。每次最多 5 个，全部必须落在我们预定义的枚举表里。视觉帧用完即扔，缓存最多 60 秒。重点是不允许自由文本扩写——一旦让模型自由写，原画面里的字幕、人脸都可能漏出去。",
  // step 4 — user_visible_summary
  "user_visible_summary 是一句给用户看的描述，比如「BOSS 战残血，紧张时刻」，硬限制 50 字以内。强约束写在 prompt 里——不允许输出账号、聊天内容、字幕原文、他人信息。它的存在是为了让用户随时知道「桌宠看到了什么」，没有这一行，VLM 就是个黑盒。",
];
