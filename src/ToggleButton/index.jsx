import React               from 'react';
import PropTypes           from 'prop-types';

import { buildClassName }  from '../utils';
import styles              from './toggleButton.css';
import Icon                from '../Icon/';

const ToggleButton = ( {
    children,
    className,
    cssMap,
    iconPosition,
    iconSize,
    iconType,
    id,
    isDisabled,
    isPressed,
    isReadOnly,
    label,
    onBlur,
    onClick,
    onFocus,
    onMouseOut,
    onMouseOver,
    role

} ) =>
    (
        <button
            className = { buildClassName( className, cssMap, {
                isDisabled,
                isPressed,
                iconPosition,
                role
            } ) }
            disabled    = { isDisabled }
            readOnly    = { isReadOnly }
            id          = { id }
            onBlur      = { onBlur }
            onClick     = { onClick }
            onFocus     = { onFocus }
            onMouseOut  = { onMouseOut }
            onMouseOver = { onMouseOver }
        >
            { iconType && iconType !== 'none' &&
            <Icon
                className = { cssMap.icon }
                type      = { iconType }
                size      = { iconSize }
            />
            }
            <div>{ children || label }</div>

        </button>
    );

ToggleButton.propTypes =
{
    /**
     *  CSS class name
     */
    className    : PropTypes.string,
    /**
     *  CSS class map
     */
    cssMap       : PropTypes.objectOf( PropTypes.string ),
    /**
     *  Children 1 description
     */
    children     : PropTypes.string,
    /**
     * HTML id attribute (overwrite default)
     */
    /**
     *  Icon position relative to Button text
     */
    iconPosition : PropTypes.oneOf( [ 'left', 'right' ] ),
    /**
     *  Icon size to display
     */
    iconSize     : PropTypes.oneOf( [ 'S', 'M', 'L', 'XL', 'XXL' ] ),
    /**
     *  Icon type to display (overrides customIcon)
     */
    iconType     : PropTypes.oneOf( [
        'add',
        'alert',
        'approved',
        'calendar',
        'close',
        'declined',
        'delete',
        'down',
        'download',
        'duplicate',
        'edit',
        'ended',
        'error',
        'info',
        'inspect',
        'left',
        'link',
        'pending',
        'preview',
        'reset',
        'right',
        'search',
        'up',
        'upload',
        'validation',
        'none'
    ] ),
    /**
     * HTML id attribute (overwrite default)
     */
    id          : PropTypes.string,
    /**
    *  Display as disabled
    */
    isDisabled  : PropTypes.bool,
    /**
    *  Display as read-only
    */
    isReadOnly  : PropTypes.bool,
    /**
    *  Display as pressed state
    */
    isPressed   : PropTypes.bool,
    /**
    *  Label text
    */
    label       : PropTypes.string,
    /**
     *  Button blur callback function: ( e ) => { ... }
     */
    onBlur      : PropTypes.func,
    /**
     *  Button click callback function: ( e ) => { ... }
     */
    onClick     : PropTypes.func,
    onFocus     : PropTypes.func,
    /**
     *  Mouse out callback function: ( e ) => { ... }
     */
    onMouseOut  : PropTypes.func,
    /**
     *  Mouse over callback function: ( e ) => { ... }
     */
    onMouseOver : PropTypes.func,
    /**
    *  Button role/style
    */
    role        : PropTypes.oneOf( [ 'primary', 'secondary' ] )
};

ToggleButton.defaultProps =
{
    children     : undefined,
    className    : undefined,
    cssMap       : styles,
    iconPosition : 'left',
    iconSize     : 'M',
    iconType     : 'none',
    id           : undefined,
    isDisabled   : false,
    isPressed    : false,
    isReadOnly   : false,
    label        : undefined,
    onBlur       : undefined,
    onClick      : undefined,
    onFocus      : undefined,
    onMouseOut   : undefined,
    onMouseOver  : undefined,
    role         : 'primary'
};

export default ToggleButton;
