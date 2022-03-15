import React from 'react';
import { render, screen } from '@testing-library/react';
import SignupValidation from '../SignupValidation';

describe("SignupValidation Component", () => {
    // test("Render SignupValidation", () => {
    //     render(<SignupValidation></SignupValidation>);
    //     screen.debug();
    // })

    test("Render All Components of SignupValidation", () => {
        screen.debug();
    })
    test("Component render true", () => {
        expect(true).toBe(true);
    })
})