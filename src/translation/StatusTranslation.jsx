export const uaStatus = (status) => {
    switch (status) {
        case 'APPROVED':
            return 'Принято'
            break
        case 'WAITING':
            return 'Ожидание'
            break
        case 'REJECTED':
            return 'Отклонен'
            break
        case 'FINISHED':
            return 'Завершен'
            break
        case 'CANCELLED':
            return 'Отменен'
    }
}

export const testResultStatus = (status) => {
    switch (status) {
        case 'WAITING':
            return 'Ожидание'
            break
        case 'ON_REVIEW':
            return 'На рассмотрении'
            break
        case 'REVIEWED':
            return 'Рассмотрен'
            break
        case 'FINISHED':
            return 'Завершен'
            break
        case 'CANCELLED':
            return 'Отменен'
            break
        default:
            return 'Недоступно'
    }
}

export const tableProcessingStatusResult = (status) => {
    switch (status) {
        case 'WAITING':
            return 'Ожидает проверки'
            break
        case 'REJECTED':
            return 'Отклонено'
            break
        case 'CANCELLED':
            return 'Отменено'
            break
        case 'CHECKED_BY_EXPERTS':
            return 'Проверяется экспертами'
            break
        case 'FINISHED_BY_EXPERTS':
            return 'Проверено экспертами'
            break
        case 'CHECKED_BY_MAIN_EXPERT':
            return 'Эксперт (пред.) проверяет'
            break
        case 'FINISHED_BY_MAIN_EXPERT':
            return 'Проверено экспертом (пред.)'
            break
        case 'CHECKED_BY_MODERATORS':
            return 'Проверяется модераторами'
            break
        case 'FINISHED_BY_MODERATORS':
            return 'Проверено модераторами'
            break
        case 'CHECKED_BY_MAIN_MODERATOR':
            return 'Модератор (пред.) проверяет'
            break
        case 'FINISHED_BY_MAIN_MODERATOR':
            return 'Проверено модератором (пред.)'
            break
        case 'FINISHED':
            return 'Проверено'
            break
        default:
            return 'Недоступно'
    }
}

export const adminUserStatusTrans = (status) => {
    switch (status) {
        case 'ADMIN':
            return 'Администратор'
            break
        case 'MODERATOR':
            return 'Модератор'
            break
        case 'EXPERT':
            return 'Эксперт'
            break
        case 'TUTOR':
            return 'Тьютор'
            break
        case 'CONSTRUCTOR':
            return 'Менеджер оценочных средств'
            break
        case 'LPR':
            return 'Лицо принимающее решение'
            break
        case 'TESTER':
            return 'Аттестуемый'
            break
        default:
            return 'Недоступно'
    }
}
