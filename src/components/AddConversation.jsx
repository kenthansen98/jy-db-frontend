import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import styled from 'styled-components';

import { ADD_CONVERSATION, ALL_GROUPS } from '../queries';
import Subheader from "./styled/Subheader";
import Button from "./styled/Button";
import ButtonWrapper from "./styled/ButtonWrapper";

const TextArea = styled.textarea`
    resize: none;
    width: 100%;
    padding: 10px;
    font-family: Helvetica;
    border: 2px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
`;

const AddButton = styled(Button)`
    margin-top: 1em;
`;

const AddConversation = ({ animatorId }) => {
    const [summary, setSummary] = useState('');
    const [addConversation] = useMutation(ADD_CONVERSATION, {
        refetchQueries: [{ query: ALL_GROUPS}],
    });

    const onSubmit = async (event) => {
        event.preventDefault();

        console.log("Adding conversation.");
        try {
            await addConversation({
                variables: {
                    animatorId, 
                    summary,
                },
            });
        } catch (e) {
            console.error(e);
        }

        setSummary('');
    };

    return (
        <form onSubmit={onSubmit}>
            <div>
                <Subheader>What did you talk about?</Subheader>
                <TextArea rows="15" cols="40" value={summary} onChange={({ target }) => setSummary(target.value)}/>
            </div>
            <ButtonWrapper>
                <AddButton type="submit">Add</AddButton>
            </ButtonWrapper>
        </form>
    )
};

export default AddConversation;