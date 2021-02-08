import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { FIND_GROUP } from "../queries";

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
            <h2>{animator.name}</h2>
            {animator.conversations.map((conversation, i) => (
                <p key={i}>{conversation}</p>
            ))}

            {adding
                ?  <div>adding</div>
                : <button onClick={() => setAdding(true)}>Add Conversation</button>
            }
        </div>
    );
};

export default Animator;
