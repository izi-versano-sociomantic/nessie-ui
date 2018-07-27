import React, { Component }                from 'react';
import PropTypes                           from 'prop-types';

import { buildClassName, generateId }      from '../utils';
import styles                              from './textInputWithIcon.css';
import { IconButton, InputField, Tooltip } from '../index';
import InputContainer                      from '../proto/InputContainer';

export default class TextInputWithIcon extends Component
{
    static propTypes =
    {
        /**
         *  aria properties
         */
        aria : PropTypes.objectOf( PropTypes.oneOfType( [
            PropTypes.bool,
            PropTypes.number,
            PropTypes.string,
        ] ) ),
        /**
         *  Label text (string or JSX node)
         */
        label     : PropTypes.node,
        /**
         *  Label position
         */
        inputType : PropTypes.oneOf( [
            'text',
            'password',
        ] ),
        /**
         *  Label position
         */
        labelPosition : PropTypes.oneOf( [
            'top',
            'left',
            'right',
        ] ),
        /**
         *  Placeholder text
         */
        placeholder : PropTypes.string,
        /**
         *  Icon type to display (overrides customIcon)
         */
        iconType    : PropTypes.oneOf( [
            'account',
            'add',
            'add-circle',
            'alert',
            'approved',
            'arrow',
            'bell',
            'board',
            'calendar',
            'close',
            'close-circle',
            'close-thick',
            'dash',
            'dashboard',
            'declined',
            'delete',
            'down',
            'download',
            'duplicate',
            'edit',
            'edit-circle',
            'ended',
            'error',
            'file',
            'graph',
            'hide',
            'info',
            'inspect',
            'left',
            'lightbulb',
            'link',
            'megaphone',
            'options',
            'pending',
            'preview',
            'puzzle-piece',
            'reset',
            'right',
            'search',
            'show',
            'star',
            'star-stroke',
            'swap',
            'table',
            'up',
            'upload',
            'validation',
            'none',
        ] ),
        /**
         *  Alignment of the icon
         */
        iconPosition : PropTypes.oneOf( [
            'left',
            'right',
        ] ),
        /**
         * Input text alignment
         */
        textAlign : PropTypes.oneOf( [
            'auto',
            'left',
            'right',
        ] ),
        /**
        *  icon Tooltip position relative to icon
        */
        iconTooltipPosition : PropTypes.oneOf( [
            'left',
            'right',
            'top',
            'bottom',
            'topLeft',
            'topRight',
        ] ),
        /**
         *  Display the icon tooltip
         */
        iconTooltipIsVisible  : PropTypes.bool,
        /**
         *  icon Tooltip message text (string or JSX)
         */
        iconTooltipMessage    : PropTypes.node,
        /**
         *  Display as disabled
         */
        isDisabled            : PropTypes.bool,
        /**
         *  Display Button icon as disabled
         */
        iconButtonIsDisabled  : PropTypes.bool,
        /**
         *  Display as read-only
         */
        isReadOnly            : PropTypes.bool,
        /**
         *  Display as read-only for TextInput
         */
        isReadOnlyInput       : PropTypes.bool,
        /**
         *  Display as read-only for IconButton
         */
        isReadOnlyButton      : PropTypes.bool,
        /**
         *  Display as error/invalid
         */
        hasError              : PropTypes.bool,
        /**
         *  Tooltip message text (string or JSX)
         */
        errorMessage          : PropTypes.node,
        /**
         *  Error Tooltip is displayed
         */
        errorMessageIsVisible : PropTypes.bool,
        /**
        *  Error message position relative to the icon
        */
        errorMessagePosition  : PropTypes.oneOf( [
            'top',
            'topLeft',
        ] ),
        /**
         *  Initial input string value
         */
        defaultValue    : PropTypes.string,
        /**
         *  Input string value
         */
        value           : PropTypes.string,
        /**
         *  HTML id attribute (overwrite default)
         */
        id              : PropTypes.string,
        /**
         *  HTML name attribute
         */
        name            : PropTypes.string,
        /**
         *  Input change callback function
         */
        onChange        : PropTypes.func,
        /**
         *  Input click callback function
         */
        onClick         : PropTypes.func,
        /**
         * key down callback function
         */
        onKeyDown       : PropTypes.func,
        /**
         * key press callback function
         */
        onKeyPress      : PropTypes.func,
        /**
         * key up callback function
         */
        onKeyUp         : PropTypes.func,
        /**
         *  focus callback function
         */
        onFocus         : PropTypes.func,
        /**
         *  blur callback function
         */
        onBlur          : PropTypes.func,
        /**
         *  mouseOver callback function
         */
        onMouseOver     : PropTypes.func,
        /**
         *  mouseOut callback function
         */
        onMouseOut      : PropTypes.func,
        /**
         *  Icon click callback function
         */
        onClickIcon     : PropTypes.func,
        /**
         *  Icon focus callback function
         */
        onFocusIcon     : PropTypes.func,
        /**
         *  Icon blur callback function
         */
        onBlurIcon      : PropTypes.func,
        /**
         *  Icon mouseOver callback function
         */
        onMouseOverIcon : PropTypes.func,
        /**
         *  Icon mouseOut callback function
         */
        onMouseOutIcon  : PropTypes.func,
        /**
         * Display as hover when required from another component
         */
        forceHover      : PropTypes.bool,
        /**
         * Callback that receives the native <input>: ( ref ) => { ... }
         */
        inputRef        : PropTypes.func,
    };

