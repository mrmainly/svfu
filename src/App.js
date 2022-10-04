import React, { Suspense } from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import 'antd/dist/antd.min.css'

import ROUTES from './routes'
import Layout from './layout'
import {
    Login,
    Registration,
    Profile,
    ForgotPassword,
    ProfileDetail,
    AvailableTest,
    MyQualification,
    Statement,
    TesterSurveyPart,
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
    CertifiedDetail,
    TestResult,
    LprExam,
    AdminUsers,
    AdminUsersDetail,
    AdminExam,
    Expert,
    Moderator,
    AttestedAppeal,
    ModeratorTestResult,
    SurveyPartsExpert,
    SurveyPartsModerator,
    ModeratorAppeal,
    TagsList,
} from './pages'
// import { Loading } from './components'

function App() {
    return (
        <BrowserRouter>
            {/* <Suspense
                fallback={
                    <div
                        style={{
                            display: 'flex',
                            height: '100vh',
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Spin />
                    </div>
                }
            > */}
            <Routes>
                <Route path={ROUTES.LOGIN} element={<Layout />}>
                    <Route index element={<Login />} />
                    <Route element={<Registration />} path={ROUTES.REGISTRATION} />
                    <Route element={<ForgotPassword />} path={ROUTES.FORGOT_PASSWORD} />
                    <Route
                        element={
                            <Suspense fallback={null}>
                                <Profile />
                            </Suspense>
                        }
                        path={ROUTES.PROFILE}
                    />
                    <Route
                        element={
                            <Suspense fallback={null}>
                                <ProfileDetail />
                            </Suspense>
                        }
                        path={ROUTES.PROFILE_EDITING}
                    />
                    <Route
                        element={
                            <Suspense fallback={null}>
                                <UploadDocuments />
                            </Suspense>
                        }
                        path={ROUTES.UPLOAD_DOCUMENTS}
                    />
                    <Route
                        element={
                            <Suspense fallback={null}>
                                <AvailableTest />
                            </Suspense>
                        }
                        path={ROUTES.AVAILABLE_TESTS}
                    />
                    <Route
                        element={
                            <Suspense fallback={null}>
                                <TestResult />
                            </Suspense>
                        }
                        path={`${ROUTES.TEST_RESULT}/:id`}
                    />
                    <Route
                        element={
                            <Suspense fallback={null}>
                                <MyQualification />
                            </Suspense>
                        }
                        path={ROUTES.MY_QUALIFICATIONS}
                    />

                    <Route
                        element={
                            <Suspense fallback={null}>
                                <TesterSurveyPart />
                            </Suspense>
                        }
                        path={ROUTES.TESTER_SURVEY_PART}
                    />
                    <Route
                        element={
                            <Suspense fallback={null}>
                                <Statement />
                            </Suspense>
                        }
                        path={ROUTES.STATEMENT}
                    />
                    <Route
                        element={
                            <Suspense fallback={null}>
                                <UsersDetail />
                            </Suspense>
                        }
                        path={ROUTES.USERS_DETAIL + '/:id'}
                    />
                    <Route
                        element={
                            <Suspense fallback={null}>
                                <UsersList />
                            </Suspense>
                        }
                        path={ROUTES.USERS}
                    />
                    <Route
                        element={
                            <Suspense fallback={null}>
                                <LprUsers />
                            </Suspense>
                        }
                        path={ROUTES.LPR_USERS}
                    />
                    <Route
                        element={
                            <Suspense fallback={null}>
                                <AdminUsers />
                            </Suspense>
                        }
                        path={ROUTES.ADMIN_USERS}
                    />
                    <Route
                        element={
                            <Suspense fallback={null}>
                                <AdminUsersDetail />
                            </Suspense>
                        }
                        path={ROUTES.ADMIN_USERS_DETAIL + '/:id'}
                    />
                    <Route
                        element={
                            <Suspense fallback={null}>
                                <AttestationsQualifications />
                            </Suspense>
                        }
                        path={ROUTES.ATTESTATION_QUALI}
                    />
                    <Route
                        element={
                            <Suspense fallback={null}>
                                <TestProcessing />
                            </Suspense>
                        }
                        path={ROUTES.TEST_PROCESSING}
                    />
                    <Route
                        element={
                            <Suspense fallback={null}>
                                <TestsBank />
                            </Suspense>
                        }
                        path={ROUTES.ATTESTATION_TESTS_BANK}
                    />
                    <Route
                        element={
                            <Suspense fallback={null}>
                                <AttestationProtocol />
                            </Suspense>
                        }
                        path={ROUTES.ATTESTATION_PROTOCOL}
                    />
                    <Route
                        element={
                            <Suspense fallback={null}>
                                <QuestionsBank />
                            </Suspense>
                        }
                        path={ROUTES.ATTESTATION_QUESTIONS_BANK}
                    />
                    <Route
                        element={
                            <Suspense fallback={null}>
                                <ExaminationGroups />
                            </Suspense>
                        }
                        path={ROUTES.EXAMINATION_GROUPS}
                    />
                    <Route
                        element={
                            <Suspense fallback={null}>
                                <UserApplications />
                            </Suspense>
                        }
                        path={ROUTES.USER_APPLICATIONS}
                    />
                    <Route
                        element={
                            <Suspense fallback={null}>
                                <Certified />
                            </Suspense>
                        }
                        path={ROUTES.CERTIFIED}
                    />
                    <Route
                        element={
                            <Suspense fallback={null}>
                                <ExamSchedule />
                            </Suspense>
                        }
                        path={ROUTES.EXAM_SCHEDULE}
                    />
                    <Route
                        element={
                            <Suspense fallback={null}>
                                <LprExam />
                            </Suspense>
                        }
                        path={ROUTES.LPR_EXAM}
                    />
                    <Route
                        element={
                            <Suspense fallback={null}>
                                <AdminExam />
                            </Suspense>
                        }
                        path={ROUTES.ADMIN_EXAM}
                    />
                    <Route
                        element={
                            <Suspense fallback={null}>
                                <UserApplicationsDetail />
                            </Suspense>
                        }
                        path={`${ROUTES.USER_APPLICATIONS_DETAIL}/:id`}
                    />
                    <Route
                        element={
                            <Suspense fallback={null}>
                                <CertifiedDetail />
                            </Suspense>
                        }
                        path={`${ROUTES.CERTIFIED_DETAIL}/:id`}
                    />
                    <Route
                        element={
                            <Suspense fallback={null}>
                                <Expert />
                            </Suspense>
                        }
                        path={ROUTES.EXPERT}
                    />
                    <Route
                        element={
                            <Suspense fallback={null}>
                                <Moderator />
                            </Suspense>
                        }
                        path={ROUTES.MODERATOR}
                    />
                    <Route
                        element={
                            <Suspense fallback={null}>
                                <ModeratorTestResult />
                            </Suspense>
                        }
                        path={ROUTES.MODERATOR_TEST_RESULT}
                    />
                    <Route
                        element={
                            <Suspense fallback={null}>
                                <ModeratorAppeal />
                            </Suspense>
                        }
                        path={ROUTES.MODERATOR_APPEAL}
                    />
                    <Route
                        element={
                            <Suspense fallback={null}>
                                <AttestedAppeal />
                            </Suspense>
                        }
                        path={ROUTES.ATTESTED_APPEAL}
                    />

                    <Route
                        element={
                            <Suspense fallback={null}>
                                <SurveyPartsExpert />
                            </Suspense>
                        }
                        path={ROUTES.SURVEY_PARTS_EXPERT}
                    />
                    <Route
                        element={
                            <Suspense fallback={null}>
                                <SurveyPartsModerator />
                            </Suspense>
                        }
                        path={ROUTES.SURVEY_PARTS_MODERATOR}
                    />
                    <Route
                        element={
                            <Suspense fallback={null}>
                                <TagsList />
                            </Suspense>
                        }
                        path={ROUTES.TAGS_LIST}
                    />
                </Route>
            </Routes>
            {/* </Suspense> */}
        </BrowserRouter>
    )
}

export default App
