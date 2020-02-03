import React, {useState} from 'react';
import {
  Div, PanelSpinner, FixedLayout,
  Gallery, Button, Panel,
} from '@vkontakte/vkui';

import {withAppContext} from '../../Contexts/AppContext';

import slides from './slides';

import './UpdateV2.scss';

const UpdateV2 = ({id, startApp, appContext}) => {

  const {createUserFlag, state: {isAppDataFetching}} = appContext;

  const [slideIndex, setSlideIndex] = useState(0);

  const next = () => {
    if (slideIndex !== slides.length - 1) {
      setSlideIndex(slideIndex + 1)
    } else {
      createUserFlag({isUserV2: true});
      startApp();
    }
  };

  const handleChange = slideIndex => {
    setSlideIndex(slideIndex);
  };

  return (
    <Panel id={id} theme='white'>
      {
        isAppDataFetching ? <>
          <div className='welcome'>
            <Gallery
              slideWidth='100%'
              slideIndex={slideIndex}
              onChange={handleChange}
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
            <Div style={{marginBottom: -15}}>
              <div className='welcome__button'>
                <Button
                  size='xl'
                  onClick={next}
                >
                  {slideIndex === slides.length - 1 ? 'Начать' : 'Далее'}
                </Button>
              </div>
            </Div>
          </FixedLayout>
        </> : <PanelSpinner/>
      }
    </Panel>
  )
};

export default withAppContext(UpdateV2);
