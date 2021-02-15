import React from 'react';
import { useHistory } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import styled from 'styled-components';

const Back = styled(BiArrowBack)`
    margin: 1em;
`;

const BackButton = () => {
    const history = useHistory();

    return (
        <Back onClick={() => history.goBack()} size="1.5em"/>
    );
};

export default BackButton;