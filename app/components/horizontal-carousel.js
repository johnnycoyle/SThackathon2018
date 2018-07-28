import React from 'react';
import Slider from 'react-slick';
import './horizontal-carousel.less';
import './upload-image.less'
import FormInput from './FormInput';
import UploadImage from './upload-image';
import { Transition } from 'semantic-ui-react';

export default class HorizontalCarousel extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      autoplay: false,
      slides: [
        { 
        name: 'intro', 
        index: 0,
        length: 3,
        addDelayAtEnd: true,
        needsUserConfirmation: false
      },
        { name: 'basicQuestions',
        index: 0,
        length: 2,
        addDelayAtEnd: false,
        needsUserConfirmation: true
      },
        { 
        name: 'imageUpload', 
        index: 0,
        length: 1,
        addDelayAtEnd: false,
        needsUserConfirmation: true
      }],
      currSlider: 0,
      globalNeedsUserConfirmation: false,
      userHasConfirmed: false
    }
  }

  componentWillReceiveProps(oldProps, newProps) {
    this.setState({ autoplay: true });
  }


  updateSlideIndex = (e, category) => {
    const { slides, currSlider } = this.state;
    const newState = Object.assign({}, this.state);

    const currentSlider = newState.slides[currSlider];

    console.log('current slider:', currentSlider);
    newState.slides[currSlider].index++;

    if ((currentSlider.index === currentSlider.length - 1)) {
      console.log('this is the last slide');
      if ((newState.globalNeedsUserConfirmation && newState.userHasConfirmed) || !newState.globalNeedsUserConfirmation) {
          newState.currSlider++;
          if (newState.slides[newState.currSlider].needsUserConfirmation) {
            console.log('needs user confirmation');
            newState.globalNeedsUserConfirmation = true;
            newState.userHasConfirmed = false;
          } else {
            console.log('doesn\'t need user confirmation');
            newState.globalNeedsUserConfirmation = false;
            newState.userHasConfirmed = false
          }
      } else {
      console.log('requires user confirmation...');
      } 
    }
    if (currentSlider.addDelayAtEnd && currentSlider.index === currentSlider.length - 1)
      setTimeout(() => this.setState(newState), 4000);
    else 
      this.setState(newState);
  }
    toggleCompletionState = () => {

      const currentSlider = this.state.slides[this.state.currSlider];

      if (currentSlider.index === currentSlider.length - 1) {
        this.setState({ userHasConfirmed: !this.state.userHasConfirmed });
      }
    }


  renderIntroSlider = () => {
    const settings = {
        autoplay: this.state.autoplay,
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoPlaySpeed: 6000,
        lazyLoad: true,
        draggable: false,
        pauseOnHover: false,
        touchMove: false,
        swipe: false,
        afterChange: (e) => this.updateSlideIndex(e, "intro"),
        slideIndex: this.state.slides[this.state.currSlider].index
    };
    return (
      <Slider {...settings}>
        <div className="slide"><h3>Let's get to know each other a bit.</h3></div>
        <div className="slide"><h3>Over the next few minutes, we'll be putting together your account basics.</h3></div>
        <div className="slide"><h3>Let's begin! <br/>First, we need to confirm a few things:</h3></div>
      </Slider>
    );
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
        <div className="slide">
          <h3>Great. I see you also have a second location</h3>
          {
            form2.map((data, i) => 
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

  render() {
    const currentSlider = this.state.slides[this.state.currSlider];
    const componentToRender = this.getComponentToRender(currentSlider.name);
    return(
      <div className="hor-carousel-container">
        { this.props.active && componentToRender() }
      </div>
    );
  }
}

const ConfirmButton = (props) => (
  <button className="confirm-button" onClick={() => { props.validate(); props.onClick(); }}>{props.label}</button>
);

