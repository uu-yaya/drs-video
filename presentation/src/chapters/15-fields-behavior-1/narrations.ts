import type { Narration } from "../../registry/types";

export const narrations: Narration[] = [
  // step 0 — overview
  "行为字段上半 7 个——脱敏窗口标题、游戏全屏、界面语义标签、焦点控件、输入强度、打字节奏、鼠标 burst。这一组比 PC 进程再细一层，但隐私我们卡得最严。原则就一条：所有键盘输入只看强度不看内容，所有窗口标题脱敏后再进系统，绝对不形成键盘日志。",
  // step 1 — window_title_redacted
  "window_title_redacted 是窗口标题脱敏后的版本——原标题里的文件名、路径、URL、用户名都用正则洗掉，只留 app 类别和文件类型，比如「在 IDE 编辑代码文件」。我们要这个字段，是因为光知道你在用 VS Code 不够，但又绝不能把项目名、客户名直接吞进系统。",
  // step 2 — is_fullscreen_game
  "is_fullscreen_game 和 PC 那边的全屏判断是同一套，只是这里特别看游戏窗口。逻辑还是那条铁律——全屏等于闭嘴。你打 BOSS、看过场动画的时候桌宠绝对不该跳出来。操作系统窗口接口直接拿，没有额外采样、也没有去读窗口里的内容。",
  // step 3 — ui_semantic_tags
  "ui_semantic_tags 是把当前界面识别成几个固定标签，比如「错误弹窗出现了」「确认按钮可见」。靠的是操作系统提供的辅助 API 加规则映射。这个字段我们卡得最严——只有白名单 app、用户单独勾选才开，缓存最长五分钟，聊天框、邮件、文档正文一律不读。",
  // step 4 — focused_element_role
  "focused_element_role 只告诉桌宠你光标现在停在什么类型的控件上——按钮、输入框、还是标题，就这一档信息。它的用处是「你正在输入」的时候桌宠别打扰。我们读控件类型，绝不读控件里的内容，所以你输入框里打的什么字，系统这一层完全不知道。",
  // step 5 — input_intensity_level
  "input_intensity_level 是把你最近十秒到一分钟的键鼠事件分桶成 low / mid / high 三档，纯统计事件次数。这么做有个绝对不能让步的原因——原始按键一旦留存就是键盘日志，所以中间这一层桶化派生是硬隔离。它判断的是你在专注还是在休息，不是你打了什么。",
  // step 6 — typing_rhythm_signal
  "typing_rhythm_signal 是从输入强度往上再派生一层——steady 是稳定打字、bursty 是猛打几下停一下、sparse 是断断续续。同样从桶化数据里算出来，原始按键一个都不留。它帮桌宠区分你是在敲代码、改文档，还是只是偶尔回个消息。",
  // step 7 — mouse_activity_burst
  "mouse_activity_burst 看的是鼠标这边有没有突然密集操作——同一套桶化派生逻辑，只统计点击和移动的频次。和键盘那两个字段一起用，能让桌宠分清你是在专注操作、还是已经停下来发呆了。原始鼠标轨迹我们不存，存了也是给自己挖坑。",
];
