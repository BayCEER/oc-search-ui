import React from "react";
import Table from "react-bootstrap/Table";



const getPreviews=function(previews){
 let ret = []; 
 for(const [index,preview] of previews.entries()){
    ret.push(<div key={index}>{preview.preFix}<span className="text-primary">{preview.highlight}</span>{preview.postFix}</div>);
 }
 return ret;
}

export default class HitList extends React.Component {   
           
    render() {          
        return (            
                <Table>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Path</th>
                    <th>Score</th>
                    <th>Preview</th>      
                    </tr>
                </thead>
                <tbody>
                    {this.props.hits.map((row,i) => 
                        <tr key={row.key}>                            
                        <td>{row.key}</td>
                        <td>{row.path}</td>
                        <td>{row.score}</td>
                        <td>{getPreviews(row.previews)}</td>
                        </tr>
                    )}          
                </tbody>
                </Table>            
        );
    }

}