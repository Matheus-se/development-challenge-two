import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font: 400 16px Roboto, sans-serif;
    }

    .button-icon {
        padding-left: 1.3rem;
    }

    .w-100 {
        width: 100%;
    }

    .date-picker {
        width: 100%;
    }

    .color-white {
        color: white;
    }

    .svg {
        width: 100%;
        max-height: 10rem;

        &.h-0 {
            width: unset;
        }
    }
`;
