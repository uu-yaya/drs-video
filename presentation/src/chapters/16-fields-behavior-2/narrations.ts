import type { Narration } from "../../registry/types";

export const narrations: Narration[] = [
  // step 0 — overview
  "行为字段下半还是 7 个——鼠标热区、滚动强度、操作语义事件、编辑动作 burst、undo/redo 频率、输入法状态、编辑会话时长。这一组都是从上半的低敏统计里再派生一层，目的是识别更具体的工作状态。仍然不动键盘字符，仍然没有原始事件流入库。",
  // step 1 — mouse_region_heatmap_top3
  "mouse_region_heatmap_top3 是看你鼠标这十秒一分钟集中在屏幕哪几个区域，比如中间、右上、左侧。我们只统计区域分布，不存任何鼠标坐标轨迹。它用来辅助判断专注还是休息——一直在中间敲代码 vs 在角落里乱晃，状态完全不一样。",
  // step 2 — scroll_intensity_signal
  "scroll_intensity_signal 给滚轮也分四档——none / low / mid / high。原因很简单：你在快速滚长文档和在慢慢读 PDF，状态判断要不一样。同样是十秒一分钟桶化派生，原始滚动事件不存，数值出来之后源数据就丢。",
  // step 3 — semantic_events
  "semantic_events 是一组「明确动作」事件流——保存、撤销重做、切全屏、锁屏解锁，就这几个白名单。我们靠操作系统事件接口监听快捷键组合识别，绝不解析按了哪些字符。它给桌宠一个具体抓手：知道你刚保存了文档、刚切了 app，反应才能更精准。",
  // step 4 — text_edit_action_burst
  "text_edit_action_burst 是从语义事件再往上聚——一分钟到五分钟内 save、undo、redo 密集出现，就标 true。这个字段告诉桌宠你正在密集编辑长文档。注意它是二阶统计，不接触字符流，只看「事件发生了几次」，比直接读编辑器内容安全得多。",
  // step 5 — undo_redo_rate_per_min
  "undo_redo_rate_per_min 单独把撤销和重做的频率拎出来看。我们关心这个，是因为「频繁 undo」往往意味着你在改 bug 或者卡住了——这种时候桌宠就不该来插嘴。同样是从语义事件二阶派生，每分钟一个数字而已，不知道你在撤销什么。",
  // step 6 — ime_state
  "ime_state 只告诉桌宠输入法当前是中文、英文、还是关着。这个字段不是内容，是状态——纯切换信号，不涉及候选词、不涉及输入字符。用处是桌宠回应可以匹配你的语言模式：你在敲英文邮件，它就别中文唠嗑过来。",
  // step 7 — editing_session_duration_min
  "editing_session_duration_min 是当前编辑会话已经持续了多少分钟，靠语义事件的时序聚合算出来。我们要它，是为了识别长 session——你已经写了一小时，桌宠该提醒你休息了；也方便后面回顾「今天最长的一段专注是什么时候」。",
];
