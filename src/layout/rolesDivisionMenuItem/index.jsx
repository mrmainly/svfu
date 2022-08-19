import TESTER from './menuItems/TESTER'
import TUTOR from './menuItems/TUTOR'
import CONSTRUCTOR from './menuItems/CONSTRUCTOR'

const RolesDivisionMenuItem = (navigate) => {
    const role = JSON.parse(localStorage.getItem('role'))

    if (role === 'TESTER') {
        return TESTER(navigate)
    } else if (role === 'CONSTRUCTOR') {
        return CONSTRUCTOR(navigate)
    } else if (role === 'TUTOR') {
        return TUTOR(navigate)
    }
}

export default RolesDivisionMenuItem
