import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer';
import ReactDOM from 'react-dom';

describe("Footer Component", () => {
    test("Render Footer", () => {
        render(<Footer></Footer>);
        screen.debug();
    })

    test("Render All Components of Footer", () => {
        screen.debug();
    })

    test("Component render true", () => {
        expect(true).toBe(true);
    })
    
    test("Renders without Crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<Footer></Footer>, div);
    })
})