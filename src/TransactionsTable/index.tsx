import React, { useEffect, useState } from "react";
import { dataType } from "../Main";

import "./styles.scss";

type TransactionsTablePropsType = {
    data: dataType[];
    filter?: string;
    handleDelete: (id: number) => void;
};

const dateTimeFormat = new Intl.DateTimeFormat();

const itemsPerPage = 20;

const TransactionsTable = ({
    data,
    filter,
    handleDelete,
}: TransactionsTablePropsType) => {
    const [page, setPage] = useState(0);
    const [filteredData, setFilteredData] = useState<dataType[]>(data);

    useEffect(() => {
        setPage(0);
        if (!filter) setFilteredData(data);
        else {
            setFilteredData(
                data.filter(({ beneficiary }) =>
                    beneficiary
                        ?.toLocaleLowerCase()
                        .includes(filter?.toLocaleLowerCase())
                )
            );
        }
    }, [filter, data]);

    const renderData = () =>
        filteredData
            .slice(page * itemsPerPage, (page + 1) * itemsPerPage)
            .map(
                ({
                    amount,
                    account,
                    address,
                    beneficiary,
                    date,
                    description,
                    id,
                }) => (
                    <tr key={id}>
                        <td>{amount}</td>
                        <td>{account}</td>
                        <td>{address}</td>
                        <td>{beneficiary}</td>
                        <td>{dateTimeFormat.format(new Date(date))}</td>
                        <td>{description}</td>
                        <td onClick={() => handleDelete(id)}>❌</td>
                    </tr>
                )
            );

    if (!filteredData.length)
        return <div className="no-data">No data found</div>;

    return (
        <div className="table-wrapper">
            <table className="table">
                <tbody>
                    <tr>
                        <th>amount</th>
                        <th>account</th>
                        <th>address</th>
                        <th>beneficiary</th>
                        <th>date</th>
                        <th>description</th>
                        <th></th>
                    </tr>
                    {renderData()}
                </tbody>
            </table>
            <div className="controls">
                <button
                    className="controls__button"
                    disabled={page <= 0}
                    onClick={() => setPage(curr => curr - 1)}
                >
                    {"<"}
                </button>
                <p>{page + 1}</p>
                <button
                    className="controls__button"
                    disabled={(page + 1) * itemsPerPage >= filteredData.length}
                    onClick={() => setPage(curr => curr + 1)}
                >
                    {">"}
                </button>
            </div>
        </div>
    );
};

export default TransactionsTable;
