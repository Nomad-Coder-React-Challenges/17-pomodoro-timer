import { Suspense } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import HomePage from '#pages/home';

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
      errorElement: <div>error</div>,
    },
  ]);

  return (
    <Suspense fallback={<div>loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default Router;
