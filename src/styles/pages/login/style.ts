import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    #__next {
        min-height: 100vh;
        background-color: #001e3c;
        position: relative;

        .wave {
            max-width: calc(100vw - (100vw - 100%));
            position: absolute;
            bottom: 0;
            left: 0;
        }

        .login-container {
            display: flex;
            height: 100%;
            width: 100%;
            flex: 1;
            z-index: 10;

            form {
                width: 100%;
                display: flex;
                flex-direction: column;
            }
        }
    }
`;
