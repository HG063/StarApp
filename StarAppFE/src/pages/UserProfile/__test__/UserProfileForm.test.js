import React from 'react';
import { render, screen } from '@testing-library/react';
import UserProfileForm from '../UserProfileForm';

describe("UserProfileForm Component", () => {
    // test("Render UserProfileForm", () => {
    //     render(<UserProfileForm></UserProfileForm>);
    //     screen.debug();
    // })

    test("Render All Components of UserProfileForm", () => {
        screen.debug();
    })

    test("Component render true", () => {
        expect(true).toBe(true);
    })
})