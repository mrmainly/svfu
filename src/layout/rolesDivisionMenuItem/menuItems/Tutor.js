import { BsPeople } from 'react-icons/bs'

import { SubMenuItem, MenuSection } from './compoents'
import ReusableMenuItem from './reusableMenuItem'
import ROUTES from '../../../routes'

const Tutor = (navigate) => {
    return [
        MenuSection('Аттестация', 'submenu-1', <BsPeople />, [
            SubMenuItem('A', 'Аттестируемые', 'submenu-item-1-1', ROUTES.CERTIFIED, navigate),
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
        ReusableMenuItem(navigate),
    ]
}

export default Tutor
