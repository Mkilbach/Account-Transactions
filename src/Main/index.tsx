import React, { useEffect, useState } from "react";
import axios from "axios";
import Balance from "../Balance";
import Filter from "../Filter";
import TransactionForm from "../TransactionForm";
import TransactionsTable from "../TransactionsTable";
import { toast } from "react-toastify";

import "./styles.scss";

export type dataType = {
    id: number;
    amount: number;
    beneficiary: string;
    account: string;
    address: string;
    date: string;
    description: string;
};

const Main = () => {
    const [transactions, setTransactions] = useState<dataType[]>([]);
    const [balanceValue, setBalanceValue] = useState<number | undefined>();
    const [filter, setFilter] = useState("");

    const getTransactions = () => {
        axios
            .get("http://localhost:3000/transactions")
            .then(({ data }) => {
                setTransactions(data);
            })
            .catch(() => toast.error("Error occured while fetching data!"));
    };

    const deleteItem = (id: number) => {
        axios
            .delete(`http://localhost:3000/transactions/${id}`)
            .then(() => {
                toast.success("entry successfully deleted!");
                getTransactions();
            })
            .catch(() => toast.error("Error occured while deleting data!"));
    };

    useEffect(getTransactions, []);

    useEffect(() => {
        if (!transactions.length) return;
        setBalanceValue(
            Math.round(
                transactions.reduce((acc, { amount }) => acc + amount, 0) * 100
            ) / 100
        );
    }, [transactions]);

    return (
        <main className="main-container">
            <section className="top-section">
                <div className="top-left-section">
                    <Balance value={balanceValue} />
                    <Filter onChange={setFilter} />
                </div>
                <TransactionForm refreshList={getTransactions} />
            </section>
            <TransactionsTable
                data={transactions}
                filter={filter}
                handleDelete={deleteItem}
            />
        </main>
    );
};

export default Main;
