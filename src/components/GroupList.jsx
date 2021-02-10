import React from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { ALL_GROUPS } from "../queries";

const Header = styled.h2`
    font-family: Helvetica;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const GroupItem = styled.div`
    padding: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px solid black;
    border-radius: 5px;
    color: black;
    font-family: Helvetica;
    margin-bottom: 15px;
    font-size: 1.2em;
`;

const Button = styled.button`
    font-size: 0.8em;
    margin: 1.5em;
    padding: 15px;
    border: 2px solid #0e65f0;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    font-family: Helvetica;
    color: #0e65f0;
`;

const GroupList = () => {
    const result = useQuery(ALL_GROUPS);

    if (result.loading) {
        return <div>loading...</div>;
    }

    const groups = result.data.allGroups;

    return (
        <div>
            <Header>Group List</Header>
            {groups.map((group, i) => (
                <Link to={`/groups/${group.id}`} key={i} style={{textDecoration: "none"}}>
                    <GroupItem>{group.name}</GroupItem>
                </Link>
            ))}
            {/* <Link to="/groups/add"> */}
                <Button as={Link} to="/groups/add" >Add Group</Button>
            {/* </Link> */}
        </div>
    );
};

export default GroupList;
