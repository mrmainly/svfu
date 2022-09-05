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
                    icon: <div>ПЗ</div>,
                    label: 'Подача заявления',
                    key: 'submenu-item-1-1',
                    onClick: () => navigate(ROUTES.APPILYNG),
                },
                {
                    icon: <div>ДТ</div>,
                    label: 'Доступные тесты',
                    key: 'submenu-item-1-2',
                    onClick: () => navigate(ROUTES.AVAILABLE_TESTS),
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
