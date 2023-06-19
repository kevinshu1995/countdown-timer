import { component$, useSignal, useComputed$, useStylesScoped$, $, type Signal, useOn, useTask$ } from "@builder.io/qwik";
import { isServer } from "@builder.io/qwik/build";

const useClipPathClass = () => {
    useStylesScoped$(`
        .clip-top-half {
            clip-path: polygon(0 50%, 100% 50%, 100% 100%, 0 100%);
        }
        .clip-bottom-half {
            clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%)
        }
    `);
};

interface FlipItemProps {
    digit: Signal<string>;
    animateName: string;
    displayPart: "top" | "bottom";
    isFlipping?: Signal<boolean>;
    extraClass?: string;
}

export const HalfFlipCard = component$<FlipItemProps>(Props => {
    useClipPathClass();
    const prevValue = useSignal("");
    const displayValue = useComputed$(() => (Props.displayPart === "top" ? prevValue.value : Props.digit.value));
    const currentAnimationClass = useSignal("");
    const rootClass = useComputed$(() => [Props.displayPart === "bottom" ? "clip-top-half" : "clip-bottom-half", currentAnimationClass.value, Props.extraClass].join(" "));

    useTask$(({ track }) => {
        track(() => Props.digit.value);
        if (!isServer && currentAnimationClass.value === "" && prevValue.value !== Props.digit.value) {
            currentAnimationClass.value = Props.animateName;
            if (Props.isFlipping) {
                Props.isFlipping.value = true;
            }
        }
    });

    useOn(
        "animationend",
        $(() => {
            prevValue.value = Props.digit.value;
            currentAnimationClass.value = "";
            if (Props.isFlipping) {
                Props.isFlipping.value = false;
            }
        })
    );

    return <div class={`relative ${rootClass.value} fill-mode-forwards backface-hidden`}>{displayValue.value}</div>;
});

interface SingleFlipClockItemProps {
    digit: Signal<string[]>;
    index: number;
    extraClass?: string;
}

export const SingleFlipClockItem = component$<SingleFlipClockItemProps>(Props => {
    useClipPathClass();
    const currentValue = useComputed$(() => Props.digit.value[Props.index]);
    const isFlippingTop = useSignal(false);
    const prevValue = useSignal("");

    const floatItemClass = "absolute z-10 left-0 top-0 w-full h-full";

    useStylesScoped$(`
        .transform-3d {
            transform-style: preserve-3d;
        }
        .flip-card-width {
            width: 0.65em;
        }
    `);

    useTask$(({ track }) => {
        track(() => isFlippingTop.value);
        if (!isServer && isFlippingTop.value === false) {
            prevValue.value = currentValue.value;
        }
    });

    return (
        <div class="flex flex-col relative text-6xl text-center transform-3d flip-card-width">
            <div class={`relative z-10 left-0 top-0 w-full h-full ${Props.extraClass}`}>{currentValue}</div>
            <div class={`${floatItemClass} z-10 clip-top-half ${Props.extraClass} ${isFlippingTop ? "opacity-100" : "opacity-0"}`}>{prevValue}</div>
            <div class={`${floatItemClass} z-20 clip-top-half`}>
                <HalfFlipCard digit={currentValue} extraClass={Props.extraClass} animateName="animate-flip-from-back" displayPart="bottom" />
            </div>
            <div class={`${floatItemClass} z-20 clip-bottom-half`}>
                <HalfFlipCard digit={currentValue} extraClass={Props.extraClass} animateName="animate-flip-from-front" displayPart="top" isFlipping={isFlippingTop} />
            </div>
        </div>
    );
});

interface FlipClockItemProps {
    time: string;
    trimZero?: boolean;
    hideIfZero?: boolean;
    extraClass?: string;
}

export const FlipClockCard = component$<FlipClockItemProps>(Props => {
    const { time, trimZero, hideIfZero } = Props;
    const timeValue = useComputed$(() => {
        return trimZero ? String(Number(time)) : time;
    });
    const digits = useSignal<string[]>([]);
    const digitCounts = useComputed$(() => timeValue.value.split("").length);

    const displayClass = useComputed$(() => {
        if (hideIfZero === false) return "";
        return timeValue.value === "0" ? "hidden" : "";
    });

    useTask$(({ track }) => {
        track(() => timeValue.value);
        if (!isServer) {
            digits.value = timeValue.value.split("");
        }
    });

    return (
        <span class={`px-2 flex space-x-2 ${displayClass.value}`}>
            {Array.from(Array(digitCounts.value).keys()).map((_, index) => {
                return <SingleFlipClockItem key={index} digit={digits} index={index} extraClass={Props.extraClass} />;
            })}
        </span>
    );
});

