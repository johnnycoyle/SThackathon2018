/* es-lint disable */

import React, { Component } from 'react';
import * as Styles from './app.less';
import Carousel from 'nuka-carousel';
import Slide from './../components/slide';
import Timeline from './../components/timeline';
import WelcomePage from './../components/welcome-page';
import NavigationButtons from './../components/lets-get-started-button';
import HorizontalCarousel from './../components/horizontal-carousel';
import TeamCarousel from './../components/team-carousel';
import BusinessUnitCarousel from './../components/bu-carousel';

class App extends Component {

  constructor(props) {
    super(props);
    const steps = [
        'welcome',
        'company',
        'team',
        'business units',
        'job types',
        'campaigns',
        'final steps'
    ]

    this.state = {
      slideIndex: 0,
      welcomeIsCompleted: false,
      steps,
      introductionComplete: false
    }

    this.nextButtonControls;
    this.previousButtonControls;

    this.hasMounted = false;
  }

  componentDidMount() {
    this.hasMounted = true;
  }

  setNextControls = (previous, next) => {
    this.nextButtonControls = next;
    this.previousButtonControls = previous;
  }

  handleTimelineClick = (index) => {
    this.setState({ slideIndex: index});
  }

  transitionToTeamSlide = (e) => {
    this.setState({ slideIndex: 2 });
  }

  transitionToBusinessUnitsSlide = (e) => {
    this.setState({ slideIndex: 3});
  }

  goBackToStart = (e) => {
    this.setState({ slideIndex: 0});
  }


  render() {

    const { slideIndex } = this.state;

    return (
      <div className="main-parent-container">
        { 
          slideIndex !== 0 &&
            <img className="logo" src={require("./../assets/st_full_logo_white.png")}/>
        }
        <Timeline
            steps={this.state.steps}
            slideIndex={this.state.slideIndex}
            handleTimelineClick={this.handleTimelineClick}
        />
        <Carousel
          slideIndex={this.state.slideIndex}
          afterSlide={slideIndex => 
            this.setState({
              welcomeIsCompleted: this.state.welcomeIsCompleted || slideIndex === 0,
              slideIndex 
            })
          }
          easing={'easeSinInOut'}
          dragging={false}
          renderCenterLeftControls={() => null}
          renderCenterRightControls={() => null}
          renderBottomRightControls={({ previousSlide, nextSlide }) => {
            this.setNextControls(previousSlide, nextSlide);
            return (
              <NavigationButtons 
                text={ this.state.slideIndex === 0 ? 'LET\'S GET STARTED' : null}
                showPrevious={ this.state.slideIndex > 0}
                onClick={{previousSlide, nextSlide}}
              />
          )}}
          vertical={true}
          speed={1000}
        >
          <WelcomePage 
            shouldDisplay={this.hasMounted || this.state.slideIndex === 0}
            textHeader={"Welcome"}
            textSubHeader={"Let's get you set up!"}
          />
          <Slide content="Slide 1" color="rgba(34, 112, 238, 1)">
            <HorizontalCarousel
              active={this.state.slideIndex === 1}
              transitionToTeamSlide={this.transitionToTeamSlide}
            />
          </Slide>
          <Slide content="Slide 3" color="#EFBB6E">
            <TeamCarousel
              active={this.state.slideIndex === 2}
              transitionToBusinessUnitsSlide={this.transitionToBusinessUnitsSlide}
            />
          </Slide>
          <Slide content="Slide 3" color="#b6dada">
            <BusinessUnitCarousel
              active={this.state.slideIndex === 3}
              goBackToStart={this.goBackToStart}
            />
          </Slide>
          <Slide content="Slide 3" color="#10864B"/>
          <Slide content="Slide 5" color="#08BFDF"/>
          <Slide content="Slide 3" color="#422799"/>
          <Slide content="Slide 3"/>
        </Carousel>
      </div> 
    );
  }
}




export default App;
