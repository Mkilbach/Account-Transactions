import React from "react";

import "./styles.scss";

type BalancePropsType = {
    value?: number;
};

const Balance = ({ value }: BalancePropsType) => {
    return <div className="balance">Your balance: {value ?? "Loading..."}</div>;
};

export default Balance;
