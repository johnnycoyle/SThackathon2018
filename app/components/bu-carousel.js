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

  startTimer = (time) => {
    setTimeout(() => this.goToNextSlide(), time)
  }

  goBackToStart = () => {
      this.props.goBackToStart();
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
        icon: require('./../assets/plumbing_illustration.png')
      },
      { 
        name: 'HVAC',
        icon: require('./../assets/HVAC_illustration.png')
      },
      { 
        name: 'Garage Door',
        icon: require('./../assets/garage_illustration.png')
      },
      { 
        name: 'Electrical',
        icon: require('./../assets/electrical_illustration.png')
      }
    ];

    const fieldsCleveland = [
      'Cleveland', 'Cleveland-HVAC-Sales', 'Cleveland-Plumbing-Service', 'Cleveland-Plumbing-Sales'
    ]

    const fieldsGlenadle = [
      'Glendale-HVAC-Service', 'Glendale-HVAC-Sales', 'Glendale-Plumbing-Service', 'Glendale-Plumbing-Sales'
    ]

    this.state.slideIndex === 3 && this.startTimer(13000);



    return(
      <div className="bu-carousel-container">
          <Slider ref={slider => (this.slider = slider)} {...settings}>
            <div className="bu-text-container">
              { this.props.active && (
                <div>
                    <div className="bu-video-card">
                      <img src={require('./../assets/bu_video.png')}/>
                    </div>
                    <h3 className="bu-text">Next, we’ll want to organize your company <br/>into Business Units.</h3>
                    <a className="what-is-bu">What is a business unit?</a>

                    <div className="what-trades-container">
                      <h4>What trades are you in?</h4>
                      {
                        trades.map(trade => 
                          <TradeSelector
                            key={Math.random()}
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
            <div className="bu-builder-container">
              <BusinessUnitsDivisionSelector
                categories={trades.slice(0,1)}
                name="plumbing"
                goToNextSlide={this.goToNextSlide}
              />
            </div>
              <div className="bu-builder-container">
                <BusinessUnitsDivisionSelector
                  categories={trades.slice(1,2)}
                  name="HVAC"
                  goToNextSlide={this.goToNextSlide}
                />
            </div>
            <div>
              <div className="build-business-units">
                <h5>Please wait while we build your Business Units</h5>
                { this.props.active &&
                  <video className="bu-video" autoPlay muted>
                      <source src={require('./../assets/logo_video.mp4')} type="video/mp4" />
                  </video>
                }
              </div>
            </div>
            <div>
              <div className="finished-business-units-container">
                <BuiltBusinessUnits header="Cleveland" fields={fieldsCleveland}/>
                <BuiltBusinessUnits header="Glenadale" fields={fieldsGlenadle}/>
                <button className="btn-complete-bu" onClick={this.goBackToStart}> I'm done</button>
              </div>
            </div>
          </Slider>
        </div>
    )
  }
}

const BuiltBusinessUnits = (props) => {
  return (
    <div className="built-unit-container">
      <p className="bu-header">{props.header}</p>
      { props.fields.map(field => <InputField value={field}/>) }
    </div>
  )
}

class InputField extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <input type="text" className="bu-field" value={this.props.value}></input>
    )
  }
} 