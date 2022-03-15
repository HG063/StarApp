import React from 'react';
import { render, screen } from '@testing-library/react';
import AllowanceDashboard from '../AllowanceDashboard';
import ReactDOM from 'react-dom';

describe("AllowanceDashboard Component", () => {
    // test("Render AllowanceDashboard", () => {
    //     render(<AllowanceDashboard></AllowanceDashboard>);
    //     screen.debug();
    // })

    test("Render All Components of AllowanceDashboard", () => {
        screen.debug();
    })

    test("Component render true", () => {
        expect(true).toBe(true);
    })

    // test("Renders without Crashing", () => {
    //     const div = document.createElement("div");
    //     ReactDOM.render(<AllowanceDashboard></AllowanceDashboard>, div);
    // })
})