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
                    icon: <div>РЭ</div>,
                    label: 'Расписание экзаменов',
                    key: 'submenu-item-1-8',
                    onClick: () => navigate(ROUTES.LPR_EXAM),
                },
                {
                    icon: <div>ПА</div>,
                    label: 'Протоколы аттестации',
                    key: 'submenu-item-1-6',
                    onClick: () => navigate(ROUTES.ATTESTATION_PROTOCOL),
                },
                {
                    icon: <div>П</div>,
                    label: 'Пользователи',
                    key: 'submenu-item-1-7',
                    onClick: () => navigate(ROUTES.LPR_USERS),
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

export default LPR
