import React from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

import { ALL_GROUPS } from "../queries";

const GroupList = () => {
    const result = useQuery(ALL_GROUPS);

    if (result.loading) {
        return <div>loading...</div>;
    }

    const groups = result.data.allGroups;

    return (
        <div>
            <h2>Group List</h2>
            {groups.map((group, i) => (
                <Link to={`/groups/${group.id}`} key={i}>
                    <div>{group.name}</div>
                </Link>
            ))}
            <Link to="/groups/add">
                <button>Add Group</button>
            </Link>
        </div>
    );
};

export default GroupList;
