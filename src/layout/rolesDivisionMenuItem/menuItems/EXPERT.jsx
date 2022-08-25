import ROUTES from '../../../routes'

import { BsPeople } from 'react-icons/bs'
import { HiOutlineDocumentText } from 'react-icons/hi'

const EXPERT = (navigate) => {
    return [
        {
            label: 'Аттестация',
            key: 'submenu-1',
            icon: <BsPeople />,
            children: [
                {
                    label: 'Обработка тестов',
                    key: 'submenu-item-1-5',
                    onClick: () => navigate(ROUTES.TEST_PROCESSING),
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
                    onClick: () => navigate(ROUTES.DOCUMENTS),
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

export default EXPERT
