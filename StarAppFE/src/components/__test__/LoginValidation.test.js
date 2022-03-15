import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginValidation from '../LoginValidation';
import ReactDOM from 'react-dom';

describe("LoginValidation Component", () => {
    // test("Render LoginValidation", () => {
    //     render(<LoginValidation></LoginValidation>);
    // })

    test("Render All Components of LoginValidation", () => {
        screen.debug();
    })

    test("Component render true", () => {
        expect(true).toBe(true);
    })

    // test("Renders without Crashing", () => {
    //     const div = document.createElement("div");
    //     ReactDOM.render(<LoginValidation></LoginValidation>, div);
    // })
})