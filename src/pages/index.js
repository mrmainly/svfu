import { lazy } from 'react'

import Login from './auth/login'
import Registration from './auth/registration'
import ForgotPassword from './auth/forgot-password'

const Profile = lazy(() => import('./profile'))
const ProfileDetail = lazy(() => import('./profile/detail'))
const AvailableTest = lazy(() => import('./tester/available-tests'))
const Statement = lazy(() => import('./tester/statement'))
const TesterSurveyPart = lazy(() => import('./tester/survey'))
const UsersDetail = lazy(() => import('./users/detail'))
const UsersList = lazy(() => import('./users/list'))
const AttestationsQualifications = lazy(() => import('./manager/attestations-qualification'))
const AttestationProtocol = lazy(() => import('./lpr/attestation-protocol/list'))
const TestsBank = lazy(() => import('./manager/tests-bank'))
const QuestionsBank = lazy(() => import('./manager/manager_questions'))
const ExaminationGroups = lazy(() => import('./tutor/examination-groups'))
const UserApplications = lazy(() => import('./tutor/userApplications/list'))
const Certified = lazy(() => import('./tutor/certified/list'))
const ExamSchedule = lazy(() => import('./tutor/exam-schedule'))
const TestProcessing = lazy(() => import('./expert/test-processing'))
const UploadDocuments = lazy(() => import('./documents/upload-documents/list'))
const MyQualification = lazy(() => import('./documents/my-qualification/list'))
const LprUsers = lazy(() => import('./lpr/lpr-users'))
const UserApplicationsDetail = lazy(() => import('./tutor/userApplications/detail'))
const CertifiedDetail = lazy(() => import('./tutor/certified/detail'))
const TestResult = lazy(() => import('./tester/result'))
const LprExam = lazy(() => import('./lpr/lpr-exam'))
const AdminUsers = lazy(() => import('./admin/admin-users/list'))
const AdminUsersDetail = lazy(() => import('./admin/admin-users/detail'))
const AdminExam = lazy(() => import('./admin/admin-exam'))
const Expert = lazy(() => import('./expert/survey'))
const Moderator = lazy(() => import('./moderator/survey'))
const ModeratorTestResult = lazy(() => import('./moderator/moderator-test-result'))
const AttestedAppeal = lazy(() => import('./moderator/attested-appeal'))
const SurveyPartsExpert = lazy(() => import('./expert/survey/surveyParts'))
const SurveyPartsExpertSoft = lazy(() => import('./expert/survey/surveyPartsSoft'))
const SurveyPartsModerator = lazy(() => import('./moderator/survey/surveyParts'))
const SurveyPartsModeratorSoft = lazy(() => import('./moderator/survey/surveyPartsSoft'))
const ModeratorAppeal = lazy(() => import('./moderator/survey/moderatorAppeal'))
// const CreateSoftQuestion = lazy(() =>
//     import('./manager/manager_questions/soft-questions/createSoftQuestion')
// )
// const EditSoftQuestion = lazy(() =>
//     import('./manager/manager_questions/soft-questions/editSoftQuestion')
// )
// const HardQuestions = lazy(() => import('./manager/manager_questions/hard-questions'))

const TestSoftQuestion = lazy(() => import('./test/test-questions'))
const TestTests = lazy(() => import('./test/test-tests'))
const TestTestPageAdd = lazy(() => import('./test/test-page'))
const ManagerQuestionsPage = lazy(() => import('./manager/manager_questions'))

export {
    Login,
    Registration,
    ForgotPassword,
    Profile,
    ProfileDetail,
    AvailableTest,
    TesterSurveyPart,
    Statement,
    UsersDetail,
    UsersList,
    AttestationsQualifications,
    TestsBank,
    QuestionsBank,
    ExaminationGroups,
    UserApplications,
    Certified,
    ExamSchedule,
    MyQualification,
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
    ModeratorTestResult,
    AttestedAppeal,
    Moderator,
    SurveyPartsExpert,
    SurveyPartsExpertSoft,
    SurveyPartsModerator,
    SurveyPartsModeratorSoft,
    ModeratorAppeal,
    // CreateSoftQuestion,
    // HardQuestions,
    // EditSoftQuestion,
    TestSoftQuestion,
    TestTests,
    TestTestPageAdd,
    ManagerQuestionsPage,
}
