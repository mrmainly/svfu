import { Table } from "antd";
import { useNavigate } from "react-router-dom";

import { MyButton } from "..";

const AvailableTestTable = ({ data, loading, routes }) => {
    const navigate = useNavigate();

    const columns = [
        { title: "Название квалификации", dataIndex: "name", key: "name" },
        { title: "Дата начала теста", dataIndex: "created", key: "created" },
        {
            title: "Время на выполнение",
            dataIndex: "time_exam",
            key: "time_exam",
            render: (time_exam) => (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        height: "100%",
                    }}
                >
                    <div>{time_exam} мин</div>
                </div>
            ),
        },
        {
            title: "Действие",
            dataIndex: "id",
            key: "x",
            render: (id) => (
                <MyButton onClick={() => navigate(`${routes}/${id}`)}>
                    Начать тестирование
                </MyButton>
            ),
        },
    ];
    return (
        <Table
            columns={columns}
            dataSource={data}
            rowKey="id"
            loading={loading}
        />
    );
};

export default AvailableTestTable;
