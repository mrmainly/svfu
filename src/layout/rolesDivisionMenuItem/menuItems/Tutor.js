import { BsPeople } from 'react-icons/bs'

import ROUTES from '../../../routes'
import { SubMenuItem, MenuSection, ReusableMenu } from './compoents'

const Tutor = (navigate) => {
    return [
        MenuSection('Аттестация', 'submenu-1', <BsPeople />, [
            SubMenuItem('A', 'Аттестуемые', 'submenu-item-1-1', ROUTES.CERTIFIED, navigate),
            SubMenuItem(
                'ЭГ',
                'Заявки пользователей',
                'submenu-item-1-2',
                ROUTES.USER_APPLICATIONS,
                navigate
            ),
            SubMenuItem(
                'ЗП',
                'Экзаменационные группы',
                'submenu-item-1-3',
                ROUTES.EXAMINATION_GROUPS,
                navigate
            ),
            SubMenuItem(
                'РЭ',
                'Расписание экзаменов',
                'submenu-item-1-4',
                ROUTES.EXAM_SCHEDULE,
                navigate
            ),
        ]),
        ReusableMenu(navigate, 2),
    ]
}

export default Tutor
