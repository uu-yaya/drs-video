import { MaskReveal } from "../../components/MaskReveal";
import type { ChapterStepProps } from "../../registry/types";
import "./Intro.css";

export default function IntroChapter({ step }: ChapterStepProps) {
  /* step 0 — 一句话立论 */
  if (step === 0) {
    return (
      <div className="in-scene scene-pad in-center">
        <h1 className="in-prop">
          <MaskReveal show duration={400}>
            <span className="serif-cn">桌</span>
          </MaskReveal>
          <MaskReveal show delay={120} duration={400}>
            <span className="serif-cn">宠</span>
          </MaskReveal>
          <MaskReveal show delay={240} duration={400}>
            <span className="serif-cn">要</span>
          </MaskReveal>
          <MaskReveal show delay={360} duration={400}>
            <span className="serif-cn">懂</span>
          </MaskReveal>
          <MaskReveal show delay={480} duration={400}>
            <span className="serif-cn in-prop-em">用户</span>
          </MaskReveal>
        </h1>
        <div className="in-prop-tick" />
      </div>
    );
  }

  /* step 1 — 抛问 */
  if (step === 1) {
    return (
      <div className="in-scene scene-pad in-center">
        <div className="in-ghost serif-cn">桌宠要懂用户。</div>
        <h1 className="in-question">
          <MaskReveal show delay={300} duration={600}>
            <span className="serif-cn">那它需要</span>
          </MaskReveal>
          <MaskReveal show delay={700} duration={600}>
            <span className="serif-cn in-question-em">哪些数据？</span>
          </MaskReveal>
        </h1>
      </div>
    );
  }

  /* step 2 — DRS as answer */
  if (step === 2) {
    return (
      <div className="in-scene scene-pad in-center">
        <div className="in-answer-kicker label-mono">// THE ANSWER</div>
        <h1 className="in-answer">
          <MaskReveal show duration={700}>
            <span className="serif-cn">这份 </span>
          </MaskReveal>
          <MaskReveal show delay={500} duration={700}>
            <span className="in-answer-drs">DRS</span>
          </MaskReveal>
          <MaskReveal show delay={1000} duration={700}>
            <span className="serif-cn">，回答这个问题。</span>
          </MaskReveal>
        </h1>
      </div>
    );
  }

  /* step 3 — full document title (blueprint document card) */
  if (step === 3) {
    return (
      <div className="in-scene scene-pad in-center">
        <div className="in-doc">
          <div className="in-doc-corners">
            <span className="in-doc-corner in-doc-corner-tl" />
            <span className="in-doc-corner in-doc-corner-tr" />
            <span className="in-doc-corner in-doc-corner-bl" />
            <span className="in-doc-corner in-doc-corner-br" />
          </div>
          <div className="in-doc-meta label-mono">DATA REQUIREMENT SPECIFICATION · v1</div>
          <MaskReveal show duration={700}>
            <div className="in-doc-en display-en">desktop-pet</div>
          </MaskReveal>
          <MaskReveal show delay={400} duration={700}>
            <div className="in-doc-cn serif-cn">数据需求规格说明书</div>
          </MaskReveal>
          <div className="in-doc-rule" />
          <div className="in-doc-tag label-mono">SCOPE · Memory Dataset</div>
        </div>
      </div>
    );
  }

  /* step 4 — preview entry */
  if (step === 4) {
    return (
      <div className="in-scene scene-pad in-center">
        <div className="in-preview-kicker label-mono">// WALKTHROUGH</div>
        <MaskReveal show duration={600}>
          <h1 className="in-preview serif-cn">
            <span className="in-preview-num">8</span> 个主题走一遍
          </h1>
        </MaskReveal>
      </div>
    );
  }

  /* step 5 — topics 1-4 */
  if (step === 5) {
    return (
      <div className="in-scene scene-pad in-topics-scene">
        <div className="in-topics-kicker label-mono">// TOPICS · 1—4</div>
        <div className="in-topics">
          <TopicCard num="01" en="BOUNDARY" cn="数据边界" delay={0} />
          <TopicCard num="02" en="LOOP" cn="五类循环" delay={300} />
          <TopicCard num="03" en="MODULES · 13" cn="数据模块" delay={600} />
          <TopicCard num="04" en="SWITCHES · 12" cn="用户开关" delay={900} />
        </div>
      </div>
    );
  }

  /* step 6 — topics 5-8 */
  if (step === 6) {
    return (
      <div className="in-scene scene-pad in-topics-scene">
        <div className="in-topics-kicker label-mono">// TOPICS · 5—8</div>
        <div className="in-topics">
          <TopicCard num="05" en="PROFILE · 7" cn="画像子对象" delay={0} />
          <TopicCard num="06" en="META" cn="元字段" delay={300} />
          <TopicCard num="07" en="SIMILARITY" cn="角色相似度" delay={600} />
          <TopicCard num="08" en="CONTRACT" cn="数据契约" delay={900} />
        </div>
      </div>
    );
  }

  /* step 7 — 5 actions (final) */
  return (
    <div className="in-scene scene-pad in-actions-scene">
      <div className="in-actions-kicker label-mono">// 5 ACTIONS · 同一组动作</div>
      <div className="in-actions">
        <ActionItem en="COLLECT" cn="采集" delay={0} />
        <ActionItem en="STRUCTURE" cn="整理" delay={300} />
        <ActionItem en="QUERY" cn="查询" delay={600} />
        <ActionItem en="DELETE" cn="删除" delay={900} />
        <ActionItem en="CORRECT" cn="更正" delay={1200} />
      </div>
      <div className="in-actions-rule" />
    </div>
  );
}

interface TopicCardProps {
  num: string;
  en: string;
  cn: string;
  delay: number;
}

function TopicCard({ num, en, cn, delay }: TopicCardProps) {
  return (
    <div
      className="in-topic"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="in-topic-num label-mono">{num}</div>
      <div className="in-topic-en display-en">{en}</div>
      <div className="in-topic-cn serif-cn">{cn}</div>
      <div className="in-topic-tick" />
    </div>
  );
}

interface ActionItemProps {
  en: string;
  cn: string;
  delay: number;
}

function ActionItem({ en, cn, delay }: ActionItemProps) {
  return (
    <div
      className="in-action"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="in-action-en display-en">{en}</div>
      <div className="in-action-cn serif-cn">{cn}</div>
    </div>
  );
}
