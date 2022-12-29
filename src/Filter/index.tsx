import React from "react";
import _ from "lodash";

type FilterPropsType = {
    onChange: React.Dispatch<React.SetStateAction<string>>;
};

const Filter = ({ onChange }: FilterPropsType) => {
    const handleChange = _.debounce((e: any) => onChange(e.target.value), 200);

    return (
        <input
            title="filter"
            placeholder="filter by beneficiary..."
            onChange={handleChange}
        />
    );
};

export default Filter;
