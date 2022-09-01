export const udEstimate = (status) => {
    switch (status) {
        case 'WAITING':
            return 'Ожидание'
            break
        case 'CERTIFIED':
            return 'Aттестован'
            break
        case 'CERTIFIED_WITH_ENCOURAGEMENT':
            return 'Аттестован с поощрением'
            break
        case 'CERTIFIED_UNDER_CERTAIN_CONDITIONS':
            return 'Аттестован при определенных условиях'
            break
        case 'NOT_CERTIFIED':
            return 'Не аттестован'
    }
}
