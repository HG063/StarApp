import React from 'react';
import { render, screen } from '@testing-library/react';
import AddUserModal from '../AddUserModal';
import ReactDOM from 'react-dom';

describe("AddUserModal Component", () => {
    test("Render AddUserModal", () => {
        render(<AddUserModal></AddUserModal>);
        screen.debug();
    })

    test("Render All Components of AddUserModal", () => {
        screen.debug();
    })

    test("Component render true", () => {
        expect(true).toBe(true);
    })
    
    test("Renders without Crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<AddUserModal></AddUserModal>, div);
    })
})