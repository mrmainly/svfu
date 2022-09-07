export const udDocumentType = (status) => {
    switch (status) {
        case 'DIPLOMA':
            return 'Диплом'
        case 'PASSPORT':
            return 'Паспорт'
        case 'TITLESDEGREES':
            return 'Образование, ученое звание и учёные степени'
        case 'FINISHED':
            return 'Завершен'
        case 'CANCELLED':
            return 'Отменен'
    }
}
