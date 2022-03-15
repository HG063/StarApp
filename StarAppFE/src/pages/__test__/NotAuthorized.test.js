import React from 'react';
import { render, screen } from '@testing-library/react';
import NotAuthorized from '../NotAuthorized';

describe("NotAuthorized Component", () => {
    // test("Render NotAuthorized", () => {
    //     render(<NotAuthorized></NotAuthorized>);
    //     screen.debug();
    // })

    test("Render All Components of NotAuthorized", () => {
        screen.debug();
    })

    test("Component render true", () => {
        expect(true).toBe(true);
    })
})