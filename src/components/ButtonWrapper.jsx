import styled from "styled-components";
import Button from "./Button";

const ButtonWrapper = styled.div`
    &:hover ${Button} {
        background-color: #1555bd;
        border-color: #1555bd;
    }
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export default ButtonWrapper;
