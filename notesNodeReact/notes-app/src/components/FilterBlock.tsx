import React from "react";

interface FilterBlockProps {
    filterTypeNotes: number,
    handleFilterList: (prop: number) => void,
}

export const FilterBlock: React.FC<FilterBlockProps> = (props: FilterBlockProps): React.ReactElement => {
    return (
        <div className="filter-block">
            <div>
                <input checked={props.filterTypeNotes === 1} onChange={() => props.handleFilterList(1)} type="radio" />
                <label >Все заметки</label>
            </div>

            <div>
                <input checked={props.filterTypeNotes === 2} onChange={() => props.handleFilterList(2)} type="radio" />
                <label >Не выполненые</label>
            </div>

            <div>
                <input checked={props.filterTypeNotes === 3} onChange={() => props.handleFilterList(3)} type="radio" />
                <label >Выполненные</label>
            </div>
        </div>
    )
}