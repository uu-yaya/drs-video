# Video Outline · B 规格说明书风格

> **主题**：blueprint（蓝图）—— 深藏青底 + 青色 accent + IBM Plex Mono + 60px 蓝图网格 + 2px dashed rule
> **总时长**：约 9 分 12 秒（口播 ~2208 字 ÷ 4 字/秒 ≈ 552s）
> **章节数**：12 章 / 75 步
> **风格**：跟 DRS 文档自身结构 walkthrough，中性陈述，非"立场宣言"
> **信息保留度声明**：原文 article.md 共 5.9 万字符。本稿是核心叙事提炼版，**不是 60% 全文转写**；信息密度做到每章覆盖 1 个 DRS 章节段落。
> **note**：script 内说"8 个主题走一遍"是面向观众的语义块表达（边界 / 循环 / 13 模块 / 12 开关 / 7 画像子对象 + 元字段 / 角色相似度 / 数据契约），outline 12 章是开发实现单元（拆分以满足 OUTLINE-FORMAT.md 每章 3-8 step 推荐）。两个口径合规共存。

---

## 1. intro — DRS 是什么 + 全片预告（8 steps · ~33s）

**信息池**：

- 引用 - 文档职责陈述："本文件的职责是回答'桌宠需要什么数据'，即记忆系统应为桌宠体验提供哪些可采集、可整理、可查询、可删除、可更正的数据契约" —— 来源 article §1.1 L24
- 词义 - 文档全名：「数据需求规格说明书（DRS）— desktop-pet Memory Dataset」 —— 来源 article L1
- 数字 - 8 主题地图（语义块）：边界 / 五类循环 / 13 模块 / 12 开关 / 7 画像子对象 + 元字段 / 角色相似度 / 数据契约 —— 来源 article §2.1 / §2.2 / §1.2 / §1.3 / §3.10 / §3.13
- 词义 - 5 个动作（数据契约关键动词）：采集 / 整理 / 查询 / 删除 / 更正 —— 来源 article §1.1 L24

**开发计划**：

- step 1 (~2s) — 一句话立论："桌宠要懂用户"
- step 2 (~2s) — 立刻抛问："那它需要哪些数据？"
- step 3 (~3s) — 引入 DRS：「这份 DRS，回答这个问题」
- step 4 (~6s) — 文档全名展示
- step 5 (~2s) — 章节预告引子："8 个主题走一遍"
- step 6 (~5s) — 主题列举（前 4 块：边界 / 循环 / 13 模块 / 12 开关）
- step 7 (~6s) — 主题列举（后 4 块：7 子对象 + 元字段 / 角色相似度 / 数据契约）
- step 8 (~8s) — 5 个动作锚点：能采、能整理、能查询、能删除、能更正

口播节选：
> 桌宠要懂用户。那它需要哪些数据？这份 DRS，回答这个问题。

---

## 2. boundary-overview — 数据边界 4 类（8 steps · ~54s）

**信息池**：

- 数字 - 数据分 4 类边界：核心业务 / 授权增强 / 语义结果保留 / 禁止采集回写 —— 来源 article §1.2 L28-69
- 第 1 类（核心业务）：用户配置 / 首方游戏 / 首方对话 / 角色相似度结果 —— 来源 article §1.2.1 L32-37
- 第 1 类边界："用户最高优先级；大模型不能自动开启授权、改变删除策略或覆盖用户更正" —— 来源 article §1.2.1 L34
- 第 2 类（授权增强）：低敏 PC context / MCP app 信号 / VLM 画面理解 / 系统音频 / 产品内模型分析 —— 来源 article §1.2.2 L41-47
- 第 2 类边界："默认关闭或按场景最小启用" —— 来源 article §1.2.2 L43
- 第 3 类（语义结果保留）：VLM 前台画面 → 仅保留场景标签 / 系统音频 → 仅保留低敏语义 / 低敏 OS context → 仅保留派生统计 / MCP → 仅保留授权字段 / 模型分析 → 仅保留 schema 约束输出 —— 来源 article §1.2.3 L52-57
- 词义 - 派生语义示例：VLM 场景标签、active app 名、输入强度桶、app 摘要、画像项 —— 来源 article §1.2.3 各行 L52-57
- 词义 - 不保留的原始内容：原图、连续截图、后台全屏截图、原始音频、人声、转写、raw OS context、用户名、窗口全文、输入内容 —— 来源 article §1.2.3 各行 L52-57

