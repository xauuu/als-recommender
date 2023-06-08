import React from "react";
import { Route, useRouteMatch, Switch } from "react-router-dom";
import Dashboard from "./Dashboard/index";
import User from "./User/index";
import Novel from "./Novel/index";
import "./style.scss";

const Admin = () => {
  const { path } = useRouteMatch();
  return (
    <div className="admin-main">
      <div className="fake-header"></div>
      <div className="admin-main__content">
        <div className="default">
          <Switch>
            <Route path={`${path}/dashboard`} component={Dashboard} />
            <Route path={`${path}/users`} component={User} />
            <Route path={`${path}/novels`} component={Novel} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Admin;
