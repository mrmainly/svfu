import ROUTES from '../../../routes'
import ReusableMenuItem from './reusableMenuItem'
import { SubMenuItem, MenuSection } from './compoents'

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
        ReusableMenuItem(navigate),
    ]
}

export default TESTER