**开发计划**：

- step 9 (~3s) — 章节开场："先讲数据边界，文档分 4 类"
- step 10 (~3s) — 第 1 类标题：核心业务数据
- step 11 (~10s) — 第 1 类内容 + 用户优先级最高
- step 12 (~7s) — 第 2 类标题：授权增强数据（默认全关 / 按场景启用）
- step 13 (~11s) — 第 2 类成员列举
- step 14 (~3s) — 第 3 类标题：语义结果保留边界
- step 15 (~6s) — 三个 "丢"：原图丢 / 原始音频丢 / raw OS context 丢
- step 16 (~11s) — 派生语义列举：VLM 场景标签 / active app / 输入强度桶 / app 摘要 / 画像项

口播节选：
> 先讲数据边界。文档把数据分成 4 类。第一类，核心业务数据 ⋯⋯ 第二类，授权增强数据 ⋯⋯ 第三类，语义结果保留边界 ⋯⋯

---

## 3. boundary-redlines — 5 条死禁红线 + VLM 锚点（6 steps · ~45s）

**信息池**：

- 数字 - 5 条死禁红线：Recall 截图 / 键盘 keylog / 第三方正文 / 原始截图音频 / 人声通话 —— 来源 article §1.2.4 L62-67
- 红线 1（Recall 截图）："不使用 Recall 作为数据源；不做后台持续全屏截图" —— 来源 article §1.2.4 L63
- 红线 2（键盘输入）："不记录按键字符、输入文本、keylog；只允许输入强度、节奏等低敏统计" —— 来源 article §1.2.4 L64
- 红线 3（第三方正文）："不读取、不长期保存、不进入画像；MCP 只允许授权 app 的白名单字段和通过来源校验的摘要" —— 来源 article §1.2.4 L65
- 红线 4（原始截图音频）："不进入长期记忆，不上传，不作为模型训练数据" —— 来源 article §1.2.4 L66
- 红线 5（人声通话）："不采集、不转写、不回写" —— 来源 article §1.2.4 L67
- VLM 锚点（双源补充）："只看当前授权游戏窗口；不存原图；语义标签例如 boss_fight、low_hp" —— 来源 article §3.7 L403
- 引用 - 边界落地立场：5 条不是承诺，是字段表里逐项落地 —— 来源 article §3.* 字段表各 source / 隐私边界列

**开发计划**：

- step 17 (~4s) — 第 4 类标题：禁止采集与回写
- step 18 (~14s) — 红线 1-3 一组（Recall / 键盘 / 第三方正文）
- step 19 (~15s) — 红线 4 原始截图音频 + VLM 锚点（boss_fight / low_hp 双源补充）
- step 20 (~5s) — 红线 5 人声通话
- step 21 (~2s) — 立 fact："这是 5 条死禁红线"
- step 22 (~5s) — 边界落地："不是承诺，是字段表里逐项落地"

口播节选：
> 第四类，最硬的——禁止采集与回写。⋯⋯ 原始截图、原始系统音频，不上传、不训练、不留帧日志。VLM 看屏幕，只吐语义标签——比如 boss_fight、low_hp。⋯⋯ 这是 5 条死禁红线。不是承诺，是字段表里逐项落地的边界。

---

## 4. loop — 五类数据循环（7 steps · ~76s）

**信息池**：

