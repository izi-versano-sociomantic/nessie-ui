/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                          from 'react';
import PropTypes                      from 'prop-types';

import Text                           from '../Text';
import { buildClassName, generateId } from '../utils';


const Checkable = ( {
    children,
    className,
    cssMap,
    forceHover,
    hasError,
    id = generateId( 'Checkable' ),
    inputRef,
    isChecked,
    isDefaultChecked,
    isDisabled,
    isReadOnly,
    label,
    name,
    onBlur,
    onChange,
    onClick,
    onFocus,
    onMouseOut,
    onMouseOver,
    type,
    value,
} ) =>
{
    let labelContent = children || label;

    if ( typeof labelContent === 'string' )
    {
        labelContent =
            <Text className = { cssMap.labelText }>{ labelContent }</Text>;
    }

    return (
        <div
            className = { buildClassName( className, cssMap, {
                disabled    : isDisabled,
                error       : !isDisabled && hasError,
                fakeHovered : !isDisabled && forceHover,
            } ) }
            onMouseEnter = { onMouseOver }
            onMouseLeave = { onMouseOut }>
            <input
                checked        = { isChecked }
                className      = { cssMap.input }
                defaultChecked = { isDefaultChecked }
                disabled       = { isDisabled || isReadOnly }
                id             = { id }
                name           = { name }
                onBlur         = { onBlur }
                onChange       = { onChange }
                onClick        = { onClick }
                onFocus        = { onFocus }
                ref            = { inputRef }
                type           = { type }
                value          = { value } />
            <label className = { cssMap.label } htmlFor = { id }>
                <span className = { cssMap.labelContent }>
                    { labelContent }
                </span>
            </label>
        </div>
    );
};


Checkable.propTypes =
{
    /**
     *  Label content (JSX node; overrides label prop)
     */
    children         : PropTypes.node,
    /**
     *  Extra CSS class name
     */
    className        : PropTypes.string,
    /**
     *  CSS class map
     */
    cssMap           : PropTypes.objectOf( PropTypes.string ),
    /**
     * Display as hover when required from another component
     */
    forceHover       : PropTypes.bool,
    /**
     *  Display as error/invalid
     */
    hasError         : PropTypes.bool,
    /**
     *  HTML id attribute
     */
    id               : PropTypes.string,
    /**
     * Callback that receives the native <input>: ( ref ) => { ... }
     */
    inputRef         : PropTypes.func,
    /**
     *  Display as checked (controlled input)
     */
    isChecked        : PropTypes.bool,
    /**
     *  Display as checked by default (uncontrolled input)
     */
    isDefaultChecked : PropTypes.bool,
    /**
     *  Display as disabled
     */
    isDisabled       : PropTypes.bool,
    /**
     *  Display as read-only
     */
    isReadOnly       : PropTypes.bool,
    /**
     *  Label content (string)
     */
    label            : PropTypes.string,
    /**
     *  Checkbox group name
     */
    name             : PropTypes.string,
    /**
     *  OnBlur callback function: ( e ) => { ... }
     */
    onBlur           : PropTypes.func,
    /**
     *  OnClick callback function: ( e ) => { ... }
     */
    onClick          : PropTypes.func,
    /**
     *  OnChange callback function: ( e ) => { ... }
     */
    onChange         : PropTypes.func,
    /**
     *  onFocus callback function: ( e ) => { ... }
     */
    onFocus          : PropTypes.func,
    /**
     *  onMouseOut callback function : ( e ) => { ... }
     */
    onMouseOut       : PropTypes.func,
    /**
     *  onMouseOver callback function : ( e ) => { ... }
     */
    onMouseOver      : PropTypes.func,
    /**
     *  Input type
     */
    type             : PropTypes.oneOf( [ 'checkbox', 'radio' ] ),
    /**
     *  HTML value attribute
     */
    value            : PropTypes.string,
};

Checkable.defaultProps =
{
    children         : undefined,
    className        : undefined,
    cssMap           : undefined,
    forceHover       : false,
    hasError         : false,
    id               : undefined,
    inputRef         : undefined,
    isChecked        : undefined,
    isDefaultChecked : undefined,
    isDisabled       : false,
    isReadOnly       : false,
    label            : undefined,
    name             : undefined,
    onChange         : undefined,
    onMouseOut       : undefined,
    onMouseOver      : undefined,
    type             : 'checkbox',
    value            : undefined,
};

export default Checkable;
