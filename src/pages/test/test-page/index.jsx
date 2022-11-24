import {useLocation} from 'react-router-dom'
import ObrTest from './components/obr-test'
const TestTestPageAdd = () => {
    const location = useLocation()

    const state = location.state

    const {type} = state

    const renderType = () => {
        switch(type) {
            case 1: return (
                <ObrTest/>
            )
            case 2: return (
                <div>
                    дssssssss {type}
                </div>
            )
            case 3: return (
                <div>
                    дssssssss {type}
                </div>
            )
        }
    }

    return(
        <div>
            {renderType()}
        </div>
    )

}

export default TestTestPageAdd