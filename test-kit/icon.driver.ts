import {DriverBase, simulate} from 'test-drive-react';
import {StylableDOMUtil} from 'stylable/test-utils';
import {Icon} from '../src/icon';
import IconBaseStyle from '../src/icon.st.css';

export class IconTestDriver {
    private stylableDom: StylableDOMUtil;

    constructor(private container: Element) {
        this.stylableDom = new StylableDOMUtil(IconBaseStyle, container);
    }

    private querySelector(selector:string) {
        let result = this.container.querySelector(selector);
        if(!result && this.container.parentElement) {
            result = this.container.parentElement.querySelector(selector);
        }
        return result;
    }

    public content(id?:string) { 
        const idSelector = id ? '#' + id : '';
        const selector = this.stylableDom.scopeSelector(`${idSelector}.root`) + ' > :nth-child(2)';
        return this.querySelector(selector);
    }
}