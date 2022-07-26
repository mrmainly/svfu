import PropTypes from 'prop-types'

const ParamsListItem = ({ param }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
            <div
                style={{
                    width: '200px',
                    fontFamily: 'Roboto',
                    fontSize: '16px',
                    fontWeight: 500,
                    lineHeight: '24px',
                    letterSpacing: '0.005em',
                    textAlign: 'left',
                }}
            >
                {param.name}
            </div>
            <div
                style={{
                    fontFamily: 'Roboto',
                    fontWeight: 300,
                    fontSize: '16px',
                    lineHeight: '24px',
                    letterSpacing: '0.005em',
                }}
            >
                {param.value}
            </div>
        </div>
    )
}

ParamsListItem.propTypes = {
    param: PropTypes.any,
}

export default ParamsListItem
