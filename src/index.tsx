import * as React from 'react';
import * as ReactDom from 'react-dom';

import { Icon } from './icon';

const wrapper:HTMLDivElement = document.createElement('div');
document.body.appendChild(wrapper);
ReactDom.render(<div>
    <Icon />
</div>, wrapper);