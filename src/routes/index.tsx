import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import { CountdownTimer } from "~/components/timer/index";

export default component$(() => {
    return (
        <>
            <h1>Hi 👋</h1>
            <CountdownTimer countdownTime={"2023-06-12 19:00:00"} />
            <p>
                Can't wait to see what you build with qwik!
                <br />
                Happy coding.
            </p>
        </>
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

