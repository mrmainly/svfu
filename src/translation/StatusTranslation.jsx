export const userAppilicationStatus = (status) => {
    switch (status) {
        case 'APPROVED':
            return 'Принято'
        case 'WAITING':
            return 'Ожидание'
        case 'REJECTED':
            return 'Отклонен'
        case 'FINISHED':
            return 'Завершен'
        case 'CANCELLED':
            return 'Отменен'
    }
}

export const testResultStatus = (status) => {
    switch (status) {
        case 'WAITING':
            return 'Ожидание'
        case 'ON_REVIEW':
            return 'На рассмотрении'
        case 'REVIEWED':
            return 'Рассмотрен'
        case 'FINISHED':
            return 'Завершен'
        case 'CANCELLED':
            return 'Отменен'
        default:
            return 'Недоступно'
    }
}

export const tableProcessingStatusResult = (status) => {
    switch (status) {
        case 'WAITING':
            return 'Ожидает проверки'
        case 'REJECTED':
            return 'Отклонено'
        case 'CANCELLED':
            return 'Отменено'
        case 'CHECKED_BY_EXPERTS':
            return 'Проверяется экспертами'
        case 'FINISHED_BY_EXPERTS':
            return 'Проверено экспертами'
        case 'CHECKED_BY_MAIN_EXPERT':
            return 'Эксперт (пред.) проверяет'
        case 'FINISHED_BY_MAIN_EXPERT':
            return 'Проверено экспертом (пред.)'
        case 'CHECKED_BY_MODERATORS':
            return 'Проверяется модераторами'
        case 'FINISHED_BY_MODERATORS':
            return 'Проверено модераторами'
        case 'CHECKED_BY_MAIN_MODERATOR':
            return 'Модератор (пред.) проверяет'
        case 'FINISHED_BY_MAIN_MODERATOR':
            return 'Проверено модератором (пред.)'
        case 'FINISHED':
            return 'Проверено'
        default:
            return 'Недоступно'
    }
}

export const adminUserStatusTrans = (status) => {
    switch (status) {
        case 'ADMIN':
            return 'Администратор'
        case 'MODERATOR':
            return 'Модератор'
        case 'EXPERT':
            return 'Эксперт'
        case 'TUTOR':
            return 'Тьютор'
        case 'CONSTRUCTOR':
            return 'Менеджер оценочных средств'
        case 'LPR':
            return 'Лицо принимающее решение'
        case 'TESTER':
            return 'Аттестуемый'
        default:
            return 'Недоступно'
    }
}