- 数字 - 五类数据循环：用户显式配置 / 记忆系统供给 / 桌宠侧实时生成 / 桌宠回写 / 不进入循环 —— 来源 article §1.3.1 表 L76-82
- 路径 1（用户配置）："基础称呼 / 桌宠关系偏好 / 打扰边界 / 内容偏好 / 授权开关 / 删除 / 清空 / 重新总结 / 用户更正 / 用户反馈" —— 来源 article §1.3.1 第 1 行 L78
- 路径 2（记忆系统供给）："用户画像 / 长期记忆 / 聊天摘要 / 游戏进度 / 成就 / 高光 / 授权上下文 / 来源与证据" —— 来源 article §1.3.1 第 2 行 L79
- 路径 2 边界："桌宠只能在授权范围内读取；每条可解释数据应能追溯来源或证据" —— 来源 article §1.3.1 第 2 行 L79
- 路径 3（桌宠实时生成）："实时对话 / 游戏建议 / 打扰判断 / 复盘草稿 / 日记草稿 / 当前上下文 / VLM 语义标签" —— 来源 article §1.3.1 第 3 行 L80
- 路径 3 默认不入记忆："默认只服务当前体验；需要长期引用时才进入回写" —— 来源 article §1.3.1 第 3 行 L80
- 路径 4（桌宠回写）："首方对话记录 / 用户反馈 / 用户更正 / AI 推断画像项 / 保存的日记/高光 / 角色相似度测定结果" —— 来源 article §1.3.1 第 4 行 L81
- 路径 4 强约束："回写必须带来源、时间、证据、授权快照或用户动作" —— 来源 article §1.3.1 第 4 行 L81
- 路径 5（不进循环）："原始截图 / 原始系统音频 / 人声内容 / 转写文本 / 通话会议内容 / 键盘输入 / 第三方聊天/邮件/文档正文 / raw OS context / 未授权 IP / 敏感业务信息" —— 来源 article §1.3.1 第 5 行 L82

**开发计划**：

- step 23 (~3s) — 章节过渡："讲完边界，讲数据循环"
- step 24 (~5s) — 立 fact："5 条路径"
- step 25 (~14s) — 路径 1 用户配置 + 优先级最高
- step 26 (~14s) — 路径 2 记忆系统供给 + 每条反查来源
- step 27 (~12s) — 路径 3 桌宠实时生成（默认不进记忆）
- step 28 (~15s) — 路径 4 回写 + 强约束（来源/时间/证据）
- step 29 (~15s) — 路径 5 不进循环 + 5 类反例

口播节选：
> 第一条，用户配置。⋯⋯ 第五条最重要——压根不进循环。原始截图、原始音频、按键内容、第三方正文、raw OS context。不采、不存、不回写。

---

## 5. modules — 13 个数据模块全景（8 steps · ~69s）

**信息池**：

- 数字 - 13 个数据模块全清单：chat / 行为-PC 进程 / 行为-UI 操作 / MCP / idip / 实时事件 / VLM / current_context / profile_meta / profile / highlight_event / user_preferences / 角色相似度 —— 来源 article §2.1 模块全景表 L102-114
- 词义 - P0 模块（首版最小数据闭环）：chat / PC 进程 / 行为 P0 子集 / idip P0 子集 / 实时事件 / current_context / profile_meta / profile 核心字段 / user_preferences 基础控制 —— 来源 article §2.3 L152
- 词义 - P1 模块（授权增强）：行为增强字段 / MCP / idip 增强字段 / VLM / profile 扩展字段 / highlight / user_preferences 增强 / 角色相似度 —— 来源 article §2.3 L153
- 引用 - 每个模块结构："每节结构：说明 / 字段表 / Schema 示例" —— 来源 article §3 引子 L159
- 词义 - 字段表通用列：字段名 / 字段 / 示例值 / 来源 / 产出方式 / 隐私边界 / 优先级 / 用途 —— 来源 article §3.x 各字段表

**开发计划**：

- step 30 (~3s) — 章节过渡："接下来是 13 个数据模块"
- step 31 (~8s) — 模块 1-4：chat / PC 进程 / UI 行为 / MCP
- step 32 (~6s) — 模块 5-7：idip / 实时事件 / VLM
- step 33 (~12s) — 模块 8-10：current_context / profile_meta / profile
- step 34 (~10s) — 模块 11-12：highlight_event / user_preferences
- step 35 (~12s) — 模块 13：game_character_similarity_assessment
- step 36 (~9s) — P0 / P1 优先级解释
- step 37 (~9s) — "每个模块都有完整字段表、字段语义、隐私边界、Schema 示例"

