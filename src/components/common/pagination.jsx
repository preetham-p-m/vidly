import React from 'react';
import _ from 'lodash';
import PropType from 'prop-types';

const Pagination = (props) => {
    const { itemsCount, pageSize, currentPage } = props;
    const pageCount = Math.ceil(itemsCount / pageSize);
    if (pageCount === 1) return null; 
    const pages = _.range(1, pageCount + 1);

    return (
        <nav aria-label="...">
            <ul className="pagination">
                {pages.map((page) => (
                    <li key={page} className={ page === currentPage? "page-item active": "page-item"}>
                        <a className="page-link" href="#" onClick={ () => props.onPageChange(page) }>{ page}</a>
                    </li>
                ))}
            </ul>
        </nav>      
    );
}

Pagination.propType= {
    itemsCount: PropType.number.isRequired,
    pageSize: PropType.number.isRequired,
    currentPage: PropType.number.isRequired,
    onPageChange: PropType.array.isRequired
}
 
export default Pagination;