import styled from "styled-components";
import clouds from "../../../assets/clouds.jpg";
import montains from "../../../assets/montains.jpg";

export const JumbotronContainer = styled.div`
    height: 50vh;
    width: calc(100vw - (100vw - 100%));
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background-image: url(${montains});
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: top;
    
    &&::before {
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: ${props => props.color};
        opacity: 0.6;
        top: 0;
        left: 0;
    }

    .header {
        background-image: url(${clouds});
        height: 100%;
        width: 100%;
        backdrop-filter: blur(2px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 100;
        background-clip: text;
        -webkit-background-clip: text;
        background-attachment: fixed;
        background-size: contain;
        color: transparent;
        background-position: top;

        b {
            font-weight: 900;
        }
    }
`

export const JumbotronSnackContainer = styled.div`
    background-color: ${props => props.color};
    width: calc(100vw - (100vw - 100%));
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;

    .grid {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        > * {
            flex-direction: column;
            display: flex;
            text-align: center;
            align-items: center;
            justify-content: center;
        }

        .typography-container {
            display: flex;
            flex-direction: column;

            .text {
                text-align: center;
            }
        
            .title {
                font-weight: bold;
            }
        }
    }

    .container {
        display: flex;
        align-items: center;
        justify-content: center;
    }
`