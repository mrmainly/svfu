import ROUTES from '../../../routes'

import { BsPeople } from 'react-icons/bs'
import { HiOutlineDocumentText } from 'react-icons/hi'

const ADMIN = (navigate) => {
    return [
        {
            label: 'Аттестация',
            key: 'submenu-1',
            icon: <BsPeople />,
            children: [
                {
                    label: 'Расписание экзаменов',
                    key: 'submenu-item-1-1',
                    onClick: () => navigate(ROUTES.ADMIN_EXAM),
                },
                //  {
                //      label: 'Протоколы аттестации',
                //      key: 'submenu-item-1-2',
                //      onClick: () => navigate(ROUTES.ATTESTATION_PROTOCOL),
                //  },
                {
                    label: 'Пользователи',
                    key: 'submenu-item-1-3',
                    onClick: () => navigate(ROUTES.ADMIN_USERS),
                },
            ],
        },
        //   {
        //       label: 'Документы',
        //       key: 'submenu-2',
        //       icon: <HiOutlineDocumentText />,
        //       children: [
        //           {
        //               label: 'Загрузить документы',
        //               key: 'submenu-item-2-1',
        //               onClick: () => navigate(ROUTES.UPLOAD_DOCUMENTS),
        //           },
        //           {
        //               label: 'Мои квалификации',
        //               key: 'submenu-item-2-3',
        //               onClick: () => navigate(ROUTES.MY_QUALIFICATIONS),
        //           },
        //       ],
        //   },
    ]
}

export default ADMIN
