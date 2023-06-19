import { component$, type Signal, useComputed$ } from "@builder.io/qwik";
import { FlipClockCard } from "./SingleFlipCard";

interface FlipClockProps {
    time: Signal<{
        year: string;
        month: string;
        day: string;
        hour: string;
        minute: string;
        second: string;
    }>;
    animationDurationSec?: number;
    backgroundColor?: string;
}

const useFlipClockProps = ({ backgroundColor, animationDurationSec }: FlipClockProps) => {
    const bgColor = backgroundColor ?? "bg-white";
    const rootStyle = useComputed$(() => `--animation-duration-flip: ${animationDurationSec ?? 0.3}s`);
    return {
        bgColor,
        rootStyle,
    };
};

export const FlipClockYear = component$<FlipClockProps>(Props => {
    const { bgColor, rootStyle } = useFlipClockProps(Props);

    return (
        <div style={rootStyle}>
            <FlipClockCard extraClass={bgColor} time={Props.time.value.year} trimZero hideIfZero />
        </div>
    );
});

export const FlipClockMonth = component$<FlipClockProps>(Props => {
    const { bgColor, rootStyle } = useFlipClockProps(Props);

    return (
        <div style={rootStyle}>
            <FlipClockCard extraClass={bgColor} time={Props.time.value.month} trimZero hideIfZero />
        </div>
    );
});

export const FlipClockDay = component$<FlipClockProps>(Props => {
    const { bgColor, rootStyle } = useFlipClockProps(Props);

    return (
        <div style={rootStyle}>
            <FlipClockCard extraClass={bgColor} time={Props.time.value.day} />
        </div>
    );
});

export const FlipClockHour = component$<FlipClockProps>(Props => {
    const { bgColor, rootStyle } = useFlipClockProps(Props);

    return (
        <div style={rootStyle}>
            <FlipClockCard extraClass={bgColor} time={Props.time.value.hour} />
        </div>
    );
});

export const FlipClockMinute = component$<FlipClockProps>(Props => {
    const { bgColor, rootStyle } = useFlipClockProps(Props);

    return (
        <div style={rootStyle}>
            <FlipClockCard extraClass={bgColor} time={Props.time.value.minute} />
        </div>
    );
});

export const FlipClockSecond = component$<FlipClockProps>(Props => {
    const { bgColor, rootStyle } = useFlipClockProps(Props);

    return (
        <div style={rootStyle}>
            <FlipClockCard extraClass={bgColor} time={Props.time.value.second} />
        </div>
    );
});

