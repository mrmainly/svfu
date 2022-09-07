import { BsPeople } from 'react-icons/bs'

import ROUTES from '../../../routes'
import { SubMenuItem, MenuSection, ReusableMenu } from './compoents'

const EXPERT = (navigate) => {
    return [
        MenuSection('Аттестация', 'submenu-1', <BsPeople />, [
            SubMenuItem(
                'ОТ',
                'Обработка тестов',
                'submenu-item-1-1',
                ROUTES.TEST_PROCESSING,
                navigate
            ),
        ]),
        ReusableMenu(navigate, 2),
    ]
}

export default EXPERT
