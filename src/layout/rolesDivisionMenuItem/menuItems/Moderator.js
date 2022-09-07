import { BsPeople } from 'react-icons/bs'

import ROUTES from '../../../routes'
import { MenuSection, SubMenuItem } from './compoents'
import ReusableMenuItem from './reusableMenuItem'

const MODERATOR = (navigate) => {
    return [
        MenuSection('Аттестация', 'submenu-1', <BsPeople />, [
            SubMenuItem(
                'РТ',
                'Результаты тестирования',
                'submenu-item-1-1',
                ROUTES.APPILYNG,
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
        ReusableMenuItem(navigate),
    ]
}

export default MODERATOR
