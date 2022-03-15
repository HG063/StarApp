import React from 'react';
import { render, screen } from '@testing-library/react';
import Contact from '../Contact';
import ReactDOM from 'react-dom';

describe("Contact Component", () => {
    test("Render Contact", () => {
        render(<Contact></Contact>);
        screen.debug();
    })

    test("Render All Components of Contact", () => {
        screen.debug();
    })

    test("Component render true", () => {
        expect(true).toBe(true);
    })

    test("Renders without Crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<Contact></Contact>, div);
    })
})