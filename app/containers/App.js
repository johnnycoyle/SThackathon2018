/* es-lint disable */

import React, { Component } from 'react';
import * as Styles from './app.less';
import Carousel from 'nuka-carousel';
import Slide from './../components/slide';
import Timeline from './../components/timeline';
import WelcomePage from './../components/welcome-page';
import NavigationButtons from './../components/lets-get-started-button';
import CompanyCarousel from './../components/company-carousel';
import TeamCarousel from './../components/team-carousel';
import BusinessUnitCarousel from './../components/bu-carousel';

class App extends Component {

  state = {
    slideIndex: 0,
    steps: [
      'welcome',
      'company',
      'team',
      'business units',
      'job types',
      'campaigns',
      'final steps'
    ]
  }

  totalActiveSteps = 4;

  setNextControls = (previous, next) => {
    this.nextButtonControls = next;
    this.previousButtonControls = previous;
  }

  handleTimelineClick = index => {
    this.setState({ slideIndex: index });
  }

  goToNextSlide = () => {
    const { slideIndex } = this.state;
    slideIndex === this.totalActiveSteps - 1
      ? this.setState({ slideIndex: 0 }) 
      : this.setState({ slideIndex: slideIndex + 1});
  }

  render() {

    const { slideIndex, steps } = this.state;

    const carouselConfig = {
      vertical: true,
      speed: 1000,
      easing: 'easeSinInOut',
      dragging: false,
      renderCenterLeftControls: () => null,
      renderCenterRightControls: () => null,
      afterSlide: slideIndex => this.setState({ slideIndex }),
      renderBottomRightControls: ( previousSlide, nextSlide ) => {
        this.setNextControls(previousSlide, nextSlide);
          return (
            <NavigationButtons 
              text={ !slideIndex ? 'LET\'S GET STARTED' : null}
              onClick={{previousSlide, nextSlide}}
            />
          )
        },
      slideIndex
    };

    return (
      <div className="main-parent-container">
        { 
          !!slideIndex &&
            <img className="logo" src={require("./../assets/st_full_logo_white.png")}/>
        }
        <Timeline
            steps={steps}
            slideIndex={slideIndex}
            handleTimelineClick={this.handleTimelineClick}
        />
        <Carousel {...carouselConfig }>
          <WelcomePage 
            shouldDisplay={slideIndex === 0}
            textHeader={"Welcome"}
            textSubHeader={"Let's get you set up!"}
          />
          <Slide color="rgba(34, 112, 238, 1)">
            <CompanyCarousel
              active={slideIndex === 1}
              goToNextSlide={this.goToNextSlide}
            />
          </Slide>
          <Slide color="#EFBB6E">
            <TeamCarousel
              active={slideIndex === 2}
              goToNextSlide={this.goToNextSlide}
            />
          </Slide>
          <Slide color="#b6dada">
            <BusinessUnitCarousel
              active={slideIndex === 3}
              goToNextSlide={this.goToNextSlide}
            />
          </Slide>
          <Slide color="#10864B"/>
          <Slide color="#08BFDF"/>
          <Slide color="#422799"/>
        </Carousel>
      </div> 
    );
  }
}

export default App;
