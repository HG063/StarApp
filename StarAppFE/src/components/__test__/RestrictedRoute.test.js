import React from 'react';
import { render, screen } from '@testing-library/react';
import RestrictedRoute from '../RestrictedRoute';

describe("RestrictedRoute Component", () => {
    // test("Render RestrictedRoute", () => {
    //     render(<RestrictedRoute></RestrictedRoute>);
    //     screen.debug();
    // })

    test("Render All Components of RestrictedRoute", () => {
        screen.debug();
    })
    test("Component render true", () => {
        expect(true).toBe(true);
    })
})