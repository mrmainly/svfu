import ParamsListItem from './ParamsListItem'
import PropTypes from 'prop-types'

const ParamsList = ({ params }) => {
    return (
        <div style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {params.map((param) => (
                <ParamsListItem param={param} key={param.name} />
            ))}
        </div>
    )
}

ParamsList.propTypes = {
    params: PropTypes.array,
}

export default ParamsList
