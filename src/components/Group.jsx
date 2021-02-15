import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import styled from "styled-components";

import { FIND_GROUP } from "../queries";
import Header from "./styled/Header";
import List from "./styled/List";
import ListItem from "./styled/ListItem";
import Subheader from "./styled/Subheader";

const ParticipantList = styled.div`
    display: flex;
    flex-direction: column;
    border: 2px solid #0e65f0;
    border-radius: 5px;
    font-family: Helvetica;
    width: 200px;
`;

const ParticipantItem = styled.p`
    margin-left: 20px;
    color: #0e65f0;
`;

const Group = () => {
    const { id } = useParams();
    const result = useQuery(FIND_GROUP, {
        variables: { id },
    });

    if (result.loading) {
        return <Subheader>loading...</Subheader>;
    }

    const group = result.data.findGroup;

    return (
        <div>
            <Header>{group.name}</Header>
            <Subheader>Animators</Subheader>
            <List>
                {group.animators.map((animator, i) => (
                    <ListItem
                        as={Link}
                        to={`/groups/${id}/animators/${animator.id}`}
                        key={i}
                    >
                        {animator.name}
                    </ListItem>
                ))}
            </List>
            <Subheader>Participants</Subheader>
            {group.participants.length > 0 ? (
                <ParticipantList>
                    {group.participants.map((participant, i) => (
                        <ParticipantItem key={i}>
                            {participant.name} - {participant.age}
                        </ParticipantItem>
                    ))}
                </ParticipantList>
            ) : null}
        </div>
    );
};

export default Group;
