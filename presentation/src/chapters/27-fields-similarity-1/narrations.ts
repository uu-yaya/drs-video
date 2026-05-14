import type { Narration } from "../../registry/types";

export const narrations: Narration[] = [
  "角色相似度上半 10 个字段管的是「这次测定是怎么发生的、结果是什么」——测定 ID、角色体系版本、输入范围、授权快照、证据类型、状态、最相似角色 ID 和名字、相似度分数、命中特点。每次测定都是一次完整的可审计快照。",
  "assessment_id 是这次测定的唯一 ID。它的关键不是 UUID 本身，而是「一次测定一条」——每次用户主动触发就生成一个新的，老的不覆盖。这样后面用户回看「我之前那次测出来是什么」我们还能反查到。",
  "taxonomy_version 解决一个尴尬场景——半年后角色体系更新了，老的测定结果还能不能讲？我们记下当时用的是哪个版本，比如 public_character_taxonomy_v1.2。版本对得上就讲，对不上就标过期。内部代号、未授权 IP 一律不许出现。",
  "input_scope 记的是这次测定实际进了哪些数据源——profile、game_event、chat、chat_derived、vlm 各自有没有用。授权一裁、is_active=false 一过滤，剩下的才进来。后面用户问「你凭什么说我像 TA」，掀开这条就能答。",
  "consent_snapshot 是测定那一刻的授权快照——profile_inference、character_similarity 这些当时是不是开的，全冻在这里。这样即使后来用户撤了授权，历史结果还能继续解释；但要新测，必须重新走授权流程。",
  "allowed_evidence_types_used 是实际用上的证据类型——playstyle_profile、game_event、highlight_event 之类。它怎么来的？把角色 trait 的配置和本次授权做个交集，剩下的就是这次能用的。只记类型不记原文。",
  "assessment_status 是这次测定的结局——completed、insufficient_authorization、insufficient_evidence 三选一。我们故意把「没授权」和「证据不够」拆开，原因是给用户两种不同的补救路径：要么去开授权，要么先多玩几局。",
  "matched_character_id 是最相似角色的 ID，比如 mage_mentor。大模型基于授权数据返回，必须来自当前体系内的可展示角色，不许出现内部代号。如果 status 不是 completed，这条直接为 null，不冒充给一个角色。",
  "matched_character_name 是给 UI 展示的角色名，比如「星轨导师」，和 ID 配对。这条字段唯一的硬约束就是——只能展示授权可对外的角色名，没拿到 IP 授权的内部命名一个字都不许漏出来。未完成时同样为 null。",
  "similarity_score 是加权命中率，0 到 1 的分数。算法是把可判断 traits 各自的 match_score 乘上 weight 加起来。但我们专门写了一行设计原则——这不是人格分数，UI 上甚至可以不展示数字，只用来做内部排序和稳定性兜底。",
  "matched_traits 是 UI 主展示的「你像 TA 的地方」。只装 match_status=matched 的那些 trait，每条必须挂 evidence_ids。这是我们最在乎的一件事——所有「你像」的话都得能反查回具体证据，不能是空口大话。",
];