口播节选：
> chat 聊天数据、PC 进程行为、UI 行为操作、MCP app 信号。游戏 idip 状态、游戏实时事件、VLM 画面理解。⋯⋯ 13 个模块，分 P0 和 P1。

---

## 6. switches — 12 个用户开关 + 撤回追问（7 steps · ~48s）

**信息池**（**按 article §2.2 实际优先级：5 P0 + 6 P1 + 1 扩展**）：

- 数字 - 12 项用户开关与控制项：5 项 P0 + 6 项 P1 + 1 项扩展 —— 来源 article §2.2 L118-131
- P0 开关 5 项：聊天入长期记忆 / 游戏事件长期画像 / AI 推断画像项生成 / 记忆管理 / 基础陪伴偏好 —— 来源 article §2.2 L120-124
- P1 开关 6 项：行为数据画像 / 当前窗口画面理解 / 当前窗口界面文字读取 / MCP app 接入 / 日记和高光生成 / 角色相似度测定 —— 来源 article §2.2 L125-130
- 扩展开关 1 项：系统音频音乐 / 氛围感知 —— 来源 article §2.2 L131
- 引用 - 强约束："授权、删除、清空、重新总结和用户更正只能由用户触发；任何大模型或后台任务都不能默默开启授权或改变删除策略" —— 来源 article §1.3.2 第 7 条 L92
- 引用 - AI 严禁自动设置：profile_identity / pet_relationship / disturbance_boundaries / privacy_grants —— 来源 article §3.10 字段表 L548-550 + §3.12 L739
- 词义 - 撤回与删除分开：deletion_policy.delete_on_revoke = "ask / delete_now" —— 来源 article §3.12 字段表 L753

**开发计划**：

- step 38 (~4s) — 章节过渡："接下来是用户开关。一共 12 项"
- step 39 (~12s) — P0 5 项列举（拆 2 行：前 3 项 + 后 2 项）
- step 40 (~12s) — P1 6 项列举（拆 2 行：前 3 项 + 后 3 项）
- step 41 (~5s) — 扩展 1 项 + 默认关
- step 42 (~5s) — 反向规则：你不主动勾 / AI 不许自己开
- step 43 (~6s) — 撤回追问场景："要不要顺便删历史"
- step 44 (~5s) — 撤回 ≠ 删除分开表达

口播节选：
> 桌宠的 12 个数据开关。P0 5 项 ⋯⋯ P1 6 项 ⋯⋯ 你撤回授权，桌宠会再问一句。要不要顺便删历史？

---

## 7. profile-structure — 画像 7 子对象 + 现实人格红线（6 steps · ~55s）

**信息池**：

- 数字 - 7 个画像子对象：profile_identity / pet_relationship / game_profile / playstyle_profile / companion_profile / progress_profile / social_profile —— 来源 article §3.10 子对象表 L532-541
- 子对象用途简表：身份昵称 / 桌宠关系 / 游戏偏好 / 玩法风格 / 陪伴偏好 / 进度成就 / 社交偏好 —— 来源 article §3.10 L532-541 第 2 列
- 引用 - 现实人格红线："普通 profile 不存 personality_traits[]，不写'谨慎型人格 / 控制欲强 / 玻璃心'等现实人格判断" —— 来源 article §3.10 敏感推断边界 L668
- 引用 - 允许写的标签例子："游戏内行为偏好，如 steady_growth、objective_first、likes_story_mode" —— 来源 article §3.10 敏感推断边界 L669
- 引用 - 桌宠语气只读："桌宠语气、口癖和表达风格属于游戏 IP 固定设定，不进入用户画像" —— 来源 article §3.10 L529

**开发计划**：

- step 45 (~3s) — 章节过渡："接下来讲画像。7 个子对象"
- step 46 (~15s) — 7 子对象前 3：identity / pet_relationship / game_profile
- step 47 (~11s) — 7 子对象中 2：playstyle / companion
- step 48 (~10s) — 7 子对象后 2：progress / social
- step 49 (~9s) — 不写"现实人格"+ 3 反例（谨慎型 / 控制欲强 / 玻璃心）
- step 50 (~7s) — 正例："只写游戏内行为偏好" + 3 例（稳健发育 / 目标优先 / 团队支援）

