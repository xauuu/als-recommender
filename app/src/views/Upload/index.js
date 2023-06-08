import React from "react";
import "./Upload.scss";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Create from "./Create/index";
import MyNovel from "./MyNovel/index";
import MyNovelDetail from "./MyNovelDetail/index";

const Upload = () => {
  let { path } = useRouteMatch();
  return (
    <div className="upload-container">
      <div className="main">
        <Switch>
          <Route exact path={path} component={MyNovel} />
          <Route path={`${path}/create`} component={Create} />
          <Route path={`${path}/view/:id`} component={MyNovelDetail} />
          <Route path={`${path}/edit/:id`} component={Create} />
        </Switch>
      </div>
    </div>
  );
};

export default Upload;
