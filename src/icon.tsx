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
        content: this.getContentFromReactRender(this.props.base || {})
    };

    render() {
        const {id} = this.props;
        return (
            <div {...iconSt('root', {}, this.props)} id={id}>
                <div onAnimationEnd={this.onAnimationEnd}></div>
                <div ref={this.setContentElement} dangerouslySetInnerHTML={{__html: this.state.content}}></div>
            </div>
        );//
    }

    private getContentFromReactRender({content, id}:{content?:string, id?:string}):string {
        let result = content || '';
        if(content && id) {
            if(this.context[contextSymbol]){
                const iconDef = this.context[contextSymbol](id);
                result = iconDef ? iconDef.toString() : content;
            }
        }
        return result;
    }

    private setContentElement = (element:HTMLDivElement | null) => {
        this.contentDiv = element;
    }

    private cache:{[s:string]:Element|null} = {};

    private onAnimationEnd = (event: React.AnimationEvent<HTMLDivElement>) => {
        if(this.contentDiv) {
            const content = window.getComputedStyle(event.currentTarget, ':before').content || '""';
            const cachedElement = this.cache[content];
            if(cachedElement) {
                while (this.contentDiv.firstChild) {
                    this.contentDiv.removeChild(this.contentDiv.firstChild);
                }
                this.contentDiv.appendChild(cachedElement);
            } else {
                const parsedContent = JSON.parse(content);
                this.contentDiv.innerHTML = this.getContentFromReactRender({content:parsedContent, id:parsedContent});
                this.cache[content] = this.contentDiv.firstElementChild;
            }
        } else {
            debugger;
        }
    }
}