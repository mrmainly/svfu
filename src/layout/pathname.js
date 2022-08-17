import ROUTES from "../routes";

export const pathname = (params) => {
    switch (params.pathname) {
        case ROUTES.PROFILE:
            return "Профиль";
            break;
        case ROUTES.PROFILE_EDITING:
            return "Редактирование профиля";
            break;
        case ROUTES.AVAILABLE_TESTS:
            return "Доступные тесты";
            break;
        case ROUTES.CERTIFICATION_RESULTS:
            return "Итоги аттестации";
            break;
        case ROUTES.AVAILABLE_TEST:
            return "Название_теста";
            break;
        case ROUTES.TEST_RESULTS:
            return "Результаты тестов";
            break;
        case ROUTES.TEST_RESULT:
            return "Название_теста";
            break;
        case ROUTES.DOCUMENTS:
            return "Документы";
            break;
        case ROUTES.DOCUMENTS_EDITING:
            return "Редактирование документов";
            break;
        case ROUTES.MY_QUALIFICATIONS:
            return "Мои квалификации";
            break;
        case ROUTES.QUALIFICATION_EDITING:
            return "Редактирование квалификации";
            break;
        case ROUTES.APPILYNG:
            return "Подача заявления";
            break;
        case ROUTES.QUALIFICATION_ADDED:
            return "Загрузить квалификацию";
            break
        case ROUTES.USERS:
            return "Пользователи";
            break
    }
};
