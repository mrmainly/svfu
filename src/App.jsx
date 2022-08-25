import { Route, BrowserRouter, Routes } from 'react-router-dom'
import 'antd/dist/antd.min.css'

import ROUTES from './routes'
import Layout from './layout'
import Header from './components/header'
import {
    Registration,
    Login,
    Profile,
    ForgotPassword,
    ProfileDetail,
    Test,
    MyQualification,
    TestDetail,
    CertificationResults,
    QualificationAdded,
    QualificationDetail,
    QualificationEdit,
    CertificationResultsDetial,
    Applying,
    TheoreticalPart,
    PracticalPart,
    UsersDetail,
    UsersList,
    TestsBank,
    AttestationsQualifications,
    QuestionsBank,
    ExaminationGroups,
    UserApplications,
    Certified,
    ExamSchedule,
    UploadDocuments,
    TestProcessing,
    AttestationProtocol,
    UserApplicationsDetail,
    LprUsers,
    LprUsersDetail,
    CertifiedDetail,
} from './pages'

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path={ROUTES.LOGIN} element={<Layout />}>
                    <Route index element={<Login />} />
                    <Route element={<Registration />} path={ROUTES.REGISTRATION} />
                    <Route element={<ForgotPassword />} path={ROUTES.FORGOT_PASSWORD} />
                    <Route element={<Profile />} path={ROUTES.PROFILE} />
                    <Route element={<ProfileDetail />} path={ROUTES.PROFILE_EDITING} />
                    <Route element={<UploadDocuments />} path={ROUTES.UPLOAD_DOCUMENTS} />
                    <Route element={<Test />} path={ROUTES.AVAILABLE_TESTS} />
                    <Route element={<TestDetail />} path={`${ROUTES.TEST_DETAIL}/:id`} />v
                    <Route element={<MyQualification />} path={ROUTES.MY_QUALIFICATIONS} />
                    <Route element={<CertificationResults />} path={ROUTES.CERTIFICATION_RESULTS} />
                    <Route element={<QualificationAdded />} path={ROUTES.QUALIFICATION_ADDED} />
                    <Route
                        element={<QualificationDetail />}
                        path={`${ROUTES.QUALIFICATION_DETAIL}/:id`}
                    />
                    <Route
                        element={<QualificationEdit />}
                        path={`${ROUTES.QUALIFICATION_EDITING}/:id`}
                    />
                    <Route element={<TheoreticalPart />} path={ROUTES.THEORETICAL_PART} />
                    <Route element={<Applying />} path={ROUTES.APPILYNG} />
                    <Route
                        element={<CertificationResultsDetial />}
                        path={`${ROUTES.CERTIFICATION_RESULTS_DETAIL}/:id`}
                    />
                    {/* <Route element={<Attested />} path={ROUTES.USERS_ATTESTED} /> */}
                    <Route element={<PracticalPart />} path={ROUTES.PRACTICAL_PART} />
                    <Route element={<UsersDetail />} path={ROUTES.USERS_DETAIL + '/:id'} />
                    <Route element={<UsersList />} path={ROUTES.USERS} />
                    <Route element={<LprUsers />} path={ROUTES.LPR_USERS} />
                    <Route element={<LprUsersDetail />} path={ROUTES.LPR_USERS_DETAIL + '/:id'} />
                    <Route
                        element={<AttestationsQualifications />}
                        path={ROUTES.ATTESTATION_QUALI}
                    />
                    <Route element={<TestProcessing />} path={ROUTES.TEST_PROCESSING} />
                    <Route element={<TestsBank />} path={ROUTES.ATTESTATION_TESTS_BANK} />
                    <Route element={<AttestationProtocol />} path={ROUTES.ATTESTATION_PROTOCOL} />
                    <Route element={<QuestionsBank />} path={ROUTES.ATTESTATION_QUESTIONS_BANK} />
                    <Route element={<ExaminationGroups />} path={ROUTES.EXAMINATION_GROUPS} />
                    <Route element={<UserApplications />} path={ROUTES.USER_APPLICATIONS} />
                    <Route element={<Certified />} path={ROUTES.CERTIFIED} />
                    <Route element={<ExamSchedule />} path={ROUTES.EXAM_SCHEDULE} />
                    <Route
                        element={<UserApplicationsDetail />}
                        path={`${ROUTES.USER_APPLICATIONS_DETAIL}/:id`}
                    />
                    <Route element={<CertifiedDetail />} path={`${ROUTES.CERTIFIED_DETAIL}/:id`} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App