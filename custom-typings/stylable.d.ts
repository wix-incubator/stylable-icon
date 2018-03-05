declare module '*.st.css' {
    const stylesheet: RuntimeStylesheet;
    export default stylesheet;
}

interface StateMap {
    [key: string]: boolean | number | string;
}
interface PartialProps {
    className?: string;
    [key: string]: any;
}
interface Stylesheet {
    namespace: string;
    root: string;
    get: (localName: string) => string;
    cssStates: (stateMapping: StateMap) => StateMap;
}
interface RuntimeHelpers {
    $get: (localName: string) => string;
    $cssStates: (stateMapping?: StateMap | null) => StateMap;
}
declare type StylesheetLocals = {
    [key: string]: string;
} & {
    $stylesheet: Stylesheet;
} & RuntimeHelpers;
declare type RuntimeStylesheet = StylesheetLocals & ((className: string, states?: StateMap | null, props?: PartialProps) => {
    [key: string]: string;
});