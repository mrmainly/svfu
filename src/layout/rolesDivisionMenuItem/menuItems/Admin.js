import { BsPeople } from 'react-icons/bs'

import ROUTES from '../../../routes'
import { MenuSection, SubMenuItem, ReusableMenu } from './compoents'

const ADMIN = (navigate) => {
    return [
        MenuSection('Аттестация', 'submenu-1', <BsPeople />, [
            SubMenuItem(
                'РП',
                'Расписание экзаменов',
                'submenu-item-1-1',
                ROUTES.ADMIN_EXAM,
                navigate
            ),
            SubMenuItem('П', 'Пользователи', 'submenu-item-1-2', ROUTES.ADMIN_USERS, navigate),
        ]),
        ReusableMenu(navigate, 2),
    ]
}

export default ADMIN
