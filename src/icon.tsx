import * as React from 'react';
import * as ReactDOM from 'react-dom';
import iconSt from './icon.st.css';
import {contextSymbol, IconContextValidator} from './react-context-provider';

export interface IconDef {
    () : any; // stylable icon mixin
    content: string;
    id: string;
}

export interface IconProps {
    className?: string;
    id?:string;
    base?:IconDef;
}

export interface IconState {
    content:any;
}

export class Icon extends React.Component<IconProps, IconState> {
    static contextTypes = {
        [contextSymbol]: IconContextValidator
    };
    private contentDiv:HTMLDivElement | null = null;
    public state = {
        content: this.getContentFromReactRender()
    };

    render() {
        const {id} = this.props;
        return (
            <div {...iconSt('root', {}, this.props)} id={id}>
                <div onAnimationEnd={this.onAnimationEnd}></div>
                <div ref={this.setContentElement} dangerouslySetInnerHTML={{__html: this.state.content}}></div>
            </div>
        );
    }

    private getContentFromReactRender():string {
        const {base} = this.props;
        let result = '';
        if(base) {
            if(this.context[contextSymbol]){
                result = this.context[contextSymbol](base).toString();// || '';
            } else {
                result = base.content;
            }
        }
        return result;
    }

    private setContentElement = (element:HTMLDivElement | null) => {
        this.contentDiv = element;
    }

    private onAnimationEnd = (event: React.AnimationEvent<HTMLDivElement>) => {
        if(this.contentDiv) {
            debugger;
            const content = window.getComputedStyle(event.currentTarget, ':before').content || '""';
            // console.log('tick', content, event);
            this.contentDiv.innerHTML = content.slice(1, -1)
        } else {
            debugger;
        }
    }
}