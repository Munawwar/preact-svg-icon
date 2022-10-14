export type SvgIcon = ({ className, color, size, style, title, titleId }: {
    className?: string;
    /** default value 'currentColor' */
    color?: string;
    /** In px */
    size?: number;
    style?: object;
    /** title tag to use inside of svg element */
    title?: string;
    /**  The ID used in title and corresponding aria-labelledby attribute */
    titleId?: string;
}) => import('preact').VNode<any>;

/**
 * Returns a Component that loosely follows React MUI v5's interface
 * @param {string} svgUrl SVG url
 * @param {string} [fragmentId='id'] Fragment ID to reference within the .svg file.
 */
declare function toSvgIcon(svgUrl: string, fragmentId?: string): SvgIcon;

export default toSvgIcon;