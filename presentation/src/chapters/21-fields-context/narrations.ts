import type { Narration } from "../../registry/types";

export const narrations: Narration[] = [
  "current_context 这张表是桌宠每次开口前都要查一遍的「现场快照」。我们设计了 7 个字段，把活动主题、情绪、能不能打扰、注意力、置信度、推送原因、来源掩码全压成派生标量。原始聊天和画面一律不落进来，桌宠只读切面，不读底层。",
  "activity_topic 解决的是「桌宠该聊什么」。比如你在打 BOSS 战，它就不会突然跟你聊午饭。规则先判断，已知 app 加标题模式直接命中；规则搞不定才让大模型补一句话级别的判断。结构化状态一变就推，平时靠心跳保活。",
  "mood_estimate 是桌宠的回应风格开关——你紧张它就少说话，沮丧它换温柔语气。值就 5 档：紧张、平静、兴奋、沮丧、unknown。规则滑窗加 AI 一起推，信号不够直接给 unknown，宁可不判，也不冒充心理医生做诊断。",
  "interrupt_suitability 是个派生标量，目的就一个——桌宠不许自己判断「现在能不能打扰」，必须读这条。我们把全屏、空闲、打字节奏、game_event 密度、勿扰边界加权出 high / medium / low，跨级一变立刻推送。",
  "attention_target 告诉桌宠你的眼睛在哪边屏幕上，它好决定从左边还是右边冒出来。靠 active_app 加清洗后的窗口标题加 app 分类规则映射，输出游戏、IDE、视频这种粗类。标题里的文件名、用户名先脱敏才进来，桌宠只看抽象类目。",
  "confidence 是「这张快照本身靠不靠谱」。算法很朴素——滑窗里有多少条有效信号，低于阈值就标低置信，桌宠这时候默认保守、不主动撩人。我们要的就是这种自我怀疑，避免信号断档时它还在自信地输出错误判断。",
  "trigger 是这次推送被什么触发——activity_topic_change、mood_change、interrupt_change、heartbeat 四选一。看起来不起眼，但它是审计的关键：用户问「桌宠为什么这时候开口」，我们能反查是状态变了还是心跳到了。",
  "source_mask 这条字段存在的意义就是「凭证」——这次判断用了哪些数据源，chat_realtime、behavior_runtime、vlm、mcp、game_event 各自有没有开。授权一变它就跟着裁剪。用户问「你凭什么这么判断」，桌宠掀开这张掩码就能答清楚。",
];
