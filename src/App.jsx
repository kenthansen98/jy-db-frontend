import React from "react";
import { Switch, Route } from "react-router-dom";
import styled from 'styled-components';

import Animator from "./components/Animator";
import Group from "./components/Group";
import GroupList from "./components/GroupList";
import AddGroup from "./components/AddGroup";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Header = styled.h1`
    font-size: 3em;
    font-family: Helvetica;
    padding: 10px;
    border: 3px solid;
    border-radius: 5px
`;

const App = () => {
    return (
        <Container>
            <Header>JY db</Header>
            <Switch>
                <Route path="/groups/add">
                    <AddGroup />
                </Route>
                <Route path="/groups/:gid/animators/:aid">
                    <Animator />
                </Route>
                <Route path="/groups/:id">
                    <Group />
                </Route>
                <Route path="/">
                    <GroupList />
                </Route>
            </Switch>
        </Container>
    );
};

export default App;
