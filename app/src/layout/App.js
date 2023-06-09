import React, { Suspense, lazy } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Loading from "../components/Loading/index.js";
import AuthVerifyComponent from "../utils/auth-verify.js";
import AuthGuard from "./../components/Auth/AuthGuard";
import MainLayout from "./MainLayout";
import AdminLayout from "./AdminLayout";
import AdminGuard from "../components/Auth/AdminGuard.js";
import Create from "../views/Upload/Create/index.js";
const Home = lazy(() => import("../views/Home"));
const Account = lazy(() => import("../views/Account"));
const Upload = lazy(() => import("../views/Upload"));
const NovelDetail = lazy(() => import("../views/NovelDetail"));
const ChapterDetail = lazy(() => import("../views/ChapterDetail"));
const Summarize = lazy(() => import("./../views/Summarize"));
const Admin = lazy(() => import("./../views/Admin"));
const Profile = lazy(() => import("./../views/Profile"));
const Search = lazy(() => import("./../views/Search"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route path="/admin/:path?">
            <AdminLayout>
              <AdminGuard>
                <Route path="/admin" component={Admin} />
              </AdminGuard>
            </AdminLayout>
          </Route>
          <Route>
            <MainLayout>
              <Route exact path="/" component={Create} />
              <Route exact path="/detail/:novelId" component={NovelDetail} />
              <Route path="/detail/:novelId/chapter/:chapterNumber" component={ChapterDetail} />
              <Route path="/summarize" component={Summarize} />
              <Route exact path="/rated" component={Search} />
              <AuthGuard>
                <Route path="/upload" component={Upload} />
                <Route path="/profile" component={Profile} />
              </AuthGuard>
            </MainLayout>
          </Route>
        </Switch>
        <AuthVerifyComponent />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
