/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global document */

import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import {
    ListBox,
    ScrollBox,
    Text,
} from '../index';
import TextInputWithIcon from '../TextInputWithIcon';
import {
    addPrefix,
    prefixOptions,
    removePrefix,
} from './utils';
import { generateId }   from '../utils';
import withDropdown     from '../Addons/withDropdown';

const InputWithDropdown = withDropdown( TextInputWithIcon );

/**
 * gets the index of the option by the passed id
 *
 * @param {String} id id of the option
 * @param {Array} options Array of options
 *
 * @return {Number} index of the option
 */
function getIndex( id, options = [] )
{
    return options.findIndex( opt => opt.id === id );
}

/**
 * gets the option by the passed id
 *
 * @param {String} id id of the option
 * @param {Array} options Array of options
 *
 * @return {Object} option Object.
 */
function getOption( id, options = [] )
{
    return options.find( opt => opt.id === id );
}

/**
 * gives correct format to the filtered options
 *
 * @param {Array} filteredOptionsIds options ids after search filter
 * @param {Array} originalOptions original options
 *
 * @return {Array} formattedOptions filtered and formatted options
 */
function optionsFormatted( filteredOptionsIds, originalOptions )
{
    return originalOptions.reduce( ( formattedOptions, option ) => {
        if ( option.options )
        {
            const sectionOptions = optionsFormatted(
                filteredOptionsIds,
                option.options,
            );

            if ( sectionOptions.length )
            {
                const newOptions = { ...option, options: sectionOptions };
                formattedOptions.push( newOptions );
            }
        }
        else if ( filteredOptionsIds.includes( option.id ) )
        {
            formattedOptions.push( option );
        }
        return formattedOptions;
    }, [] );
}

export default class ComboBox extends Component
{
    static propTypes =
    {
        /**
         *  Extra CSS class name
         */
        className           : PropTypes.string,
        /**
         * Placeholder text to show when no dropdown list options
         */
        dropdownPlaceholder : PropTypes.string,
        /**
         * Position of the dropdown relative to the text input
         */
        dropdownPosition    : PropTypes.oneOf( [ 'top', 'bottom' ] ),
        /**
         *  Display as error/invalid
         */
        hasError            : PropTypes.bool,
        /**
         *  Component id
         */
        id                  : PropTypes.string,
        /**
         *  Placeholder text
         */
        inputPlaceholder    : PropTypes.string,
        /**
         *  Display as disabled
         */
        isDisabled          : PropTypes.bool,
        /**
         *  Display as read-only
         */
        isReadOnly          : PropTypes.bool,
        /**
          *  input searchable
          */
        isSearchable        : PropTypes.bool,
        /**
         *  Change callback: ( { selectedOption } ) => ...
         */
        onChange            : PropTypes.func,
        /*
         * Dropdown list options
         */
        options             : PropTypes.arrayOf( PropTypes.object ),
        /**
         *  Selected option id
         */
        selectedOption      : PropTypes.string,
    };

    static defaultProps =
    {
        className           : undefined,
        dropdownPlaceholder : undefined,
        dropdownPosition    : 'bottom',
        hasError            : false,
        id                  : undefined,
        inputPlaceholder    : undefined,
        isDisabled          : false,
        isReadOnly          : undefined,
        isSearchable        : false,
        onChange            : undefined,
        options             : undefined,
        selectedOption      : undefined,
    };

    inputRef = React.createRef();
    scrollBoxRef = React.createRef();
    wrapperRef = React.createRef();

    constructor()
    {
        super();

        this.state = {
            activeOption    : undefined,
            filteredOptions : undefined,
            flatOptions     : undefined,
            id              : undefined,
            isFocused       : false,
            isOpen          : undefined,
            options         : undefined,
            searchValue     : undefined,
            selectedOption  : undefined,
        };

        this.handleChangeInput     = this.handleChangeInput.bind( this );
        this.handleClickIcon       = this.handleClickIcon.bind( this );
        this.handleClickInput      = this.handleClickInput.bind( this );
        this.handleClickOption     = this.handleClickOption.bind( this );
        this.handleKeyDown         = this.handleKeyDown.bind( this );
        this.handleMouseOutOption  = this.handleMouseOutOption.bind( this );
        this.handleMouseOverOption = this.handleMouseOverOption.bind( this );
        this.handleBlur            = this.handleBlur.bind( this );
        this.handleFocus           = this.handleFocus.bind( this );
    }

