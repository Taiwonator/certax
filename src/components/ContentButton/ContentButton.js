import React, { Component } from 'react';
import './ContentButton.scss';

class ContentButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            style: {

            }, 
            show_text: props.text, 
        }
    }

    componentDidMount() {
        if(!this.props.inverse) {
            this.setState({
                style: {
                    color: this.props.color,
                    borderColor:this.props.color
                }
            })
            
        } else {
            this.setState({
                style: {
                    color: 'white', 
                    borderColor: 'none', 
                    backgroundColor: this.props.color
                }
            })
        }
    }

    componentWillReceiveProps() {
        if(!this.props.inverse) {
            this.setState({
                style: {
                    color: this.props.color,
                    borderColor:this.props.color
                }
            })
            
        } else {
            this.setState({
                style: {
                    color: 'white', 
                    borderColor: 'none', 
                    backgroundColor: this.props.color
                }
            })
        }
    }


    changeShowText = show_text => {
        if(this.props.buttonOnHover) {
            this.setState({
                show_text
            })
        }
    }

    revertShowText = _ => {
        if(this.props.buttonOnHover) {
            this.setState({
                show_text: this.props.text
            })
        }
    }
        
    render() {
        return (
            <div onMouseEnter={() => this.changeShowText(this.props.buttonOnHoverText)}
                 onMouseLeave={this.revertShowText}
                 onClick={this.props.buttonOnClick} className={`button ${(!this.props.inverse) ? '' : 'inverse'} `} 
                 style={this.state.style} type='button'>
                    {this.state.show_text}
                 </div>
        )
    }
}

export default ContentButton;