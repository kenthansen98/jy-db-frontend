import React from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { ALL_GROUPS } from "../queries";
import Header from "./styled/Header";
import Button from "./styled/Button";
import ButtonWrapper from "./styled/ButtonWrapper";
import Subheader from "./styled/Subheader";

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
    text-decoration: none;
`;

const GroupItemWrapper = styled.div`
    &:hover ${GroupItem} {
        background-color: #f2f3f5;
    }
`;

const GroupList = () => {
    const result = useQuery(ALL_GROUPS);

    if (result.loading) {
        return <Subheader>loading...</Subheader>;
    }

    const groups = result.data.allGroups;

    return (
        <div>
            <Header>Groups</Header>
            {groups.map((group, i) => (
                <GroupItemWrapper key={i}>
                    <GroupItem as={Link} to={`/groups/${group.id}`}>
                        {group.name}
                    </GroupItem>
                </GroupItemWrapper>
            ))}
            <ButtonWrapper>
                <Button as={Link} to="/groups/add">
                    Add Group
                </Button>
            </ButtonWrapper>
        </div>
    );
};

export default GroupList;
