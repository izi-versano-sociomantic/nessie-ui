import React                from 'react';
import PropTypes            from 'prop-types';

import { buildClassName }   from '../utils';
import Label                from '../Label';
import IconWithTooltip      from '../IconWithTooltip';


const Fieldset = ( {
    children,
    className,
    cssMap,
    errorMessage,
    errorMessageIsVisible,
    errorMessagePosition,
    hasError,
    isDisabled,
    label,
    onMouseOut,
    onMouseOver,
} ) => (
    <fieldset
        className    = { buildClassName( className, cssMap ) }
        onMouseEnter = { onMouseOver }
        onMouseLeave = { onMouseOut }>
        { label &&
            <IconWithTooltip
                className        = { cssMap.labelContainer }
                iconIsVisible    = { !isDisabled && !!errorMessage && hasError }
                iconPosition     = "right"
                iconType         = "error"
                message          = { errorMessage }
                noWarn
                tooltipIsVisible = { errorMessageIsVisible }
                tooltipPosition  = { errorMessagePosition }>
                <Label element = "legend">{ label }</Label>
            </IconWithTooltip>
        }
        { children }
    </fieldset>
);

Fieldset.propTypes =
{
    /**
     *  Fieldset label string or JSX node
     */
    label                 : PropTypes.node,
    /**
     *  Display as error/invalid
     */
    hasError              : PropTypes.bool,
    /**
     *  Tooltip message text (string or JSX)
     */
    errorMessage          : PropTypes.node,
    /**
    *  Display as disabled
    */
    isDisabled            : PropTypes.bool,
    /**
     *  Error Tooltip is displayed
     */
    errorMessageIsVisible : PropTypes.bool,
    /**
     *  Fieldset content (usually Checkboxes or Radios)
     */
    children              : PropTypes.node,
    /**
     *  onMouseOver callback function : ( e ) => { ... }
     */
    onMouseOver           : PropTypes.func,
    /**
     *  onMouseOut callback function : ( e ) => { ... }
     */
    onMouseOut            : PropTypes.func,

    /**
    *  Error message position relative to the icon
    */
    errorMessagePosition : PropTypes.oneOf( [
        'top',
        'topLeft',
        'topRight',
        'bottom',
        'left',
        'right',
    ] ),
};

Fieldset.defaultProps =
{
    cssMap                : require( './fieldset.css' ),
    errorMessageIsVisible : false,
    errorMessagePosition  : 'top',
    hasError              : false,
};

export default Fieldset;
