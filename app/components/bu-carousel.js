import React from 'react';
import Slider from 'react-slick';
import './bu-carousel.less';
import TradeSelector from './trade-selector';
import BusinessUnitsDivisionSelector from './business-units-division-selector';
import { Icon } from 'semantic-ui-react';

export default class BusinessUnitCarousel extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      slideIndex: 0,
      updateCount: 0
    }

    this.slider;
  }

  handleClick = () => {
    this.props.transitionToBusinessUnitsSlide();
  }


  goToNextSlide = () => {
    this.slider && this.slider.slickGoTo(this.state.slideIndex + 1)
  }

  render() {

    const settings = {
        autoplay: false,
        dots: true,
        infinite: false,
        speed: 500,
        draggable: false,
        pauseOnHover: false,
        touchMove: false,
        swipe: false,
        afterChange: () =>
        this.setState(state => ({ updateCount: state.updateCount + 1 })),
        beforeChange: (current, next) => this.setState({ slideIndex: next })
    };

    const trades = [
      { 
        name: 'Plumbing',
        icon: require('./../assets/plumbing_icon.png')
      },
      { 
        name: 'Electrical',
        icon: require('./../assets/electrical_icon.png')
      },
      { 
        name: 'Garage Door',
        icon: require('./../assets/garage_icon.png')
      },
      { 
        name: 'HVAC',
        icon: require('./../assets/HVAC_icon.png')
      }
    ]

    return(
      <div className="bu-carousel-container">
          <Slider ref={slider => (this.slider = slider)} {...settings}>
            <div className="bu-text-container">
              { this.props.active && (
                <div>
                    <h3 className="bu-text">Next, we’ll want to organize your company <br/>into Business Units.</h3>
                    <div className="what-trades-container">
                      <h4>What trades are you in?</h4>
                      {
                        trades.map(trade => 
                          <TradeSelector
                            name={trade.name}
                            icon={trade.icon}
                          />
                        )
                      }
                    </div>
                    <button onClick={this.goToNextSlide}className="trade-selector-next-button"><Icon name="arrow right" size="large" color="white"/></button>
                  </div>
                )
              }
            </div>
            <div className="bu-text-container">
              <BusinessUnitsDivisionSelector
                category="Plumbing"
              />
            </div>
            <div className="bu-text-container">
              <h3>What are your HVAC divisions? </h3>
            </div>
          </Slider>
        </div>
    )
  }
}
