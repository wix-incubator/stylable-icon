import * as React from 'react';
import * as ReactDom from 'react-dom';

import { Icon } from '../src/icon';
import IconBaseStyle from '../src/icon.st.css'; // ToDo: check why rule-shaking makes this required
import siteSt from './site.st.css';

class Demo extends React.PureComponent<{}, {work:boolean}> {
    render(){
        return (
            <div {...siteSt('root', {}, {})}>
                <Icon className={siteSt.myIcon} />
                <Icon className={siteSt.myIcon2} />
                <Icon className={siteSt.myEmoji} />
                <Icon className={siteSt.myChar} />
            </div>
        );
    }
}


const wrapper:HTMLDivElement = document.createElement('div');
document.body.appendChild(wrapper);
ReactDom.render(<Demo />, wrapper);