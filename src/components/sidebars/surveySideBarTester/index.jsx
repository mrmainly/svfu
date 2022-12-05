import { Skeleton } from 'antd'

import { useGetSurveyIdQuery } from '../../../services/tester/Surveys'
import '../surveySideBar.css'
import HardBodyTester from './components/hard_body'
import SoftBodyTester from './components/soft_body'

const SurveySideBarTester = () => {
    const { data, isFetching } = useGetSurveyIdQuery({
        id: window.localStorage.getItem('survey-id'),
    })

    console.log(data)

    if (isFetching) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Skeleton.Button style={{ width: 240, height: 320, marginLeft: 12 }} />
                <Skeleton.Button
                    style={{ width: 240, height: 50, marginLeft: 12, marginTop: 12 }}
                />
                <Skeleton.Button
                    style={{ width: 240, height: 50, marginLeft: 12, marginTop: 12 }}
                />
            </div>
        )
    }
    return (
        <div>
            {data?.unit_type === 'SOFT' ? (
                <SoftBodyTester dataList={data} />
            ) : (
                <HardBodyTester dataList={data} />
            )}
        </div>
    )
}

export default SurveySideBarTester