口播节选：
> profile_identity 基础昵称、pet_relationship 桌宠关系 ⋯⋯ 7 类都不写"现实人格"。⋯⋯ 只写"游戏内行为偏好"。

---

## 8. profile-meta — profile_meta 元字段引入（5 steps · ~35s）

**信息池**：

- 词义 - profile_meta 4 核心字段：confidence / source_category / generation_method / evidence_ids —— 来源 article §3.9 字段表 L464-468
- 数字 - 4 个置信层级：high (0.8-1.0) / medium (0.5-0.79) / low (0.2-0.49) / blocked (0-0.19 或 is_active=false) —— 来源 article §3.9 Confidence 产品解释表 L486-490
- generation_method 3 枚举：user_set / system_record / inferred —— 来源 article §3.9 字段表 L466
- source_category 9 枚举：user_input / chat / game_event / idip / behavior / mcp / vlm / highlight / system —— 来源 article §3.9 字段表 L465

**开发计划**：

- step 51 (~7s) — 章节过渡："每条画像字段，都拖着一份 profile_meta 元字段"
- step 52 (~3s) — 立 fact："里面装四样核心字段"
- step 53 (~11s) — 字段 1 confidence + 4 档枚举
- step 54 (~5s) — 字段 2 source_category
- step 55 (~10s) — 字段 3 generation_method + 3 种枚举说明

口播节选：
> 每条画像字段，都拖着一份 profile_meta 元字段。里面装四样核心字段。⋯⋯ confidence 置信度，4 档——high、medium、low、blocked。

---

## 9. profile-meta-detail — 证据 + 时间 + 失效 + 用户更正锁（5 steps · ~42s）

**信息池**：

- 词义 - evidence_ids："AI / 规则推断画像项必须写入 evidence_ids；用户直接设置字段可为空或指向 user_action_id" —— 来源 article §3.9 字段表 L467
- 词义 - 时间戳：first_seen_at / last_confirmed_at —— 来源 article §3.9 字段表 L469-470
- 词义 - 失效记录：is_active + inactive_reason + inactive_at —— 来源 article §3.9 字段表 L471-473
- inactive_reason 枚举：user_deleted / user_rejected / user_replaced / expired / conflict_with_newer_evidence / null —— 来源 article §3.9 字段表 L472
- 案例 - 用户视角："你问桌宠'你凭啥说我爱稳健发育'，它得答得上来" —— 服务于 article §3.9 evidence_ids 设计意图 L467
- 词义 - 4 种用户更正合法动作："这不像 / 这不准 / 删除 / 重新总结 / 以后别这样记" —— 来源 article §3.10 L527 + §3.12 memory_controls.do_not_remember_rules L756
- 引用 - 用户更正锁定："用户更正后不得被自动覆盖" —— 来源 article §1.3.2 第 3 条 L88

**开发计划**：

- step 56 (~14s) — 字段 4 evidence_ids + 时间戳
- step 57 (~8s) — 失效记录 is_active + inactive_reason
- step 58 (~8s) — 用户视角问句："你凭啥说我爱稳健发育"+ 桌宠反查
- step 59 (~5s) — 核心规则金句："你改过的画像，AI 不再覆盖"
- step 60 (~8s) — 3 个合法用户动作（"这不像" / "这不准" / "以后别这样记"）

口播节选：
> evidence_ids 证据 ID 数组。⋯⋯ 为啥要存？你问桌宠："你凭啥说我爱稳健发育？" 它得答得上来。最关键一条——你改过的画像，AI 不再覆盖。

---

## 10. character — 角色相似度 6 维度（5 steps · ~26s）

**信息池**：

