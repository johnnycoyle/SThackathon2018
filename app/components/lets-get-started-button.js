import React from 'react';
import './lets-get-started-button-styles.less'
import { Icon } from 'semantic-ui-react';

const NavigationButtons = ({ onClick, text, showPrevious }) => {
  return (
        !showPrevious ? ( 
          <div className="nav-button-container">
            <span>{text}</span>
            <button className="nav-button-next" onClick={onClick.nextSlide}>
              <Icon name="chevron down"/>
            </button>
          </div>
        ) : null 
  );
}

export default NavigationButtons;