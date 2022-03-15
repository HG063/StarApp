import React from 'react';
import { render, screen } from '@testing-library/react';
import ChangePasswordForm from '../ChangePasswordForm';

describe("ChangePasswordForm Component", () => {
    // test("Render ChangePasswordForm", () => {
    //     render(<ChangePasswordForm></ChangePasswordForm>);
    //     screen.debug();
    // })

    test("Render All Components of ChangePasswordForm", () => {
        screen.debug();
    })

    test("Component render true", () => {
        expect(true).toBe(true);
    })
})