import type { ChapterDef } from "./types";

import IntroChapter from "../chapters/01-intro/Intro";
import { narrations as introN } from "../chapters/01-intro/narrations";

import BoundaryOverviewChapter from "../chapters/02-boundary-overview/BoundaryOverview";
import { narrations as boundaryOverviewN } from "../chapters/02-boundary-overview/narrations";

import BoundaryRedlinesChapter from "../chapters/03-boundary-redlines/BoundaryRedlines";
import { narrations as boundaryRedlinesN } from "../chapters/03-boundary-redlines/narrations";

import LoopChapter from "../chapters/04-loop/Loop";
import { narrations as loopN } from "../chapters/04-loop/narrations";

import ModulesChapter from "../chapters/05-modules/Modules";
import { narrations as modulesN } from "../chapters/05-modules/narrations";

import SwitchesChapter from "../chapters/06-switches/Switches";
import { narrations as switchesN } from "../chapters/06-switches/narrations";

import ProfileStructureChapter from "../chapters/07-profile-structure/ProfileStructure";
import { narrations as profileStructureN } from "../chapters/07-profile-structure/narrations";

import ProfileMetaChapter from "../chapters/08-profile-meta/ProfileMeta";
import { narrations as profileMetaN } from "../chapters/08-profile-meta/narrations";

import ProfileMetaDetailChapter from "../chapters/09-profile-meta-detail/ProfileMetaDetail";
import { narrations as profileMetaDetailN } from "../chapters/09-profile-meta-detail/narrations";

import CharacterChapter from "../chapters/10-character/Character";
import { narrations as characterN } from "../chapters/10-character/narrations";

import CharacterJudgmentChapter from "../chapters/11-character-judgment/CharacterJudgment";
import { narrations as characterJudgmentN } from "../chapters/11-character-judgment/narrations";

import ClosingChapter from "../chapters/12-closing/Closing";
import { narrations as closingN } from "../chapters/12-closing/narrations";

import FieldsChatChapter from "../chapters/13-fields-chat/FieldsChat";
import { narrations as fChatN } from "../chapters/13-fields-chat/narrations";

import FieldsPCChapter from "../chapters/14-fields-pc/FieldsPC";
import { narrations as fPcN } from "../chapters/14-fields-pc/narrations";

import FieldsBehavior1Chapter from "../chapters/15-fields-behavior-1/FieldsBehavior1";
import { narrations as fB1N } from "../chapters/15-fields-behavior-1/narrations";

import FieldsBehavior2Chapter from "../chapters/16-fields-behavior-2/FieldsBehavior2";
import { narrations as fB2N } from "../chapters/16-fields-behavior-2/narrations";

import FieldsMCPChapter from "../chapters/17-fields-mcp/FieldsMCP";
import { narrations as fMcpN } from "../chapters/17-fields-mcp/narrations";

import FieldsIdipChapter from "../chapters/18-fields-idip/FieldsIdip";
import { narrations as fIdipN } from "../chapters/18-fields-idip/narrations";

import FieldsGameEventChapter from "../chapters/19-fields-game-event/FieldsGameEvent";
import { narrations as fGeN } from "../chapters/19-fields-game-event/narrations";

import FieldsVlmChapter from "../chapters/20-fields-vlm/FieldsVlm";
import { narrations as fVlmN } from "../chapters/20-fields-vlm/narrations";

import FieldsContextChapter from "../chapters/21-fields-context/FieldsContext";
import { narrations as fCtxN } from "../chapters/21-fields-context/narrations";

import FieldsMetaDetailChapter from "../chapters/22-fields-meta-detail/FieldsMetaDetail";
import { narrations as fMdN } from "../chapters/22-fields-meta-detail/narrations";

import FieldsHighlight1Chapter from "../chapters/23-fields-highlight-1/FieldsHighlight1";
import { narrations as fH1N } from "../chapters/23-fields-highlight-1/narrations";

import FieldsHighlight2Chapter from "../chapters/24-fields-highlight-2/FieldsHighlight2";
import { narrations as fH2N } from "../chapters/24-fields-highlight-2/narrations";

import FieldsPrefs1Chapter from "../chapters/25-fields-prefs-1/FieldsPrefs1";
import { narrations as fPr1N } from "../chapters/25-fields-prefs-1/narrations";

import FieldsPrefs2Chapter from "../chapters/26-fields-prefs-2/FieldsPrefs2";
import { narrations as fPr2N } from "../chapters/26-fields-prefs-2/narrations";

import FieldsSimilarity1Chapter from "../chapters/27-fields-similarity-1/FieldsSimilarity1";
import { narrations as fSm1N } from "../chapters/27-fields-similarity-1/narrations";

import FieldsSimilarity2Chapter from "../chapters/28-fields-similarity-2/FieldsSimilarity2";
import { narrations as fSm2N } from "../chapters/28-fields-similarity-2/narrations";

