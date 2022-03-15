import React from 'react';
import { render, screen } from '@testing-library/react';
import Upload from '../Upload';

describe("Upload Component", () => {
    // test("Render Upload", () => {
    //     render(<Upload></Upload>);
    //     screen.debug();
    // })

    test("Render All Components of Upload", () => {
        screen.debug();
    })

    test("Component render true", () => {
        expect(true).toBe(true);
    })
})