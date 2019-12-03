import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import Row from "react-bootstrap/Row";
import "material-design-icons/iconfont/material-icons.css";


export default class LinkGroup extends React.Component {    

    constructor(props){
        super(props);
        this.state = {
            collapsed: false
        }                              
    }
    
    collapse(e){         
        this.setState({
           collapsed: !this.state.collapsed
         });     
     }
        
    render() {         
        const {id, title, rows, rowLabelProp, rowCountProp, onRowClick} = this.props;                
        const icon = this.state.collapsed ? 'keyboard_arrow_down': 'keyboard_arrow_right';                
             
        return (
            <div className="linkgroup">
            <Container>     
                <Row>                
                        <Container >                             
                            <Row className="align-items-center">                            
                            <i className="material-icons">{icon}</i>                
                            <Button variant="link" onClick={() => this.collapse()}><div className="text-capitalize">{title}</div></Button>                                                        
                            </Row>
                        </Container>                    
                </Row>                      
                <Row>
                    <Collapse in={this.state.collapsed}>
                    <div>                      
                        <ul>
                        {rows.map((row,i) =>                      
                            <li key={i}><Button variant="link" onClick={() => onRowClick(id,row[rowLabelProp])}>{row[rowLabelProp]} ({row[rowCountProp]})</Button></li>
                        )}
                        </ul>
                    </div>
                    </Collapse>
                </Row>
            </Container> 
            </div>
        );
    }
}
