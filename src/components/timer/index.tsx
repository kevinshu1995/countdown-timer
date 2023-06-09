import { component$, useComputed$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";
import dayjs from "~/utils/dayjs";

export const useTimer = (countdownDate: string = "") => {
    const now = useSignal("");

    const updateTime$ = $(() => {
        now.value = dayjs().format();
    });

    const isValidate = useComputed$(() => {
        return dayjs(countdownDate, ["YYYY", "YYYY-MM-DD", "YYYY-MM-DD HH:mm:ss"], true).isValid();
    });

    const countdownTime = useComputed$(() => {
        const diff = dayjs(countdownDate).diff(dayjs(now.value));
        const t = !isValidate.value || diff < 0 ? 0 : diff;

        const d = dayjs.duration(t).format("YYYY,MM,DD,HH,mm,ss").split(",");
        return { year: d[0], month: d[1], day: d[2], hour: d[3], minute: d[4], second: d[5] };
    });

    useVisibleTask$(taskContext => {
        let animationFrame: any = null;
        function timer() {
            updateTime$();
            animationFrame = requestAnimationFrame(timer);
        }

        timer();

        taskContext.cleanup(() => window.cancelAnimationFrame(animationFrame));
    });

    return {
        now,
        countdownTime,
    };
};

// export const useCount

export const Timer = component$(() => {
    const { now, countdownTime } = useTimer("2023-06-09 19:00:00");

    return (
        <>
            <p>{now.value}</p>
            <p>{JSON.stringify(countdownTime.value)}</p>
        </>
    );
});

