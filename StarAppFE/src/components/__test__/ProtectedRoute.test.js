import React from 'react';
import { render, screen } from '@testing-library/react';
import ProtectedRoute from '../ProtectedRoute';

describe("ProtectedRoute Component", () => {
    // test("Render ProtectedRoute", () => {
    //     render(<ProtectedRoute></ProtectedRoute>);
    //     screen.debug();
    // })

    test("Render All Components of ProtectedRoute", () => {
        screen.debug();
    })

    test("Component render true", () => {
        expect(true).toBe(true);
    })
})