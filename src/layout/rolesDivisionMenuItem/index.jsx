import TESTER from './menuItems/TESTER'
import TUTOR from './menuItems/TUTOR'
import CONSTRUCTOR from './menuItems/CONSTRUCTOR'
import EXPERT from './menuItems/EXPERT'
import LPR from './menuItems/LPR'
import ADMIN from './menuItems/ADMIN'
import MODERATOR from './menuItems/MODERATOR'

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
    }
}

export default RolesDivisionMenuItem
