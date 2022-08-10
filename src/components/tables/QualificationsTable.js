import { Table } from "antd";
import { useNavigate } from "react-router-dom";

import { MyButton } from "..";

const QualificationsTable = ({ data, loading, routes }) => {
    const navigate = useNavigate();

    const columns = [
        { title: "№ документа", dataIndex: "name", key: "name" },
        {
            title: "Название квалификации",
            dataIndex: "created",
            key: "created",
        },
        {
            title: "Дата выдачи",
            dataIndex: "time_exam",
            key: "time_exam",
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

export default QualificationsTable;
