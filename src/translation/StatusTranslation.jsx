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
