import * as React from 'react';
import {expect} from 'chai';
import {createGenerator, createMinimalFS} from 'stylable';
import {generateStylableResult} from 'stylable/test-utils';
import {ClientRenderer, sinon, waitFor} from 'test-drive-react';

const {htmlIcon} = require('../../src/definition-helpers');
const definitionHelpersRaw = require('raw-loader!../../src/definition-helpers');
const {createIconProvider} = require('../../src/react-context-provider');
import {Icon} from '../../src/icon';
import {IconTestDriver} from '../../test-kit/icon.driver';

describe('<Icon />', () => {
    const clientRenderer = new ClientRenderer();
   
    afterEach(() => clientRenderer.cleanup());

    function renderDriver(jsx:JSX.Element):IconTestDriver {
        const {container} = clientRenderer.render(jsx);
        return new IconTestDriver(container);
    }

    describe('base prop', () => {

        it('should render empty content by default', () => {
            const iconDriver = renderDriver(<Icon />)
            
            expect(iconDriver.content()).to.have.html(``);
        });
        
        it('should render content in first render', () => {
            const icon = htmlIcon(`<span>✅</span>`);

            const iconDriver = renderDriver(<Icon base={icon} />);
            
            expect(iconDriver.content()).to.have.html(`<span>✅</span>`);
        });

        it('should render content from react context', () => {
            const iconBase = htmlIcon(`<span>❌</span>`);
            const iconContext = htmlIcon(`<span>✅</span>`);
            const IconProvider = createIconProvider({[iconBase]:iconContext});

            const iconDriver = renderDriver(
                <IconProvider>
                    <Icon base={iconBase} />
                </IconProvider>
            );

            expect(iconDriver.content()).to.have.html(`<span>✅</span>`);
        });
        
    });

    describe('CSS override', () => {

        function createStylesheet(iconContent:string) {
            const {exports, meta} = generateStylableResult({
                entry: '/style.st.css',
                files: {
                    '/style.st.css': {
                        content: `
                            :import {
                                -st-from: "./icon-set.js";
                                -st-named: dotIcon;
                            }
                            .myIcon {
                                -st-mixin: dotIcon();
                            }
                        `
                    },
                    '/icon-set.js': {content: `
                        const defHelpers = require('/def-helpers');
                        const {htmlIcon} = defHelpers;
                        
                        module.exports.dotIcon = htmlIcon(${JSON.stringify(iconContent)});
                    `},
                    '/def-helpers.js': {content: definitionHelpersRaw}
                }                
            });
            return {exports, meta, cssOutput:meta.outputAst!.toString()}
        }

        it('should render from CSS override', async () => {
            const iconBase = htmlIcon(`<span>❌</span>`);
            const { exports, meta, cssOutput } = createStylesheet(`<span>✅</span>`);   

            const iconDriver = renderDriver(
                <div className={exports.root}>
                    <style>{cssOutput}</style>
                    <Icon base={iconBase} className={exports.myIcon} />
                </div>
            );
            
            await waitFor(() => {
                expect(iconDriver.content()).to.have.html(`<span>✅</span>`);
            });
        });        

        it('should handle CSS content with mix quatation (escape CSS inline content)', async () => {
            const { exports, meta, cssOutput } = createStylesheet(`<span width="30" height='40'>'✅"</span>`);   

            const iconDriver = renderDriver(
                <div className={exports.root}>
                    <style>{cssOutput}</style>
                    <Icon className={exports.myIcon} />
                </div>
            );
            
            await waitFor(() => {
                const contentElement = iconDriver.content()!;
                expect(contentElement).to.have.text(`'✅"`);
                expect(contentElement.firstChild).to.have.attribute('width', '30');
                expect(contentElement.firstChild).to.have.attribute('height', '40');
                expect(contentElement.firstChild).to.be.instanceof(HTMLSpanElement);
            });
        });

        it('should render from CSS override with react context override ', async () => {
            const { exports, meta, cssOutput } = createStylesheet(`<span>❌</span>`);
            const originalIcon = htmlIcon(`<span>❌</span>`);
            const iconContext = htmlIcon(`<span>✅</span>`);
            const IconProvider = createIconProvider({[originalIcon]:iconContext});

            const iconDriver = renderDriver(
                <IconProvider>
                    <div className={exports.root}>
                        <style>{cssOutput}</style>
                        <Icon className={exports.myIcon} />
                    </div>
                </IconProvider>
            );
            
            await waitFor(() => {
                expect(iconDriver.content()).to.have.html(`<span>✅</span>`);
            });
        });

    });

});