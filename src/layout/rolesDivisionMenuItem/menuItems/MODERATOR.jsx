import ROUTES from '../../../routes'

import { BsPeople } from 'react-icons/bs'
import { HiOutlineDocumentText } from 'react-icons/hi'

const MODERATOR = (navigate) => {
    return [
        {
            label: 'Аттестация',
            key: 'submenu-1',
            icon: <BsPeople />,
            children: [
                {
                    label: 'Результаты тестирования',
                    key: 'submenu-item-1-9',
                    onClick: () => navigate(ROUTES.MODERATOR_TEST_RESULT),
                },
                {
                    label: 'Апелляция аттестуемых',
                    key: 'submenu-item-1-10',
                    onClick: () => navigate(ROUTES.ATTESTED_APPEAL),
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

export default MODERATOR