    static getDerivedStateFromProps( props, state )
    {
        let { flatOptions } = state;
        const { selectedOption } = props;
        let optionId = selectedOption || state.selectedOption;

        if ( props.options !== state.options )
        {
            flatOptions = props.options.flatMap( o => o.options || o );
        }

        if ( optionId )
        {
            optionId = getOption( optionId, flatOptions )
                ? getOption( optionId, flatOptions ).id : undefined;
        }

        return {
            flatOptions,
            filteredOptions : state.filteredOptions,
            id              : props.id || state.id || generateId( 'Select' ),
            options         : props.options,
            searchValue     : state.searchValue,
            selectedOption  : optionId,
        };
    }

    componentDidUpdate()
    {
        const { current: scrollBoxRef } = this.scrollBoxRef;
        const { activeOption, id } = this.state;

        if ( scrollBoxRef && activeOption )
        {
            const activeEl =
                document.getElementById( addPrefix( activeOption, id ) );

            if ( activeEl &&
                scrollBoxRef.scrollHeight > scrollBoxRef.offsetHeight )
            {
                const pos        = activeEl.offsetTop;
                const elHeight   = activeEl.offsetHeight;
                const contHeight = scrollBoxRef.offsetHeight;

                const min = scrollBoxRef.scrollTop;
                const max = min + ( scrollBoxRef.offsetHeight - elHeight );

                if ( pos < min )
                {
                    scrollBoxRef.scrollTop = pos;
                }
                else if ( pos > max )
                {
                    scrollBoxRef.scrollTop = pos - ( contHeight - elHeight );
                }
            }
        }
    }

    focus()
    {
        this.inputRef.current.focus();
    }

    handleChangeInput( e )
    {
        const searchValue = ( e.target.value || '' ).toLowerCase();

        const filteredOptions = this.state.flatOptions.filter( ( { text } ) =>
            !searchValue || text.toLowerCase().indexOf( searchValue ) > -1 );

        const activeOption = ( searchValue && filteredOptions.length )
            ? filteredOptions[ 0 ].id : undefined;

        this.setState( {
            activeOption,
            filteredOptions,
            searchValue,
        } );
    }

    handleClickIcon()
    {
        this.inputRef.current.focus();
        this.setState( { isOpen: true } );
    }

    handleClickInput()
    {
        this.setState( { isOpen: true  } );
    }

    handleClickOption( e, optId )
    {
        const { isReadOnly, onChange } = this.props;
        const { id } = this.state;
        const unprefixedId = removePrefix( optId, id );

        this.setState( prevState => {
            const selectedOption = !isReadOnly ? getOption(
                unprefixedId,
                prevState.flatOptions,
            ).id : prevState.selectedOption;

            if ( !isReadOnly && typeof onChange === 'function' )
            {
                onChange( { selectedOption }, e );
            }

            return {
                activeOption    : selectedOption,
                filteredOptions : undefined,
                isOpen          : false,
                searchValue     : undefined,
                selectedOption,
            };
        } );
    }

    handleKeyDown( e )
    {
        const { key } = e;

        if ( key === 'ArrowUp' || key === 'ArrowDown' )
        {
            e.preventDefault();

            this.setState( prevState => {
                const options = prevState.filteredOptions
                || prevState.flatOptions;

                if ( prevState.isOpen && options.length )
                {
                    const minIndex = 0;
                    const maxIndex = options.length - 1;

                    let activeIndex = getIndex(
                        prevState.activeOption || prevState.selectedOption,
                        options,
                    );

                    activeIndex = key === 'ArrowUp'
                        ? Math.max( activeIndex - 1, minIndex )
                        : Math.min( activeIndex + 1, maxIndex );

                    return {
                        activeOption : options[ activeIndex ].id,
                    };
                }

                return { isOpen: true };
            } );
        }
        else if ( key === 'Escape' )
        {
            this.setState( {
                activeOption    : undefined,
                filteredOptions : undefined,
                isOpen          : false,
                searchValue     : undefined,
            } );
        }
        else if ( key === 'Enter' )
        {
            const { isReadOnly, onChange } = this.props;

            this.setState( prevState => {

                const selectedOption = !isReadOnly && prevState.activeOption ?
                    prevState.activeOption : prevState.selectedOption;

                if ( !isReadOnly && typeof onChange === 'function' )
                {
                    onChange( { selectedOption }, e );
                }
                return {
                    activeOption    : prevState.activeOption,
                    filteredOptions : undefined,
                    isOpen          : typeof isOpen === 'boolean' ?
                        this.state.isOpen : !prevState.isOpen,
                    searchValue : undefined,
                    selectedOption,
                }
            } );
        }
    }

