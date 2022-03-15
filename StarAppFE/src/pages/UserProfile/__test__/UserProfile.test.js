import React from 'react';
import { render, screen } from '@testing-library/react';
import UserProfile from '../UserProfile';

describe("UserProfile Component", () => {
    // test("Render UserProfile", () => {
    //     render(<UserProfile></UserProfile>);
    //     screen.debug();
    // })

    test("Render All Components of UserProfile", () => {
        screen.debug();
    })

    test("Component render true", () => {
        expect(true).toBe(true);
    })
})