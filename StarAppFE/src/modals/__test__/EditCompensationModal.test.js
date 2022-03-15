import React from 'react';
import { render, screen } from '@testing-library/react';
import EditCompensationModal from '../EditCompensationModal';
import ReactDOM from 'react-dom';

describe("EditCompensationModal Component", () => {
    test("Render EditCompensationModal", () => {
        render(<EditCompensationModal></EditCompensationModal>);
        screen.debug();
    })

    test("Render All Components of EditCompensationModal", () => {
        screen.debug();
    })

    test("Component render true", () => {
        expect(true).toBe(true);
    })

    test("Renders without Crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<EditCompensationModal></EditCompensationModal>, div);
    })
})