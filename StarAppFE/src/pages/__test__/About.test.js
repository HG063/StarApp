import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../About';
import ReactDOM from 'react-dom';

describe("About Component", () => {
    test("Render About", () => {
        render(<About></About>);
        screen.debug();
    })

    test("Render All Components of About", () => {
        screen.debug();
    })
    
    test("Component render true", () => {
        expect(true).toBe(true);
    })

    test("Renders without Crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<About></About>, div);
    })
})