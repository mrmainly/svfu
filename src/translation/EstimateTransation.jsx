export const udEstimate = (status) => {
    switch (status) {
        case 'WAITING':
            return 'Ожидание'
        case 'CERTIFIED':
            return 'Aттестован'
        case 'CERTIFIED_WITH_ENCOURAGEMENT':
            return 'Аттестован с поощрением'
        case 'CERTIFIED_UNDER_CERTAIN_CONDITIONS':
            return 'Аттестован при определенных условиях'
        case 'NOT_CERTIFIED':
            return 'Не аттестован'
    }
}
