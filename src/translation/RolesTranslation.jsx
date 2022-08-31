export const roles = (role) => {
    switch (role) {
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
    }
}
