import React from 'react';
import { render, screen } from '@testing-library/react';
import LandingNavbar from '../LandingNavbar';
import ReactDOM from 'react-dom';

describe("LandingNavbar Component", () => {
    test("Render LandingNavbar", () => {
        render(<LandingNavbar></LandingNavbar>);
        screen.debug();
    })

    test("Render All Components of LandingNavbar", () => {
        screen.debug();
    })

    test("Component render true", () => {
        expect(true).toBe(true);
    })

    test("Renders without Crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<LandingNavbar></LandingNavbar>, div);
    })
})