- 案例 - 卖点定位："核心卖点：告诉用户像哪个游戏角色，以及像在哪里" —— 来源 article §2.1 模块全景表 L114
- 引用 - UI 反装腔规则："UI 展示的不是'你 82% 像 TA'，而是'你在哪些角色特点上像 TA'" —— 来源 article §3.13 L804
- 引用 - 不是诊断："该能力不是现实人格诊断，也不是心理测试" —— 来源 article §3.13 L800
- 数字 - 6 个固定维度：playstyle / goal_orientation / progress_pattern / emotional_response / social_style / content_preference —— 来源 article §3.13 固定展示维度表 L832-837
- 维度中文名：玩法风格 / 游戏目标 / 成长路径 / 情绪反应 / 社交方式 / 内容偏好 —— 来源 article §3.13 表第 2 列 L832-837

**开发计划**：

- step 61 (~4s) — 章节过渡："最后一个模块，角色相似度测定"
- step 62 (~4s) — 一句话定位："桌宠告诉你，你像游戏里的哪个角色"
- step 63 (~8s) — 反 UI 装腔：不是 82% 像，是哪几个特点像
- step 64 (~2s) — 立 fact："6 个固定维度"
- step 65 (~8s) — 6 维度逐一展示

口播节选：
> 桌宠告诉你，你像游戏里的哪个角色。但不是"你 82% 像 TA"那种装腔。⋯⋯ 6 个固定维度。玩法风格、游戏目标、成长路径、情绪反应、社交方式、内容偏好。

---

## 11. character-judgment — 5 判定状态 + 默认关 + 不污染陪伴（6 steps · ~43s）

**信息池**：

- 数字 - 5 种判定状态：matched / not_matched / uncertain / insufficient_evidence / not_authorized —— 来源 article §3.13 判定标准 L843-849
- 状态分组：matched + not_matched 进总分；uncertain / insufficient_evidence / not_authorized 不进总分 —— 来源 article §3.13 表 L843-849
- 引用 - 未知不当作不符合："未授权不被当成'不符合'" —— 来源 article §3.13 判定标准 not_authorized 行 L849 + L848
- 引用 - 默认关："privacy_grants.character_similarity_assessment 默认 false；不做后台周期性测定" —— 来源 article §3.12 #5i L751
- 引用 - 测定授权颗粒："每次测定保留 consent snapshot；撤回授权后历史结果仍可解释，但不可新增测定" —— 来源 article §3.13 #4 consent_snapshot L872
- 引用 - 不污染陪伴："use_for_companion 默认 false；防止测定污染日常陪伴" —— 来源 article §3.13 字段表 #16 L884
- 案例 - 完整输出示例（"星轨导师"）：matched = playstyle + goal_orientation, unmatched = social_style, not_evaluable = content_preference —— 来源 article §3.13 Schema 示例 L891-961

**开发计划**：

- step 66 (~3s) — 立 fact："每个维度有 5 种判定状态"
- step 67 (~17s) — 5 种判定状态枚举
- step 68 (~6s) — 后三种不进总分 + "未授权 ≠ 不符合"
- step 69 (~8s) — 默认关 + 主动触发 + 不重测
- step 70 (~4s) — 测定结果默认不影响日常陪伴
- step 71 (~5s) — 单独开关 "用于陪伴策略" + 防污染

口播节选：
> 每个维度有 5 种判定状态。matched、not_matched、uncertain、insufficient_evidence、not_authorized。⋯⋯ 测出来的结果，默认不影响日常陪伴。

---

## 12. closing — 数据契约（4 steps · ~26s）

**信息池**：

- 引用 - 文档核心立场："任何字段、模型分析或回写结果都不能绕过用户授权、删除策略和用户更正" —— 来源 article §1.2 L28
- 引用 - 写入与更新原则第 1 条："用户显式配置、授权、删除、清空、重新总结、用户更正永远最高优先级" —— 来源 article §1.3.2 L86
- 词义 - 5 个动作（数据契约关键动词回扣 ch1）：采集 / 整理 / 查询 / 删除 / 更正 —— 来源 article §1.1 L24
- 词义 - 数据需求 + 数据契约的双命题 —— 来源 article §1.2 L28 + §4 L965-980

**开发计划**：

- step 72 (~1s) — 收尾过渡："讲完了"
- step 73 (~6s) — 回扣开场："DRS 回答的是一个问题——桌宠需要哪些数据"
- step 74 (~11s) — 答案：契约 + 不能绕过授权/删除/用户更正
- step 75 (~8s) — 5 动作回扣 + 双命题收口（数据需求 + 数据契约）

