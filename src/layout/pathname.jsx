import ROUTES from '../routes'
import { roles } from '../translation/RolesTranslation'
import { BsArrowLeft } from 'react-icons/bs'

export const pathname = (params, path, role, full_name, navigate, current_path) => {
    switch (params.pathname) {
        case ROUTES.PROFILE:
            return 'Профиль'
        case ROUTES.PROFILE_EDITING:
            return 'Редактирование профиля'
        case ROUTES.AVAILABLE_TESTS:
            return 'Доступные тесты'
        case ROUTES.CERTIFICATION_RESULTS:
            return 'Итоги аттестации'
        case ROUTES.AVAILABLE_TEST:
            return 'Название_теста'
        case ROUTES.TEST_RESULTS:
            return 'Результаты тестов'
        case ROUTES.TEST_RESULT:
            return 'Название_теста'
        case ROUTES.UPLOAD_DOCUMENTS:
            return 'Документы'
        case ROUTES.DOCUMENTS_EDITING:
            return 'Редактирование документов'
        case ROUTES.MY_QUALIFICATIONS:
            return 'Мои квалификации'
        case ROUTES.QUALIFICATION_EDITING:
            return 'Редактирование квалификации'
        case ROUTES.APPILYNG:
            return 'Подача заявления'
        case ROUTES.QUALIFICATION_ADDED:
            return 'Загрузить квалификацию'
        case ROUTES.ATTESTATION_QUALI:
            return 'Квалификации аттестаций'
        case ROUTES.USERS:
            return 'Пользователи'
        case ROUTES.ATTESTATION_TESTS_BANK:
            return 'Банк тестов'
        case ROUTES.ATTESTATION_QUESTIONS_BANK:
            return 'Банк вопросов'
        case ROUTES.EXAMINATION_GROUPS:
            return 'Экзаменационные группы'
        case ROUTES.USER_APPLICATIONS:
            return 'Заявки пользователей'
        case ROUTES.CERTIFIED:
            return 'Аттестуемые'
        case ROUTES.EXAM_SCHEDULE:
            return 'Расписание экзаменов'
        case ROUTES.TEST_PROCESSING:
            return 'Обработка тестов'
        case ROUTES.ATTESTATION_PROTOCOL:
            return 'Аттестационные протоколы'
        case ROUTES.LPR_USERS:
            return 'Пользователи'
        case ROUTES.LPR_USERS_DETAIL:
            return ''
        case ROUTES.TEST_RESULT:
            return 'Пользователи'
        case ROUTES.LPR_EXAM:
            return 'Расписание экзаменов'
        case ROUTES.ADMIN_USERS:
            return 'Пользователи'
        case ROUTES.ADMIN_EXAM:
            return 'Расписание экзаменов'
        case ROUTES.MODERATOR_TEST_RESULT:
            return 'Подтверждение экспертизы'
        case ROUTES.ATTESTED_APPEAL:
            return 'Апелляции'
        case current_path:
            return (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'start',
                        alignItems: 'center',
                        marginBottom: '10px',
                    }}
                >
                    <BsArrowLeft
                        style={{ fontSize: 30, cursor: 'pointer', marginRight: '10px' }}
                        onClick={() => {
                            navigate(path)
                        }}
                    />
                    <span
                        style={{
                            fontFamily: 'Roboto',
                            fontStyle: 'normal',
                            fontWeight: '400',
                            fontSize: '20px',
                            lineHeight: '30px',
                        }}
                    >
                        {roles(role) + ' ' + full_name}
                    </span>
                </div>
            )
    }
}
