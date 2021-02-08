import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { FIND_GROUP } from "../queries";

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
            <h2>{group.name}</h2>
            <h3>Animators</h3>
            {group.animators.map((animator, i) => (
                <Link to={`/groups/${id}/animators/${animator.id}`} key={i}>
                    <p>{animator.name}</p>
                </Link>
            ))}
            <h3>Participants</h3>
            {group.participants.map((participant, i) => (
                <p key={i}>
                    {participant.name} - {participant.age}
                </p>
            ))}
        </div>
    );
};

export default Group;
