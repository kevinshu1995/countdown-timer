import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import { CountdownTimer } from "~/components/timer/index";

const Background = () => {
    return (
        <div class={["absolute left-0 top-0 w-full h-full z-10 overflow-hidden", 'bg-[url("/src/assets/images/bg-stars.svg")] bg-cover bg-repeat bg-center'].join(" ")}>
            <div class="absolute left-0 bottom-0 h-[250px] min-w-full">
                <img class="object-cover object-right h-full w-full" src="/src/assets/images/pattern-hills.svg" alt="hills background" />
            </div>
        </div>
    );
};

export default component$(() => {
    return (
        <main class="min-h-screen bg-neutral-blue-darker text-primary-blue relative">
            <div class="relative z-30 flex flex-col items-center">
                {/* main content */}
                <div class="mt-40 flex flex-col items-center gap-28">
                    <h1 class="text-white text-3xl tracking-[0.3em] font-bold uppercase">we're launching soon</h1>
                    <div>
                        {/* countdown */}
                        <CountdownTimer countdownTime={"2023-09-18 19:00:00"} />
                    </div>
                </div>
                {/* social media icons */}
                <div></div>
            </div>
            <Background />
        </main>
    );
});

export const head: DocumentHead = {
    title: "Welcome to Qwik",
    meta: [
        {
            name: "description",
            content: "Qwik site description",
        },
    ],
};

