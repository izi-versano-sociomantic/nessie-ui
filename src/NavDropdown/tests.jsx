/* eslint-disable no-magic-numbers*/


import React        from 'react';
import { mount }    from 'enzyme';

import NavDropdown  from './index';

describe( 'NavDropdown', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <NavDropdown /> );
    } );

    test( 'should have its component name and hash as default className', () =>
    {
        expect( wrapper.find( `.${wrapper.prop( 'cssMap' ).default}` ) )
            .toHaveLength( 1 );
    } );
} );
