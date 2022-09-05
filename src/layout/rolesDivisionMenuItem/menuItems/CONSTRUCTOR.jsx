import ROUTES from '../../../routes'

import { BsCardChecklist, BsPeople } from 'react-icons/bs'
import { HiOutlineDocumentText } from 'react-icons/hi'

const CONSTRUCTOR = (navigate) => {
    return [
        {
            label: 'Аттестация',
            key: 'submenu-1',
            icon: <BsPeople />,
            children: [
                {
                    icon: <div>КА</div>,
                    label: 'Квалификация аттестаций',
                    key: 'submenu-item-1-1',
                    onClick: () => navigate(ROUTES.ATTESTATION_QUALI),
                },
                {
                    icon: <div>БВ</div>,
                    label: 'Банк вопросов',
                    key: 'submenu-item-1-3',
                    onClick: () => navigate(ROUTES.ATTESTATION_QUESTIONS_BANK),
                },
                {
                    icon: <div>БТ</div>,
                    label: 'Банк тестирований',
                    key: 'submenu-item-1-2',
                    onClick: () => navigate(ROUTES.ATTESTATION_TESTS_BANK),
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

export default CONSTRUCTOR
