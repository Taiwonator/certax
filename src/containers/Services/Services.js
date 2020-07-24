import React, { Component } from 'react';
import './Services.scss';
import ServicesMainCard from '../ServicesMainCard/ServicesMainCard';

class Services extends Component {
    constructor(props){
        super(props);
        console.log(props.services);
    }

    render() {
        return(
           <ServicesMainCard />
        )
    }
}

export default Services;