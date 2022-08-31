const roles = [
    {
        text: 'Администратор',
        value: 'ADMIN',
    },
    {
        text: 'Модератор',
        value: 'MODERATOR',
    },
    {
        text: 'Эксперт',
        value: 'EXPERT',
    },
    {
        text: 'Тьютор',
        value: 'TUTOR',
    },
    {
        text: 'Менеджер оценочных средств',
        value: 'CONSTRUCTOR',
    },
    {
        text: 'Лицо принимающее решение',
        value: 'LPR',
    },
    {
        text: 'Аттестуемый',
        value: 'TESTER',
    },
]
const inputs = [
    {
        label: 'Фамилия',
        name: 'last_name',
        requiredText: 'Введите фамилию',
    },
    {
        label: 'Имя',
        name: 'first_name',
        requiredText: 'Введите имя',
    },
    {
        label: 'Отчество',
        name: 'patronymic',
        requiredText: 'Введите отчество',
    },
    {
        label: 'Телефон',
        name: 'phone',
        requiredText: 'Введите ваш телефон',
    },
    {
        label: 'Электронная почта',
        name: 'email',
        requiredText: 'Введите электронную почту',
    },
    {
        label: 'Дата рождения',
        name: 'birth_date',
        type: 'date',
        requiredText: 'Введите дату рождения',
        format: 'DD.MM.YYYY',
    },
    {
        label: 'ИНН',
        name: 'inn',
        requiredText: 'Введите ваш ИНН',
        pattern:
            /^(([0-9]{10}([0-9]{2})?)|([0-9]{4}\-[0-9]{5}\-[0-9]{1})|([0-9]{4}\-[0-9]{6}\-[0-9]{2}))$/,
        pattern_message: 'Проверьте правильность ИНН',
    },
    {
        label: 'СНИЛС',
        name: 'snils',
        requiredText: 'Введите ваш СНИЛС',
        pattern: /^(([0-9]{3}\-[0-9]{3}\-[0-9]{3}\-[0-9]{2})|([0-9]{11}))$/,
        pattern_message: 'Проверьте правильность СНИЛСа',
    },
    {
        label: 'VK',
        name: 'vk',
        requiredText: 'Введите профиль VK',
    },
    {
        label: 'Одноклассники',
        name: 'ok',
        requiredText: 'Введите профиль Одноклассники',
    },
    {
        label: 'Youtube',
        name: 'youtube',
        requiredText: 'Введите профиль YouTube',
    },
]
const bioInput = [
    {
        label: 'Моя биография',
        name: 'my_biography',
    },
    {
        label: 'Мои обязанности',
        name: 'my_responsibilities',
    },
    {
        label: 'Достижения и поощрения',
        name: 'rewards',
    },
    {
        label: 'Научные интересы',
        name: 'scientific_interests',
    },
    {
        label: 'Научные гранты',
        name: 'scientific_grants',
    },
    {
        label: 'Проведение конференций',
        name: 'holding_conferences',
    },
    {
        label: 'Участие в конференциях, симпозиумах',
        name: 'participation_conferences',
    },
    {
        label: 'Почетные звания',
        name: 'honoured_title',
    },
    {
        label: 'Научно-общественная деятельность',
        name: 'ssa',
    },
]
const options = [
    { value: 'ADMIN', label: 'Администратор' },
    { value: 'MODERATOR', label: 'Модератор' },
    { value: 'EXPERT', label: 'Эксперт' },
    { value: 'TUTOR', label: 'Тьютор' },
    { value: 'CONSTRUCTOR', label: 'Менеджер оценочных средств' },
    { value: 'LPR', label: 'Лицо принимающее решение' },
    { value: 'TESTER', label: 'Аттестуемый' },
]

export { roles, inputs, bioInput, options }
