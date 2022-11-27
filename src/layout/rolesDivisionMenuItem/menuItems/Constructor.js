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
            SubMenuItem(
                'БК',
                'Банк вопросов',
                'submenu-item-1-2',
                ROUTES.MANAGER_QUESTIONS_PAGE,
                navigate
            ),
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
