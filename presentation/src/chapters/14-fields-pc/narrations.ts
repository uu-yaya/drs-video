import type { Narration } from "../../registry/types";

export const narrations: Narration[] = [
  // step 0 — overview
  "PC 进程这块要解决的问题非常具体——桌宠什么时候该闭嘴。我们盯五个字段：当前 app 名、bundle ID、是否全屏、闲置档位、切换频率。这几个信号都是操作系统公开接口就能拿的低敏数据，足以判断你在工作、在游戏、还是已经走开。app 内容我们一行都不读。",
  // step 1 — active_app.name
  "active_app.name 就是你现在前台开的是哪个 app，比如 VS Code。我们靠操作系统的进程接口直接查，每秒轮询加一遇切换立刻推送。只用来判断你「现在在游戏里」还是「在工作中」，是个实时快照——不进长期画像，第二天没人记得你昨晚开过什么。",
  // step 2 — bundle_id
  "bundle_id 是 app 的唯一身份证，比如 com.microsoft.VSCode。我们要它，是因为光看名字会撞名，分类和白名单匹配必须用这个稳定 ID 才靠谱。和 active_app.name 同源，操作系统接口一起拿。仍然是实时快照，不入长期记忆。",
  // step 3 — is_fullscreen
  "is_fullscreen 是判断你这个 app 是不是占满整个屏幕——核心用法只有一个：全屏等于闭嘴。你在打 BOSS、看电影、做演示的时候，桌宠绝不能跳出来唠嗑。靠操作系统窗口接口加屏幕分辨率比对得出，纯公开 API，没有任何额外侵入。",
  // step 4 — idle_signal
  "idle_signal 是判断「你人还在不在电脑前」，分四档——正常、超 5 分钟、超 10 分钟、超 30 分钟没动作。三十秒查一次加状态变更立即推送。我们没有去监控具体输入了什么，只看键鼠静默时长。一旦判断你走了，桌宠就转待机，不再耗算力也不打扰。",
  // step 5 — app_switch_burst
  "app_switch_burst 看的是你最近五分钟有没有在频繁切窗口——切换次数过阈值就标 true。它的用处是识别「你在抓狂找东西」或者「在赶 deadline 多线程」这种高负载状态，桌宠看到这个信号会主动让路。纯时序统计，要进画像还得另外授权。",
];
