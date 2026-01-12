import { Phone, Users, Percent } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LifelinesProps {
  fiftyFifty: boolean;
  phoneAFriend: boolean;
  askAudience: boolean;
  onUseFiftyFifty: () => void;
  onUsePhoneAFriend: () => void;
  onUseAskAudience: () => void;
  disabled: boolean;
}

const Lifelines = ({
  fiftyFifty,
  phoneAFriend,
  askAudience,
  onUseFiftyFifty,
  onUsePhoneAFriend,
  onUseAskAudience,
  disabled
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
        onClick={onUsePhoneAFriend}
        disabled={!phoneAFriend || disabled}
        className={cn("lifeline-btn", !phoneAFriend && "opacity-30")}
        title="Gọi điện cho người thân"
      >
        <Phone className="w-6 h-6 text-primary" />
      </button>
      
      <button
        onClick={onUseAskAudience}
        disabled={!askAudience || disabled}
        className={cn("lifeline-btn", !askAudience && "opacity-30")}
        title="Hỏi ý kiến khán giả"
      >
        <Users className="w-6 h-6 text-primary" />
      </button>
    </div>
  );
};

export default Lifelines;
