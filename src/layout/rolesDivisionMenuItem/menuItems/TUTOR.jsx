import ROUTES from '../../../routes'

import { BsPeople } from 'react-icons/bs'
import { HiOutlineDocumentText } from 'react-icons/hi'

const TUTOR = (navigate) => {
    return [
        {
            label: 'Аттестация',
            key: 'submenu-1',
            icon: <BsPeople />,
            children: [
                {
                    label: 'Аттестуемые',
                    key: 'submenu-item-1-1',
                    onClick: () => navigate(ROUTES.CERTIFIED),
                },
                {
                    label: 'Заявки пользователей',
                    key: 'submenu-item-1-2',
                    onClick: () => navigate(ROUTES.USER_APPLICATIONS),
                },
                {
                    label: 'Экзаменационные группы',
                    key: 'submenu-item-1-3',
                    onClick: () => navigate(ROUTES.EXAMINATION_GROUPS),
                },
                {
                    label: 'Расписание экзаменов',
                    key: 'submenu-item-1-4',
                    onClick: () => navigate(ROUTES.EXAM_SCHEDULE),
                },
            ],
        },
        {
            label: 'Документы',
            key: 'submenu-2',
            icon: <HiOutlineDocumentText />,
            children: [
                {
                    label: 'Загрузить документы',
                    key: 'submenu-item-2-1',
                    onClick: () => navigate(ROUTES.UPLOAD_DOCUMENTS),
                },
                {
                    label: 'Мои квалификации',
                    key: 'submenu-item-2-3',
                    onClick: () => navigate(ROUTES.MY_QUALIFICATIONS),
                },
            ],
        },
    ]
}

export default TUTOR
