# Frontend Mentor - Launch countdown timer solution

This is a solution to the [Launch countdown timer challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/launch-countdown-timer-N0XkGfyz-).
Frontend Mentor challenges help you improve your coding skills by building realistic projects.

> Design Preview
> ![Design preview for the Launch countdown timer coding challenge](./desktop-preview.jpg)

## Table of contents

-   [Overview](#overview)
    -   [The challenge](#the-challenge)
    -   [Screenshot](#screenshot)
    -   [Links](#links)
-   [My process](#my-process)
    -   [Built with](#built-with)
    -   [What I learned](#what-i-learned)
    -   [Useful resources](#useful-resources)
-   [Author](#author)

## Overview

### The challenge

Users should be able to:

-   See hover states for all interactive elements on the page
-   See a live countdown timer that ticks down every second (start the count at 14 days)
-   **Bonus**: When a number changes, make the card flip from the middle

### Screenshot

TODO

<!-- ![](./screenshot.jpg) -->

### Links

-   vanilla JS version with CodePen: [https://codepen.io/kevinshu/pen/mdQVgpP](https://codepen.io/kevinshu/pen/mdQVgpP)

TODO

-   Solution URL: [Add solution URL here](https://your-solution-url.com)
-   Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

-   [Qwik](https://qwik.builder.io/) - JS library
-   [Tailwindcss](https://tailwindcss.com/) - CSS framework

### What I learned

The flip animation of FlipClock is the most complicated and time-consuming part of the whole project.
How to make the flip animation close to reality is the biggest challenge.

In CSS, besides the basic color gradient effect, `rotateX` is used to create a 3D flip effect, and `backface-visibility: hidden` is used to hide the element that flips to the back. With `transform-style: preserve-3d`, it can simulate a 3D effect better.

And JS uses `requestAnimationFrame` to refresh the time, and listens to the `animationend` event on the animated element. When the animation ends, it removes the animation class to prepare for the next flip animation.

Finally, qwik! This project is relatively simple and does not use the route feature, so it can focus more on the core functionality.

It is worth mentioning that because I was not familiar with how it rendering components, the time prop that I passed to the child component at first was not a `Signal`, which caused the child component to re-render every time the prop changed, and could not trigger the animation properly.

Overall, apart from qwik, what I learned the most from this project was CSS, haha.

### Useful resources

-   [Make Flip clock with JS](https://chatium.com/blog~3d-css-animation-flip-down-clock)

## Author

-   [Website](https://kevinshu1995.github.io/)
-   Github Profile - [@kevinshu1995](https://github.com/kevinshu1995/)
-   Frontend Mentor - [@kevinshu1995](https://www.frontendmentor.io/profile/kevinshu1995)

