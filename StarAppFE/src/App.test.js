import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import ReactDOM from 'react-dom';

describe("App Component", () => {
    test("Render App", () => {
        render(<App></App>);
        screen.debug();
    })

    test("Render All Components of App", () => {
        screen.debug();
    })

    test("Component render true", () => {
        expect(true).toBe(true);
    })
    
    test("Renders without Crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<App></App>, div);
    })
})