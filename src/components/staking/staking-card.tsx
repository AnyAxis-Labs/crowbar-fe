import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconGradientBox, IconStaking } from "@/components/icons";
import SegmentedControl from "@/components/ui/segmented-control";
import { StakeForm } from "./stake-form";
import { UnstakeForm } from "./unstake-form";
import { ClaimRewardForm } from "./claim-reward-form";

enum FormMode {
  STAKE = "STAKE",
  UN_STAKE = "UN_STAKE",
  CLAIM = "CLAIM",
}

export function StakingCard() {
  const [formMode, setFormMode] = useState(FormMode.STAKE);

  return (
    <div className="container px-4 md:px-6 z-10 md:pb-20 isolate">
      <Card className="relative max-w-xl mx-auto bg-[rga(18, 18, 17, 1)] border-[1px] border-white/10 rounded-[40px] overflow-hidden">
        <div className="absolute top-0 right-0 select-none w-[250%] translate-x-1/2 -translate-y-1/2 rotate-[20deg] aspect-[3/1] bg-gradient-radial from-primary/30 to-50%" />
        <CardHeader className="gap-4 md:gap-10 items-center md:items-start">
          <div className="relative flex w-fit">
            <IconGradientBox className="w-[60px] h-[60px] md:w-[72px] md:h-[72px] text-primary" />
            <IconStaking className="w-7 h-7 md:w-8 md:h-8 text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <CardTitle className="text-2xl md:text-3xl font-bold text-white">Staking</CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <SegmentedControl
            value={formMode}
            onChange={(value) => setFormMode(value as FormMode)}
            className="w-fit mx-auto md:mx-0 mb-6"
            items={[
              { value: FormMode.STAKE, label: "Stake" },
              { value: FormMode.UN_STAKE, label: "Unstake" },
              { value: FormMode.CLAIM, label: "Claim" },
            ]}
          />
          {formMode === FormMode.STAKE && <StakeForm />}
          {formMode === FormMode.UN_STAKE && <UnstakeForm />}
          {formMode === FormMode.CLAIM && <ClaimRewardForm />}
        </CardContent>
      </Card>
    </div>
  );
}
