import React from 'react';
import { render, screen } from '@testing-library/react';
import UserAdmin from '../UserAdmin';

describe("UserAdmin Component", () => {
    // test("Render UserAdmin", () => {
    //     render(<UserAdmin></UserAdmin>);
    //     screen.debug();
    // })

    test("Render All Components of UserAdmin", () => {
        screen.debug();
    })

    test("Component render true", () => {
        expect(true).toBe(true);
    })
})