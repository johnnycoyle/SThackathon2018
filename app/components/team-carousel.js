import React from 'react';
import Slider from 'react-slick';
import './team-carousel.less';
import EmployeeFormInput from './EmployeeFormInput';
import { PlayButton } from './welcome-page';

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

  goToNextSlide = () => {
    this.slider && this.slider.slickGoTo(this.state.slideIndex + 1)
  }

  startTimer = (time) => {
    setTimeout(() => this.goToNextSlide(), time);
  }

  render() {

    const settings = {
        autoplay: false,
        dots: false,
        infinite: false,
        speed: 500,
        draggable: false,
        pauseOnHover: false,
        touchMove: false,
        swipe: false,
        appendDots: dots => <ul className="my-dots">{dots}</ul>,
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
                  <div className="team-video-container">
                    <PlayButton/>
                    <img className="team-video" src={require('./../assets/team_video.png')}/>
                  </div>
                  <h3 className="team-text">Your technicians and office staff are the cornerstones of your ServiceTitan account.</h3>
                  <div className="employee-count-container">
                    <h3>I have</h3><input maxLength={3} type="text"/><h3>employees</h3>
                    <button className="done-button" onClick={this.goToNextSlide}>Done</button>
                  </div>
                </div>
                )
              }
            </div>
            <div className="add-employees-container">
              <p className="set-up-employees-text"> Now we're going to set up your employees</p>
              { this.state.slideIndex === 1 && this.startTimer(3000)}
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
