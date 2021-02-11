import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import styled from "styled-components";

import { FIND_GROUP } from "../queries";
import Header from './Header';

const Subheader = styled.h3`
    font-family: Helvetica;
    color: #595959;
`;

const Group = () => {
    const { id } = useParams();
    const result = useQuery(FIND_GROUP, {
        variables: { id },
    });

    if (result.loading) {
        return <div>loading...</div>;
    }

    const group = result.data.findGroup;

    return (
        <div>
            <Header>{group.name}</Header>
            <Subheader>Animators</Subheader>
            {group.animators.map((animator, i) => (
                <Link to={`/groups/${id}/animators/${animator.id}`} key={i}>
                    <p>{animator.name}</p>
                </Link>
            ))}
            <Subheader>Participants</Subheader>
            {group.participants.map((participant, i) => (
                <p key={i}>
                    {participant.name} - {participant.age}
                </p>
            ))}
        </div>
    );
};

export default Group;
