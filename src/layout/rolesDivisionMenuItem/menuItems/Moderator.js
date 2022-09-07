import { BsPeople } from 'react-icons/bs'

import ROUTES from '../../../routes'
import { MenuSection, SubMenuItem, ReusableMenu } from './compoents'

const MODERATOR = (navigate) => {
    return [
        MenuSection('Аттестация', 'submenu-1', <BsPeople />, [
            SubMenuItem(
                'РТ',
                'Результаты тестирования',
                'submenu-item-1-1',
                ROUTES.MODERATOR_TEST_RESULT,
                navigate
            ),
            SubMenuItem(
                'АА',
                'Апелляции аттестуемых',
                'submenu-item-1-2',
                ROUTES.ATTESTED_APPEAL,
                navigate
            ),
        ]),
        ReusableMenu(navigate, 2),
    ]
}

export default MODERATOR
