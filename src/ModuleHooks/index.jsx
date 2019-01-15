/*
 * Copyright (c) 2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React, { useState, useContext } from 'react';
import PropTypes                       from 'prop-types';

import { buildClassName }              from '../utils';
import ThemeContext                    from '../Theming/ThemeContext';
import { createCssMap }                from '../Theming/createCss';
import {
    Card,
    H2,
    H3,
    H4,
    IconButton,
    IconWithTooltip,
} from '../index';

const headers = { 2: H2, 3: H3, 4: H4 };

const ModuleHooks = props =>
{
    const context = useContext( ThemeContext );
    const [ collapsed, toggleCollapsed ] = useState( false );

    const {
        children,
        className,
        cssMap = createCssMap( context.Module, props ),
        customHeader,
        errorMessage,
        errorMessageIsVisible,
        hasError,
        hasModuleError,
        headerLevel,
        isCollapsed,
        isCollapsible,
        isDeletable,
        isLoading,
        isReadOnly,
        onClickDelete,
        onClickHeader,
        onClickToggle,
        onMouseOutError,
        onMouseOutHeader,
        onMouseOverError,
        onMouseOverHeader,
        title,
    } = props;

    let header;

    const finalCollapsed = typeof isCollapsed !== 'undefined' ? isCollapsed :
        collapsed;

    const handleClickToggle = ( e ) =>
    {
        e.stopPropagation();

        if ( onClickToggle )
        {
            onClickToggle( e );
        }

        toggleCollapsed( !collapsed );
    };

    const handleClickDelete = ( e ) =>
    {
        e.stopPropagation();

        if ( onClickDelete )
        {
            onClickDelete( e );
        }
    };

    if ( customHeader )
    {
        header = (
            <header
                className    = { cssMap.header }
                onClick      = { onClickHeader }
                onMouseOut   = { onMouseOutHeader }
                onMouseOver  = { onMouseOverHeader }>
                { customHeader }
            </header>
        );
    }
    else if ( title )
    {
        const ModuleHeader = headers[ headerLevel ];

        header = (
            <header
                className      = { cssMap.header }
                onClick        = { onClickHeader }
                onMouseOut     = { onMouseOutHeader }
                onMouseOver    = { onMouseOverHeader }>
                <div className = { cssMap.title }>
                    <ModuleHeader>{ title }</ModuleHeader>
                </div>
                <div className = { cssMap.controls }>
                    { !!errorMessage && hasError &&
                    <IconWithTooltip
                        iconType         = "error"
                        message          = { errorMessage }
                        noWarn
                        onMouseOut       = { onMouseOutError }
                        onMouseOver      = { onMouseOverError }
                        tooltipIsVisible = { errorMessageIsVisible } />
                    }
                    { isDeletable &&
                    <IconButton
                        iconType   = "delete"
                        isReadOnly = { isReadOnly }
                        onClick    = { handleClickDelete }>
                          Delete
                    </IconButton>
                    }
                    { isCollapsible &&
                    <IconButton
                        iconType  = { finalCollapsed ? 'down' : 'up' }
                        onClick   = { handleClickToggle }>
                        { finalCollapsed ? 'Show' : 'Hide' }
                    </IconButton>
                    }
                </div>
            </header>
        );
    }

    return (
        <Card
            className = { buildClassName( className, cssMap, {
                collapsed   : isCollapsible && finalCollapsed,
                collapsible : isCollapsible,
                error       : hasError,
                level       : headerLevel,
                moduleError : hasModuleError,
            } ) }
            padding = "none">
            { header }
            { ( !isCollapsible || !finalCollapsed ) &&
                <div className = { cssMap.content }>
                    { children }
                </div>
            }
            { isLoading  && <div className = { cssMap.loadingOverlay } /> }
        </Card>
    );
};

ModuleHooks.propTypes =
{
    /**
     *  Module title
     */
    title                 : PropTypes.string,
    /**
     *  Module content
     */
    children              : PropTypes.node,
    /**
     *  CSS class map
     */
    cssMap                : PropTypes.objectOf( PropTypes.string ),
    /**
     *  Allow module to be collapsed
     */
    isCollapsible         : PropTypes.bool,
    /**
     *  Display module as collapsed (show a toggle)
     */
    isCollapsed           : PropTypes.bool,
    /**
     *  Allow module to be removed (show a “Delete” button)
     */
    isDeletable           : PropTypes.bool,
    /**
     *  Display loading state
     */
    isLoading             : PropTypes.bool,
    /**
     *  Readonly state
     */
    isReadOnly            : PropTypes.bool,
    /**
     *  Header level in the document outline
     */
    headerLevel           : PropTypes.oneOf( [ 2, 3, 4 ] ),
    /**
     *  Display as error/invalid
     */
    hasError              : PropTypes.bool,
    /**
     *  Display whole module as error/invalid
     */
    hasModuleError        : PropTypes.bool,
    /**
     *  Tooltip message text (string or JSX)
     */
    errorMessage          : PropTypes.node,
    /**
     *  Tooltip is displayed
     */
    errorMessageIsVisible : PropTypes.bool,
    /**
     *  Override the headerLevel for a custom built header
     */
    customHeader          : PropTypes.node,
    /**
     *  Header click callback function
     */
    onClickHeader         : PropTypes.func,
    /**
     *  Toggle button click callback function
     */
    onClickToggle         : PropTypes.func,
    /**
     *  Delete button onClick callback function
     */
    onClickDelete         : PropTypes.func,
    /**
     *  Error icon mouse over callback function
     */
    onMouseOutError       : PropTypes.func,
    /**
     *  Error icon mouse out callback function
     */
    onMouseOverError      : PropTypes.func,
    /**
     *  Header mouse over callback function
     */
    onMouseOutHeader      : PropTypes.func,
    /**
     *  Header mouse out callback function
     */
    onMouseOverHeader     : PropTypes.func,
};

ModuleHooks.defaultProps =
{
    cssMap        : undefined,
    headerLevel   : 2,
    isCollapsed   : undefined,
    isCollapsible : false,
    isDeletable   : false,
    isLoading     : false,
    isReadOnly    : false,
};

ModuleHooks.displayName = 'ModuleHooks';

export default ModuleHooks;
