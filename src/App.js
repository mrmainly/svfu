import { Route, BrowserRouter, Routes } from "react-router-dom";
import "antd/dist/antd.min.css";

import ROUTES from "./routes";
import Layout from "./layout";
import { Registration, Login, Profile, ForgotPassword } from "./pages";

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
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
