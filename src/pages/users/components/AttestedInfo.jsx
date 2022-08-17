import { Button } from 'antd';
import ParamsList from './params/ParamsList';
import InfoList from './info/InfoList';

export const AttestedInfo = ({ contacts, profileData, bio }) => {
    return (
        <>
            <div>
                <ParamsList params={profileData} />
                <hr />
                <h1>Социальные сети</h1>
                <ParamsList params={contacts} />
                <hr />
            </div>
            <div>
                <InfoList params={bio} />
            </div>
            <Button danger>Заблокировать</Button>
        </>
    );
};
