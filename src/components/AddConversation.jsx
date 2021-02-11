import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_CONVERSATION, ALL_GROUPS } from '../queries';

const AddConversation = ({ animatorId, groupId }) => {
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
                <p>Summary:</p>
                <textarea rows="15" cols="40" value={summary} onChange={({ target }) => setSummary(target.value)}/>
            </div>
            <button type="submit">Add</button>
        </form>
    )
};

export default AddConversation;