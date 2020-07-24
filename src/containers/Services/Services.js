import React, { Component } from 'react';
import './Services.scss';
import ServicesMainCard from '../../components/ServicesMainCard/ServicesMainCard';
import ServicesCard from '../../components/ServicesCard/ServicesCard';

class Services extends Component {
    constructor(props){
        super(props);
        this.state = {
            service_index: 1
        }
    }

    nextService = _ => {
        let service_index = this.state.service_index + 1;
        if(service_index == this.props.services.services.length) {
            service_index = 0;
        }
        this.setState({
            service_index
        }) 
    }

    selectService = index => {
        const service_index = index;
        this.setState({
            service_index
        }) 
    }

    render() {
        return(
            <div className='services-container'>
                <ServicesMainCard colors={this.props.colors} service={this.props.services.services[this.state.service_index]} serviceIndex={this.state.service_index} buttonOnClick={this.nextService}/>
                <ServicesCardList services={this.props.services.services} colors={this.props.colors} onClick={this.selectService} serviceIndex={this.state.service_index}/>
            </div>
        )
    }
}

const ServicesCardList = (props) => {
    let services = props.services;
    let services_list = services.map((service, i) => (
        <ServicesCard key={i} service={service} index={i} colors={props.colors} onClick={() => props.onClick(i)} activeIndex={props.serviceIndex}/>
    ))

    return (
        <div className='services-card-list-container'>
            {services_list}
        </div>
    )
}

export default Services;