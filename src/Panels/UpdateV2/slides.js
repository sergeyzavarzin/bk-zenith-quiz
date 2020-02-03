import isMobile from '../../Constants/isMobile';

import SlideMobile1 from './images/mobile/1.svg';
import SlideMobile2 from './images/mobile/2.svg';
import SlideMobile3 from './images/mobile/3.svg';
import SlideMobile4 from './images/mobile/4.svg';
import SlideMobile5 from './images/mobile/5.svg';
import SlideMobile6 from './images/mobile/6.svg';

import SlideDesktop1 from './images/desktop/1.svg';
import SlideDesktop2 from './images/desktop/2.svg';
import SlideDesktop3 from './images/desktop/3.svg';
import SlideDesktop4 from './images/desktop/4.svg';
import SlideDesktop5 from './images/desktop/5.svg';
import SlideDesktop6 from './images/desktop/6.svg';

const mobile = [SlideMobile1, SlideMobile2, SlideMobile3, SlideMobile4, SlideMobile5, SlideMobile6];

const desktop = [SlideDesktop1, SlideDesktop2, SlideDesktop3, SlideDesktop4, SlideDesktop5, SlideDesktop6];

export default isMobile ? mobile : desktop;
