import React from 'react';
import Slider from 'react-slick';
import './horizontal-carousel.less';
import FormInput from './FormInput';
import LogoUpload from './logo-upload';
import IntroConversation from './intro-conversation';
import ConfirmLocations from './confirm-locations';
import ConfirmLocationsSecondary from './confirm-locations-secondary';
import ConfirmLogo from './confirm-logo';
import { Transition, Button } from 'semantic-ui-react';

export default class HorizontalCarousel extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      slideIndex: 0,
      updateCount: 0
    }

    this.slider;
  }

  renderImageUploadSlider = () => {
    const settings = {
        autoplay: false,
        dots: true,
        infinite: false,
        speed: 500,
        draggable: false,
        pauseOnHover: false,
        touchMove: false,
        goToSlide: goToSlide => goToSlide(0),
        swipe: false,
        nextArrow: <button className="image-upload-browse-button">Browse</button>,
        afterChange: (e) => this.updateSlideIndex(e, "imageUpload")
    };
    return(
      <Slider {...settings} key={Math.random()}
        >          
          <div className="slide">
            <div className="image-upload-container"/>
            </div>
            <div className="slide">
            <div className="slide"></div>
          </div>
        </Slider>
    );
  }

  renderBasicInfoSlider= () => {
      const settings = {
        autoplay: false,
        dots: true,
        infinite: false,
        speed: 500,
        draggable: false,
        pauseOnHover: false,
        touchMove: false,
        swipe: false,
        nextArrow: <ConfirmButton validate={this.toggleCompletionState} label="looks good"/>,
        afterChange: (e) => this.updateSlideIndex(e, "basicQuestions")

    };
    const form1 = [
      { label: 'Company', value: 'WyattWorks Plumbing'},
      { label: 'Phone', value: '(216) 302-3400'},
      { label: 'Address', value: '1372 Lloyd Rd, Wickliffe, OH 44092'}
    ];

    const form2 = [
      { label: 'Company', value: 'Hackathon Plumbing'},
      { label: 'Phone', value: '(310) 555.5555'},
      { label: 'Address', value: '801 N. Brand Ave, Ste 800 Glendale CA, 91203'}
    ]

    return(
      <Slider {...settings} key={Math.random()} ref={slider => (this.slider = slider)}
      >
        
        <div className="slide">
          <h3>Does this look right?</h3>
          {
            form1.map((data, i) => 
              <FormInput key={`formInput${i}`} label={data.label} value={data.value}/>
            )
          }
        </div>

      </Slider>
    );
  }

  getComponentToRender = name => {
    if (name === "intro") {
      return this.renderIntroSlider;
    } else if (name === "basicQuestions") {
      return this.renderBasicInfoSlider;
    } else {
      return this.renderImageUploadSlider;
    }
  }

  goToNextSlide = () => {
    this.slider && this.slider.slickGoTo(this.state.slideIndex + 1)
  }

  handleClick = () => {
    this.props.transitionToTeamSlide();
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

    return( 
      <div className="hor-carousel-container">
          <Slider ref={slider => (this.slider = slider)} {...settings}>
            <div>
              { this.props.active && <IntroConversation onConfirm={this.goToNextSlide}/> }
            </div>
            <ConfirmLocations onConfirm={this.goToNextSlide}/>
            <LogoUpload onConfirm={this.goToNextSlide}/>
            <ConfirmLogo onConfirm={this.props.transitionToTeamSlide}/>
          </Slider>
        </div>
    )
  }
}
