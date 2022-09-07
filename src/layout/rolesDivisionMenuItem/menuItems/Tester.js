import ROUTES from '../../../routes'
import { SubMenuItem, MenuSection, ReusableMenu } from './compoents'

import { BsCardChecklist } from 'react-icons/bs'

const TESTER = (navigate) => {
    return [
        MenuSection('Тестирование', 'submenu-1', <BsCardChecklist />, [
            SubMenuItem('ПЗ', 'Подача заявления', 'submenu-item-1-1', ROUTES.APPILYNG, navigate),
            SubMenuItem(
                'ДТ',
                'Доступные тесты',
                'submenu-item-1-2',
                ROUTES.AVAILABLE_TESTS,
                navigate
            ),
        ]),
        ReusableMenu(navigate, 2),
    ]
}

export default TESTER
