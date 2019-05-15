import styled from 'styled-components';
import { Colors, Spacings } from 'config';

export const BackButton = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 20px;
    background-color: rgba(255, 255, 255, 0.2);
    position: absolute;
    left: ${ Spacings.MEDIUM}px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    transition: transform .25s cubic-bezier(0.075, 0.82, 0.165, 1), background-color .25s cubic-bezier(0.075, 0.82, 0.165, 1);

    svg {
        width: 25px;
        height: 25px;
    }

    :hover {
        transform: scale(1.1);
        background-color: ${Colors.GREY_GREEN};
        svg path{
            fill: ${Colors.GREY_BASE};
        }
    }
`;