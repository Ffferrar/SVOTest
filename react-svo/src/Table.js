import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import Service from "./Service";

class Table extends Component {

    constructor(props) {
        super(props);
        this.state = {tasks: []};
        this.remove = this.remove.bind(this);
    }

    async componentDidMount() {
        Service.getOnlyTasks().then((response) => {
            this.setState({ tasks: response.data})
        });;
    }
}
export default Table;