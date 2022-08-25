import ROUTES from '../../../routes'

import { BsPeople } from 'react-icons/bs'
import { HiOutlineDocumentText } from 'react-icons/hi'

const LPR = (navigate) => {
    return [
        {
            label: 'Аттестация',
            key: 'submenu-1',
            icon: <BsPeople />,
            children: [
                {
                    label: 'Расписание экзаменов',
                    key: 'submenu-item-1-4',
                    onClick: () => navigate(ROUTES.EXAM_SCHEDULE),
                },
                {
                    label: 'Протоколы аттестации',
                    key: 'submenu-item-1-6',
                    onClick: () => navigate(ROUTES.ATTESTATION_PROTOCOL),
                },
                // {
                //     label: 'Пользователи',
                //     key: 'submenu-item-1-7',
                //     onClick: () => navigate(ROUTES.TEST_PROCESSING),
                // },
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
                    onClick: () => navigate(ROUTES.DOCUMENTS),
                },
                {
                    label: 'Мои квалификации',
                    key: 'submenu-item-2-3',
                    onClick: () => navigate(ROUTES.MY_QUALIFICATIONS),
                },
            ],
        },
        {
            label: 'Пользователи',
            key: 'submenu-3',
            icon: <BsPeople />,
            children: [
                {
                    label: 'Пользователи',
                    key: 'submenu-item-3-1',
                    onClick: () => navigate(ROUTES.USERS),
                },
            ],
        },
    ]
}

export default LPR
