/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* eslint-disable no-magic-numbers */

import React               from 'react';
import { shallow, mount }  from 'enzyme';

import {
    IconButton,
    InputField,
    TextInputWithIcon,
    TextInputWithIcon as WrappedTextInputWithIcon,
    Tooltip,
} from '../index';

describe( 'TextInputWithIcon', () =>
{
    let wrapper;
    let instance;

    beforeEach( () =>
    {
        wrapper  = shallow( <TextInputWithIcon /> );
        instance = wrapper.instance();
    } );

    test( 'should have an instance of StatelessComponent', () =>
    {
        expect( instance.constructor.name ).toBe( 'StatelessComponent' );
    } );


    test( 'should contain exactly one InputField', () =>
    {
        expect( wrapper.find( InputField ) ).toHaveLength( 1 );
    } );

    test( 'should contain exactly one IconButton when iconType is not \
\'none\'', () =>
    {
        wrapper.setProps( { iconType: 'add' } );
        expect( wrapper.find( IconButton ) ).toHaveLength( 1 );
    } );

    test( 'should contain exactly one Tooltipwhen iconType is not \
\'none\'', () =>
    {
        wrapper.setProps( { iconType: 'add' } );
        expect( wrapper.find( Tooltip ) ).toHaveLength( 1 );
    } );


    describe( 'props', () =>
    {
        let props;

        beforeEach( () =>
        {
            ( { props } = instance );
        } );

        describe( 'placeholder', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( props.placeholder ).toBeUndefined();
            } );

            test( 'should be passed to the InputField', () =>
            {
                wrapper.setProps( { placeholder: 'yes!' } );

                expect( wrapper.find( InputField ).prop( 'placeholder' ) )
                    .toBe( 'yes!' );
            } );
        } );

        describe( 'iconType', () =>
        {
            test( 'should be "none" by default', () =>
            {
                expect( props.iconType ).toBe( 'none' );
            } );

            test( 'should remove the IconButton when value is "none"', () =>
            {
                expect( wrapper.find( IconButton ) ).toHaveLength( 0 );
            } );

            test( 'should remove the Tooltip when value is "none"', () =>
            {
                expect( wrapper.find( Tooltip ) ).toHaveLength( 0 );
            } );

            test( 'should be passed to the IconButton', () =>
            {
                wrapper.setProps( { iconType: 'add' } );

                expect( wrapper.find( IconButton ).prop( 'iconType' ) )
                    .toBe( 'add' );
            } );
        } );

        describe( 'iconPosition', () =>
        {
            beforeEach( () =>
            {
                wrapper.setProps( { iconType: 'add' } );
            } );

            test( 'should be "right" by default', () =>
            {
                expect( props.iconPosition ).toBe( 'right' );
            } );

            test( 'should pass textAlign "left" to Inputfield when value is \
"right"', () =>
            {
                wrapper.setProps( { iconPosition: 'right' } );

                expect( wrapper.find( InputField ).prop( 'textAlign' ) )
                    .toBe( 'left' );
            } );

            test( 'should pass textAlign "right" to Inputfield when value is \
"left"', () =>
            {
                wrapper.setProps( { iconPosition: 'left' } );

                expect( wrapper.find( InputField ).prop( 'textAlign' ) )
                    .toBe( 'right' );
            } );
        } );

        describe( 'textAlign', () =>
        {
            test( 'should be "auto" by default', () =>
            {
                expect( props.textAlign ).toBe( 'auto' );
            } );

            test( 'should be passed to the InputField', () =>
            {
                wrapper.setProps( { textAlign: 'right' } );

                expect( wrapper.find( InputField ).prop( 'textAlign' ) )
                    .toBe( 'right' );
            } );
        } );

        describe( 'iconTooltipPosition', () =>
        {
            beforeEach( () =>
            {
                wrapper.setProps( { iconType: 'add' } );
            } );

            test( 'should be "top" by default', () =>
            {
                expect( props.iconTooltipPosition ).toBe( 'top' );
            } );

            test( 'should be passed to the Tooltip as position', () =>
            {
                wrapper.setProps( { iconTooltipPosition: 'bottom' } );

                expect( wrapper.find( Tooltip ).prop( 'position' ) )
                    .toBe( 'bottom' );
            } );
        } );

        describe( 'iconTooltipIsVisible', () =>
        {
            beforeEach( () =>
            {
                wrapper.setProps( { iconType: 'add' } );
            } );

            test( 'should be false by default', () =>
            {
                expect( props.iconTooltipIsVisible ).toBe( false );
            } );

            test( 'should be passed to the Tooltip as isVisible', () =>
            {
                wrapper.setProps( { iconTooltipIsVisible: true } );

                expect( wrapper.find( Tooltip ).prop( 'isVisible' ) )
                    .toBeTruthy();
            } );
        } );

        describe( 'iconTooltipMessage', () =>
        {
            beforeEach( () =>
            {
                wrapper.setProps( { iconType: 'add' } );
            } );

            test( 'should be undefined by default', () =>
            {
                expect( props.iconTooltipMessage ).toBeUndefined();
            } );

            test( 'should be passed to the Tooltip', () =>
            {
                wrapper.setProps( { iconTooltipMessage: 'yes!' } );

                expect( wrapper.find( Tooltip ).prop( 'message' ) )
                    .toBe( 'yes!' );
            } );
        } );

        describe( 'isDisabled', () =>
        {
            test( 'should be false by default', () =>
            {
                expect( props.isDisabled ).toBe( false );
            } );

            test( 'should be passed to the InputField', () =>
            {
                wrapper.setProps( { isDisabled: true } );

                expect( wrapper.find( InputField ).prop( 'isDisabled' ) )
                    .toBeTruthy();
            } );

            test( 'should be passed to the Tooltip', () =>
            {
                wrapper.setProps( {
                    iconType   : 'add',
                    isDisabled : true,
                } );

                expect( wrapper.find( Tooltip ).prop( 'isDisabled' ) )
                    .toBeTruthy();
            } );

            test( 'should be passed to the IconButton', () =>
            {
                wrapper.setProps( {
                    iconType   : 'add',
                    isDisabled : true,
                } );

                expect( wrapper.find( IconButton ).prop( 'isDisabled' ) )
                    .toBeTruthy();
            } );
        } );

        describe( 'iconButtonIsDisabled', () =>
        {
            beforeEach( () =>
            {
                wrapper.setProps( { iconType: 'add' } );
            } );

            test( 'should be false by default', () =>
            {
                expect( props.iconButtonIsDisabled ).toBe( false );
            } );

            test( 'should be passed to the IconButton as isDisabled', () =>
            {
                wrapper.setProps( { iconButtonIsDisabled: true } );

                expect( wrapper.find( IconButton ).prop( 'isDisabled' ) )
                    .toBeTruthy();
            } );
        } );

        describe( 'isReadOnly', () =>
        {
            test( 'should be false by default', () =>
            {
                expect( props.isReadOnly ).toBe( false );
            } );

            test( 'should be passed to the InputField', () =>
            {
                wrapper.setProps( { isReadOnly: true } );

                expect( wrapper.find( InputField ).prop( 'isReadOnly' ) )
                    .toBeTruthy();
            } );

            test( 'should be passed to the Tooltip', () =>
            {
                wrapper.setProps( {
                    iconType   : 'add',
                    isReadOnly : true,
                } );

                expect( wrapper.find( Tooltip ).prop( 'isReadOnly' ) )
                    .toBeTruthy();
            } );

            test( 'should be passed to the IconButton', () =>
            {
                wrapper.setProps( {
                    iconType   : 'add',
                    isReadOnly : true,
                } );

                expect( wrapper.find( IconButton ).prop( 'isReadOnly' ) )
                    .toBeTruthy();
            } );
        } );

        describe( 'isReadOnlyInput', () =>
        {
            test( 'should be false by default', () =>
            {
                expect( props.isReadOnlyInput ).toBe( false );
            } );

            test( 'should be passed to the InputField', () =>
            {
                wrapper.setProps( { isReadOnlyInput: true } );

                expect( wrapper.find( InputField ).prop( 'isReadOnly' ) )
                    .toBeTruthy();
            } );
        } );

        describe( 'isReadOnlyButton', () =>
        {
            test( 'should be false by default', () =>
            {
                expect( props.isReadOnlyButton ).toBe( false );
            } );

            test( 'should be passed to the IconButton', () =>
            {
                wrapper.setProps( {
                    iconType         : 'add',
                    isReadOnlyButton : true,
                } );

                expect( wrapper.find( IconButton ).prop( 'isReadOnly' ) )
                    .toBeTruthy();
            } );
        } );

        describe( 'hasError', () =>
        {
            test( 'should be false by default', () =>
            {
                expect( props.hasError ).toBe( false );
            } );

            test( 'should be passed to the InputField', () =>
            {
                wrapper.setProps( { hasError: true } );

                expect( wrapper.find( InputField ).prop( 'hasError' ) )
                    .toBeTruthy();
            } );

            test( 'should be passed to the Tooltip', () =>
            {
                wrapper.setProps( {
                    iconType : 'add',
                    hasError : true,
                } );

                expect( wrapper.find( Tooltip ).prop( 'hasError' ) )
                    .toBeTruthy();
            } );

            test( 'should be passed to the IconButton', () =>
            {
                wrapper.setProps( {
                    iconType : 'add',
                    hasError : true,
                } );

                expect( wrapper.find( IconButton ).prop( 'hasError' ) )
                    .toBeTruthy();
            } );
        } );

        describe( 'defaultValue', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( props.defaultValue ).toBeUndefined();
            } );

            test( 'should be passed to the InputField', () =>
            {
                wrapper.setProps( { defaultValue: 'yes!' } );

                expect( wrapper.find( InputField ).prop( 'defaultValue' ) )
                    .toBe( 'yes!' );
            } );
        } );

        describe( 'value', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( props.value ).toBeUndefined();
            } );

            test( 'should be passed to the InputField', () =>
            {
                wrapper.setProps( { value: 'yes!' } );

                expect( wrapper.find( InputField ).prop( 'value' ) )
                    .toBe( 'yes!' );
            } );
        } );

        describe( 'id', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( props.id ).toBeUndefined();
            } );

            test( 'should be passed to the InputField', () =>
            {
                wrapper.setProps( { id: 'yes!' } );

                expect( wrapper.find( InputField ).prop( 'id' ) )
                    .toBe( 'yes!' );
            } );
        } );

        describe( 'name', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( props.name ).toBeUndefined();
            } );

            test( 'should be passed to the InputField', () =>
            {
                wrapper.setProps( { name: 'yes!' } );

                expect( wrapper.find( InputField ).prop( 'name' ) )
                    .toBe( 'yes!' );
            } );
        } );

        describe( 'onChange', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( props.onChange ).toBeUndefined();
            } );

            test( 'should be passed to the InputField', () =>
            {
                const onChange = () => undefined;

                wrapper.setProps( { onChange } );

                expect( wrapper.find( InputField ).prop( 'onChange' ) )
                    .toBe( onChange );
            } );
        } );

        describe( 'onClickIcon', () =>
        {
            beforeEach( () =>
            {
                wrapper.setProps( { iconType: 'add' } );
            } );

            test( 'should be undefined by default', () =>
            {
                expect( props.onClickIcon ).toBeUndefined();
            } );

            test( 'should be passed to the IconButton as onClick', () =>
            {
                const onClickIcon = () => undefined;

                wrapper.setProps( { onClickIcon } );

                expect( wrapper.find( IconButton ).prop( 'onClick' ) )
                    .toBe( onClickIcon );
            } );
        } );

        describe( 'onFocus', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( props.onFocus ).toBeUndefined();
            } );
        } );

        describe( 'onBlur', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( props.onBlur ).toBeUndefined();
            } );
        } );

        describe( 'onKeyDown', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( props.onKeyDown ).toBeUndefined();
            } );

            test( 'should be passed to the InputField', () =>
            {
                const onKeyDown = () => undefined;

                wrapper.setProps( { onKeyDown } );

                expect( wrapper.find( InputField ).prop( 'onKeyDown' ) )
                    .toBe( onKeyDown );
            } );
        } );

        describe( 'onKeyUp', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( props.onKeyUp ).toBeUndefined();
            } );

            test( 'should be passed to the InputField', () =>
            {
                const onKeyUp = () => undefined;

                wrapper.setProps( { onKeyUp } );

                expect( wrapper.find( InputField ).prop( 'onKeyUp' ) )
                    .toBe( onKeyUp );
            } );
        } );

        describe( 'onKeyPress', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( props.onKeyPress ).toBeUndefined();
            } );

            test( 'should be passed to the InputField', () =>
            {
                const onKeyPress = () => undefined;

                wrapper.setProps( { onKeyPress } );

                expect( wrapper.find( InputField ).prop( 'onKeyPress' ) )
                    .toBe( onKeyPress );
            } );
        } );

        describe( 'onMouseOver', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( props.onMouseOver ).toBeUndefined();
            } );

            test( 'should not be passed to the InputField', () =>
            {
                const onMouseOver = () => undefined;

                wrapper.setProps( { onMouseOver } );

                expect( wrapper.find( InputField ).prop( 'onMouseOver' ) )
                    .toBe( undefined );
            } );

            test( 'should not be passed to the Tooltip', () =>
            {
                const onMouseOver = () => undefined;

                wrapper.setProps( {
                    iconType : 'add',
                    onMouseOver,
                } );

                expect( wrapper.find( Tooltip ).prop( 'onMouseOver' ) )
                    .not.toBe( onMouseOver );
            } );

            test( 'should not be passed to the IconButton', () =>
            {
                const onMouseOver = () => undefined;

                wrapper.setProps( {
                    iconType : 'add',
                    onMouseOver,
                } );

                expect( wrapper.find( IconButton ).prop( 'onMouseOver' ) )
                    .not.toBe( onMouseOver );
            } );
        } );

        describe( 'onMouseOut', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( props.onMouseOut ).toBeUndefined();
            } );

            test( 'should not be passed to the InputField', () =>
            {
                const onMouseOut = () => undefined;

                wrapper.setProps( { onMouseOut } );

                expect( wrapper.find( InputField ).prop( 'onMouseOut' ) )
                    .not.toBe( onMouseOut );
            } );

            test( 'should not be passed to the Tooltip', () =>
            {
                const onMouseOut = () => undefined;

                wrapper.setProps( {
                    iconType : 'add',
                    onMouseOut,
                } );

                expect( wrapper.find( Tooltip ).prop( 'onMouseOut' ) )
                    .not.toBe( onMouseOut );
            } );

            test( 'should not be passed to the IconButton', () =>
            {
                const onMouseOut = () => undefined;

                wrapper.setProps( {
                    iconType : 'add',
                    onMouseOut,
                } );

                expect( wrapper.find( IconButton ).prop( 'onMouseOut' ) )
                    .not.toBe( onMouseOut );
            } );
        } );

        describe( 'onMouseOverIcon', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( props.onMouseOverIcon ).toBeUndefined();
            } );
        } );

        describe( 'onMouseOutIcon', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( props.onMouseOutIcon ).toBeUndefined();
            } );
        } );

        describe( 'forceHover', () =>
        {
            test( 'should be false by default', () =>
            {
                expect( props.forceHover ).toBeFalsy();
            } );

            test( 'should be passed to the InputField', () =>
            {
                wrapper.setProps( { forceHover: true } );

                expect( wrapper.find( InputField ).prop( 'forceHover' ) )
                    .toBeTruthy();
            } );
        } );
    } );
} );


