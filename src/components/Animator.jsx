import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import styled from "styled-components";

import { FIND_GROUP } from "../queries";
import AddConversation from "./AddConversation";
import Header from "./Header";
import List from "./List";
import ListItem from "./ListItem";
import Button from "./Button";
import ButtonWrapper from "./ButtonWrapper";

const Conversation = styled(ListItem)`
    color: black;
    border-color: black;
`;

const Line = styled.div`
    border-left: 5px solid #0e65f0;
    border-radius: 5px;
    height: 50px;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Animator = () => {
    const [adding, setAdding] = useState(false);

    const { gid, aid } = useParams();
    const result = useQuery(FIND_GROUP, {
        variables: {
            id: gid,
        },
    });

    if (result.loading) {
        return <div>loading...</div>;
    }

    const group = result.data.findGroup;
    const animator = group.animators.find((animator) => animator.id === aid);

    return (
        <div>
            <Header>{animator.name}</Header>
            <List>
                {animator.conversations.map((conversation, i) => (
                    <Wrapper>
                        {i > 0 ? <Line /> : null}
                        <Conversation key={i}>{conversation}</Conversation>
                    </Wrapper>
                ))}
            </List>

            {adding ? (
                <Wrapper>
                    <AddConversation animatorId={animator.id} groupId={gid} />
                    <Button onClick={() => setAdding(false)}>Hide</Button>
                </Wrapper>
            ) : (
                <ButtonWrapper>
                    <Button onClick={() => setAdding(true)}>
                        Add Conversation
                    </Button>
                </ButtonWrapper>
            )}
        </div>
    );
};

export default Animator;
