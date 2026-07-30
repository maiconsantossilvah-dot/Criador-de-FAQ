/**
 * Modulo oficial da aba Carrossel.
 * Carregado antes de assets/js/layout-lab.js.
 * Este arquivo contem a logica que antes ficava direto no motor central.
 */

    const carouselStyle = `<style>
  .ll-carousel {
    --ll-carousel-brand: #ff9900;
    --ll-carousel-ink: #14202b;
    --ll-carousel-muted: #586675;
    --ll-carousel-soft: #f4f7f9;
    --ll-carousel-panel: #ffffff;
    --ll-carousel-line: #d9e2ea;
    --ll-carousel-section-bg: var(--ll-carousel-soft);
    --ll-carousel-dot-bg: var(--ll-carousel-panel);
    --ll-carousel-dot-color: var(--ll-carousel-ink);
    --ll-carousel-dot-border: var(--ll-carousel-line);
    --ll-carousel-dot-hover: #f0f3f5;
    --ll-carousel-dot-hover-color: var(--ll-carousel-ink);
    --ll-carousel-dot-hover-border: #c8d2da;
    --ll-carousel-dot-active: #e7ecef;
    --ll-carousel-dot-active-color: var(--ll-carousel-brand);
    --ll-carousel-dot-active-border: #c8d2da;
    --ll-carousel-dot-radius: 0.75rem;
    --ll-carousel-dot-border-width: 1px;
    --ll-carousel-dot-min-height: 3.9rem;
    --ll-carousel-dot-padding-x: 1rem;
    --ll-carousel-dot-hover-lift: 0.25rem;
    --ll-carousel-dot-shadow: none;
    --ll-carousel-dot-icon-bg: #f0ede8;
    --ll-carousel-dot-icon-color: var(--ll-carousel-ink);
    --ll-carousel-dot-icon-active-bg: var(--ll-carousel-brand);
    --ll-carousel-dot-icon-active-color: #ffffff;
    --ll-carousel-indicator-color: rgba(255, 255, 255, 0.5);
    --ll-carousel-indicator-active-color: #ffffff;
    --ll-carousel-shadow: 0 1.5rem 3rem rgba(13, 35, 51, 0.12);
    background: var(--ll-carousel-section-bg);
    color: var(--ll-carousel-ink);
    font-family: Arial, Helvetica, sans-serif;
    overflow: hidden;
  }

  .ll-carousel__container {
    box-sizing: border-box;
    container-name: ll-carousel-container;
    container-type: inline-size;
    margin-inline: auto;
    padding: 1rem;
    width: 100%;
  }

  .ll-carousel__control {
    display: none;
  }

  .ll-carousel__intro {
    display: grid;
    gap: 1rem;
    justify-items: center;
    margin-block-end: 1.5rem;
    text-align: center;
  }

  .ll-carousel--hide-intro .ll-carousel__intro {
    display: none;
  }

  .ll-carousel__eyebrow,
  .ll-carousel__title,
  .ll-carousel__lead,
  .ll-carousel__dot-number,
  .ll-carousel__dot-text,
  .ll-carousel__layout-eyebrow,
  .ll-carousel__layout-title,
  .ll-carousel__layout-text {
    letter-spacing: 0;
    overflow-wrap: anywhere;
  }

  .ll-carousel__eyebrow {
    color: var(--ll-carousel-brand);
    font-size: clamp(0.75rem, 0.72rem + 0.16vw, 0.875rem);
    font-weight: 700;
    line-height: 1.4;
    margin: 0;
    text-transform: uppercase;
  }

  .ll-carousel__title {
    font-size: clamp(1.75rem, 1.34rem + 1.76vw, 3rem);
    line-height: 1.08;
    margin: 0;
  }

  .ll-carousel__lead {
    color: var(--ll-carousel-muted);
    font-size: clamp(0.9375rem, 0.9rem + 0.16vw, 1.0625rem);
    line-height: 1.6;
    margin: 0;
    max-width: 54rem;
  }

  .ll-carousel__viewport {
    aspect-ratio: 16 / 10;
    border: 1px solid var(--ll-carousel-line);
    border-radius: 1rem;
    box-shadow: var(--ll-carousel-shadow);
    box-sizing: border-box;
    isolation: isolate;
    margin-inline: auto;
    max-width: 100%;
    overflow: hidden;
    position: relative;
    width: min(100%, 1280px);
  }

  .ll-carousel__track {
    display: grid;
    height: 100%;
    max-width: 100%;
    overflow: hidden;
    position: relative;
    width: 100%;
  }

  .ll-carousel__panel {
    background: var(--ll-carousel-panel);
    box-sizing: border-box;
    grid-area: 1 / 1;
    height: 100%;
    inset: 0;
    max-width: 100%;
    min-width: 0;
    opacity: 0;
    overflow: hidden;
    pointer-events: none;
    position: absolute;
    transform: translateX(100%);
    transition: transform 0.8s ease, opacity 0.4s ease;
    width: 100%;
    z-index: 1;
  }

  .ll-carousel__layout {
    box-sizing: border-box;
    height: 100%;
    max-height: 100%;
    overflow: hidden;
    width: 100%;
  }

  .ll-carousel__layout--impact {
    --ll-carousel-impact-bg: #f16425;
    --ll-carousel-impact-text: #fff7ef;
    --ll-carousel-impact-muted: rgba(255, 247, 239, 0.84);
    align-content: center;
    align-items: center;
    background: var(--ll-carousel-impact-bg);
    background-image: var(--ll-carousel-impact-gradient, none);
    color: var(--ll-carousel-impact-text);
    display: grid;
    gap: clamp(1.5rem, 3vw, 3.5rem);
    grid-template-columns: minmax(0, 0.86fr) minmax(0, 1.14fr);
    grid-template-rows: minmax(0, 1fr);
    min-height: 0;
    padding: clamp(1.5rem, 3.4vw, 3.5rem);
  }

  .ll-carousel__layout--impact > * {
    min-height: 0;
    min-width: 0;
  }

  .ll-carousel__layout-copy {
    align-self: center;
    display: grid;
    gap: clamp(0.7rem, 1vw, 1.05rem);
    justify-self: start;
    max-height: 100%;
    max-width: min(43ch, 100%);
    min-width: 0;
  }

  .ll-carousel__layout-eyebrow {
    font-size: clamp(0.75rem, 0.7rem + 0.25vw, 0.95rem);
    font-weight: 800;
    margin: 0;
    text-transform: uppercase;
  }

  .ll-carousel__layout-title {
    font-size: clamp(2rem, 3.25vw, 4rem);
    font-weight: 800;
    line-height: 1.02;
    margin: 0;
    max-width: 100%;
    overflow-wrap: normal;
    text-wrap: balance;
    word-break: normal;
  }

  .ll-carousel__layout-text {
    color: var(--ll-carousel-impact-muted);
    font-size: clamp(0.95rem, 1vw, 1.12rem);
    line-height: 1.45;
    margin: 0;
    max-width: 100%;
    overflow-wrap: normal;
    word-break: normal;
  }

  .ll-carousel__media-card {
    aspect-ratio: auto;
    border-radius: 1.25rem;
    box-shadow: 0 1.5rem 3rem rgba(20, 32, 43, 0.22);
    height: 100%;
    margin-block: auto;
    max-height: 82%;
    max-width: min(100%, 38rem);
    overflow: hidden;
    place-self: center end;
    position: relative;
    width: 100%;
  }

  .ll-carousel__layout--impact-reverse {
    grid-template-columns: minmax(0, 1.14fr) minmax(0, 0.86fr);
  }

  .ll-carousel__layout--impact-reverse .ll-carousel__layout-copy {
    grid-column: 2;
    grid-row: 1;
    justify-self: end;
  }

  .ll-carousel__layout--impact-reverse .ll-carousel__media-card {
    grid-column: 1;
    grid-row: 1;
    place-self: center start;
  }

  .ll-carousel__image,
  .ll-carousel__picture,
  .ll-carousel__video {
    display: block;
    height: 100%;
    width: 100%;
  }

  .ll-carousel__image,
  .ll-carousel__video {
    object-fit: cover;
    object-position: center;
  }

  .ll-carousel__layout--media {
    background: var(--ll-carousel-media-bg, #101217);
    padding: 0;
  }

  .ll-carousel__figure {
    height: 100%;
    margin: 0;
    overflow: hidden;
    position: relative;
    width: 100%;
  }

  .ll-carousel__figure .ll-carousel__image,
  .ll-carousel__figure .ll-carousel__video {
    aspect-ratio: 16 / 10;
    object-fit: cover;
    object-position: center;
  }

  .ll-carousel__caption {
    align-items: flex-start;
    background: var(--ll-carousel-caption-bg, rgba(0, 0, 0, 0.48));
    bottom: var(--ll-carousel-caption-bottom, auto);
    border: 1px solid rgba(255, 255, 255, 0.22);
    border-radius: 1.25rem;
    box-shadow: 0 1.25rem 3rem rgba(0, 0, 0, 0.28);
    color: var(--ll-carousel-caption-text, #fff);
    display: grid;
    gap: 0.65rem;
    left: var(--ll-carousel-caption-left, clamp(1.25rem, 5vw, 4.75rem));
    max-width: min(42%, 34rem);
    padding: clamp(1rem, 2.5vw, 2rem);
    position: absolute;
    right: var(--ll-carousel-caption-right, auto);
    top: var(--ll-carousel-caption-top, 50%);
    transform: translate(var(--ll-carousel-caption-translate-x, 0), var(--ll-carousel-caption-translate-y, -50%));
    z-index: 5;
  }

  .ll-carousel__caption h3 {
    font-size: clamp(1.35rem, 2.4vw, 3rem);
    line-height: 1.05;
    margin: 0;
    overflow-wrap: anywhere;
  }

  .ll-carousel__caption p {
    font-size: clamp(0.85rem, 1.15vw, 1.15rem);
    line-height: 1.45;
    margin: 0;
    overflow-wrap: anywhere;
  }

  .ll-carousel__nav {
    display: grid;
    gap: 0.5rem;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    margin: 0.75rem auto 0;
    max-width: 1280px;
    width: min(100%, 1280px);
  }

  .ll-carousel__dot {
    align-items: center;
    background: var(--ll-carousel-dot-bg);
    border: var(--ll-carousel-dot-border-width) solid var(--ll-carousel-dot-border);
    border-radius: var(--ll-carousel-dot-radius);
    box-sizing: border-box;
    box-shadow: var(--ll-carousel-dot-shadow);
    color: var(--ll-carousel-dot-color);
    cursor: pointer;
    display: flex;
    gap: 0.5rem;
    justify-content: space-between;
    min-height: var(--ll-carousel-dot-min-height);
    padding: 0.75rem var(--ll-carousel-dot-padding-x);
    transition: background 0.25s ease, border-color 0.25s ease, color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
  }

  .ll-carousel__dot:hover {
    background: var(--ll-carousel-dot-hover);
    border-color: var(--ll-carousel-dot-hover-border);
    color: var(--ll-carousel-dot-hover-color);
    transform: translateY(calc(var(--ll-carousel-dot-hover-lift) * -1));
  }

  .ll-carousel__dot-copy {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    min-width: 0;
  }

  .ll-carousel__dot-number {
    color: inherit;
    font-size: clamp(0.75rem, 0.72rem + 0.16vw, 0.875rem);
    font-weight: 700;
    line-height: 1;
  }

  .ll-carousel__dot-text {
    font-size: clamp(0.875rem, 0.84rem + 0.16vw, 1rem);
    font-weight: 700;
    line-height: 1.2;
  }

  .ll-carousel__dot-icon {
    align-items: center;
    background: var(--ll-carousel-dot-icon-bg);
    border-radius: 50%;
    color: var(--ll-carousel-dot-icon-color);
    display: flex;
    flex: 0 0 auto;
    height: 42px;
    justify-content: center;
    transition: background 0.25s ease, color 0.25s ease;
    width: 42px;
  }

  .ll-carousel__dot-icon svg {
    display: block;
    height: 22px;
    width: 22px;
  }

  .ll-carousel__dot-icon-img {
    display: block;
    height: 70%;
    object-fit: contain;
    width: 70%;
  }

  .ll-carousel__side-hint {
    align-items: center;
    background: transparent;
    border: 0;
    color: transparent;
    cursor: pointer;
    display: none;
    font-size: 0;
    height: 100%;
    justify-content: center;
    line-height: 1;
    opacity: 1;
    pointer-events: auto;
    position: absolute;
    top: 0;
    transform: none;
    width: min(18%, 9rem);
    z-index: 25;
  }

  .ll-carousel__side-hint--prev {
    left: 0;
  }

  .ll-carousel__side-hint--next {
    right: 0;
  }

  .ll-carousel__control--1:checked ~ .ll-carousel__viewport .ll-carousel__panel--1,
  .ll-carousel__control--2:checked ~ .ll-carousel__viewport .ll-carousel__panel--2,
  .ll-carousel__control--3:checked ~ .ll-carousel__viewport .ll-carousel__panel--3,
  .ll-carousel__control--4:checked ~ .ll-carousel__viewport .ll-carousel__panel--4 {
    opacity: 1;
    pointer-events: auto;
    transform: translateX(0);
    z-index: 2;
  }

  .ll-carousel__control--1:checked ~ .ll-carousel__viewport .ll-carousel__side-hint--1,
  .ll-carousel__control--2:checked ~ .ll-carousel__viewport .ll-carousel__side-hint--2,
  .ll-carousel__control--3:checked ~ .ll-carousel__viewport .ll-carousel__side-hint--3,
  .ll-carousel__control--4:checked ~ .ll-carousel__viewport .ll-carousel__side-hint--4 {
    display: flex;
  }

  .ll-carousel__control--2:checked ~ .ll-carousel__viewport .ll-carousel__panel--1,
  .ll-carousel__control--3:checked ~ .ll-carousel__viewport .ll-carousel__panel--1,
  .ll-carousel__control--3:checked ~ .ll-carousel__viewport .ll-carousel__panel--2,
  .ll-carousel__control--4:checked ~ .ll-carousel__viewport .ll-carousel__panel--1,
  .ll-carousel__control--4:checked ~ .ll-carousel__viewport .ll-carousel__panel--2,
  .ll-carousel__control--4:checked ~ .ll-carousel__viewport .ll-carousel__panel--3 {
    transform: translateX(-100%);
  }

  .ll-carousel__control--1:checked ~ .ll-carousel__nav .ll-carousel__dot--1,
  .ll-carousel__control--2:checked ~ .ll-carousel__nav .ll-carousel__dot--2,
  .ll-carousel__control--3:checked ~ .ll-carousel__nav .ll-carousel__dot--3,
  .ll-carousel__control--4:checked ~ .ll-carousel__nav .ll-carousel__dot--4 {
    background: var(--ll-carousel-dot-active);
    border-color: var(--ll-carousel-dot-active-border);
    color: var(--ll-carousel-dot-active-color);
  }

  .ll-carousel__control--1:checked ~ .ll-carousel__nav .ll-carousel__dot--1 .ll-carousel__dot-number,
  .ll-carousel__control--2:checked ~ .ll-carousel__nav .ll-carousel__dot--2 .ll-carousel__dot-number,
  .ll-carousel__control--3:checked ~ .ll-carousel__nav .ll-carousel__dot--3 .ll-carousel__dot-number,
  .ll-carousel__control--4:checked ~ .ll-carousel__nav .ll-carousel__dot--4 .ll-carousel__dot-number,
  .ll-carousel__control--1:checked ~ .ll-carousel__nav .ll-carousel__dot--1 .ll-carousel__dot-text,
  .ll-carousel__control--2:checked ~ .ll-carousel__nav .ll-carousel__dot--2 .ll-carousel__dot-text,
  .ll-carousel__control--3:checked ~ .ll-carousel__nav .ll-carousel__dot--3 .ll-carousel__dot-text,
  .ll-carousel__control--4:checked ~ .ll-carousel__nav .ll-carousel__dot--4 .ll-carousel__dot-text {
    color: var(--ll-carousel-dot-active-color);
  }

  .ll-carousel__control--1:checked ~ .ll-carousel__nav .ll-carousel__dot--1 .ll-carousel__dot-icon,
  .ll-carousel__control--2:checked ~ .ll-carousel__nav .ll-carousel__dot--2 .ll-carousel__dot-icon,
  .ll-carousel__control--3:checked ~ .ll-carousel__nav .ll-carousel__dot--3 .ll-carousel__dot-icon,
  .ll-carousel__control--4:checked ~ .ll-carousel__nav .ll-carousel__dot--4 .ll-carousel__dot-icon {
    background: var(--ll-carousel-dot-icon-active-bg);
    color: var(--ll-carousel-dot-icon-active-color);
  }

  .ll-carousel__indicators {
    bottom: 1rem;
    display: flex;
    gap: 7px;
    left: 50%;
    pointer-events: none;
    position: absolute;
    transform: translateX(-50%);
    z-index: 20;
  }

  .ll-carousel--hide-indicators .ll-carousel__indicators {
    display: none;
  }

  .ll-carousel__indicator {
    background: var(--ll-carousel-indicator-color);
    border-radius: 50%;
    display: block;
    height: 8px;
    transition: background 0.3s ease, width 0.3s ease;
    width: 8px;
  }

  .ll-carousel__control--1:checked ~ .ll-carousel__viewport .ll-carousel__indicator--1,
  .ll-carousel__control--2:checked ~ .ll-carousel__viewport .ll-carousel__indicator--2,
  .ll-carousel__control--3:checked ~ .ll-carousel__viewport .ll-carousel__indicator--3,
  .ll-carousel__control--4:checked ~ .ll-carousel__viewport .ll-carousel__indicator--4 {
    background: var(--ll-carousel-indicator-active-color);
    border-radius: 4px;
    width: 20px;
  }

  @media (min-width: 761px) and (max-width: 1180px) {
    .ll-carousel__layout--impact {
      gap: clamp(1.25rem, 2.6vw, 2.75rem);
      padding: clamp(1.25rem, 2.8vw, 2.5rem);
    }

    .ll-carousel__layout-copy {
      max-width: min(32ch, 100%);
      min-width: 0;
      position: relative;
      z-index: 3;
    }

    .ll-carousel__layout-title {
      font-size: clamp(1.35rem, 2.45vw, 2.35rem);
      line-height: 1.06;
      text-wrap: balance;
    }

    .ll-carousel__layout-text {
      font-size: clamp(0.76rem, 0.9vw, 0.95rem);
      line-height: 1.38;
      max-width: min(32ch, 100%);
    }
  }

  @container ll-carousel-container (min-width: 621px) and (max-width: 980px) {
    .ll-carousel__layout--impact {
      gap: clamp(1.25rem, 3cqw, 2.75rem);
      padding: clamp(1.25rem, 2.8cqw, 2.5rem);
    }

    .ll-carousel__layout-copy {
      max-width: min(28ch, 100%);
      min-width: 0;
      position: relative;
      z-index: 3;
    }

    .ll-carousel__layout-title {
      font-size: clamp(1.25rem, 2.9cqw, 2.15rem);
      line-height: 1.06;
      text-wrap: balance;
    }

    .ll-carousel__layout-text {
      font-size: clamp(0.74rem, 1.15cqw, 0.9rem);
      line-height: 1.38;
      max-width: min(28ch, 100%);
    }
  }

  @media (max-width: 760px) {
    .ll-carousel__container {
      padding: 1rem 0.75rem;
    }

    .ll-carousel__intro {
      gap: 0.65rem;
      margin-block-end: 1rem;
    }

    .ll-carousel__title {
      font-size: clamp(1.45rem, 7vw, 2rem);
    }

    .ll-carousel__lead {
      font-size: 0.9rem;
      line-height: 1.45;
    }

    .ll-carousel__viewport {
      aspect-ratio: auto;
      border-radius: 0.95rem;
      height: clamp(22rem, 105vw, 26rem);
      min-height: 22rem;
    }

    .ll-carousel__track {
      height: 100%;
      min-height: 0;
    }

    .ll-carousel__control--1:checked ~ .ll-carousel__viewport .ll-carousel__panel--1,
    .ll-carousel__control--2:checked ~ .ll-carousel__viewport .ll-carousel__panel--2,
    .ll-carousel__control--3:checked ~ .ll-carousel__viewport .ll-carousel__panel--3,
    .ll-carousel__control--4:checked ~ .ll-carousel__viewport .ll-carousel__panel--4 {
      height: 100%;
      inset: 0;
      min-height: 0;
      overflow: hidden;
      position: absolute;
    }

    .ll-carousel__layout {
      height: 100%;
      max-height: 100%;
      min-height: 0;
      overflow: hidden;
    }

    .ll-carousel__layout--impact {
      align-content: start;
      gap: 0.9rem;
      grid-template-columns: minmax(0, 1fr);
      grid-template-rows: auto minmax(0, 1fr);
      padding: 1rem;
    }

    .ll-carousel__layout--impact .ll-carousel__layout-copy {
      grid-column: 1;
      grid-row: 1;
      justify-self: stretch;
      max-height: none;
      max-width: none;
    }

    .ll-carousel__layout--impact .ll-carousel__media-card {
      grid-column: 1;
      grid-row: 2;
      place-self: center;
    }

    .ll-carousel__layout--impact-reverse .ll-carousel__layout-copy {
      grid-row: 2;
    }

    .ll-carousel__layout--impact-reverse .ll-carousel__media-card {
      grid-row: 1;
    }

    .ll-carousel__layout--impact-reverse {
      grid-template-rows: minmax(0, 1fr) auto;
    }

    .ll-carousel__layout-title {
      font-size: clamp(1.3rem, 6vw, 1.85rem);
      line-height: 1.04;
    }

    .ll-carousel__layout-text {
      font-size: 0.8rem;
      line-height: 1.32;
    }

    .ll-carousel__media-card {
      aspect-ratio: auto;
      border-radius: 0.8rem;
      height: 100%;
      min-height: 0;
      max-height: 100%;
      max-width: 100%;
    }

    .ll-carousel__layout--media {
      background: var(--ll-carousel-media-bg, #0d2333);
      height: 100%;
      min-height: 0;
      overflow: hidden;
      padding: 0.65rem;
    }

    .ll-carousel__figure {
      display: grid;
      gap: 0.55rem;
      grid-template-rows: minmax(0, 1fr) auto;
      height: 100%;
      min-height: 0;
      overflow: hidden;
    }

    .ll-carousel__figure .ll-carousel__picture,
    .ll-carousel__figure > .ll-carousel__video {
      aspect-ratio: 16 / 9;
      background: #101821;
      border-radius: 0.75rem;
      display: block;
      height: 100%;
      max-height: 100%;
      min-height: 0;
      overflow: hidden;
    }

    .ll-carousel__figure .ll-carousel__image,
    .ll-carousel__figure .ll-carousel__video {
      aspect-ratio: auto;
      height: 100%;
      object-fit: cover;
      object-position: center;
      width: 100%;
    }

    .ll-carousel__caption {
      background: var(--ll-carousel-caption-bg, rgba(0, 0, 0, 0.62));
      border-radius: 0.85rem;
      bottom: auto;
      left: auto;
      max-width: none;
      padding: 0.72rem;
      position: static;
      right: auto;
      top: auto;
      transform: none;
    }

    .ll-carousel__caption h3 {
      font-size: clamp(1.05rem, 5vw, 1.45rem);
    }

    .ll-carousel__caption p {
      font-size: 0.76rem;
      line-height: 1.3;
    }

    .ll-carousel__nav {
      gap: 0.35rem;
      margin-block-start: 0.65rem;
    }

    .ll-carousel__dot {
      border-radius: var(--ll-carousel-dot-radius);
      gap: 0.45rem;
      justify-content: space-between;
      min-height: 3rem;
      padding: 0.55rem 0.42rem;
      text-align: center;
    }

    .ll-carousel__dot:hover {
      transform: none;
    }

    .ll-carousel__dot-number {
      display: none;
    }

    .ll-carousel__dot-text {
      font-size: 0.78rem;
      line-height: 1.05;
    }

    .ll-carousel__dot-icon {
      height: 36px;
      width: 36px;
    }

    .ll-carousel__dot-icon svg {
      height: 18px;
      width: 18px;
    }

    .ll-carousel__side-hint {
      width: 28%;
    }

    .ll-carousel__indicators {
      display: none;
    }
  }

  @container ll-carousel-container (max-width: 620px) {
    .ll-carousel__viewport {
      aspect-ratio: auto;
      border-radius: 0.95rem;
      height: clamp(22rem, 105cqw, 26rem);
      min-height: 22rem;
    }

    .ll-carousel__track {
      height: 100%;
      min-height: 0;
    }

    .ll-carousel__control--1:checked ~ .ll-carousel__viewport .ll-carousel__panel--1,
    .ll-carousel__control--2:checked ~ .ll-carousel__viewport .ll-carousel__panel--2,
    .ll-carousel__control--3:checked ~ .ll-carousel__viewport .ll-carousel__panel--3,
    .ll-carousel__control--4:checked ~ .ll-carousel__viewport .ll-carousel__panel--4 {
      height: 100%;
      inset: 0;
      min-height: 0;
      overflow: hidden;
      position: absolute;
    }

    .ll-carousel__layout {
      height: 100%;
      max-height: 100%;
      min-height: 0;
      overflow: hidden;
    }

    .ll-carousel__layout--impact {
      align-content: start;
      gap: 0.9rem;
      grid-template-columns: minmax(0, 1fr);
      grid-template-rows: auto minmax(0, 1fr);
      padding: 1rem;
    }

    .ll-carousel__layout--impact .ll-carousel__layout-copy {
      grid-column: 1;
      grid-row: 1;
      justify-self: stretch;
      max-height: none;
      max-width: none;
    }

    .ll-carousel__layout--impact .ll-carousel__media-card {
      grid-column: 1;
      grid-row: 2;
      place-self: center;
    }

    .ll-carousel__layout--impact-reverse .ll-carousel__layout-copy {
      grid-row: 2;
    }

    .ll-carousel__layout--impact-reverse .ll-carousel__media-card {
      grid-row: 1;
    }

    .ll-carousel__layout--impact-reverse {
      grid-template-rows: minmax(0, 1fr) auto;
    }

    .ll-carousel__layout-title {
      font-size: clamp(1.3rem, 7.5cqw, 1.85rem);
    }

    .ll-carousel__layout-text {
      font-size: 0.8rem;
      line-height: 1.32;
    }

    .ll-carousel__media-card {
      aspect-ratio: auto;
      border-radius: 0.8rem;
      height: 100%;
      min-height: 0;
      max-height: 100%;
      max-width: 100%;
    }

    .ll-carousel__layout--media {
      background: var(--ll-carousel-media-bg, #0d2333);
      height: 100%;
      min-height: 0;
      overflow: hidden;
      padding: 0.65rem;
    }

    .ll-carousel__figure {
      display: grid;
      gap: 0.55rem;
      grid-template-rows: minmax(0, 1fr) auto;
      height: 100%;
      min-height: 0;
      overflow: hidden;
    }

    .ll-carousel__figure .ll-carousel__picture,
    .ll-carousel__figure > .ll-carousel__video {
      aspect-ratio: 16 / 9;
      background: #101821;
      border-radius: 0.75rem;
      display: block;
      height: 100%;
      max-height: 100%;
      min-height: 0;
      overflow: hidden;
    }

    .ll-carousel__figure .ll-carousel__image,
    .ll-carousel__figure .ll-carousel__video {
      aspect-ratio: auto;
      height: 100%;
      object-fit: cover;
      object-position: center;
      width: 100%;
    }

    .ll-carousel__caption {
      background: var(--ll-carousel-caption-bg, rgba(0, 0, 0, 0.62));
      border-radius: 0.85rem;
      bottom: auto;
      left: auto;
      max-width: none;
      padding: 0.72rem;
      position: static;
      right: auto;
      top: auto;
      transform: none;
    }

    .ll-carousel__caption h3 {
      font-size: clamp(1.05rem, 5.5cqw, 1.45rem);
    }

    .ll-carousel__caption p {
      font-size: 0.76rem;
      line-height: 1.3;
    }

    .ll-carousel__nav {
      gap: 0.35rem;
      margin-block-start: 0.65rem;
    }

    .ll-carousel__dot {
      border-radius: var(--ll-carousel-dot-radius);
      gap: 0;
      justify-items: center;
      min-height: 3rem;
      padding: 0.55rem 0.42rem;
      text-align: center;
    }

    .ll-carousel__dot:hover {
      transform: none;
    }

    .ll-carousel__dot-number {
      display: none;
    }

    .ll-carousel__dot-text {
      font-size: 0.78rem;
      line-height: 1.05;
    }

    .ll-carousel__indicators {
      display: none;
    }
  }
__CAROUSEL_DYNAMIC_COLORS__
</style>`;

    function buildCarouselDynamicCss() {
      const sectionBackground = state.carousel.sectionGradientEnabled !== false
        ? `linear-gradient(180deg, ${normalizeHexColor(state.carousel.sectionGradientStart || "#ffffff")}, ${normalizeHexColor(state.carousel.sectionGradientEnd || state.carousel.softColor)})`
        : normalizeCssColorValue(state.carousel.softColor);

      return `
  .ll-carousel {
    --ll-carousel-brand: ${normalizeHexColor(state.carousel.brandColor)};
    --ll-carousel-soft: ${normalizeCssColorValue(state.carousel.softColor)};
    --ll-carousel-section-bg: ${sectionBackground};
    --ll-carousel-dot-bg: ${normalizeHexColor(state.carousel.dotBackgroundColor || "#ffffff")};
    --ll-carousel-dot-color: ${normalizeHexColor(state.carousel.dotTextColor || "#14202b")};
    --ll-carousel-dot-border: ${normalizeHexColor(state.carousel.dotBorderColor || "#d9e2ea")};
    --ll-carousel-dot-hover: ${normalizeHexColor(state.carousel.dotHoverColor)};
    --ll-carousel-dot-hover-color: ${normalizeHexColor(state.carousel.dotHoverTextColor || state.carousel.dotTextColor || "#14202b")};
    --ll-carousel-dot-hover-border: ${normalizeHexColor(state.carousel.dotHoverBorderColor || state.carousel.dotActiveBorderColor || "#ee6911")};
    --ll-carousel-dot-active: ${normalizeHexColor(state.carousel.dotActiveColor)};
    --ll-carousel-dot-active-color: ${normalizeHexColor(state.carousel.dotActiveTextColor || state.carousel.brandColor || "#ee6911")};
    --ll-carousel-dot-active-border: ${normalizeHexColor(state.carousel.dotActiveBorderColor)};
    --ll-carousel-dot-radius: ${Math.min(48, Math.max(0, Number(state.carousel.dotRadius) || 12))}px;
    --ll-carousel-dot-border-width: ${Math.min(8, Math.max(0, Number(state.carousel.dotBorderWidth) || 1))}px;
    --ll-carousel-dot-min-height: ${Math.min(180, Math.max(36, Number(state.carousel.dotMinHeight) || 62))}px;
    --ll-carousel-dot-padding-x: ${Math.min(64, Math.max(0, Number(state.carousel.dotPaddingX) || 16))}px;
    --ll-carousel-dot-hover-lift: ${Math.min(20, Math.max(0, Number(state.carousel.dotHoverLift) || 4))}px;
    --ll-carousel-dot-shadow: 0 ${Math.min(24, Math.max(0, Number(state.carousel.dotHoverLift) || 4))}px ${Math.min(48, Math.max(0, Number(state.carousel.dotHoverLift) || 4) * 4)}px ${hexToRgba(normalizeHexColor(state.carousel.dotBorderColor || "#14202b"), Math.min(0.45, Math.max(0, Number(state.carousel.dotShadowOpacity) || 0)).toFixed(2))};
    --ll-carousel-dot-icon-bg: ${normalizeHexColor(state.carousel.dotIconBackgroundColor || "#f0ede8")};
    --ll-carousel-dot-icon-color: ${normalizeHexColor(state.carousel.dotIconColor || state.carousel.dotTextColor || "#14202b")};
    --ll-carousel-dot-icon-active-bg: ${normalizeHexColor(state.carousel.dotIconActiveBackgroundColor || state.carousel.brandColor)};
    --ll-carousel-dot-icon-active-color: ${normalizeHexColor(state.carousel.dotIconActiveColor || "#ffffff")};
    --ll-carousel-indicator-color: ${hexToRgba(normalizeHexColor(state.carousel.indicatorColor || "#ffffff"), "0.5")};
    --ll-carousel-indicator-active-color: ${normalizeHexColor(state.carousel.indicatorActiveColor || "#ffffff")};
  }`;
    }

    function buildCarouselDynamicStyle() {
      const dynamicCss = buildCarouselDynamicCss();
      return dynamicCss.trim() ? `<style>\n${dynamicCss}\n</style>` : "";
    }

    function buildCarouselStyle() {
      return injectTabDynamicStyle(
        getTabStyleAsset("carousel", carouselStyle),
        "__CAROUSEL_DYNAMIC_COLORS__",
        buildCarouselDynamicCss()
      );
    }

    function normalizeCarouselType(type) {
      return type === "decision" ? "decision" : "impact";
    }

    function normalizeCarouselFocus(value) {
      const numericValue = Number(value);
      if (!Number.isFinite(numericValue)) {
        return 50;
      }

      return Math.min(100, Math.max(0, Math.round(numericValue)));
    }

    function normalizeCarouselCaptionHorizontal(value) {
      return ["left", "center", "right"].includes(value) ? value : "left";
    }

    function normalizeCarouselCaptionVertical(value) {
      return ["top", "center", "bottom"].includes(value) ? value : "center";
    }

    function normalizeCarouselGradientAngle(value) {
      const numericValue = Number(value);
      if (!Number.isFinite(numericValue)) {
        return 323;
      }

      return Math.min(360, Math.max(0, Math.round(numericValue)));
    }

    function getCarouselCaptionStyle(slide) {
      const captionGradient = parseCssGradient(slide.backgroundColor);
      const captionOpacity = normalizeCarouselCaptionOpacity(slide.captionOpacity).toFixed(2);
      const backgroundColor = captionGradient
        ? buildCssGradient(captionGradient.start, captionGradient.end, captionGradient.angle)
        : hexToRgba(normalizeHexColor(slide.backgroundColor || "#0d2333"), captionOpacity);
      const textColor = normalizeHexColor(slide.textColor || "#ffffff");
      const horizontal = normalizeCarouselCaptionHorizontal(slide.captionHorizontal);
      const vertical = normalizeCarouselCaptionVertical(slide.captionVertical);
      const styles = [`--ll-carousel-caption-bg: ${backgroundColor};`, `--ll-carousel-caption-text: ${textColor};`];

      if (horizontal === "center") {
        styles.push("--ll-carousel-caption-left: 50%;", "--ll-carousel-caption-right: auto;", "--ll-carousel-caption-translate-x: -50%;");
      } else if (horizontal === "right") {
        styles.push("--ll-carousel-caption-left: auto;", "--ll-carousel-caption-right: clamp(1.25rem, 5vw, 4.75rem);", "--ll-carousel-caption-translate-x: 0;");
      } else {
        styles.push("--ll-carousel-caption-left: clamp(1.25rem, 5vw, 4.75rem);", "--ll-carousel-caption-right: auto;", "--ll-carousel-caption-translate-x: 0;");
      }

      if (vertical === "top") {
        styles.push("--ll-carousel-caption-top: clamp(1rem, 4vw, 3.5rem);", "--ll-carousel-caption-bottom: auto;", "--ll-carousel-caption-translate-y: 0;");
      } else if (vertical === "bottom") {
        styles.push("--ll-carousel-caption-top: auto;", "--ll-carousel-caption-bottom: clamp(1rem, 4vw, 3.5rem);", "--ll-carousel-caption-translate-y: 0;");
      } else {
        styles.push("--ll-carousel-caption-top: 50%;", "--ll-carousel-caption-bottom: auto;", "--ll-carousel-caption-translate-y: -50%;");
      }

      return styles.join(" ");
    }

    function getCarouselIconName(value) {
      return ["heart", "bottle", "sparkles", "box", "check", "none"].includes(value) ? value : "heart";
    }

    function isInlineSvgMarkup(value) {
      const text = String(value || "")
        .trim()
        .replace(/^<\?xml[\s\S]*?\?>\s*/i, "");
      return /^<svg(?:\s|>)/i.test(text);
    }

    function sanitizeInlineSvgMarkup(value) {
      const text = String(value || "")
        .trim()
        .replace(/^<\?xml[\s\S]*?\?>\s*/i, "");

      if (!isInlineSvgMarkup(text)) {
        return "";
      }

      return text
        .replace(/<script[\s\S]*?<\/script>/gi, "")
        .replace(/<(?:script|iframe|object|embed|link|meta)\b[^>]*\/?>/gi, "")
        .replace(/\son\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "")
        .replace(/\s(?:href|xlink:href)\s*=\s*(["'])\s*javascript:[\s\S]*?\1/gi, "")
        .replace(/\s(?:href|xlink:href)\s*=\s*javascript:[^\s>]+/gi, "");
    }

    function createSvgElementFromMarkup(doc, value) {
      const markup = sanitizeInlineSvgMarkup(value);
      if (!markup) {
        return null;
      }

      const parsed = new DOMParser().parseFromString(markup, "image/svg+xml");
      const parsedSvg = parsed.documentElement;
      if (!parsedSvg || parsedSvg.nodeName.toLowerCase() === "parsererror" || parsedSvg.tagName.toLowerCase() !== "svg") {
        return null;
      }

      return doc.importNode(parsedSvg, true);
    }

    function renderCarouselIcon(slide) {
      if (state.carousel.showNavIcons === false) {
        return "";
      }

      const iconImage = String(slide.navIconImage || "").trim();
      if (iconImage) {
        if (isInlineSvgMarkup(iconImage)) {
          return `<span class="ll-carousel__dot-icon ll-carousel__dot-icon--svg">${sanitizeInlineSvgMarkup(iconImage)}</span>`;
        }

        return `<span class="ll-carousel__dot-icon"><img class="ll-carousel__dot-icon-img" src="${escapeHtml(normalizeAssetUrl(iconImage))}" alt="" loading="lazy"></span>`;
      }

      const icon = getCarouselIconName(slide.navIcon);
      const icons = {
        heart: `<svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24"><path d="M20.393 5.879A5.5 5.5 0 0 0 12 4.376a5.5 5.5 0 0 0-8.393 1.503C2.195 7.823 2.5 10.5 4.5 12.5L12 20l7.5-7.5c2-2 2.305-4.677.893-6.621z"></path></svg>`,
        bottle: `<svg aria-hidden="true" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" viewBox="0 0 24 24"><path d="M9 2h6l1 4H8z"></path><path d="M8 6c0 8 8 8 8 14a4 4 0 0 1-8 0c0-6 8-6 8-14"></path><line x1="12" x2="12" y1="10" y2="14"></line></svg>`,
        sparkles: `<svg aria-hidden="true" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"></circle><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path></svg>`,
        box: `<svg aria-hidden="true" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" viewBox="0 0 24 24"><rect height="16" rx="2" width="20" x="2" y="4"></rect><circle cx="12" cy="12" r="3"></circle><path d="M2 9h3M19 9h3M2 15h3M19 15h3"></path></svg>`,
        check: `<svg aria-hidden="true" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"></path></svg>`
      };

      if (icon === "none") {
        return "";
      }

      return `<span class="ll-carousel__dot-icon">${icons[icon]}</span>`;
    }

    function buildCarouselImageVariant(src, size) {
      const value = normalizeAssetUrl(src);
      if (!value) {
        return "";
      }

      if (isLocalAssetUrl(value) || isTemporaryPreviewAssetUrl(value)) {
        return value;
      }

      const hashIndex = value.indexOf("#");
      const hash = hashIndex >= 0 ? value.slice(hashIndex) : "";
      const withoutHash = hashIndex >= 0 ? value.slice(0, hashIndex) : value;
      const queryIndex = withoutHash.indexOf("?");
      const path = queryIndex >= 0 ? withoutHash.slice(0, queryIndex) : withoutHash;
      const query = queryIndex >= 0 ? withoutHash.slice(queryIndex + 1) : "";
      const params = query
        .split("&")
        .map((param) => param.trim())
        .filter((param) => param && !/^ims=/i.test(param));

      params.push(`ims=${size}`);
      return `${path}?${params.join("&")}${hash}`;
    }

    function getCarouselSlides() {
      return state.carousel.slides.slice(0, carouselLimits.maxSlides);
    }

    function setCarouselPreviewSlide(index) {
      const maxSlideIndex = Math.max(0, getCarouselSlides().length - 1);
      const numericIndex = Number(index);
      state.carousel.previewSlideIndex = Math.min(Math.max(Number.isFinite(numericIndex) ? numericIndex : 0, 0), maxSlideIndex);
    }

    function createCarouselSlide(index = state.carousel.slides.length) {
      const isDecision = index % 2 === 1;

      if (isDecision) {
        return {
          type: "decision",
          navLabel: "Decisão",
          navIcon: index === 3 ? "box" : "bottle",
          navIconImage: "",
          captionTitle: "Título curto do destaque",
          captionText: "Use a legenda para explicar o ponto principal do produto ou da seção.",
          image: "",
          alt: "Imagem principal do layout de decisão",
          focusX: 50,
          focusY: 50,
          captionHorizontal: "left",
          captionVertical: "center",
          textColor: "#ffffff",
          backgroundColor: "#000000",
          captionOpacity: 0.64,
          mediaBackgroundColor: "#0d2333"
        };
      }

      return {
        type: "impact",
        navLabel: index === 2 ? "Invertido" : "Impacto",
        navIcon: index === 2 ? "sparkles" : "heart",
        navIconImage: "",
        eyebrow: "Impacto visual",
        title: "Mensagem curta em destaque",
        text: "Use este espaço para resumir uma ideia principal com apoio da imagem ao lado.",
        image: "",
        alt: "Imagem de apoio do layout de impacto",
        backgroundColor: "#f16425",
        gradientEnabled: true,
        gradientEndColor: "#ff8a4f",
        gradientAngle: 323,
        textColor: "#fff7ef",
        focusX: 50,
        focusY: 50,
        reverse: index === 2
      };
    }

    function addCarouselSlide() {
      if (state.carousel.slides.length >= carouselLimits.maxSlides) {
        return;
      }

      state.carousel.slides.push(createCarouselSlide());
      state.carousel.openSlideIndex = state.carousel.slides.length - 1;
      setCarouselPreviewSlide(state.carousel.openSlideIndex);
      renderEditor(true);
    }

    function removeCarouselSlide(index) {
      if (state.carousel.slides.length <= carouselLimits.minSlides) {
        return;
      }

      state.carousel.slides.splice(index, 1);
      if (state.carousel.openSlideIndex > index) {
        state.carousel.openSlideIndex -= 1;
      } else if (state.carousel.openSlideIndex === index) {
        state.carousel.openSlideIndex = Math.min(index, state.carousel.slides.length - 1);
      }

      setCarouselPreviewSlide(state.carousel.openSlideIndex);
      renderEditor(true);
    }

    function renderCarouselImage(slide, className = "ll-carousel__image") {
      const src = escapeHtml(normalizeAssetUrl(slide.image));
      const alt = escapeHtml(String(slide.alt || "").trim());
      const focusX = normalizeCarouselFocus(slide.focusX);
      const focusY = normalizeCarouselFocus(slide.focusY);
      const type = normalizeCarouselType(slide.type);
      const dimensions = type === "impact"
        ? { width: 780, height: 740 }
        : { width: 1800, height: 1600 };
      return `<img class="${className}" src="${src}" alt="${alt}" width="${dimensions.width}" height="${dimensions.height}" loading="lazy" decoding="async" style="object-position: ${focusX}% ${focusY}%;">`;
    }

    function renderCarouselPicture(slide) {
      return `<picture class="ll-carousel__picture">
              ${renderCarouselImage(slide)}
            </picture>`;
    }

    function renderCarouselImpactSlide(slide, slideIndex) {
      const reverseClass = slide.reverse ? " ll-carousel__layout--impact-reverse" : "";
      const impactBgGradient = parseCssGradient(slide.backgroundColor);
      const impactBg = impactBgGradient ? impactBgGradient.start : normalizeHexColor(slide.backgroundColor || "#f16425");
      const impactText = normalizeHexColor(slide.textColor || "#fff7ef");
      const muted = hexToRgba(impactText, "0.84");
      const gradient = impactBgGradient
        ? buildCssGradient(impactBgGradient.start, impactBgGradient.end, impactBgGradient.angle)
        : slide.gradientEnabled === false
        ? "none"
        : `linear-gradient(${normalizeCarouselGradientAngle(slide.gradientAngle)}deg, ${impactBg}, ${normalizeHexColor(slide.gradientEndColor || impactBg)})`;

      return `<section class="ll-carousel__layout ll-carousel__layout--impact${reverseClass}" style="--ll-carousel-impact-bg: ${impactBg}; --ll-carousel-impact-text: ${impactText}; --ll-carousel-impact-muted: ${muted}; --ll-carousel-impact-gradient: ${gradient};" aria-label="${escapeHtml(slide.navLabel || "Impacto")}">
          <div class="ll-carousel__layout-copy">
            <p class="ll-carousel__layout-eyebrow"${previewTextStyleAttr({ scope: "carousel", slideIndex, field: "eyebrow" })}>${escapeHtml(slide.eyebrow || "")}</p>
            <h3 class="ll-carousel__layout-title"${previewTextStyleAttr({ scope: "carousel", slideIndex, field: "title" })}>${escapeHtml(slide.title || "")}</h3>
            <p class="ll-carousel__layout-text"${previewTextStyleAttr({ scope: "carousel", slideIndex, field: "text" })}>${escapeHtml(slide.text || "")}</p>
          </div>
          <figure class="ll-carousel__media-card">
            ${renderCarouselPicture(slide)}
          </figure>
        </section>`;
    }

    function renderCarouselDecisionSlide(slide, slideIndex) {
      const captionStyle = getCarouselCaptionStyle(slide);
      const mediaBackgroundColor = normalizeCssColorValue(slide.mediaBackgroundColor || "#0d2333");

      return `<section class="ll-carousel__layout ll-carousel__layout--media" style="--ll-carousel-media-bg: ${mediaBackgroundColor}; background: ${mediaBackgroundColor};" aria-label="${escapeHtml(slide.navLabel || "Decisão")}">
          <figure class="ll-carousel__figure">
            ${renderCarouselPicture(slide)}
            <figcaption class="ll-carousel__caption" style="${captionStyle}">
              <h3${previewTextStyleAttr({ scope: "carousel", slideIndex, field: "captionTitle" })}>${escapeHtml(slide.captionTitle || "")}</h3>
              <p${previewTextStyleAttr({ scope: "carousel", slideIndex, field: "captionText" })}>${escapeHtml(slide.captionText || "")}</p>
            </figcaption>
          </figure>
        </section>`;
    }

    function renderCarouselPanel(slide, index) {
      const type = normalizeCarouselType(slide.type);
      const content = type === "decision" ? renderCarouselDecisionSlide(slide, index) : renderCarouselImpactSlide(slide, index);

      return `      <article class="ll-carousel__panel ll-carousel__panel--${index + 1}" id="ll-carousel-panel-${index + 1}" aria-label="Slide ${index + 1}: ${escapeHtml(slide.navLabel || `Slide ${index + 1}`)}">
        ${content}
      </article>`;
    }

    function buildCarouselSectionHtml(activeIndex = 0) {
      const slides = getCarouselSlides();
      const hideIntroClass = state.carousel.showIntro === false ? " ll-carousel--hide-intro" : "";
      const hideIndicatorsClass = state.carousel.showIndicators === false ? " ll-carousel--hide-indicators" : "";
      const activeSlideIndex = Math.min(Math.max(Number(activeIndex) || 0, 0), Math.max(0, slides.length - 1));
      const inputs = slides.map((slide, index) => {
        return `    <input class="ll-carousel__control ll-carousel__control--${index + 1}" type="radio" name="ll-carousel-active" id="ll-carousel-slide-${index + 1}"${index === activeSlideIndex ? " checked" : ""}>`;
      }).join("\n");
      const panels = slides.map(renderCarouselPanel).join("\n\n");
      const indicators = slides.map((slide, index) => {
        return `        <span class="ll-carousel__indicator ll-carousel__indicator--${index + 1}"></span>`;
      }).join("\n");
      const sideHints = slides.length > 1 ? slides.map((slide, index) => {
        const previousIndex = (index - 1 + slides.length) % slides.length;
        const nextIndex = (index + 1) % slides.length;
        return `      <label class="ll-carousel__side-hint ll-carousel__side-hint--prev ll-carousel__side-hint--${index + 1}" for="ll-carousel-slide-${previousIndex + 1}" role="button" aria-label="Voltar para o slide ${previousIndex + 1}">Anterior</label>
      <label class="ll-carousel__side-hint ll-carousel__side-hint--next ll-carousel__side-hint--${index + 1}" for="ll-carousel-slide-${nextIndex + 1}" role="button" aria-label="Avançar para o slide ${nextIndex + 1}">Próximo</label>`;
      }).join("\n") : "";
      const dots = slides.map((slide, index) => {
        const dotNumber = slide.navNumber || String(index + 1).padStart(2, "0");
        return `    <label class="ll-carousel__dot ll-carousel__dot--${index + 1}" for="ll-carousel-slide-${index + 1}" role="button" aria-controls="ll-carousel-panel-${index + 1}">
      <span class="ll-carousel__dot-copy">
        <span class="ll-carousel__dot-number"${previewTextStyleAttr({ scope: "carousel", slideIndex: index, field: "navNumber" })}>${escapeHtml(dotNumber)}</span>
        <span class="ll-carousel__dot-text"${previewTextStyleAttr({ scope: "carousel", slideIndex: index, field: "navLabel" })}>${escapeHtml(slide.navLabel || `Slide ${index + 1}`)}</span>
      </span>
      ${renderCarouselIcon(slide)}
    </label>`;
      }).join("\n");

      return `<section class="ll-carousel${hideIntroClass}${hideIndicatorsClass}" aria-label="${escapeHtml(state.carousel.ariaLabel || "Carrossel de layouts")}">
  <div class="ll-carousel__container">
    <div class="ll-carousel__intro">
      <p class="ll-carousel__eyebrow"${previewTextStyleAttr({ scope: "carousel", field: "eyebrow" })}>${escapeHtml(state.carousel.eyebrow || "")}</p>
      <h2 class="ll-carousel__title"${previewTextStyleAttr({ scope: "carousel", field: "title" })}>${escapeHtml(state.carousel.title || "")}</h2>
      <p class="ll-carousel__lead"${previewTextStyleAttr({ scope: "carousel", field: "lead" })}>${escapeHtml(state.carousel.lead || "")}</p>
    </div>

${inputs}

    <div class="ll-carousel__viewport">
      <div class="ll-carousel__indicators">
${indicators}
      </div>
${sideHints}
      <div class="ll-carousel__track">
${panels}
      </div>
    </div>

    <nav class="ll-carousel__nav" style="grid-template-columns: repeat(${slides.length}, minmax(0, 1fr));" aria-label="Selecionar slide do carrossel">
${dots}
    </nav>
  </div>
</section>`;
    }

    function renderCarouselEditor() {
      if (currentPage !== "conteudo") {
        return "";
      }

      const baseOpen = state.carousel.openBase ? " open" : "";
      const carouselSlides = getCarouselSlides();
      const canAddSlide = carouselSlides.length < carouselLimits.maxSlides;
      const canRemoveSlide = carouselSlides.length > carouselLimits.minSlides;
      const slides = carouselSlides.map((slide, slideIndex) => {
        const isOpen = state.carousel.openSlideIndex === slideIndex ? " open" : "";
        const type = normalizeCarouselType(slide.type);
        const icon = getCarouselIconName(slide.navIcon);
        const captionHorizontal = normalizeCarouselCaptionHorizontal(slide.captionHorizontal);
        const captionVertical = normalizeCarouselCaptionVertical(slide.captionVertical);
        const impactFields = type === "impact" ? `
              <label class="article-toggle">
                <input type="checkbox" data-carousel-field="reverse" data-carousel-slide="${slideIndex}"${slide.reverse ? " checked" : ""}>
                <span>Inverter texto e imagem</span>
              </label>
              <label class="article-toggle">
                <input type="checkbox" data-carousel-field="gradientEnabled" data-carousel-slide="${slideIndex}"${slide.gradientEnabled !== false ? " checked" : ""}>
                <span>Usar degradê no fundo</span>
              </label>
              <div class="article-editor__grid">
                <label class="field">
                  <span>Angulo do degrade</span>
                  <input type="number" min="0" max="360" step="1" value="${normalizeCarouselGradientAngle(slide.gradientAngle)}" data-carousel-field="gradientAngle" data-carousel-slide="${slideIndex}">
                </label>
              </div>
              <p class="muted-note">Cores, título e texto do slide são editáveis direto na prévia.</p>` : `
              <p class="muted-note">Cores e textos da legenda são editáveis direto na prévia.</p>
              <div class="article-editor__grid">
                <label class="field">
                  <span>Posição horizontal</span>
                  <select data-carousel-field="captionHorizontal" data-carousel-slide="${slideIndex}">
                    <option value="left"${captionHorizontal === "left" ? " selected" : ""}>Esquerda</option>
                    <option value="center"${captionHorizontal === "center" ? " selected" : ""}>Centro</option>
                    <option value="right"${captionHorizontal === "right" ? " selected" : ""}>Direita</option>
                  </select>
                </label>
                <label class="field">
                  <span>Posição vertical</span>
                  <select data-carousel-field="captionVertical" data-carousel-slide="${slideIndex}">
                    <option value="top"${captionVertical === "top" ? " selected" : ""}>Topo</option>
                    <option value="center"${captionVertical === "center" ? " selected" : ""}>Centro</option>
                    <option value="bottom"${captionVertical === "bottom" ? " selected" : ""}>Rodapé</option>
                  </select>
                </label>
              </div>
              `;

        return `
          <details class="article-tab-editor" data-carousel-slide-panel="${slideIndex}"${isOpen}>
            <summary class="article-tab-editor__summary">
              <strong>Slide ${slideIndex + 1}: ${escapeHtml(slide.navLabel || "sem título")}</strong>
              <span class="article-tab-editor__meta">${type === "impact" ? "Impacto" : "Decisão"}</span>
              <span class="article-tab-editor__actions">
                <button class="button button--danger icon-button" type="button" data-action="remove-carousel-slide" data-carousel-slide="${slideIndex}" aria-label="Remover slide ${slideIndex + 1}" title="Remover slide"${canRemoveSlide ? "" : " disabled"}>${trashIcon()}</button>
              </span>
              <span class="article-tab-editor__chevron" aria-hidden="true">&rsaquo;</span>
            </summary>
            <div class="article-editor__body">
              <div class="article-editor__grid">
                <label class="field">
                  <span>Tipo de layout</span>
                  <select data-carousel-field="type" data-carousel-slide="${slideIndex}">
                    <option value="impact"${type === "impact" ? " selected" : ""}>Impacto</option>
                    <option value="decision"${type === "decision" ? " selected" : ""}>Decisão</option>
                  </select>
                </label>
              </div>
              <label class="field">
                <span>Ícone da aba</span>
                <select data-carousel-field="navIcon" data-carousel-slide="${slideIndex}">
                  <option value="heart"${icon === "heart" ? " selected" : ""}>Coração</option>
                  <option value="bottle"${icon === "bottle" ? " selected" : ""}>Frasco</option>
                  <option value="sparkles"${icon === "sparkles" ? " selected" : ""}>Brilho</option>
                  <option value="box"${icon === "box" ? " selected" : ""}>Embalagem</option>
                  <option value="check"${icon === "check" ? " selected" : ""}>Check</option>
                  <option value="none"${icon === "none" ? " selected" : ""}>Sem ícone</option>
                </select>
              </label>
              <label class="field">
                <span>Alt da imagem</span>
                <input type="text" value="${escapeHtml(slide.alt || "")}" data-carousel-field="alt" data-carousel-slide="${slideIndex}" autocomplete="off">
              </label>
              <p class="muted-note">Nome da aba, ícone custom e imagem principal podem ser alterados clicando na prévia.</p>
              <div class="article-elements article-protection">
                <span class="article-elements__title">Foco da imagem</span>
                <div class="article-editor__grid">
                  <label class="field">
                    <span>Left (%)</span>
                    <input type="number" min="0" max="100" step="1" value="${normalizeCarouselFocus(slide.focusX)}" data-carousel-field="focusX" data-carousel-slide="${slideIndex}">
                  </label>
                  <label class="field">
                    <span>Top (%)</span>
                    <input type="number" min="0" max="100" step="1" value="${normalizeCarouselFocus(slide.focusY)}" data-carousel-field="focusY" data-carousel-slide="${slideIndex}">
                  </label>
                </div>
              </div>
${impactFields}
            </div>
          </details>
        `;
      }).join("");

      return `
        <section class="article-editor carousel-editor" aria-label="Editor de carrossel">
          <div class="editor-section-title">
            <div>
              <h3>Carrossel</h3>
              <p>Monte uma sequência com layouts de impacto e decisão.</p>
            </div>
            <div class="article-editor__title-actions">
              <span class="stories-limits">${carouselSlides.length}/${carouselLimits.maxSlides} slides</span>
              <button class="button button--soft icon-button" type="button" data-action="add-carousel-slide" aria-label="Adicionar slide" title="Adicionar slide"${canAddSlide ? "" : " disabled"}>+</button>
            </div>
          </div>

          <details class="stories-guide article-image-guide">
            <summary class="stories-guide__summary">
              <strong>Guia de uso do carrossel</strong>
              <span aria-hidden="true">&rsaquo;</span>
            </summary>
            <div class="stories-guide__body">
              <p><strong>Quantidade:</strong> use de 1 a 4 slides. Os botões de navegação se dividem automaticamente conforme a quantidade ativa.</p>
              <p><strong>Dimensões por sessão:</strong> nos slides de Impacto, use 780x740 px. Nos slides de Decisão, use 1800x1600 px.</p>
              <p><strong>Como o corte funciona:</strong> o carrossel usa cover. No desktop ele abre mais na horizontal; nas telas menores ele fica mais vertical e pode cortar laterais.</p>
              <p><strong>Foco da imagem:</strong> em cada slide, ajuste Left (%) e Top (%) para escolher onde o produto fica preso durante o corte. 50/50 é centro.</p>
              <p><strong>Referência rápida:</strong> produto à direita, aumente Left; produto à esquerda, diminua Left; produto no topo, diminua Top; produto embaixo, aumente Top.</p>
              <p><strong>Texto no layout Decisão:</strong> a cor do bloco de texto altera o overlay da legenda, e a cor do texto controla a leitura por cima dele. Use posição horizontal e vertical para mover esse bloco sem editar CSS.</p>
              <p><strong>Versão com cards:</strong> os ícones das abas, as bolinhas internas, o hover e o estado ativo podem ser editados na base do carrossel.</p>
              <p><strong>Ícone custom:</strong> cole a URL de .webp/.svg ou o código SVG inline no slide. Quando esse campo estiver preenchido, ele substitui o ícone pronto da aba.</p>
              <p><strong>Degradês:</strong> o fundo geral da seção e o fundo dos slides de impacto podem usar degradê. Se quiser algo mais seco, desative e trabalhe só com uma cor sólida.</p>
              <p><strong>Área segura:</strong> evite texto, logos e detalhes importantes perto das bordas. O produto principal deve ficar dentro da região central da imagem.</p>
              <p><strong>Texto do slide:</strong> use título curto e legenda objetiva para não cobrir demais o visual.</p>
            </div>
          </details>

          <details class="article-tab-editor article-base-editor" data-carousel-base-panel${baseOpen}>
            <summary class="article-tab-editor__summary">
              <strong>Base</strong>
              <span class="article-tab-editor__meta">Introdução + cores</span>
              <span class="article-tab-editor__chevron" aria-hidden="true">&rsaquo;</span>
            </summary>
            <div class="article-editor__body">
              <label class="article-toggle">
                <input type="checkbox" data-carousel-field="showIntro"${state.carousel.showIntro !== false ? " checked" : ""}>
                <span>Mostrar texto introdutório</span>
              </label>
              <label class="field">
                <span>Aria-label da seção</span>
                <input type="text" value="${escapeHtml(state.carousel.ariaLabel || "")}" data-carousel-field="ariaLabel" autocomplete="off">
              </label>
              <p class="muted-note">Título, texto de apoio e cor de destaque da introdução podem ser editados no preview.</p>
              <div class="article-elements article-protection">
                <span class="article-elements__title">Cores gerais</span>
                <label class="article-toggle">
                  <input type="checkbox" data-carousel-field="sectionGradientEnabled"${state.carousel.sectionGradientEnabled !== false ? " checked" : ""}>
                  <span>Usar degradê no fundo da seção</span>
                </label>
                <div class="article-editor__grid">
                  <label class="field">
                    <span>Início do fundo</span>
                    ${renderColorControl({ value: state.carousel.sectionGradientStart || "#ffffff", label: "Início do fundo", scope: "carousel", field: "sectionGradientStart" })}
                  </label>
                  <label class="field">
                    <span>Fim do fundo</span>
                    ${renderColorControl({ value: state.carousel.sectionGradientEnd || state.carousel.softColor, label: "Fim do fundo", scope: "carousel", field: "sectionGradientEnd" })}
                  </label>
                </div>
              </div>
              <div class="article-elements article-protection">
                <span class="article-elements__title">Navegação</span>
                <div class="article-editor__grid">
                  <label class="field">
                    <span>Hover da aba</span>
                    ${renderColorControl({ value: state.carousel.dotHoverColor, label: "Hover da aba", scope: "carousel", field: "dotHoverColor" })}
                  </label>
                  <label class="field">
                    <span>Aba ativa</span>
                    ${renderColorControl({ value: state.carousel.dotActiveColor, label: "Aba ativa", scope: "carousel", field: "dotActiveColor" })}
                  </label>
                </div>
                <div class="article-editor__grid">
                  <label class="field">
                    <span>Borda ativa</span>
                    ${renderColorControl({ value: state.carousel.dotActiveBorderColor, label: "Borda ativa", scope: "carousel", field: "dotActiveBorderColor" })}
                  </label>
                  <label class="field">
                    <span>Fundo do ícone</span>
                    ${renderColorControl({ value: state.carousel.dotIconBackgroundColor || "#f0ede8", label: "Fundo do ícone", scope: "carousel", field: "dotIconBackgroundColor" })}
                  </label>
                </div>
                <div class="article-editor__grid">
                  <label class="field">
                    <span>Ícone ativo</span>
                    ${renderColorControl({ value: state.carousel.dotIconActiveBackgroundColor || state.carousel.brandColor, label: "Ícone ativo", scope: "carousel", field: "dotIconActiveBackgroundColor" })}
                  </label>
                  <label class="field">
                    <span>Texto do ícone ativo</span>
                    ${renderColorControl({ value: state.carousel.dotIconActiveColor || "#ffffff", label: "Texto do ícone ativo", scope: "carousel", field: "dotIconActiveColor" })}
                  </label>
                </div>
                <label class="article-toggle">
                  <input type="checkbox" data-carousel-field="showNavIcons"${state.carousel.showNavIcons !== false ? " checked" : ""}>
                  <span>Mostrar ícones nos botões</span>
                </label>
                <label class="article-toggle">
                  <input type="checkbox" data-carousel-field="showIndicators"${state.carousel.showIndicators !== false ? " checked" : ""}>
                  <span>Mostrar bolinhas dentro do slide</span>
                </label>
                <div class="article-editor__grid">
                  <label class="field">
                    <span>Indicador</span>
                    ${renderColorControl({ value: state.carousel.indicatorColor || "#ffffff", label: "Indicador", scope: "carousel", field: "indicatorColor" })}
                  </label>
                  <label class="field">
                    <span>Indicador ativo</span>
                    ${renderColorControl({ value: state.carousel.indicatorActiveColor || "#ffffff", label: "Indicador ativo", scope: "carousel", field: "indicatorActiveColor" })}
                  </label>
                </div>
              </div>
            </div>
          </details>

${slides}
        </section>
      `;
    }
