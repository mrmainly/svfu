import React from 'react'
import { useLocation } from 'react-router-dom'
import { Typography, Form } from 'antd'

const { Text, Title } = Typography

const PracticalPartExMo = () => {
    const location = useLocation()
    const state = location.state
    const { surveyquest } = state

    return (
        <div>
            <Form style={{ display: 'flex', flexDirection: 'column' }}>
                {surveyquest?.survey?.surveyquest_part_two?.length
                    ? surveyquest?.survey?.surveyquest_part_two.map((item, index) => (
                          <div
                              key={index}
                              style={{
                                  flexDirection: 'column',
                              }}
                          >
                              <Title level={4}>Практический вопрос</Title>
                              <Text style={{ marginTop: 12 }}>{item.question.description}</Text>
                              {item?.question?.question_images.length && (
                                  <div style={{ display: 'flex', flexDirection: ' column' }}>
                                      {item?.question?.question_images.map((itemImage, index) => (
                                          <div
                                              key={index}
                                              style={{
                                                  height: 150,
                                                  objectFit: 'cover',
                                                  marginTop: 20,
                                                  background: `url(${itemImage.image})`,
                                                  backgroundRepeat: 'no-repeat',
                                                  backgroundSize: 'contain',
                                              }}
                                          />
                                      ))}
                                  </div>
                              )}
                              {item.question?.question_files?.length > 0 && (
                                  <div
                                      style={{
                                          display: 'flex',
                                          flexDirection: 'column',
                                          marginTop: 10,
                                      }}
                                  >
                                      <Text>Прикрепленныe файлы:</Text>
                                      <div style={{ display: 'flex', marginTop: 10 }}>
                                          {item.question.question_files.map((itemFile, index) => (
                                              <a
                                                  href={itemFile.file}
                                                  target="_blank"
                                                  key={index}
                                                  style={{ marginLeft: index === 0 ? 0 : 10 }}
                                                  rel="noopener noreferrer"
                                              >
                                                  {decodeURI(itemFile.file).split('/')[5]}
                                              </a>
                                          ))}
                                      </div>
                                  </div>
                              )}
                              <div style={{ marginTop: 10 }}>
                                  <Title level={5}>Ответ аттестуемого:</Title>
                                  {surveyquest?.answers_second_part?.map((itemAnswer, index) => {
                                      if (itemAnswer.question_id === item.question.id)
                                          return <Text key={index}>{itemAnswer.answer}</Text>
                                  })}
                              </div>
                              <div style={{ marginTop: 10 }}>
                                  <Title level={5}>Файл закрепленный аттестуемым:</Title>
                                  {surveyquest.question_second_part_answer_file.map(
                                      (itemAnswer, index) => {
                                          if (itemAnswer.survey_question === item.question.id)
                                              return (
                                                  <a
                                                      href={itemAnswer.file}
                                                      target="_blank"
                                                      key={index}
                                                      style={{ marginLeft: index === 0 ? 0 : 10 }}
                                                      rel="noopener noreferrer"
                                                  >
                                                      {decodeURI(itemAnswer.file).split('/')[5]}
                                                  </a>
                                              )
                                      }
                                  )}
                              </div>
                          </div>
                      ))
                    : 'Нету практической части'}
            </Form>
        </div>
    )
}

export default PracticalPartExMo
