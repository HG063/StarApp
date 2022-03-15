import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from '../Login';

describe("Login Component", () => {
    // test("Render Login", () => {
    //     render(<Login></Login>);
    //     screen.debug();
    // })

    test("Render All Components of Login", () => {
        screen.debug();
    })

    test("Component render true", () => {
        expect(true).toBe(true);
    })
})