import InfoListItem from './InfoListItem'
import PropTypes from 'prop-types'

const InfoList = ({ params }) => {
    return (
        <>
            {params.map((param) => (
                <InfoListItem param={param} key={param.name} />
            ))}
        </>
    )
}

InfoList.propTypes = {
    params: PropTypes.array,
}

export default InfoList
