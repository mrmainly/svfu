import PropTypes from 'prop-types'

const InfoListItem = ({ param }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px 0' }}>
            <div
                style={{
                    fontFamily: 'Roboto',
                    fontSize: '18px',
                    fontWeight: '500',
                    lineHeight: '27px',
                    letterSpacing: '0.005em',
                    textAlign: 'left',
                    marginBottom: '10px',
                }}
            >
                {param.name}
            </div>
            <div
                style={{
                    fontFamily: 'Roboto',
                    fontSize: '16px',
                    fontWeight: '300',
                    lineHeight: '24px',
                    letterSpacing: '0.005em',
                    textAlign: 'left',
                }}
            >
                {param.value}
            </div>
        </div>
    )
}

InfoListItem.propTypes = {
    param: PropTypes.object,
}

export default InfoListItem
