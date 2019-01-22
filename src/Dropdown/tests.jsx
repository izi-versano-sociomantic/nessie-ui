/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* eslint-disable no-magic-numbers */

import React        from 'react';
import { shallow }  from 'enzyme';

import { Dropdown } from '..';


describe( 'Dropdown', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = shallow( <Dropdown /> );
    } );

    test( 'should have “main” as default className', () =>
    {
        expect( wrapper.prop( 'className' ) ).toEqual( 'main' );
    } );

    test( 'should render the children of the Dropdown', () =>
    {
        wrapper.setProps( { children: 'Lightning Strike' } );
        expect( wrapper.children().text() ).toBe( 'Lightning Strike' );
    } );
} );
