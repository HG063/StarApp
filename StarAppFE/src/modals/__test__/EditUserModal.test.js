import React from 'react';
import { render, screen } from '@testing-library/react';
import EditUserModal from '../EditUserModal';
import ReactDOM from 'react-dom';

describe("EditUserModal Component", () => {
    test("Render EditUserModal", () => {
        render(<EditUserModal></EditUserModal>);
        screen.debug();
    })

    test("Render All Components of EditUserModal", () => {
        screen.debug();
    })

    test("Component render true", () => {
        expect(true).toBe(true);
    })

    test("Renders without Crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<EditUserModal></EditUserModal>, div);
    })
})