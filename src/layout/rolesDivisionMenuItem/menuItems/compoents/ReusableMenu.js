import { MenuSection, SubMenuItem } from '../compoents'
import { HiOutlineDocumentText } from 'react-icons/hi'
import ROUTES from '../../../../routes'

const ReusableMenuItem = (navigate, indexSectionMenu) => {
    return MenuSection('Документы', `submenu-${indexSectionMenu}`, <HiOutlineDocumentText />, [
        SubMenuItem(
            'ЗД',
            'Загрузить документы',
            `submenu-item-${indexSectionMenu}-1`,
            ROUTES.UPLOAD_DOCUMENTS,
            navigate
        ),
        SubMenuItem(
            'МК',
            'Мои квалификации',
            `submenu-item-${indexSectionMenu}-2`,
            ROUTES.MY_QUALIFICATIONS,
            navigate
        ),
    ])
}

export default ReusableMenuItem
