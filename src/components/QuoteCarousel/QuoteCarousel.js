import React, { Component } from 'react';
import './QuoteCarousel.scss';
import Underline from '../Underline/Underline';

class QuoteCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pointer: 0,
            max_pointer: 0, 
            no_boxes: 4, 
            min_width: 25
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);

        this.updateListWidth();
        this.updateVisibleBoxes();
        this.updatePointerMax();
      }
      
      componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
      }
      
      updateWindowDimensions() {
        this.setState({ pointer: 0, width: window.innerWidth});
      }

      updatePointerMax() {
          let max_pointer = Math.floor(this.props.testimonials.length / this.state.no_boxes) + 1;
          this.setState({
              max_pointer
          })
      }

      updateVisibleBoxes() {
        let no_boxes = 4;
        if(this.state.width < 1024 && this.state.width > 600) {
            no_boxes = 3;
        } else if(this.state.width >= 0 && this.state.width <= 600) {
            no_boxes = 1;
        } else {
            no_boxes = 4;
        }
        this.setState({
            no_boxes
        })
      }

    updateListWidth() {
        let min_width = 25;
        if(this.state.width < 1024 && this.state.width > 600) {
            min_width = 33.33;
        } else if(this.state.width >= 0 && this.state.width <= 600) {
            min_width = 100;
        } else {
            min_width = 25;
        }
        this.setState({
            min_width
        })
      }

    backButton = () => {
        this.updateVisibleBoxes();
        this.updateListWidth();
        this.updatePointerMax();
        if(this.state.pointer > 0) {
            const pointer = this.state.pointer - 1;
            this.setState({
                pointer
            })
        }
    }

    forwardButton = () => {
        this.updateVisibleBoxes();
        this.updateListWidth();
        this.updatePointerMax();
        console.log((this.state.pointer == this.state.max_pointer - 2) && (this.props.testimonials.length % this.state.no_boxes != 0));
        if(this.state.pointer < this.state.max_pointer - 2 || ((this.state.pointer < this.state.max_pointer - 1) && (this.props.testimonials.length % this.state.no_boxes != 0))) {
            const pointer = this.state.pointer + 1;
            this.setState({
                pointer
            })
        }

    }

    returnLeft = () => {
        return -(this.state.no_boxes * this.state.min_width * this.state.pointer);
    }

    render() {
    return (
            <div className='quote-carousel-container'>
                <div id='back' onClick={this.backButton} className='quote-carousel-button'>
                    <p style={{color: this.props.colors.yellow}}>BACK</p>
                </div>
                <div className='quote-carousel-list-wrapper'>
                    <div style={{left: `${this.returnLeft()}%`}} className='quote-carousel-list'>
                        <QuoteCarouselList colors={this.props.colors} quotes={this.props.testimonials}/>
                    </div>
                </div>
                <div id='forward' onClick={this.forwardButton} className='quote-carousel-button'>
                    <p style={{color: this.props.colors.yellow}}>FORWARD</p>
                </div>
            </div>
        ) 
    }
}

const QuoteCarouselItem = (props) => (
    <div className='quote-carousel-item-container'>
        <div style={{borderColor: props.color}} className='quote-carousel-item'>
            <p style={{color: props.color}}>{props.quote.text}</p>
            <Underline color={props.color}/>
            <h4 style={{color: props.color}}>{props.quote.author}</h4>
        </div>
    </div>
)

const QuoteCarouselList = (props) => {
    let quotes = props.quotes;
    let list = quotes.map((quote, i) => (
        <QuoteCarouselItem key={i} quote={quote} color={props.colors.yellow}/>
    ));
    return (
    <>{list}</>
    )
}

export default QuoteCarousel;