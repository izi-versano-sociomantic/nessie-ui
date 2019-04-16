/*
 * Copyright (c) 2018-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                             from 'react';
import PropTypes                         from 'prop-types';

import { attachEvents, useThemeClasses } from '../utils';


const componentName = 'Card';

const Card = props =>
{
    const { children, style } = props;

    const cssMap = useThemeClasses( componentName, props );

    return (
        <div
            { ...attachEvents( props ) }
            className = { cssMap.main }
            style     = { style }>
            { children }
        </div>
    );
};

Card.propTypes =
{
    /**
     *  Module content
     */
    children  : PropTypes.node,
    /**
     *  Extra CSS class name
     */
    className : PropTypes.string,
    /**
     *  CSS class map
     */
    cssMap    : PropTypes.objectOf( PropTypes.string ),
    /**
    *   Card padding
    */
    padding   : PropTypes.oneOfType( [
        PropTypes.oneOf( [ 'none', 'S', 'M', 'L', 'XL', 'XXL' ] ),
        PropTypes.arrayOf( PropTypes.oneOf( [
            'none',
            'S',
            'M',
            'L',
            'XL',
            'XXL',
        ] ) ),
    ] ),
    /**
     *  Style overrides
     */
    style : PropTypes.objectOf( PropTypes.string ),
};

Card.defaultProps =
{
    children  : undefined,
    className : undefined,
    cssMap    : undefined,
    padding   : 'M',
    style     : undefined,
};

Card.displayName = componentName;

export default Card;
