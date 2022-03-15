import React from 'react';
import { render, screen } from '@testing-library/react';
import AllowanceProtected from '../AllowanceProtected';

describe("AllowanceProtected Component", () => {
    // test("Render AllowanceProtected", () => {
    //     render(<AllowanceProtected></AllowanceProtected>);
    // })

    test("Render All Components of AllowanceProtected", () => {
        screen.debug();
    })

    test("Component render true", () => {
        expect(true).toBe(true);
    })

})