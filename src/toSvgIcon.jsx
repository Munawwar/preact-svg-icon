/**
 * Returns a Component that loosely follows MUI v5's interface
 * @param {string} svgUrl SVG url
 * @param {string} [fragmentId='id'] Fragment ID to reference within the .svg file.
 */
const toSvgIcon = (svgUrl, fragmentId = 'id') => {
  /**
   * @param {object} props
   * @param {string} [props.className]
   * @param {string} [props.color='currentColor']
   * @param {number} [props.size] In px
   * @param {object} [props.style]
   * @param {string} [props.title] <title> tag to use inside of <svg> element
   * @param {string} [props.titleId] The ID used in title and corresponding aria-labelledby attribute
   * @returns {import('preact').JSX.Element}
   */
  const SvgIcon = ({
    className = undefined,
    color = 'currentColor',
    size = undefined,
    style = undefined,
    title = '',
    titleId = ''
  }) => (
    <svg
      class={className}
      style={style}
      width={size}
      height={size}
      fill={color}
      aria-labelledby={(title && titleId) ? titleId : null}
    >
      { title ? <title id={titleId}>{title}</title> : null }
      <use href={`${svgUrl}#${fragmentId}`} />
    </svg>
  );

  return SvgIcon;
};

export default toSvgIcon;
