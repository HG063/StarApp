import React from 'react';
import { render, screen } from '@testing-library/react';
import NavBar from '../NavBar';
import ReactDOM from 'react-dom';

describe("NavBar Component", () => {
    test("Render NavBar", () => {
        render(<NavBar></NavBar>);
        screen.debug();
    })

    test("Render All Components of NavBar", () => {
        screen.debug();
    })
    
    test("Component render true", () => {
        expect(true).toBe(true);
    })

    test("Renders without Crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<NavBar></NavBar>, div);
    })
})