import React, {useState} from 'react';
import {Div, PanelSpinner, FixedLayout, Gallery, Button, Panel} from '@vkontakte/vkui';

import {withAppContext} from '../../context/AppContext';

import Zenith from '../../img/zenith.png';

import './Welcome.scss';

const Welcome = ({id, startApp, appContext}) => {

  const {isAppLoaded} = appContext.state;

  const [slideIndex, setSlideIndex] = useState(0);

  const next = () => slideIndex !== 2 ? setSlideIndex(slideIndex + 1) : startApp();

  return (
    <Panel id={id} theme='white' centered={!isAppLoaded}>
      {
        isAppLoaded ? <>
          <Div>
            <div className='welcome'>
              <Gallery
                slideWidth='100%'
                slideIndex={slideIndex}
                onChange={slideIndex => setSlideIndex(slideIndex)}
                style={{height: '100%'}}
              >
                <div className='welcome__slide'>
                  <img src={Zenith} alt='Зенит' style={{marginBottom: 30, maxWidth: 200}}/>
                  Добро пожаловать в приложение "Стартовая пятерка".
                </div>
                <div className='welcome__slide'>
                  Голосуй и зарабатывай очки.
                </div>
                <div className='welcome__slide'>
                  Лучшие голосующие получат призы.
                </div>
              </Gallery>
            </div>
          </Div>
          <FixedLayout vertical='bottom'>
            <Div>
              <Button
                size="xl"
                onClick={next}
              >
                {slideIndex === 2 ? 'Начать' : 'Далее'}
              </Button>
            </Div>
          </FixedLayout>
        </> : <PanelSpinner/>
      }
    </Panel>
  )
};

export default withAppContext(Welcome);
