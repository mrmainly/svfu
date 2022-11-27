import ROUTES from '../routes'
import { BsArrowLeft } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

export const pathname = (params) => {
    const navigate = useNavigate()

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
        case ROUTES.STATEMENT:
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
        case ROUTES.LPR_EXAM:
            return 'Расписание экзаменов'
        case ROUTES.ADMIN_USERS:
            return 'Пользователи'
        case ROUTES.ADMIN_EXAM:
            return 'Расписание экзаменов'
        case ROUTES.MODERATOR_TEST_RESULT:
            return 'Результаты тестирования'
        case ROUTES.ATTESTED_APPEAL:
            return 'Апелляции'
        case ROUTES.TAGS_LIST:
            return 'Теги'
        case ROUTES.NEW_QUESTION:
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
                            navigate(-1)
                        }}
                    />
                    <span>Создание вопроса</span>
                </div>
            )
        case ROUTES.MANAGER_QUESTIONS_PAGE:
            return 'Банк вопросов'
        case ROUTES.MANAGER_QUESTIONS_CREATE_PAGE:
            return 'Создание вопросов'
        case ROUTES.HARD_QUESTIONS:
            return 'Hard вопросы'
        case ROUTES.EDIT_SOFT_QUESTION:
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
                            navigate('/soft-questions')
                        }}
                    />
                    <span>Редактирование soft вопрсов</span>
                </div>
            )
        case ROUTES.EXPERT:
            return (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <BsArrowLeft
                        style={{
                            fontSize: 30,
                            cursor: 'pointer',
                            marginRight: '10px',
                            marginBottom: 2,
                        }}
                        onClick={() => {
                            navigate(-1)
                        }}
                    />
                    <div>Просмотр теста</div>
                </div>
            )
        default:
            new Error()
    }
}
