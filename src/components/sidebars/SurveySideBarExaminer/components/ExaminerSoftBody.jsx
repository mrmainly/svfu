import React from 'react'
import { Button } from 'antd'
import { PropTypes } from 'prop-types'

const SoftBody = ({ data, changeQuestion, arrayIndex, completeConclusion }) => {
    const colorSwitchDanger = (id) => {
        const newData = data.survey?.softquestions
            .map((itemAnswer) => {
                if (itemAnswer.q_id === id) {
                    return itemAnswer.score
                }
            })
            .filter((element) => element != undefined)
            .reduce((prev, curr) => prev + curr, 0)

        if (newData === 0) {
            return '#2f80ed'
        } else {
            return '#2f80ed'
        }
    }
    return (
        <div className="survey-sidebar">
            <div
                className="root"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                <div>
                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                        }}
                    >
                        {data?.survey?.softquestions?.length &&
                            data?.survey?.softquestions?.map((item, index) => (
                                <div
                                    key={index}
                                    className="circul"
                                    style={{
                                        background:
                                            arrayIndex === index
                                                ? colorSwitchDanger(item.q_id)
                                                : 'white',
                                        color:
                                            arrayIndex === index
                                                ? 'white'
                                                : colorSwitchDanger(item.q_id),
                                        borderColor: '#2f80ed',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => changeQuestion(index)}
                                >
                                    {index + 1}
                                </div>
                            ))}
                    </div>
                </div>
            </div>
            <Button
                type="default"
                style={{
                    borderColor: '#BF4C25',
                    color: '#BF4C25',
                    width: '100%',
                    marginTop: 12,
                    borderRadius: 3,
                }}
                size="large"
                htmlType="submit"
                form="expert-soft-form"
                onClick={completeConclusion}
            >
                Завершить экспертизу
            </Button>
        </div>
    )
}

SoftBody.propTypes = {
    data: PropTypes.object,
    changeQuestion: PropTypes.func,
    arrayIndex: PropTypes.number,
    part: PropTypes.string,
    completeConclusion: PropTypes.func,
}

export default SoftBody
