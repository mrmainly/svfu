export const roles = (role) => {
    switch (role) {
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
            return ''
    }
}
