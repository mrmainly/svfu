import { Route, BrowserRouter, Routes } from "react-router-dom";
import "antd/dist/antd.min.css";

import ROUTES from "./routes";
import Layout from "./layout";
import {
    Registration,
    Login,
    Profile,
    ForgotPassword,
    ProfileDetail,
    Documents,
    Test,
    ResultTests,
    Qualifications,
} from "./pages";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={ROUTES.LOGIN} element={<Layout />}>
                    <Route index element={<Login />} />
                    <Route
                        element={<Registration />}
                        path={ROUTES.REGISTRATION}
                    />
                    <Route
                        element={<ForgotPassword />}
                        path={ROUTES.FORGOT_PASSWORD}
                    />
                    <Route element={<Profile />} path={ROUTES.PROFILE} />
                    <Route
                        element={<ProfileDetail />}
                        path={ROUTES.PROFILE_EDITING}
                    />
                    <Route element={<Documents />} path={ROUTES.DOCUMENTS} />
                    <Route element={<Test />} path={ROUTES.AVAILABLE_TESTS} />
                    <Route
                        element={<ResultTests />}
                        path={ROUTES.TEST_RESULTS}
                    />
                    <Route
                        element={<Qualifications />}
                        path={ROUTES.MY_QUALIFICATIONS}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
