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
                    icon: <div>А</div>,
                    label: 'Аттестуемые',
                    key: 'submenu-item-1-1',
                    onClick: () => navigate(ROUTES.CERTIFIED),
                },
                {
                    icon: <div>ЗП</div>,
                    label: 'Заявки пользователей',
                    key: 'submenu-item-1-2',
                    onClick: () => navigate(ROUTES.USER_APPLICATIONS),
                },
                {
                    icon: <div>ЭГ</div>,
                    label: 'Экзаменационные группы',
                    key: 'submenu-item-1-3',
                    onClick: () => navigate(ROUTES.EXAMINATION_GROUPS),
                },
                {
                    icon: <div>РЭ</div>,
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
                    icon: <div>ЗД</div>,
                    label: 'Загрузить документы',
                    key: 'submenu-item-2-1',
                    onClick: () => navigate(ROUTES.UPLOAD_DOCUMENTS),
                },
                {
                    icon: <div>МК</div>,
                    label: 'Мои квалификации',
                    key: 'submenu-item-2-3',
                    onClick: () => navigate(ROUTES.MY_QUALIFICATIONS),
                },
            ],
        },
    ]
}

export default TUTOR
