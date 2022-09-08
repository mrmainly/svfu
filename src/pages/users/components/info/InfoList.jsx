import PropTypes from 'prop-types'

import InfoListItem from './InfoListItem'

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
