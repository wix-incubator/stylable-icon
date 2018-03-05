# Stylable Icon - React

React icon component that can accept base content from the React rendering context, and be overidden by CSS with complex icon definitions that are part of the HTML context (CSS "cascade")

Features:

* Base icon definition - default icon with no React context override or CSS override
* React icon set context provider - define icon sets to provide an application default icons or override a specific rendering sub tree 
* SSR compatible - render base icon in first render
* DOM injection through CSS context! - customize icon definition using CSS, Example:
```css
Gallery::submitBtn::icon:dir(left) { -st-mixins: leftArrowIcon; }
Gallery::submitBtn::icon:dir(right) { -st-mixins: rightArrowIcon; }
Gallery:disable::submitBtn::icon { -st-mixins: disableIcon; }
```

## Why?

Icon React component... 
 * Uses the cascade
 * CSS animations
 * manage icon content through CSS rules

## Usage

### JS icon set

Create an `icon set` React context provider:

```js
/* icon-set.jsx */

import { createIconProvider, svgIcon } from 'stylable-icon';
// square icon with 32/32 viewbox (see icon definition helpers)
const squareIcon = svgIcon(`<rect x='6' y='6' width='20' height='20' />`);
// create a React SFC with context icon set that includes the square icon
export const IconSetContextProvider = createIconProvider({
    squareIcon
});
```

### apply icon set to React

```js
/* app.jsx */

import { Icon } from 'stylable-icon';
import { IconSetContextProvider, squareIcon } from './icon-set';
function App() {
    return (
        /* provide icon set to sub tree */
        <IconSetContextProvider>
            <div>
                {/* renders a base square icon for first render */}
                <Icon base={squareIcon} />
            </div>
        </IconSetContextProvider>
    );
}
```

ToDo: cascade icon set

### icon definition helpers

JS icon helpers:

```js
import { svgIcon, htmlIcon, emoji } from 'stylable-icon';

// wraps svg content with svg tag with default
// viewBox of 32px width and height and 
// maps fill to currentColor. Equal to:
// <svg viewBox='0 0 32 32' fill='currentColor'>[svgContent]</svg>
const icon1 = svgIcon('[svgContent]', '[?size=32]');
icon1() // CSS mixin for icon1

// simply inject the html content into 
// the icon area. 
const icon2 = htmlIcon('[htmlContent]');
icon2() // > css mixin for icon2

const emoji = emoji('[emoji]');
emoji() // > css mixin for emoji
```

CSS icon helpers:

```css
:import {
    -st-from: "stylable-icon/index.st.css";
    -st-named: Icon, svgIcon, htmlIcon;
}
.icon {
    /* set icon class to extend from Icon component style */ 
    -st-extends: Icon;
    /* mix square icon directly in CSS (no reuse).
       svg wrapper works like the JS svgIcon definition */
    -st-mixin: svgIcon("<rect x='6' y='6' width='20' height='20' />");
}
.icon {
    /* mix span with emoji icon directly in CSS */
    -st-mixin: htmlIcon("<span>🙀<span>");
}
```

### referencing JS icon in CSS

Referencing icons in CSS:

```css
:import {
    -st-from: "./icon-set";
    -st-named: squareIcon;
}
.icon {
    /* set a default square icon */
    -st-mixin: squareIcon;
    /* define icon main color and transition */
    color:red;
    transition: color 1s;
}
.icon:hover {
    /* modify icon color */ 
    color:green;
}
.button:focus .icon {
    /* override icon content */
    -st-mixin: triangeIcon;
}
```


## Obstacles & Solutions

### contextual CSS content injection

###
