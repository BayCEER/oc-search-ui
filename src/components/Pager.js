import React from "react";
import Pagination from "react-bootstrap/Pagination";

export default class Pager extends React.Component {
    
    render(){       
        const {onPagination, start, totalHits} = this.props; 
        const currentPage = Math.floor(start/10);
        const pageCount = Math.ceil(totalHits/10);
        let pages = [];
        for (let page = 0; page < pageCount; page++) {
            pages.push(
                <Pagination.Item key={page} active={page === currentPage} 
                onClick={(page !== currentPage)?onPagination:null}>
                  {page + 1}
                </Pagination.Item>,
              ); 
        }
        return(            
                <Pagination  size='sm'>{pages}</Pagination>
        );
    }
}