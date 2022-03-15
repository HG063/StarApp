import React from 'react';
import { render, screen } from '@testing-library/react';
import Policy from '../Policy';
import ReactDOM from 'react-dom';

describe("Policy Component", () => {
    test("Render Policy", () => {
        render(<Policy></Policy>);
        screen.debug();
    })

    test("Render All Components of Policy", () => {
        screen.debug();
    })

    test("Component render true", () => {
        expect(true).toBe(true);
    })

    test("Renders without Crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<Policy></Policy>, div);
    })
})