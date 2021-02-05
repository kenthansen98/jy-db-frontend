import React from "react";
import { Switch, Route, Link } from "react-router-dom";

import GroupList from './components/GroupList';

const App = () => {
    return (
        <div>
            <h1>JY db</h1>
            <Switch>
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
