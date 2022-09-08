const statusChoices = {
    WAITING: 'Ожидание',
    APPROVED: 'Принято',
    REJECTED: 'Отклонен',
    FINISHED: 'Завершен',
    CANCELLED: 'Отменен',
    ON_REVIEW: 'На рассмотрении',
    REVIEWED: 'Рассмотрен',
    CHECKED_BY_EXPERTS: 'Проверяется экспертами',
    FINISHED_BY_EXPERTS: 'Проверено экспертами',
    CHECKED_BY_MAIN_EXPERT: 'Эксперт (пред.) проверяет',
    FINISHED_BY_MAIN_EXPERT: 'Проверено экспертом (пред.)',
    CHECKED_BY_MODERATORS: 'Проверяется модераторами',
    FINISHED_BY_MODERATORS: 'Проверено модераторами',
    CHECKED_BY_MAIN_MODERATOR: 'Модератор (пред.) проверяет',
    FINISHED_BY_MAIN_MODERATOR: 'Проверено модератором (пред.)',
    CERTIFIED: 'Aттестован',
    CERTIFIED_WITH_ENCOURAGEMENT: 'Аттестован с поощрением',
    CERTIFIED_UNDER_CERTAIN_CONDITIONS: 'Аттестован при определенных условиях',
    NOT_CERTIFIED: 'Не аттестован',
    IN_PROGRESS: 'Идет тест',
}

export default statusChoices
