import isMobile from '../../Constants/isMobile';

import SlideMobile1 from './images/mobile/slide-start.svg';
import SlideMobile2 from './images/mobile/slide-voting.svg';
import SlideMobile3 from './images/mobile/slide-score.svg';
import SlideMobile4 from './images/mobile/slide-matches.svg';
import SlideMobile5 from './images/mobile/slide-table.svg';
import SlideMobile6 from './images/mobile/slide-team.svg';
import SlideMobile7 from './images/mobile/slide-final.svg';

import SlideDesktop1 from './images/desktop/slide-start.svg';
import SlideDesktop2 from './images/desktop/slide-voting.svg';
import SlideDesktop3 from './images/desktop/slide-score.svg';
import SlideDesktop4 from './images/desktop/slide-matches.svg';
import SlideDesktop5 from './images/desktop/slide-table.svg';
import SlideDesktop6 from './images/desktop/slide-team.svg';
import SlideDesktop7 from './images/desktop/slide-final.svg';

const mobile = [SlideMobile1, SlideMobile2, SlideMobile3, SlideMobile4, SlideMobile5, SlideMobile6, SlideMobile7];

const desktop = [SlideDesktop1, SlideDesktop2, SlideDesktop3, SlideDesktop4, SlideDesktop5, SlideDesktop6, SlideDesktop7];

export default isMobile ? mobile : desktop;
