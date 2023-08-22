import { component$, useSignal, useComputed$, useStylesScoped$, $, type Signal, useOn, useTask$ } from "@builder.io/qwik";
import { isServer } from "@builder.io/qwik/build";

const useClipPathClass = () => {
    useStylesScoped$(`
        .clip-top-half {
            clip-path: polygon(0 55%, 5% 50%, 95% 50%, 100% 55%, 100% 100%, 0 100%);
        }
        .clip-bottom-half {
            clip-path: polygon(0 0, 100% 0, 100% 45%, 95% 50%, 5% 50%, 0% 45%)
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

interface MultipleDigitsFlipClockItemProps {
    digit: Signal<string[]>;
    extraClass?: string;
}

export const MultipleDigitsFlipClockItem = component$<MultipleDigitsFlipClockItemProps>(Props => {
    useClipPathClass();
    const currentValue = useComputed$(() => Props.digit.value.join(""));
    const isFlippingTop = useSignal(false);
    const prevValue = useSignal(currentValue.value);

    const floatItemClass = "absolute z-10 left-0 top-0 w-full h-full";
    const verticalPadding = "py-6";
    const digitWidth = 0.65; // em

    useStylesScoped$(`
        .transform-3d {
            transform-style: preserve-3d;
        }
    `);

    useTask$(({ track }) => {
        track(() => isFlippingTop.value);
        if (!isServer && isFlippingTop.value === false) {
            console.log("before update prev value", { prevValue: prevValue.value, currentValue: currentValue.value });
            prevValue.value = currentValue.value;
            console.log("update prev value", { prevValue: prevValue.value, currentValue: currentValue.value });
        }
    });

    return (
        <div class="flex flex-col relative text-6xl text-center transform-3d" style={`width: ${currentValue.value.length * digitWidth + 0.75}em`}>
            <div class="h-px w-full absolute z-30 left-0 top-1/2 -translate-y-1/2 bg-neutral-blue-dark bg-opacity-50"></div>
            <div class={`relative z-10 left-0 top-0 w-full h-full rounded-lg clip-bottom-half brightness-110 ${verticalPadding} ${Props.extraClass}`}>{currentValue}</div>
            <div class={`${floatItemClass} z-10 clip-top-half rounded-lg brightness-90 ${Props.extraClass} ${isFlippingTop ? "opacity-100" : "opacity-0"} ${verticalPadding}`}>{prevValue}</div>
            <div class={`${floatItemClass} z-20 clip-top-half`}>
                <HalfFlipCard digit={currentValue} extraClass={`${Props.extraClass} rounded-lg brightness-90 ${verticalPadding}`} animateName="animate-flip-from-back" displayPart="bottom" />
            </div>
            <div class={`${floatItemClass} z-20 clip-bottom-half`}>
                <HalfFlipCard digit={currentValue} extraClass={`${Props.extraClass} rounded-lg brightness-110 ${verticalPadding}`} animateName="animate-flip-from-front" displayPart="top" isFlipping={isFlippingTop} />
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
        <span class={`flex ${displayClass.value}`}>
            <MultipleDigitsFlipClockItem digit={digits} extraClass={Props.extraClass} />
        </span>
    );
});

