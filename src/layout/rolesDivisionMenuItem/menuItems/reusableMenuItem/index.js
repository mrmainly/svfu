import { MenuSection, SubMenuItem } from '../compoents'
import { HiOutlineDocumentText } from 'react-icons/hi'
import ROUTES from '../../../../routes'

const ReusableMenuItem = (navigate) => {
    return MenuSection('Документы', 'submenu-2', <HiOutlineDocumentText />, [
        SubMenuItem(
            'ЗД',
            'Загрузить документы',
            'submenu-item-2-1',
            ROUTES.UPLOAD_DOCUMENTS,
            navigate
        ),
        SubMenuItem(
            'МК',
            'Мои квалификации',
            'submenu-item-2-2',
            ROUTES.MY_QUALIFICATIONS,
            navigate
        ),
    ])
}

export default ReusableMenuItem