    static defaultProps =
    {
        aria                  : undefined,
        defaultValue          : undefined,
        label                 : undefined,
        labelPosition         : 'top',
        placeholder           : undefined,
        id                    : undefined,
        isDisabled            : false,
        isReadOnly            : false,
        isReadOnlyInput       : false,
        isReadOnlyButton      : false,
        iconButtonIsDisabled  : false,
        iconType              : 'none',
        iconTooltipPosition   : 'top',
        iconTooltipIsVisible  : false,
        hasError              : false,
        errorMessageIsVisible : false,
        errorMessagePosition  : 'top',
        iconPosition          : 'right',
        textAlign             : 'auto',
        forceHover            : false,
        cssMap                : styles,
        className             : undefined,
        iconTooltipMessage    : undefined,
        inputType             : 'text',
        onClickIcon           : undefined,
        value                 : undefined,
        name                  : undefined,
        onChange              : undefined,
        onBlur                : undefined,
        onFocus               : undefined,
        onKeyDown             : undefined,
        onKeyPress            : undefined,
        onKeyUp               : undefined,
        onMouseOut            : undefined,
        onMouseOutIcon        : undefined,
        onMouseOver           : undefined,
        onMouseOverIcon       : undefined,
    };

    constructor( props )
    {
        super( props );

        this.handleFocus         = this.handleFocus.bind( this );
        this.handleBlur          = this.handleBlur.bind( this );
        this.handleInputRef      = this.handleInputRef.bind( this );
        this.handleButtonRef     = this.handleButtonRef.bind( this );
    }

    handleFocus( e )
    {
        const { relatedTarget } = e;
        const { button, input } = this;

        if ( relatedTarget )
        {
            if ( relatedTarget === button || relatedTarget === input )
            {
                e.stopPropagation();

                return;
            }
        }

        const { onFocus } = this.props;
        if ( onFocus )
        {
            onFocus( e );
        }
    }

    handleBlur( e )
    {
        const { relatedTarget } = e;
        const { button, input } = this;

        if ( relatedTarget )
        {
            if ( relatedTarget === button || relatedTarget === input )
            {
                e.stopPropagation();

                return;
            }
        }

        const { onBlur } = this.props;
        if ( onBlur )
        {
            onBlur( e );
        }
    }

    handleInputRef( ref )
    {
        this.input = ref;
        const { inputRef } = this.props;
        if ( inputRef )
        {
            inputRef( ref );
        }
    }

    handleButtonRef( ref )
    {
        this.button = ref;
    }

    render()
    {
        const {
            aria,
            className,
            cssMap,
            defaultValue,
            errorMessage,
            errorMessageIsVisible,
            errorMessagePosition,
            forceHover,
            hasError,
            id = generateId( 'TextInputWithIcon' ),
            iconButtonIsDisabled,
            iconPosition,
            iconTooltipIsVisible,
            iconTooltipMessage,
            iconTooltipPosition,
            iconType,
            inputType,
            isDisabled,
            isReadOnly,
            isReadOnlyInput,
            isReadOnlyButton,
            label,
            labelPosition,
            name,
            onChange,
            onClick,
            onClickIcon,
            onKeyDown,
            onKeyPress,
            onKeyUp,
            onMouseOut,
            onMouseOutIcon,
            onMouseOver,
            onMouseOverIcon,
            placeholder,
            textAlign,
            value,
        } = this.props;

        let alignText = textAlign;

        if ( textAlign === 'auto' )
        {
            alignText = iconPosition === 'left' ? 'right' : 'left';
        }

        return (
            <InputContainer
                errorMessage          = { errorMessage }
                errorMessageIsVisible = { errorMessageIsVisible }
                errorMessagePosition  = { errorMessagePosition }
                hasError              = { hasError }
                id                    = { id }
                isDisabled            = { isDisabled }
                label                 = { label }
                labelPosition         = { labelPosition }
                onMouseOut            = { onMouseOut }
                onMouseOver           = { onMouseOver }
                className = { buildClassName( className, cssMap, {
                    disabled : isDisabled,
                    error    : hasError,
                    position : iconPosition,
                } ) }>
                <div className = { cssMap.container }>
                    <InputField
                        aria         = { aria }
                        className    = { cssMap.input }
                        defaultValue = { defaultValue }
                        forceHover   = { forceHover }
                        hasError     = { hasError }
                        id           = { id }
                        inputRef     = { this.handleInputRef }
                        isDisabled   = { isDisabled }
                        isReadOnly   = { isReadOnlyInput || isReadOnly }
                        name         = { name }
                        onBlur       = { this.handleBlur }
                        onChange     = { onChange }
                        onClick      = { onClick }
                        onFocus      = { this.handleFocus }
                        onKeyDown    = { onKeyDown }
                        onKeyPress   = { onKeyPress }
                        onKeyUp      = { onKeyUp }
                        onMouseOut   = { onMouseOut }
                        onMouseOver  = { onMouseOver }
                        placeholder  = { placeholder }
                        textAlign    = { alignText }
                        type         = { inputType }
                        value        = { value } />
                    { ( iconType && iconType !== 'none' ) &&
                        <Tooltip
                            className   = { cssMap.icon }
                            isDisabled  = { isDisabled }
                            isReadOnly  = { isReadOnly }
                            isVisible   = { iconTooltipIsVisible }
                            hasError    = { hasError }
                            message     = { iconTooltipMessage }
                            onMouseOut  = { onMouseOutIcon }
                            onMouseOver = { onMouseOverIcon }
                            position    = { iconTooltipPosition } >
                            <IconButton
                                buttonRef   = { this.handleButtonRef }
                                iconType    = { iconType }
                                isDisabled  = { isDisabled || iconButtonIsDisabled }
                                isFocusable = { false }
                                isReadOnly  = { isReadOnlyButton || isReadOnly }
                                hasError    = { hasError }
                                onClick     = { onClickIcon } />
                        </Tooltip>
                    }
                </div>
            </InputContainer>
        );
    }
}
