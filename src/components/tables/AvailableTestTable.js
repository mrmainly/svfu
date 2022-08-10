import { Table, Button } from "antd";
import { useNavigate } from "react-router-dom";

const AvailableTestTable = ({ data, loading, routes }) => {
    const navigate = useNavigate();

    const columns = [
        { title: "Название квалификации", dataIndex: "name", key: "name" },
        { title: "Дата начала теста", dataIndex: "created", key: "created" },
        { title: "Время на выполнение", dataIndex: "time", key: "time" },
        {
            title: "Действие",
            dataIndex: "id",
            key: "x",
            render: (id) => (
                <Button
                    style={{ color: "#55CD61", borderColor: "#55CD61" }}
                    onClick={() => navigate(`${routes}/${id}`)}
                >
                    Редактирование
                </Button>
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
