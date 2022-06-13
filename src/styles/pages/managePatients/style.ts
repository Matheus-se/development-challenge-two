import { Container } from '@mui/system';
import styled from "styled-components";

export const SpaceDiv = styled.div`
    flex: 1;
`

export const JumbotronWrapper = styled.div`
    padding: 0;
    margin: 0;
    margin-bottom: 12rem;
    position: relative;

    .wave {
        max-width: calc(100vw - (100vw - 100%));
        position: absolute;
        top: 100%;
        left: 0;
        transform: rotate(180deg);
        z-index: -10;
    }
`

export const BodyContainer = styled.div`
    width: 100%;

    .input, .box, .button-group, .button-input {
        width: 100%;
    }

    .input {
        fieldset {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
        }
    }
`