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
            min_width: 25,
            counter: 0, 
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);

        this.updateListWidth();
        this.updateVisibleBoxes();
        this.updatePointerMax();

        this.counterID = setInterval(
            () => this.increment(),
            1000
          );
      }
      
      componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
        clearInterval(this.counterID);
      }

      increment() {
          let counter = this.state.counter + 1;
          this.setState({
              counter
          })
          this.checkForNextQuote();
      }


      checkForNextQuote() {
        if(this.state.counter % 5 == 0 && this.state.counter > 1) {
            if(this.state.pointer < this.props.testimonials.length - 1) {
                this.forwardButton();
            } else {
                this.setState({
                    pointer: 0
                })
            } 
        }
      } 
      
      updateWindowDimensions() {
        if(window.innerWidth != this.state.width) {
            this.setState({ pointer: 0, width: window.innerWidth});
            }
        }

      updatePointerMax() {
          let max_pointer = Math.floor(this.props.testimonials.length / this.state.no_boxes) + 1;
          this.setState({
              max_pointer
          })
      }

      updateVisibleBoxes() {
        let no_boxes = 4;
        if(!this.props.wide) {
                if(this.state.width < 1024 && this.state.width > 600) {
                    no_boxes = 2;
                } else if(this.state.width >= 0 && this.state.width <= 600) {
                    no_boxes = 1;
                } else {
                    no_boxes = 4;
                }
        } else {
            no_boxes = 1;
        }
        this.setState({
            no_boxes
        })
      }

    updateListWidth() {
        let min_width = 25;
        if(!this.props.wide) {
                if(this.state.width < 1024 && this.state.width > 600) {
                    min_width = 50;
                } else if(this.state.width >= 0 && this.state.width <= 600) {
                    min_width = 100;
                } else {
                    min_width = 25;
                }
        } else {
            min_width = 100;
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
        } else {
            this.setState({
                pointer: this.props.testimonials.length - 1
            })
        }
    }

    forwardButton = () => {
        this.updateVisibleBoxes();
        this.updateListWidth();
        this.updatePointerMax();
        if(this.state.pointer < this.state.max_pointer - 2 || ((this.state.pointer < this.state.max_pointer - 1) && (this.props.testimonials.length % this.state.no_boxes != 0))) {
            const pointer = this.state.pointer + 1;
            this.setState({
                pointer
            })
        } else {
            this.setState({
                pointer: 0
            })
        }

    }

    clickBack = () => {
        this.backButton();
        this.setState({
            counter: -5
        })
    } 

    clickForward = () => {
        this.forwardButton();
        this.setState({
            counter: -5
        })
    }

    returnLeft = () => {
        return -(this.state.no_boxes * this.state.min_width * this.state.pointer);
    }

    render() {
    return (
            <div className={`quote-carousel-container ${(this.props.wide) ? 'tall' : ''}`}>
                <div id='back' onClick={this.clickBack} className='quote-carousel-button'>
                    <p style={{color: this.props.color}}>BACK</p>
                </div>
                <div className='quote-carousel-list-wrapper'>
                    <div style={{left: `${this.returnLeft()}%`}} className='quote-carousel-list'>
                        <QuoteCarouselList color={this.props.color} quotes={this.props.testimonials} wide={this.props.wide}/>
                    </div>
                </div>
                <div id='forward' onClick={this.clickForward} className='quote-carousel-button'>
                    <p style={{color: this.props.color}}>FORWARD</p>
                </div>
            </div>
        ) 
    }
}

const QuoteCarouselItem = (props) => {
    let underline = (props.wide) ? '' : <Underline color={props.color}/>;
    let header = (props.wide) ? <h3 style={{color: props.color}}>{props.quote.header}</h3> : '';
    return (
    <div className={`quote-carousel-item-container ${(props.wide) ? 'wide' : ''}`}>
        <div style={{borderColor: props.color}} className='quote-carousel-item'>
            {header}
            <p style={{color: props.color}}>{props.quote.text}</p>
            {underline}
            <h4 style={{color: props.color}}>{props.quote.author}</h4>
            <h5 style={{color: props.color}}>{props.quote.company}</h5>
        </div>
    </div>
    )}

const QuoteCarouselList = (props) => {
    let quotes = props.quotes;
    let list = quotes.map((quote, i) => (
        <QuoteCarouselItem key={i} quote={quote} color={props.color} wide={props.wide}/>
    ));
    return (
    <>{list}</>
    )
}

export default QuoteCarousel;