// Этот файл служит определением типов для TS во время написания кода, для наличия сопоставления типов.

declare module '*.module.scss' {
    interface IClassNames {
        [className: string]: string,
    }
    
    const classNames: IClassNames;
    export = classNames;
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg' {
/* модуль декларации, чтоб объяснять typescript`у как работать с SVG, то есть каким классом в TS вселенной представлен SVG,
и соответственно какие есть поля и свойства (fill, style, height, width и т.д.). Также это обеспечивает работу автокомпилта.
То есть, можно было бы оставить и такую запись: "declate module '*.svg';", но тогда бы отстуствовало сопоставление типов для TS.*/
    import React from 'react';
    const svg: React.VFC<React.SVGProps<SVGSVGElement>>;
    export default svg;
}

declare const __PLATFORM__: 'mobile' | 'desktop';