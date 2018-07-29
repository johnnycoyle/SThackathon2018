import React from 'react';
import Slider from 'react-slick';
import './team-carousel.less';
import EmployeeFormInput from './EmployeeFormInput';;

export default class TeamCarousel extends React.Component {

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
      <div className="team-carousel-container">
          <Slider ref={slider => (this.slider = slider)} {...settings}>
            <div className="team-text-container">
              { this.props.active && (
                <div>
                  <div className="yellow-decorator-block"/>
                  <h3 className="team-text">Your technicians and office staff are the <br/> cornerstones of your ServiceTitan account.</h3>
                  <div className="employee-count-container">
                    <h3>I have</h3><input maxLength={3} type="text"/><h3>employees</h3>
                    <button className="done-button" onClick={this.goToNextSlide}>Done</button>
                  </div>
                </div>
                )
              }
            </div>
            <div className="add-employees-container">
              <EmployeeFormInput index={1}/>
              <button className="done-button-employees" onClick={this.handleClick}>I'm done</button>
            </div>
          </Slider>
        </div>
    )
  }
}
