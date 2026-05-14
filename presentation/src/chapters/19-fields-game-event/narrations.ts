import type { Narration } from "../../registry/types";

export const narrations: Narration[] = [
  // step 0 — overview
  "实时事件和 idip 状态是配套的，区别在时间粒度——idip 告诉桌宠你「在哪」，实时事件告诉桌宠「刚发生了什么」。一共 8 个字段：对局开始、结束、游戏内时间、事件流、时长分级、情绪线索、回应策略、高光排序分。所有 payload 只允许游戏内字段，跟现实身份无关。",
  // step 1 — game_session.start
  "game_session.start 就是「这一局从哪个时间点开始」。游戏 SDK 在开局瞬间推一条过来，附带 session_id。它是后面所有事件的时间锚，没有这条，事件流就没法拼回到具体哪一局。纯时间戳和会话标识，没有任何游戏内内容。",
  // step 2 — game_session.end
  "game_session.end 对应的是结束时刻，附带胜负结果和这一局的总时长。游戏 SDK 在结算瞬间推。我们要它，是因为桌宠的赛后反应必须卡在结算之后立刻发生——隔半小时再说「恭喜」就尴尬了。和 start 一样只有元数据，不带局内细节。",
  // step 3 — game_session.in_game_time
  "in_game_time 是游戏内的时钟，比如「游戏内第 5 日早晨 8 点」。这个字段对沉浸式游戏特别重要——桌宠的对白能贴上「你已经在游戏里熬夜了」这种感觉。但不是每款游戏都有，所以我们允许缺失，缺了的话桌宠就退回到现实时间逻辑。",
  // step 4 — game_event.stream
  "game_event.stream 是这一局里发生的具体事件流——死亡、复活、结算、目标进度。每款游戏自己声明哪些是 P0 必报事件，记忆系统负责去重和时序整理。这是桌宠即时反应的素材库：连死能安慰、突破能祝贺，全靠这条流。payload 严格限定游戏内字段。",
  // step 5 — game_session.duration_signal
  "duration_signal 是把单局或单段时长打个标签——active、long_session、very_long_session、extended_session。阈值按游戏类型单独校准，MOBA 的「长」和开放世界的「长」不是一回事。它的核心用途是健康提示：玩太久了桌宠该主动提醒你休息。",
  // step 6 — event_emotion_signal
  "event_emotion_signal 是给当下的事件打一个情绪标签——开心、紧张、挫败、释然、平静、未知。AI 加规则一起推，输入是事件、idip 变化和已授权的情绪线索。注意它是游戏场景里的短期情绪锚点，不是心理诊断，更不会沉淀进画像里说你这个人怎么样。",
  // step 7 — event_response_hint
  "event_response_hint 是给桌宠的「这次该怎么接」——庆祝、安慰、教练、先问一下、还是闭嘴。规则优先加 AI 辅助，输入是情绪、事件类型和画像。它是 runtime 信号，只服务当下这一句回应，绝不会写进现实人格判断里去。",
  // step 8 — episode.highlight_score
  "highlight_score 是给整段情节打的高光分，0 到 1。综合五个维度：是不是里程碑、事件本身有多重要、用户有没有主动保存、情绪强度多大、稀有度高不高。它是后面高光排序和日记素材推荐的依据。每一分都要带版本号和理由数组，方便用户问「凭什么这条上榜」。",
];
