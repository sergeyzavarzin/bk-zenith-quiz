import React, {useState} from 'react';
import {Div, PanelSpinner, FixedLayout, Gallery, Button, Panel} from '@vkontakte/vkui';

import slides from './slides';

import {withAppContext} from '../../Contexts/AppContext';

import './Welcome.scss';

const Welcome = ({id, startApp, appContext}) => {

  const {isAppDataFetching} = appContext.state;

  const [slideIndex, setSlideIndex] = useState(0);

  const next = () => slideIndex !== slides.length - 1 ? setSlideIndex(slideIndex + 1) : startApp();

  return (
    <Panel id={id} theme='white'>
      {
        isAppDataFetching ? <>
          <div className='welcome'>
            <Gallery
              slideWidth='100%'
              slideIndex={slideIndex}
              onChange={slideIndex => setSlideIndex(slideIndex)}
              style={{height: '100%'}}
              bullets='dark'
            >
              {
                slides.map((slide, index) =>
                  <div
                    key={index}
                    className='welcome__slide'
                  >
                    <img className='welcome__image' src={slide} alt=''/>
                  </div>
                )
              }
            </Gallery>
          </div>
          <FixedLayout vertical='bottom'>
            <Div style={{padding: '0 40px'}}>
              <Button
                size='xl'
                onClick={next}
              >
                {slideIndex === slides.length - 1 ? 'Начать' : 'Далее'}
              </Button>
            </Div>
          </FixedLayout>
        </> : <PanelSpinner/>
      }
    </Panel>
  )
};

export default withAppContext(Welcome);
