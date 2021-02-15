import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import styled from "styled-components";

import Animator from "./components/Animator";
import Group from "./components/Group";
import GroupList from "./components/GroupList";
import AddGroup from "./components/AddGroup";
import BackButton from "./components/BackButton";

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
    border-radius: 5px;
    align-self: center;
    color: black;
    margin-top: 0;
`;

const App = () => {
    return (
        <div>
            <BackButton />
            <Container>
                <Link to="/" style={{ textDecoration: "none" }}>
                    <Header>JY db</Header>
                </Link>
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
        </div>
    );
};

export default App;