/**
 * Chapter order = article DRS section order
 *
 * 01 intro                        — preamble
 * 02 boundary-overview            — §1.2 boundary 4 types
 * 03 boundary-redlines            — §1.2.4 redlines
 * 04 loop                         — §1.3.1 5 paths
 * 05 modules                      — §2.1 13 modules
 * 06 switches                     — §2.2 12 switches
 * 07 fields-chat                  — §3.1 chat
 * 08 fields-pc                    — §3.2 PC behavior
 * 09 fields-behavior-1            — §3.3a behavior fields A
 * 10 fields-behavior-2            — §3.3b behavior fields B
 * 11 fields-mcp                   — §3.4 MCP
 * 12 fields-idip                  — §3.5 idip
 * 13 fields-game-event            — §3.6 realtime events
 * 14 fields-vlm                   — §3.7 VLM
 * 15 fields-context               — §3.8 current_context
 * 16 profile-meta                 — §3.9 profile_meta 4 core
 * 17 fields-meta-detail           — §3.9 profile_meta lifecycle
 * 18 profile-structure            — §3.10 7 sub-objects
 * 19 profile-meta-detail (AI matrix) — §3.10 AI write matrix
 * 20 fields-highlight-1           — §3.11a highlight A
 * 21 fields-highlight-2           — §3.11b highlight B
 * 22 fields-prefs-1               — §3.12a prefs A
 * 23 fields-prefs-2               — §3.12b prefs B
 * 24 character                    — §3.13 6 dimensions
 * 25 character-judgment           — §3.13 5 statuses
 * 26 fields-similarity-1          — §3.13a similarity A
 * 27 fields-similarity-2          — §3.13b similarity B
 * 28 closing                      — contract
 */
export const CHAPTERS: ChapterDef[] = [
  { id: "intro", title: "DRS 是什么 + 全片预告", narrations: introN, Component: IntroChapter },
  { id: "boundary-overview", title: "§1.2 数据边界 4 类", narrations: boundaryOverviewN, Component: BoundaryOverviewChapter },
  { id: "boundary-redlines", title: "§1.2.4 5 条死禁红线", narrations: boundaryRedlinesN, Component: BoundaryRedlinesChapter },
  { id: "loop", title: "§1.3.1 五类数据循环", narrations: loopN, Component: LoopChapter },
  { id: "modules", title: "§2.1 13 个数据模块", narrations: modulesN, Component: ModulesChapter },
  { id: "switches", title: "§2.2 12 项用户开关", narrations: switchesN, Component: SwitchesChapter },
  { id: "fields-chat", title: "§3.1 chat 字段表", narrations: fChatN, Component: FieldsChatChapter },
  { id: "fields-pc", title: "§3.2 PC 进程字段表", narrations: fPcN, Component: FieldsPCChapter },
  { id: "fields-behavior-1", title: "§3.3a 行为字段 · 上半", narrations: fB1N, Component: FieldsBehavior1Chapter },
  { id: "fields-behavior-2", title: "§3.3b 行为字段 · 下半", narrations: fB2N, Component: FieldsBehavior2Chapter },
  { id: "fields-mcp", title: "§3.4 MCP 字段表", narrations: fMcpN, Component: FieldsMCPChapter },
  { id: "fields-idip", title: "§3.5 idip 字段表", narrations: fIdipN, Component: FieldsIdipChapter },
  { id: "fields-game-event", title: "§3.6 实时事件字段表", narrations: fGeN, Component: FieldsGameEventChapter },
  { id: "fields-vlm", title: "§3.7 VLM 字段表", narrations: fVlmN, Component: FieldsVlmChapter },
  { id: "fields-context", title: "§3.8 current_context 字段表", narrations: fCtxN, Component: FieldsContextChapter },
  { id: "profile-meta", title: "§3.9 profile_meta 4 核心", narrations: profileMetaN, Component: ProfileMetaChapter },
  { id: "fields-meta-detail", title: "§3.9 profile_meta 生命周期", narrations: fMdN, Component: FieldsMetaDetailChapter },
  { id: "profile-structure", title: "§3.10 画像 7 子对象", narrations: profileStructureN, Component: ProfileStructureChapter },
  { id: "profile-meta-detail", title: "§3.10 AI 写入权限矩阵", narrations: profileMetaDetailN, Component: ProfileMetaDetailChapter },
  { id: "fields-highlight-1", title: "§3.11a 高光字段 · 上半", narrations: fH1N, Component: FieldsHighlight1Chapter },
  { id: "fields-highlight-2", title: "§3.11b 高光字段 · 下半", narrations: fH2N, Component: FieldsHighlight2Chapter },
  { id: "fields-prefs-1", title: "§3.12a 用户偏好 · 上半", narrations: fPr1N, Component: FieldsPrefs1Chapter },
  { id: "fields-prefs-2", title: "§3.12b 用户偏好 · 下半", narrations: fPr2N, Component: FieldsPrefs2Chapter },
  { id: "character", title: "§3.13 角色相似度 6 维度", narrations: characterN, Component: CharacterChapter },
  { id: "character-judgment", title: "§3.13 5 种判定状态", narrations: characterJudgmentN, Component: CharacterJudgmentChapter },
  { id: "fields-similarity-1", title: "§3.13a 角色相似度字段 · 上半", narrations: fSm1N, Component: FieldsSimilarity1Chapter },
  { id: "fields-similarity-2", title: "§3.13b 角色相似度字段 · 下半", narrations: fSm2N, Component: FieldsSimilarity2Chapter },
  { id: "closing", title: "数据契约", narrations: closingN, Component: ClosingChapter },
];
