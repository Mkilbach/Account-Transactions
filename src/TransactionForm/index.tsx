import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { dataType } from "../Main";

import "./styles.scss";

type TransactionFormPropsType = {
    refreshList: () => void;
};

const TransactionForm = ({ refreshList }: TransactionFormPropsType) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<dataType>();

    const handleFormSubmit = (values: dataType) => {
        const body = {
            ...values,
            id: uuidv4(),
            date: new Date().toISOString(),
        };

        axios
            .post("http://localhost:3000/transactions", body)
            .then(() => {
                toast.success("Transaction added");
                reset();
                refreshList();
            })
            .catch(() =>
                toast.error("Error occured while adding transaction!")
            );
    };

    return (
        <form className="form" onSubmit={handleSubmit(handleFormSubmit)}>
            <h2 className="form__header">Add new transaction</h2>
            <div className="form__input-wrapper">
                <input
                    {...register("amount", {
                        required: true,
                        pattern: /^\d+(\.\d+)?$/i,
                        min: 0,
                    })}
                    placeholder="amount..."
                />
                {errors.amount && (
                    <span className="form__error">
                        This field is required and must be positive number
                    </span>
                )}
            </div>
            <div className="form__input-wrapper">
                <input
                    {...register("account", {
                        required: true,
                        pattern: /^[0-9]+$/i,
                    })}
                    placeholder="account number..."
                />
                {errors.account && (
                    <span className="form__error">
                        This field is required and must contain only numbers
                    </span>
                )}
            </div>
            <div className="form__input-wrapper">
                <input
                    {...register("address", { required: true })}
                    placeholder="address..."
                />
                {errors.address && (
                    <span className="form__error">This field is required</span>
                )}
            </div>
            <div className="form__input-wrapper">
                <input
                    {...register("beneficiary", { required: true })}
                    placeholder="beneficiary..."
                />
                {errors.beneficiary && (
                    <span className="form__error">This field is required</span>
                )}
            </div>
            <div className="form__input-wrapper">
                <input
                    {...register("description", { required: true })}
                    placeholder="description..."
                />
                {errors.description && (
                    <span className="form__error">This field is required</span>
                )}
            </div>

            <button type="submit">Save</button>
        </form>
    );
};

export default TransactionForm;
