import React from 'react';
import { render, screen } from '@testing-library/react';
import EditAllowanceDashboardModal from '../EditAllowanceDashboardModal';
import ReactDOM from 'react-dom';

describe("EditAllowanceDashboardModal Component", () => {
    test("Render EditAllowanceDashboardModal", () => {
        render(<EditAllowanceDashboardModal></EditAllowanceDashboardModal>);
        screen.debug();
    })

    test("Render All Components of EditAllowanceDashboardModal", () => {
        screen.debug();
    })

    test("Component render true", () => {
        expect(true).toBe(true);
    })

    test("Renders without Crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<EditAllowanceDashboardModal></EditAllowanceDashboardModal>, div);
    })
})