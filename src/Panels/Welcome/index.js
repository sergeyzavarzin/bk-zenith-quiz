import React, {useState} from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Gallery from '@vkontakte/vkui/dist/components/Gallery/Gallery';
import FixedLayout from '@vkontakte/vkui/dist/components/FixedLayout/FixedLayout';
import {Div} from '@vkontakte/vkui';

import Zenith from '../../img/zenith.png';

import './Welcome.scss';

const Welcome = ({id, startApp}) => {

  const [slideIndex, setSlideIndex] = useState(0);

  const next = () => {
    if (slideIndex !== 2) {
      setSlideIndex(slideIndex + 1);
    } else {
      startApp();
    }
  };

  return (
    <Panel id={id} theme='white'>
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
    </Panel>
  )
};

export default Welcome;
