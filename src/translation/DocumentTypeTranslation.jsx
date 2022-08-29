export const udDocumentType = (status) => {
    switch (status) {
        case 'DIPLOMA':
            return 'Диплом'
            break
        case 'PASSPORT':
            return 'Паспорт'
            break
        case 'TITLESDEGREES':
            return 'Образование, ученое звание и учёные степени'
            break
        case 'FINISHED':
            return 'Завершен'
            break
        case 'CANCELLED':
            return 'Отменен'
    }
}
