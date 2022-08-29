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
