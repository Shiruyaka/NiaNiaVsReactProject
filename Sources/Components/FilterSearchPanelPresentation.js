import React from "react";

const FilterSearchPanelPresentation = ({activePage, onChangeSearchInput = f => f, onChangeSortInput = f => f}) => {
    return (
        <div className="row" id="search_panel">

            <div className="col-xs-5 col-md-3">
                <input type="text" id="search_for" className="form-control" placeholder="Search" onChange={onChangeSearchInput}/>
            </div>

            <div className="col-xs-5 col-md-3">

                {activePage === "TrainingAdmin" ?
                    <select className="form-control" onChange={onChangeSortInput} onSelect={onChangeSortInput}>
                        <option>Name Up</option>
                        <option>Name Down</option>

                        <option>Health Up</option>
                        <option>Health Down</option>

                        <option>Agility Up</option>
                        <option>Agility Down</option>

                        <option>Attack Up</option>
                        <option>Attack Down</option>

                        <option>Defence Up</option>
                        <option>Defence Down</option>

                        <option>Duration Up</option>
                        <option>Duration Down</option>

                    </select>

                    :

                    <select className="form-control" onChange={onChangeSortInput} onSelect={onChangeSortInput}>
                        <option>Name Up</option>
                        <option>Name Down</option>

                    </select>}

            </div>

        </div>
    )
};

export default FilterSearchPanelPresentation;
