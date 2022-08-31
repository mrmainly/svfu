import { Button } from 'antd'
import ParamsList from './params/ParamsList'
import InfoList from './info/InfoList'

export const AttestedInfo = ({ contacts, profileData, bio }) => {
    return (
        <>
            <div>
                <ParamsList params={profileData} />
                <hr />
                <p
                    style={{
                        marginTop: '16px',
                        marginBottom: 0,
                        fontFamily: 'Roboto',
                        fontWeight: 400,
                        fontSize: '18px',
                        lineHeight: '27px',
                        fontStyle: 'italic',
                    }}
                >
                    Социальные сети
                </p>
                <ParamsList params={contacts} />
                <hr />
            </div>
            <div>
                <InfoList params={bio} />
            </div>
        </>
    )
}
