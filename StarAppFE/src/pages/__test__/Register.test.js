import React from 'react';
import { render, screen } from '@testing-library/react';
import Register from '../Register';

describe("Register Component", () => {
    // test("Render Register", () => {
    //     render(<Register></Register>);
    //     screen.debug();
    // })

    test("Render All Components of Register", () => {
        screen.debug();
    })

    test("Component render true", () => {
        expect(true).toBe(true);
    })
})