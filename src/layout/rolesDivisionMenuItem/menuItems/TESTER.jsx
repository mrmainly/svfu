import ROUTES from '../../../routes'

import { BsCardChecklist, BsPeople } from 'react-icons/bs'
import { HiOutlineDocumentText } from 'react-icons/hi'

const TESTER = (navigate) => {
    return [
        {
            label: 'Тестирование',
            key: 'submenu-1',
            icon: <BsCardChecklist />,
            children: [
                {
                    label: 'Подача заявления',
                    key: 'submenu-item-1-1',
                    onClick: () => navigate(ROUTES.APPILYNG),
                },
                {
                    label: 'Доступные тесты',
                    key: 'submenu-item-1-2',
                    onClick: () => navigate(ROUTES.AVAILABLE_TESTS),
                },
                {
                    label: 'Итоги аттестации',
                    key: 'submenu-item-1-3',
                    onClick: () => navigate(ROUTES.CERTIFICATION_RESULTS),
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
        // {
        //     label: 'Пользователи',
        //     key: 'submenu-3',
        //     icon: <BsPeople />,
        //     children: [
        //         {
        //             label: 'Пользователи',
        //             key: 'submenu-item-3-1',
        //             onClick: () => navigate(ROUTES.USERS),
        //         },
        //     ],
        // },
    ]
}

export default TESTER
