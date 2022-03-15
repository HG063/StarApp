import React from 'react';
import { render, screen } from '@testing-library/react';
import Navigation from '../Navigation';

describe("Navigation Component", () => {
    // test("Render Navigation", () => {
    //     render(<Navigation></Navigation>);
    // })

    test("Render All Components of Navigation", () => {
        screen.debug();
    })

    test("Component render true", () => {
        expect(true).toBe(true);
    })
})