import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Image from './image';

it('renders image with the correct src', () => {
    const options = { src: 'test', alt: 'test alt' };
    
    render(<Image options={options}/>);
    
    const image = screen.getByAltText(options.alt);
    expect(image).toHaveAttribute('src', options.src);
});