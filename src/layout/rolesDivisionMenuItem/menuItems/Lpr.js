import ROUTES from '../../../routes'
import { SubMenuItem, MenuSection, ReusableMenu } from './compoents'

import { BsPeople } from 'react-icons/bs'

const LPR = (navigate) => {
    return [
        MenuSection('Аттестация', 'submenu-1', <BsPeople />, [
            SubMenuItem(
                'РЭ',
                'Расписание экзаменов',
                'submenu-item-1-1',
                ROUTES.LPR_EXAM,
                navigate
            ),
            SubMenuItem(
                'ПА',
                'Протоколы аттестации',
                'submenu-item-1-2',
                ROUTES.ATTESTATION_PROTOCOL,
                navigate
            ),
            SubMenuItem('П', 'Пользователи', 'submenu-item-1-3', ROUTES.LPR_USERS, navigate),
        ]),
        ReusableMenu(navigate, 2),
    ]
}

export default LPR