口播节选：
> DRS 回答的是一个问题——桌宠需要哪些数据。答案是一份契约。⋯⋯ 可采集、可整理、可查询、可删除、可更正。是数据需求，也是数据契约。

---

## 节奏说明（B 规格说明书风格豁免清单）

- **B 风格本质信息密集**：单 step 12-15s 是规格说明书叙事的合理节奏，对应 SCRIPT-STYLE.md "知乎视频"风格（5-7 秒/idea + 缓冲）
- **红线类 step（18-20）**：每条红线是完整断言，强调段适合慢一拍，承载 14-15s 合理
- **路径类 step（25-29）**：每路径承载 路径名 + 内容列举 + 关键约束 三层信息，12-15s 合理
- **5 枚举类 step（67）**：5 个英文枚举值（matched / not_matched / uncertain / insufficient_evidence / not_authorized）需呼吸节奏 ~17s
- step 估时累加（按字数 ÷ 4 字/秒精确算）：33 + 54 + 45 + 76 + 69 + 48 + 55 + 35 + 42 + 26 + 43 + 26 = **552s ≈ 9 分 12 秒**（与顶部声明精确一致）
- 含转场停顿实际录屏 ~10 分钟

---

## 素材清单

### 1. intro
- ⚠️ DRS 文档标识（mono："Data Requirement Specification · v1"）
- ⚠️ 8 主题预告的概念卡片墙（语义块名称 + 简短描述）

### 2. boundary-overview
- ⚠️ 4 类边界的层级图（核心 / 授权增强 / 语义保留 / 禁止采集）
- ⚠️ 5 个派生语义示例的 mono cue（VLM 场景标签 / active app 名 / 输入强度桶 / app 摘要 / 画像项）

### 3. boundary-redlines
- ⚠️ 5 红线序号卡（不放 Microsoft Recall 商标，只放文字"Recall 式"）
- ⚠️ VLM 锚点的语义标签 mono cue（boss_fight / low_hp）
- ⚠️ 字段表行例（展示"隐私边界"列）

### 4. loop
- ⚠️ 五条数据路径流向图（用户 ↔ 记忆系统 ↔ 桌宠，5 类区分）
- ⚠️ "压根不进循环"反例集（截图 / 音频 / 按键 / 第三方正文 / raw OS context）

### 5. modules
- ⚠️ 13 模块全景表（参考 article §2.1 表头：模块 / 数据方向 / 优先级 / 支持体验）
- ⚠️ P0 / P1 分组展示

### 6. switches
- ⚠️ 12 开关名 + 默认状态（5 P0 / 6 P1 / 1 扩展）
- ⚠️ 撤回追问 dialog 概念

### 7. profile-structure
- ⚠️ 7 子对象图谱 / 雷达 / 卡片（具体形式由章节实现决定）
- ⚠️ 3 反例（谨慎型 / 控制欲强 / 玻璃心）+ 3 正例（稳健发育 / 目标优先 / 团队支援）

### 8. profile-meta
- ⚠️ profile_meta 4 字段名（confidence / source_category / generation_method / evidence_ids）
- ⚠️ 4 置信层级 + 桌宠对话例（high → "我陪你稳一点" / medium → "我感觉你最近可能更想稳着打？"）

### 9. profile-meta-detail
- ⚠️ evidence_ids 反查示意（episode_xxx / game_event_xxx）
- ⚠️ inactive_reason 6 枚举展示
- ⚠️ 3 用户更正动作 mono cue

### 10. character
- ⚠️ 82% 反例 vs "在哪几个特点上像 TA"正例对照
- ⚠️ 6 维度展示

### 11. character-judgment
- ⚠️ 5 判定状态 + 进总分/不进总分分组
- ⚠️ "星轨导师" 完整输出示例

### 12. closing
- ⚠️ 5 动作回扣（采集 / 整理 / 查询 / 删除 / 更正）
- ⚠️ "数据需求 + 数据契约"双命题对位
