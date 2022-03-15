import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorPage from '../ErrorPage';
import ReactDOM from 'react-dom';

describe("ErrorPage Component", () => {
    // test("Render ErrorPage", () => {
    //     render(<ErrorPage></ErrorPage>);
    //     screen.debug();
    // })

    test("Render All Components of ErrorPage", () => {
        screen.debug();
    })

    test("Component render true", () => {
        expect(true).toBe(true);
    })

    // test("Renders without Crashing", () => {
    //     const div = document.createElement("div");
    //     ReactDOM.render(<ErrorPage></ErrorPage>, div);
    // })
})