import { component$ } from "@builder.io/qwik";
import { useCountdownTimer } from "./useCountdownTimer";

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

    return (
        <>
            now:
            <p>{now.value}</p>
            <br />
            isValidate:
            <p>{isValidate.value + ""}</p>
            <br />
            isTimeUp:
            <p>{isTimeUp.value + ""}</p>
            <br />
            countdownTime:
            <p>{countdownTime.value}</p>
            <br />
            countdownTimeObject:
            <p>{JSON.stringify(countdownTimeObject.value)}</p>
        </>
    );
});

