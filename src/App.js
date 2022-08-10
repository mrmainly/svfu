import { Route, BrowserRouter, Routes } from "react-router-dom";
import "antd/dist/antd.min.css";

import ROUTES from "./routes";
import Layout from "./layout";
import Header from "./components/header";
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
    DocumentDetail,
    TestDetail,
    CertificationResults,
    QualificationAdded,
} from "./pages";

function App() {
    return (
        <BrowserRouter>
            <Header />
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
                        element={<TestDetail />}
                        path={`${ROUTES.TEST_DETAIL}/:id`}
                    />
                    <Route
                        element={<ResultTests />}
                        path={ROUTES.TEST_RESULTS}
                    />
                    <Route
                        element={<Qualifications />}
                        path={ROUTES.MY_QUALIFICATIONS}
                    />
                    <Route
                        element={<CertificationResults />}
                        path={ROUTES.CERTIFICATION_RESULTS}
                    />
                    <Route
                        element={<DocumentDetail />}
                        path={ROUTES.DOCUMENTS_EDITING}
                    />
                    <Route
                        element={<QualificationAdded />}
                        path={ROUTES.QUALIFICATION_ADDED}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
