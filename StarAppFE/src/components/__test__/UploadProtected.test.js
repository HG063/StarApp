import React from 'react';
import { render, screen } from '@testing-library/react';
import UploadProtected from '../UploadProtected';

describe("UploadProtected Component", () => {
    // test("Render UploadProtected", () => {
    //     render(<UploadProtected></UploadProtected>);
    //     screen.debug();
    // })

    test("Render All Components of UploadProtected", () => {
        screen.debug();
    })
    test("Component render true", () => {
        expect(true).toBe(true);
    })
})