describe( 'TextInputWithIconDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        wrapper = mount( <WrappedTextInputWithIcon /> );
        driver  = wrapper.driver();
    } );


    describe( 'change( val )', () =>
    {
        test( 'should trigger onChange callback prop once', () =>
        {
            const onChange = jest.fn();
            wrapper.setProps( { onChange } );

            driver.change( 'dfg' );
            expect( onChange ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'click()', () =>
    {
        test( 'should trigger onClick callback prop once', () =>
        {
            const onClick = jest.fn();
            wrapper.setProps( { onClick } );

            driver.click();
            expect( onClick ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'keyDown()', () =>
    {
        test( 'should trigger onKeyDown callback prop once', () =>
        {
            const onKeyDown = jest.fn();
            wrapper.setProps( { onKeyDown } );

            driver.keyDown();
            expect( onKeyDown ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'keyPress()', () =>
    {
        test( 'should trigger onKeyPress callback prop once', () =>
        {
            const onKeyPress = jest.fn();
            wrapper.setProps( { onKeyPress } );

            driver.keyPress();
            expect( onKeyPress ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'keyUp()', () =>
    {
        test( 'should trigger onKeyUp callback prop once', () =>
        {
            const onKeyUp = jest.fn();
            wrapper.setProps( { onKeyUp } );

            driver.keyUp();
            expect( onKeyUp ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'focus()', () =>
    {
        test( 'should trigger onFocus callback prop once', () =>
        {
            const onFocus = jest.fn();
            wrapper.setProps( { onFocus } );

            driver.focus();
            expect( onFocus ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'blur()', () =>
    {
        test( 'should trigger onBlur callback prop once', () =>
        {
            const onBlur = jest.fn();
            wrapper.setProps( { onBlur } );

            driver.blur();
            expect( onBlur ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'mouseOver()', () =>
    {
        test( 'should trigger onMouseOver callback prop once', () =>
        {
            const onMouseOver = jest.fn();
            wrapper.setProps( { onMouseOver } );

            driver.mouseOver();
            expect( onMouseOver ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'mouseOut()', () =>
    {
        test( 'should trigger onMouseOut callback prop once', () =>
        {
            const onMouseOut = jest.fn();
            wrapper.setProps( { onMouseOut } );

            driver.mouseOut();
            expect( onMouseOut ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'clickIcon()', () =>
    {
        test( 'should trigger onClickIcon callback prop once', () =>
        {
            const onClickIcon = jest.fn();
            wrapper.setProps( { onClickIcon, iconType: 'add' } );

            driver.clickIcon();
            expect( onClickIcon ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'mouseOverIcon()', () =>
    {
        test( 'should trigger onMouseOverIcon callback prop once', () =>
        {
            const onMouseOverIcon = jest.fn();
            wrapper.setProps( { onMouseOverIcon, iconType: 'add' } );

            driver.mouseOverIcon();
            expect( onMouseOverIcon ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'mouseOutIcon()', () =>
    {
        test( 'should trigger onMouseOutIcon callback prop once', () =>
        {
            const onMouseOutIcon = jest.fn();
            wrapper.setProps( { onMouseOutIcon, iconType: 'add' } );

            driver.mouseOutIcon();
            expect( onMouseOutIcon ).toBeCalledTimes( 1 );
        } );
    } );
} );
