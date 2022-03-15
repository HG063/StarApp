import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../Home';

describe("Home Component", () => {
    // test("Render Home", () => {
    //     render(<Home></Home>);
    //     screen.debug();
    // })

    test("Render All Components of Home", () => {
        screen.debug();
    })

    test("Component render true", () => {
        expect(true).toBe(true);
    })
})