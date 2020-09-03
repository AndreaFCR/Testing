import React from 'react';
import { render } from '@testing-library/react';
import { Game } from '../game'

describe('Game history', function() {
    it('should start with empty history', async function() {
        const {queryByRole} = render(<Game/>);

        const movementHistory = queryByRole('button', {name: /go to move/i});
        expect(movementHistory).toBeNull();
    });
});