    handleMouseOutOption()
    {
        this.setState( { activeOption: undefined } );
    }

    handleMouseOverOption( e, optId )
    {
        const { id } = this.state;
        const unprefixedId = removePrefix( optId, id );

        this.setState( prevState => {
            const activeOption = getOption(
                unprefixedId,
                prevState.flatOptions,
            ).id;
            return { activeOption };
        } );
    }

    handleFocus()
    {
        this.setState( {
            isFocused : true,
            isOpen    : true,
        } );
    }

    handleBlur()
    {
        this.setState( {
            activeOption    : undefined,
            isFocused       : false,
            isOpen          : false,
            filteredOptions : undefined,
            searchValue     : undefined,
        } );
    }

    render()
    {
        const {
            className,
            dropdownPlaceholder,
            dropdownPosition,
            hasError,
            inputPlaceholder,
            isDisabled,
            isReadOnly,
            isSearchable,
            options,
        } = this.props;

        const {
            activeOption,
            filteredOptions,
            flatOptions,
            id,
            isFocused,
            isOpen,
            searchValue,
            selectedOption,
        } = this.state;

        const optionVal = getOption( selectedOption, flatOptions )
            ? getOption( selectedOption, flatOptions ).text : undefined;

        let optionsToShow = options;

        if ( filteredOptions )
        {
            optionsToShow = optionsFormatted(
                filteredOptions.map( option => option.id ),
                options,
            );
        }

        let dropdownContent;

        if ( optionsToShow.length )
        {
            dropdownContent = (
                <ScrollBox
                    height       = "50vh"
                    scroll       = "vertical"
                    scrollBoxRef = { this.scrollBoxRef }>
                    <ListBox
                        activeOption      = { addPrefix( activeOption, id ) }
                        id                = { addPrefix( 'listbox', id ) }
                        isFocusable       = { false }
                        onClickOption     = { this.handleClickOption }
                        onMouseOutOption  = { this.handleMouseOutOption }
                        onMouseOverOption = { this.handleMouseOverOption }
                        options           = {
                            prefixOptions( optionsToShow, id )
                        }
                        selection = { addPrefix( selectedOption, id ) } />
                </ScrollBox>
            );
        }
        else
        {
            dropdownContent = (
                <Text
                    noWrap
                    overflowIsHidden
                    role    = "subtle"
                    variant = "RegularIt">
                    { dropdownPlaceholder }
                </Text>
            );
        }

        return (
            <InputWithDropdown
                aria = { {
                    activeDescendant :
                        activeOption && addPrefix( activeOption, id ),
                    autocomplete : 'list',
                    expanded     : isOpen,
                    hasPopup     : 'listbox',
                    owns         : addPrefix( 'listbox', id ),
                    role         : 'combobox',
                } }
                autoCapitalize   = "off"
                autoComplete     = "off"
                autoCorrect      = "off"
                className        = { className }
                dropdownIsOpen   = { isOpen }
                dropdownPosition = { dropdownPosition }
                dropdownProps    = { {
                    children : dropdownContent,
                    hasError,
                    padding  : optionsToShow.length ? 'none' : 'S',
                } }
                hasError        = { hasError }
                iconType        = { isOpen ? 'up' : 'down' }
                id              = { id }
                isDisabled      = { isDisabled }
                isReadOnly      = { isReadOnly }
                isReadOnlyInput = { !isSearchable || !isOpen }
                onBlur          = { this.handleBlur }
                onChange        = { this.handleChangeInput }
                onClick         = { this.handleClickInput }
                onClickIcon     = { this.handleClickIcon }
                onFocus         = { this.handleFocus }
                onKeyDown       = { this.handleKeyDown }
                placeholder     = { inputPlaceholder }
                ref             = { this.inputRef }
                spellCheck      = { false }
                value           = { ( isFocused && isOpen && isSearchable ) ?
                    searchValue : optionVal
                }
                wrapperRef = { this.wrapperRef } />
        );
    }
}
