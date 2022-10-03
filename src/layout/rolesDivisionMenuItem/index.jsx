/* eslint-disable no-undef */
import TESTER from './menuItems/Tester'
import TUTOR from './menuItems/Tutor'
import CONSTRUCTOR from './menuItems/Constructor'
import EXPERT from './menuItems/Expert'
import LPR from './menuItems/Lpr'
import ADMIN from './menuItems/Admin'
import MODERATOR from './menuItems/Moderator'

const RolesDivisionMenuItem = (navigate) => {
    const role = JSON.parse(localStorage.getItem('role'))

    if (role === 'TESTER') {
        return TESTER(navigate)
    } else if (role === 'CONSTRUCTOR') {
        return CONSTRUCTOR(navigate)
    } else if (role === 'TUTOR') {
        return TUTOR(navigate)
    } else if (role === 'EXPERT') {
        return EXPERT(navigate)
    } else if (role === 'LPR') {
        return LPR(navigate)
    } else if (role === 'ADMIN') {
        return ADMIN(navigate)
    } else if (role === 'MODERATOR') {
        return MODERATOR(navigate)
    } else {
        return []
    }
}

export default RolesDivisionMenuItem
