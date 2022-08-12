import React from "react";
import { Input } from "antd";

import { AppilyngTable } from "../../components";

const { Search } = Input;

const Applying = () => {
    return (
        <div>
            <Search
                placeholder="Поиск..."
                enterButton
                style={{ width: 300, marginBottom: 20 }}
            />
            <AppilyngTable />
        </div>
    );
};

export default Applying;
