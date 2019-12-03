import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default class Filter extends React.Component {
    
    render() {
        const { onFilterRemove, onFilterReset, filter } = this.props;
        const filters = [];        
        for (const [field, values] of Object.entries(filter)) {
            values.forEach( (value,index) => {
                filters.push(
                    <Button key={field + "_" + index} variant="button" onClick={() => onFilterRemove(field,value)} size="sm">{field + ':' + value}</Button>);
            });
        }

        

        return (
            <Card>
                <Card.Header>Filter</Card.Header>
                <Card.Body>                    
                    {filters}
                    {filters.length > 0 && 
                    <Button onClick={onFilterReset} variant="secondary" size="sm">Clear All</Button>                                                                                    
                    }                    
                </Card.Body>
            </Card>
        );

    }
}
