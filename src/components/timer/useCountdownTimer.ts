import { useComputed$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";
import dayjs from "~/utils/dayjs";

export const useCountdownTimer = (countdownDate: string = "") => {
    const now = useSignal("");
    const isTimeUp = useSignal(true);
    const availableCountdownTimeFormat = ["YYYY", "YYYY-MM-DD", "YYYY-MM-DD HH:mm:ss"];

    const updateTime = $(() => {
        now.value = dayjs().format();
    });

    const isValidate = useComputed$(() => {
        return dayjs(countdownDate, availableCountdownTimeFormat, true).isValid();
    });

    const countdownTime = useComputed$(() => {
        const diff = dayjs(countdownDate).diff(dayjs(now.value));
        isTimeUp.value = diff < 0;

        return diff;
    });

    const countdownTimeObject = useComputed$(() => {
        const t = !isValidate.value || isTimeUp.value ? 0 : countdownTime.value;

        const d = dayjs.duration(t).format("YYYY,MM,DD,HH,mm,ss").split(",");
        return { year: d[0], month: d[1], day: d[2], hour: d[3], minute: d[4], second: d[5] };
    });

    useVisibleTask$(taskContext => {
        let animationFrame: any = null;
        function timer() {
            updateTime();
            animationFrame = requestAnimationFrame(timer);
        }
        timer();

        taskContext.cleanup(() => window.cancelAnimationFrame(animationFrame));
    });

    return {
        now,
        countdownTime,
        countdownTimeObject,

        isValidate,
        isTimeUp,
    };
};

