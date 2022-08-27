import moment from 'moment'

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
                {param.name === 'Дата рождения'
                    ? param.value !== '-'
                        ? moment(param.value).format('DD.MM.YYYY')
                        : param.value
                    : param.value}
            </div>
        </div>
    )
}
export default ParamsListItem
