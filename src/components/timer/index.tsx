import { component$, useComputed$ } from "@builder.io/qwik";
import { useCountdownTimer } from "./useCountdownTimer";
import { FlipClockYear, FlipClockMonth, FlipClockDay, FlipClockHour, FlipClockMinute, FlipClockSecond } from "./flipClock";

interface CountdownTimerProps {
    countdownTime: string;
}

export const CountdownTimer = component$<CountdownTimerProps>(Props => {
    const {
        now,
        countdownTime,
        countdownTimeObject,

        isValidate,
        isTimeUp,
    } = useCountdownTimer(Props.countdownTime);

    const timeDisplay = useComputed$(() => {
        return JSON.stringify({ now: now.value, isValidate: isValidate.value, isTimeUp: isTimeUp.value, countdownTime: countdownTime.value }, null, "  ");
    });
    const config = {
        bgColor: "bg-white",
        animationDuration: 0.5,
    };

    return (
        <>
            <pre>{timeDisplay.value}</pre>
            <hr />
            <div class="flex space-x-4">
                <div class="flex space-x-2">
                    <FlipClockYear time={countdownTimeObject} animationDurationSec={config.animationDuration} backgroundColor={config.bgColor} />
                    <FlipClockMonth time={countdownTimeObject} animationDurationSec={config.animationDuration} backgroundColor={config.bgColor} />
                    <FlipClockDay time={countdownTimeObject} animationDurationSec={config.animationDuration} backgroundColor={config.bgColor} />
                </div>
                <div class="flex space-x-2">
                    <FlipClockHour time={countdownTimeObject} animationDurationSec={config.animationDuration} backgroundColor={config.bgColor} />
                    <FlipClockMinute time={countdownTimeObject} animationDurationSec={config.animationDuration} backgroundColor={config.bgColor} />
                    <FlipClockSecond time={countdownTimeObject} animationDurationSec={config.animationDuration} backgroundColor={config.bgColor} />
                </div>
            </div>
        </>
    );
});

