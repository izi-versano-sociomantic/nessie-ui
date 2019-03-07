/*
 * Copyright (c) 2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React            from 'react';
import PropTypes        from 'prop-types';

import { generateId }   from '../utils';
import ThemeContext     from '../Theming/ThemeContext';
import { createCssMap } from '../Theming';


const componentName = 'Switch';

export default class Switch extends React.Component
{
    static contextType = ThemeContext;

    static propTypes =
    {
        /**
         * Extra CSS classname
         */
        className   : PropTypes.string,
        /**
         * CSS classname map
         */
        cssMap      : PropTypes.objectOf( PropTypes.string ),
        /**
         * Display as hover when required from another component
         */
        forceHover  : PropTypes.bool,
        /**
         * HTML id attribute
         */
        id          : PropTypes.string,
        /**
         *  Display as checked/“on”
         */
        isChecked   : PropTypes.bool,
        /**
         *  Display as disabled
         */
        isDisabled  : PropTypes.bool,
        /**
         *  Display as read-only
         */
        isReadOnly  : PropTypes.bool,
        /**
         *  switch label (used as aria-label)
         */
        label       : PropTypes.string,
        /**
         *  input name
         */
        name        : PropTypes.string,
        /**
         * onBlur callback function: ( e ) => { ... }
         */
        onBlur      : PropTypes.func,
        /**
         * onChange callback function: ( e ) => { ... }
         */
        onChange    : PropTypes.func,
        /**
         *  onFocus callback function: ( e ) => { ... }
         */
        onFocus     : PropTypes.func,
        /**
         *  onMouseOut callback function: ( e ) => { ... }
         */
        onMouseOut  : PropTypes.func,
        /**
         *  onMouseOver callback function: ( e ) => { ... }
         */
        onMouseOver : PropTypes.func,
        /**
         * HTML value attribute
         */
        value       : PropTypes.string,
    };

    static defaultProps =
    {
        className   : undefined,
        cssMap      : undefined,
        forceHover  : false,
        id          : undefined,
        isChecked   : false,
        isDisabled  : false,
        isReadOnly  : false,
        label       : undefined,
        name        : undefined,
        onBlur      : undefined,
        onChange    : undefined,
        onFocus     : undefined,
        onMouseOut  : undefined,
        onMouseOver : undefined,
        value       : undefined,
    };

    static displayName = componentName;

    render()
    {
        const {
            cssMap = createCssMap( this.context.Switch, this.props ),
            id = generateId( componentName ),
            isChecked,
            isDisabled,
            isReadOnly,
            label,
            name,
            onBlur,
            onChange,
            onFocus,
            onMouseOut,
            onMouseOver,
            value,
        } = this.props;

        return (
            <div
                className    = { cssMap.main }
                onMouseEnter = { onMouseOver }
                onMouseLeave = { onMouseOut }>
                <input
                    checked   = { isChecked }
                    className = { cssMap.input }
                    disabled  = { isDisabled || isReadOnly }
                    id        = { id }
                    name      = { name }
                    onBlur    = { onBlur }
                    onChange  = { !isReadOnly ? onChange : undefined }
                    onFocus   = { onFocus }
                    type      = "checkbox"
                    value     = { value } />
                <label
                    aria-label = { label }
                    className  = { cssMap.label }
                    htmlFor    = { id } />
            </div>
        );
    }
}
