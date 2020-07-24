import React, { Component } from 'react';
import './Services.scss';
import ServicesMainCard from '../../components/ServicesMainCard/ServicesMainCard';
import ServicesCard from '../../components/ServicesCard/ServicesCard';

class Services extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return(
            <div className='services-container'>
                <ServicesMainCard colors={this.props.colors} service={this.props.services.services[0]} backgroundColor={this.props.colors.yellow}/>
                <ServicesCardList services={this.props.services.services} colors={this.props.colors}/>
            </div>
        )
    }
}

const ServicesCardList = (props) => {
    let services = props.services;
    let services_list = services.map((service, i) => (
        <ServicesCard key={i} service={service} index={i} colors={props.colors}/>
    ))

    return (
        <div className='services-card-list-container'>
            {services_list}
        </div>
    )
}

export default Services;