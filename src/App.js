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
    SurveyPartsExpertSoft,
    SurveyPartsModerator,
    SurveyPartsModeratorSoft,
    ModeratorAppeal,
    // CreateSoftQuestion,
    // HardQuestions,
    // EditSoftQuestion,
    ManagerQuestionCreatePage,
    TestTests,
    TestTestPageAdd,
    ManagerQuestionsPage,
} from './pages'

import { LoadingInsideLayout } from './components'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={ROUTES.LOGIN} element={<Layout />}>
                    <Route index element={<Login />} />
                    <Route element={<Registration />} path={ROUTES.REGISTRATION} />
                    <Route element={<ForgotPassword />} path={ROUTES.FORGOT_PASSWORD} />
                    <Route
                        element={
                            <Suspense fallback={<LoadingInsideLayout />}>
                                <Profile />
                            </Suspense>
                        }
                        path={ROUTES.PROFILE}
                    />
                    <Route
                        element={
                            <Suspense fallback={<LoadingInsideLayout />}>
                                <ProfileDetail />
                            </Suspense>
                        }
                        path={ROUTES.PROFILE_EDITING}
                    />
                    <Route
                        element={
                            <Suspense fallback={<LoadingInsideLayout />}>
                                <UploadDocuments />
                            </Suspense>
                        }
                        path={ROUTES.UPLOAD_DOCUMENTS}
                    />
                    <Route
                        element={
                            <Suspense fallback={<LoadingInsideLayout />}>
                                <AvailableTest />
                            </Suspense>
                        }
                        path={ROUTES.AVAILABLE_TESTS}
                    />
                    <Route
                        element={
                            <Suspense fallback={<LoadingInsideLayout />}>
                                <TestResult />
                            </Suspense>
                        }
                        path={`${ROUTES.TEST_RESULT}/:id`}
                    />
                    <Route
                        element={
                            <Suspense fallback={<LoadingInsideLayout />}>
                                <MyQualification />
                            </Suspense>
                        }
                        path={ROUTES.MY_QUALIFICATIONS}
                    />

                    <Route
                        element={
                            <Suspense fallback={<LoadingInsideLayout />}>
                                <TesterSurveyPart />
                            </Suspense>
                        }
                        path={ROUTES.TESTER_SURVEY_PART}
                    />
                    <Route
                        element={
                            <Suspense fallback={<LoadingInsideLayout />}>
                                <Statement />
                            </Suspense>
                        }
                        path={ROUTES.STATEMENT}
                    />
                    <Route
                        element={
                            <Suspense fallback={<LoadingInsideLayout />}>
                                <UsersDetail />
                            </Suspense>
                        }
                        path={ROUTES.USERS_DETAIL + '/:id'}
                    />
                    <Route
                        element={
                            <Suspense fallback={<LoadingInsideLayout />}>
                                <UsersList />
                            </Suspense>
                        }
                        path={ROUTES.USERS}
                    />
                    <Route
                        element={
                            <Suspense fallback={<LoadingInsideLayout />}>
                                <LprUsers />
                            </Suspense>
                        }
                        path={ROUTES.LPR_USERS}
                    />
                    <Route
                        element={
                            <Suspense fallback={<LoadingInsideLayout />}>
                                <AdminUsers />
                            </Suspense>
                        }
                        path={ROUTES.ADMIN_USERS}
                    />
                    <Route
                        element={
                            <Suspense fallback={<LoadingInsideLayout />}>
                                <AdminUsersDetail />
                            </Suspense>
                        }
                        path={ROUTES.ADMIN_USERS_DETAIL + '/:id'}
                    />
                    <Route
                        element={
                            <Suspense fallback={<LoadingInsideLayout />}>
                                <AttestationsQualifications />
                            </Suspense>
                        }
                        path={ROUTES.ATTESTATION_QUALI}
                    />
                    <Route
                        element={
                            <Suspense fallback={<LoadingInsideLayout />}>
                                <TestProcessing />
                            </Suspense>
                        }
                        path={ROUTES.TEST_PROCESSING}
                    />
                    <Route
                        element={
                            <Suspense fallback={<LoadingInsideLayout />}>
                                <TestsBank />
                            </Suspense>
                        }
                        path={ROUTES.ATTESTATION_TESTS_BANK}
                    />
                    <Route
                        element={
                            <Suspense fallback={<LoadingInsideLayout />}>
                                <AttestationProtocol />
                            </Suspense>
                        }
                        path={ROUTES.ATTESTATION_PROTOCOL}
                    />
                    <Route
                        element={
                            <Suspense fallback={<LoadingInsideLayout />}>
                                <QuestionsBank />
                            </Suspense>
                        }
                        path={ROUTES.SOFT_QUESTIONS}
                    />
                    <Route
                        element={
                            <Suspense fallback={<LoadingInsideLayout />}>
                                <ExaminationGroups />
                            </Suspense>
                        }
                        path={ROUTES.EXAMINATION_GROUPS}
                    />
                    <Route
                        element={
                            <Suspense fallback={<LoadingInsideLayout />}>
                                <UserApplications />
                            </Suspense>
                        }
                        path={ROUTES.USER_APPLICATIONS}
                    />
                    <Route
                        element={
                            <Suspense fallback={<LoadingInsideLayout />}>
                                <Certified />
                            </Suspense>
                        }
                        path={ROUTES.CERTIFIED}
                    />
                    <Route
                        element={
                            <Suspense fallback={<LoadingInsideLayout />}>
                                <ExamSchedule />
                            </Suspense>
                        }
                        path={ROUTES.EXAM_SCHEDULE}
                    />
                    <Route
                        element={
                            <Suspense fallback={<LoadingInsideLayout />}>
                                <LprExam />
                            </Suspense>
                        }
                        path={ROUTES.LPR_EXAM}
                    />
                    <Route
                        element={
                            <Suspense fallback={<LoadingInsideLayout />}>
                                <AdminExam />
                            </Suspense>
                        }
                        path={ROUTES.ADMIN_EXAM}
                    />
                    <Route
                        element={
                            <Suspense fallback={<LoadingInsideLayout />}>
                                <UserApplicationsDetail />
                            </Suspense>
                        }
                        path={`${ROUTES.USER_APPLICATIONS_DETAIL}/:id`}
                    />
                    <Route
                        element={
                            <Suspense fallback={<LoadingInsideLayout />}>
                                <CertifiedDetail />
                            </Suspense>
                        }
                        path={`${ROUTES.CERTIFIED_DETAIL}/:id`}
                    />
                    <Route
                        element={
                            <Suspense fallback={<LoadingInsideLayout />}>
                                <Expert />
                            </Suspense>
                        }
                        path={ROUTES.EXPERT}
                    />
                    <Route
                        element={
                            <Suspense fallback={<LoadingInsideLayout />}>
                                <Moderator />
                            </Suspense>
                        }
                        path={ROUTES.MODERATOR}
                    />
                    <Route
                        element={
                            <Suspense fallback={<LoadingInsideLayout />}>
                                <ModeratorTestResult />
                            </Suspense>
                        }
                        path={ROUTES.MODERATOR_TEST_RESULT}
                    />
                    <Route
                        element={
                            <Suspense fallback={<LoadingInsideLayout />}>
                                <ModeratorAppeal />
                            </Suspense>
                        }
                        path={ROUTES.MODERATOR_APPEAL}
                    />
                    <Route
                        element={
                            <Suspense fallback={<LoadingInsideLayout />}>
                                <AttestedAppeal />
                            </Suspense>
                        }
                        path={ROUTES.ATTESTED_APPEAL}
                    />

                    <Route
                        element={
                            <Suspense fallback={<LoadingInsideLayout />}>
                                <SurveyPartsExpert />
                            </Suspense>
                        }
                        path={ROUTES.SURVEY_PARTS_EXPERT}
                    />
                    <Route
                        element={
                            <Suspense fallback={<LoadingInsideLayout />}>
                                <SurveyPartsExpertSoft />
                            </Suspense>
                        }
                        path={ROUTES.SURVEY_PARTS_EXPERT_SOFT}
                    />
                    <Route
                        element={
                            <Suspense fallback={<LoadingInsideLayout />}>
                                <SurveyPartsModerator />
                            </Suspense>
                        }
                        path={ROUTES.SURVEY_PARTS_MODERATOR}
                    />
                    <Route
                        element={
                            <Suspense fallback={<LoadingInsideLayout />}>
                                <SurveyPartsModeratorSoft />
                            </Suspense>
                        }
                        path={ROUTES.SURVEY_PARTS_MODERATOR_SOFT}
                    />
                    {/* <Route
                        element={
                            <Suspense fallback={<LoadingInsideLayout />}>
                                <CreateSoftQuestion />
                            </Suspense>
                        }
                        path={ROUTES.NEW_QUESTION}
                    />
                    <Route
                        element={
                            <Suspense fallback={<LoadingInsideLayout />}>
                                <HardQuestions />
                            </Suspense>
                        }
                        path={ROUTES.HARD_QUESTIONS}
                    />
                    <Route
                        element={
                            <Suspense fallback={<LoadingInsideLayout />}>
                                <EditSoftQuestion />
                            </Suspense>
                        }
                        path={ROUTES.EDIT_SOFT_QUESTION}
                    /> */}
                    <Route
                        element={
                            <Suspense fallback={<LoadingInsideLayout />}>
                                <ManagerQuestionCreatePage />
                            </Suspense>
                        }
                        path={ROUTES.MANAGER_QUESTIONS_CREATE_PAGE}
                    />
                    <Route
                        element={
                            <Suspense fallback={<LoadingInsideLayout />}>
                                <TestTests />
                            </Suspense>
                        }
                        path={ROUTES.TEST_TESTS}
                    />
                    <Route
                        element={
                            <Suspense fallback={<LoadingInsideLayout />}>
                                <ManagerQuestionsPage />
                            </Suspense>
                        }
                        path={ROUTES.MANAGER_QUESTIONS_PAGE}
                    />
                    <Route
                        element={
                            <Suspense fallback={<LoadingInsideLayout />}>
                                <TestTestPageAdd />
                            </Suspense>
                        }
                        path={ROUTES.TEST_TEST_PAGE_ADD}
                    />
                </Route>
            </Routes>
            {/* </Suspense> */}
        </BrowserRouter>
    )
}

export default App
