import { MaskReveal } from "../../components/MaskReveal";
import type { ChapterStepProps } from "../../registry/types";
import "./Closing.css";

export default function ClosingChapter({ step }: ChapterStepProps) {
  if (step === 0) {
    return (
      <div className="cl-scene scene-pad cl-center">
        <MaskReveal show duration={500}>
          <div className="cl-bye serif-cn">讲完了。</div>
        </MaskReveal>
        <div className="cl-bye-rule" />
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="cl-scene scene-pad cl-center">
        <div className="cl-q-kicker label-mono">// DRS 回答的</div>
        <h1 className="cl-q">
          <MaskReveal show duration={600}>
            <span className="cl-q-num display-en">1</span>
          </MaskReveal>
          <MaskReveal show delay={400} duration={500}>
            <span className="serif-cn"> 个问题——</span>
          </MaskReveal>
          <MaskReveal show delay={800} duration={600}>
            <span className="serif-cn cl-q-em">桌宠需要哪些数据</span>
          </MaskReveal>
        </h1>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="cl-scene scene-pad cl-center">
        <div className="cl-a-kicker label-mono">// 答案</div>
        <h1 className="cl-a">
          <MaskReveal show duration={600}>
            <span className="serif-cn">一份</span>
          </MaskReveal>
          <MaskReveal show delay={400} duration={600}>
            <span className="serif-cn cl-a-em">契约</span>
          </MaskReveal>
        </h1>
        <div className="cl-a-strap">
          <span className="cl-a-strap-tick" />
          <span className="cl-a-strap-text serif-cn">
            不能绕过 <span className="cl-a-strap-em">授权 · 删除 · 用户更正</span>
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="cl-scene scene-pad cl-final-scene">
      <div className="cl-actions">
        <FinalAction en="COLLECT" cn="采集" delay={0} />
        <FinalAction en="STRUCTURE" cn="整理" delay={200} />
        <FinalAction en="QUERY" cn="查询" delay={400} />
        <FinalAction en="DELETE" cn="删除" delay={600} />
        <FinalAction en="CORRECT" cn="更正" delay={800} />
      </div>
      <div className="cl-final-rule" />
      <div className="cl-twin">
        <div className="cl-twin-side">
          <span className="cl-twin-en display-en">REQUIREMENT</span>
          <span className="cl-twin-cn serif-cn">数据需求</span>
        </div>
        <div className="cl-twin-amp serif-cn">&</div>
        <div className="cl-twin-side">
          <span className="cl-twin-en display-en">CONTRACT</span>
          <span className="cl-twin-cn serif-cn cl-twin-cn-em">数据契约</span>
        </div>
      </div>
    </div>
  );
}

function FinalAction({ en, cn, delay }: { en: string; cn: string; delay: number }) {
  return (
    <div className="cl-action" style={{ animationDelay: `${delay}ms` }}>
      <div className="cl-action-en display-en">{en}</div>
      <div className="cl-action-cn serif-cn">{cn}</div>
    </div>
  );
}
