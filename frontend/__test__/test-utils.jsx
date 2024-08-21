import { render } from '@testing-library/react';

//Use if you need to wrap your component with some provider
const AllTheProviders = ({ children }) => {
  return <>{children}</>;
};

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options });

/*
Instead of importing "@testing-library/react" directly into your tests, import "test-utils" if you need to add a provider or add some more utility
*/
// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
