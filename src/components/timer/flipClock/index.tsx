import { component$, type Signal, useComputed$, Slot } from "@builder.io/qwik";
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

interface FlipClockContainerProps {
    timeText: string;
    rootStyle: Readonly<Signal<string>>;
}

const FlipClockContainer = component$<FlipClockContainerProps>(Props => {
    return (
        <div style={Props.rootStyle} class="flex flex-col space-y-4 px-2">
            <Slot name="flipClock" />
            <span>{Props.timeText}</span>
        </div>
    );
});

export const FlipClockYear = component$<FlipClockProps>(Props => {
    const { bgColor, rootStyle } = useFlipClockProps(Props);

    return (
        <FlipClockContainer timeText="Years" rootStyle={rootStyle}>
            <div q:slot="flipClock">
                <FlipClockCard extraClass={bgColor} time={Props.time.value.year} />
            </div>
        </FlipClockContainer>
    );
});

export const FlipClockMonth = component$<FlipClockProps>(Props => {
    const { bgColor, rootStyle } = useFlipClockProps(Props);

    return (
        <FlipClockContainer timeText="Months" rootStyle={rootStyle}>
            <div q:slot="flipClock">
                <FlipClockCard extraClass={bgColor} time={Props.time.value.month} />
            </div>
        </FlipClockContainer>
    );
});

export const FlipClockDay = component$<FlipClockProps>(Props => {
    const { bgColor, rootStyle } = useFlipClockProps(Props);

    return (
        <FlipClockContainer timeText="Days" rootStyle={rootStyle}>
            <div q:slot="flipClock">
                <FlipClockCard extraClass={bgColor} time={Props.time.value.day} />
            </div>
        </FlipClockContainer>
    );
});

export const FlipClockHour = component$<FlipClockProps>(Props => {
    const { bgColor, rootStyle } = useFlipClockProps(Props);

    return (
        <FlipClockContainer timeText="Hours" rootStyle={rootStyle}>
            <div q:slot="flipClock">
                <FlipClockCard extraClass={bgColor} time={Props.time.value.hour} />
            </div>
        </FlipClockContainer>
    );
});

export const FlipClockMinute = component$<FlipClockProps>(Props => {
    const { bgColor, rootStyle } = useFlipClockProps(Props);

    return (
        <FlipClockContainer timeText="Minutes" rootStyle={rootStyle}>
            <div q:slot="flipClock">
                <FlipClockCard extraClass={bgColor} time={Props.time.value.minute} />
            </div>
        </FlipClockContainer>
    );
});

export const FlipClockSecond = component$<FlipClockProps>(Props => {
    const { bgColor, rootStyle } = useFlipClockProps(Props);

    return (
        <FlipClockContainer timeText="Seconds" rootStyle={rootStyle}>
            <div q:slot="flipClock">
                <FlipClockCard extraClass={bgColor} time={Props.time.value.second} />
            </div>
        </FlipClockContainer>
    );
});

