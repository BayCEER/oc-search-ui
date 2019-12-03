import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";

export default class Search extends React.Component {


   render() {
      const { onChange, onSubmit } = this.props;
      return (
         
            <Form onSubmit={onSubmit}>
               <InputGroup>
                  <FormControl
                     placeholder="Search"
                     aria-label="Search term"
                     onChange={onChange}
                     inputMode="search"
                  />
                  <InputGroup.Append>
                     <Button onClick={onSubmit} variant="primary">Search</Button>
                  </InputGroup.Append>
               </InputGroup>
            </Form>         
      );
   }

};

