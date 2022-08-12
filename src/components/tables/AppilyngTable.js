import { Table } from "antd";
import { useNavigate } from "react-router-dom";

import { MyButton } from "..";

const AppilyngTable = ({ data, loading, routes }) => {
    const navigate = useNavigate();

    const columns = [
        { title: "ID", dataIndex: "id", key: "id" },
        {
            title: "Название квалификации",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Действие",
            dataIndex: "id",
            key: "x",
            render: (id) => (
                <MyButton onClick={() => navigate(`${routes}/${id}`)}>
                    Подать завявление
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

export default AppilyngTable;
