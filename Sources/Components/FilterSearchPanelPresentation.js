import React from "react";

const FilterSearchPanelPresentation = ({onChangeSearchInput = f => f, onChangeSortInput = f => f}) => {
    return (
        <div className="row" id="search_panel">

            <div className="col-xs-5 col-md-3">
                <input type="text" id="search_for" className="form-control" placeholder="Search" onChange={onChangeSearchInput}/>
            </div>

            <div className="col-xs-5 col-md-3">
                <select className="form-control" onChange={onChangeSortInput} onSelect={onChangeSortInput}>
                    <option>Name Up</option>
                    <option>Name Down</option>
                </select>
            </div>

        </div>
    )
};

export default FilterSearchPanelPresentation;
