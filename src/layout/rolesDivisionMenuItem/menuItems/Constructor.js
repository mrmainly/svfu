import { BsPeople } from 'react-icons/bs'

import ROUTES from '../../../routes'
import { MenuSection, SubMenuItem, ReusableMenu } from './compoents'

const CONSTRUCTOR = (navigate) => {
    return [
        MenuSection('Аттестация', 'submenu-1', <BsPeople />, [
            SubMenuItem(
                'КА',
                'Квалификация аттестаций',
                'submenu-item-1-1',
                ROUTES.ATTESTATION_QUALI,
                navigate
            ),
            MenuSection('Банк вопросов', 'submenu-1-1', <div>БВ</div>, [
                SubMenuItem(
                    'SВ',
                    '(soft) вопросы',
                    'submenu-item-1-1-1',
                    ROUTES.SOFT_QUESTIONS,
                    navigate
                ),
                SubMenuItem(
                    'HВ',
                    '(hard) вопросы',
                    'submenu-item-1-1-2',
                    ROUTES.HARD_QUESTIONS,
                    navigate
                ),
            ]),
            SubMenuItem(
                'БТ',
                'Банк тестирований',
                'submenu-item-1-3',
                ROUTES.ATTESTATION_TESTS_BANK,
                navigate
            ),
        ]),
        ReusableMenu(navigate, 2),
    ]
}

export default CONSTRUCTOR
