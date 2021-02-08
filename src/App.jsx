import React from "react";
import { Switch, Route, Link } from "react-router-dom";

import Animator from "./components/Animator";
import Group from "./components/Group";
import GroupList from "./components/GroupList";
import AddGroup from "./components/AddGroup";

const App = () => {
    return (
        <div>
            <h1>JY db</h1>
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
                <Route path="/groups">
                    <GroupList />
                </Route>
                <Route path="/">
                    <Link to="/groups">
                        <button>See groups</button>
                    </Link>
                </Route>
            </Switch>
        </div>
    );
};

export default App;
