import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Search from "./components/Search";
import Filter from "./components/Filter";
import HitList from "./components/HitList";
import LinkGroup from "./components/LinkGroup";
import Pager from "./components/Pager";
import Card from "react-bootstrap/Card";

import axios from 'axios';
import './App.css';
import qs from 'qs';


export default class App extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      // Search
      start: 0,
      query: "",
      filter: {},
      fields: [],
      // Search Response
      hits: [],
      totalHits: 0,
      aggs: [],
      // Meta      
      isLoading: false,
      error: null,
    };


    const { indexHost, indexCollection } = this.props;
    this.client = axios.create({
      baseURL: `http://${indexHost}/${indexCollection}`,
      timeout: 5000
    });

    // Bind functions    
    this.onPagination = this.onPagination.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onFilterAdd = this.onFilterAdd.bind(this);
    this.onFilterRemove = this.onFilterRemove.bind(this);
    this.onFilterReset = this.onFilterReset.bind(this);
  }


  componentDidMount() {
    console.log("Get field names");
    this.setState({ isLoading: true });
    this.client.get('/field/names')
      .then(result => {
        /* Initialize filter map */
        const filter = {};
        const fields = result.data;        
        // const fields = ['creator']
        for (const field of fields) {
          filter[field] = [];
        }
        this.setState({
          fields: fields,
          filter: filter
        });
        this.search("", 0, fields, filter);
      })
      .catch(error => console.log("Failed to query field names."))
      .finally(() => {
        this.setState({ isLoading: false });
      })

  }

  search(query, start, fields, filter) {
    this.setState({ isLoading: true });
    this.client.get('/index', {
      params: {
        query: query, start: start, fields: JSON.stringify(fields), filter: JSON.stringify(filter)
      },
      paramsSerializer(params) {
        return qs.stringify(params, { arrayFormat: "brackets" });
      }
    }
    ).then(result => {
      this.setState({
        hits: result.data.hits,
        aggs: result.data.aggs,
        totalHits: result.data.totalHits,
        start: start
      });
    })
      .catch(error => console.log("Failed to query index."))
      .finally(() => {
        this.setState({ isLoading: false });
      })

  }

  onPagination(e) {
    const { query, fields, filter } = this.state;
    const start = ((e.target.text - 1) * 10);
    this.search(query, start, fields, filter);
  }

  onSearchChange(e) {
    this.setState({ query: e.target.value });
  }

  onSearchSubmit() {
    const { query, start, fields, filter } = this.state;
    this.search(query, start, fields, filter);
  }


  onFilterRemove(id, value) {
    const { filter } = this.state;
    const index = filter[id].indexOf(value);
    filter[id].splice(index, 1)
    this.onSearchSubmit();
  }

  onFilterAdd(id, value) {
    const { filter } = this.state;
    filter[id].push(value);
    this.onSearchSubmit();
  }

  onFilterReset(e) {
    const { filter, fields } = this.state;
    for (var field of fields) {
      filter[field] = [];
    }
    this.onSearchSubmit();
  }


  render() {
    const { aggs, hits, start, totalHits, filter } = this.state;

    return (
      <div className="main">
        <Container fluid="true">
          <Row>
            <Col sm={4}>
              <Filter onFilterRemove={this.onFilterRemove} onFilterReset={this.onFilterReset} filter={filter} />
              <Card>
                <Card.Header>Groups</Card.Header>
                <Card.Body>                  
                    {aggs.map((row, key) =>
                      <LinkGroup key={key} id={row.key} onRowClick={this.onFilterAdd} title={row.title} rows={row.results} rowLabelProp="key" rowCountProp="count"></LinkGroup>
                    )}                  
                </Card.Body>
              </Card>
            </Col>
            <Col sm={8}>            
              <Search onChange={this.onSearchChange} onSubmit={this.onSearchSubmit} />
              <HitList hits={hits} />
              <Pager onPagination={this.onPagination} start={start} totalHits={totalHits} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
