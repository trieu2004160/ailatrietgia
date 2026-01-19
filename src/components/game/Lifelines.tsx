import { Users, Percent, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

interface LifelinesProps {
  fiftyFifty: boolean;
  askAudience: boolean;
  askExpert: boolean;
  onUseFiftyFifty: () => void;
  onUseAskAudience: () => void;
  onUseAskExpert: () => void;
  disabled: boolean;
}

const Lifelines = ({
  fiftyFifty,
  askAudience,
  askExpert,
  onUseFiftyFifty,
  onUseAskAudience,
  onUseAskExpert,
  disabled,
}: LifelinesProps) => {
  return (
    <div className="flex justify-center gap-4 md:gap-6">
      <button
        onClick={onUseFiftyFifty}
        disabled={!fiftyFifty || disabled}
        className={cn("lifeline-btn", !fiftyFifty && "opacity-30")}
        title="50:50 - Loại bỏ 2 đáp án sai"
      >
        <Percent className="w-6 h-6 text-primary" />
      </button>

      <button
        onClick={onUseAskAudience}
        disabled={!askAudience || disabled}
        className={cn("lifeline-btn", !askAudience && "opacity-30")}
        title="Hỏi ý kiến khán giả"
      >
        <Users className="w-6 h-6 text-primary" />
      </button>

      <button
        onClick={onUseAskExpert}
        disabled={!askExpert || disabled}
        className={cn("lifeline-btn", !askExpert && "opacity-30")}
        title="Hỏi nhà thông thái"
      >
        <GraduationCap className="w-6 h-6 text-primary" />
      </button>
    </div>
  );
};

export default Lifelines;
