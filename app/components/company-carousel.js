import React from 'react';
import Slider from 'react-slick';
import './company-carousel.less';
import FormInput from './form-input';
import LogoUpload from './logo-upload';
import IntroConversation from './intro-conversation';
import ConfirmLocations from './confirm-locations';
import ConfirmLocationsSecondary from './confirm-locations-secondary';
import ConfirmLogo from './confirm-logo';
import { Transition, Button } from 'semantic-ui-react';

export default class CompanyCarousel extends React.Component {

  constructor(props){
    super(props);
    this.state = { slideIndex: 0, updateCount: 0 }
    this.slider;
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
        afterChange: () => this.setState(state => ({ updateCount: state.updateCount + 1 })),
        beforeChange: (current, next) => this.setState({ slideIndex: next })
    };

    return( 
      <div className="company-carousel-container">
          <Slider ref={slider => (this.slider = slider)} {...settings}>
            <div className="intro-conversation-container-parent">
            { this.props.active && <IntroConversation onConfirm={this.goToNextSlide}/> }
            </div>
            <ConfirmLocations onConfirm={this.goToNextSlide}/>
            <LogoUpload onConfirm={this.goToNextSlide}/>
            <ConfirmLogo onConfirm={this.props.goToNextSlide}/>
          </Slider>
        </div>
    )
  }
}
