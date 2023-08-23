import * as React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import MainLayout from '../components/MainLayout/index';
import LoginPage from '../pages/Login';
import AdminPage from '../pages/Admin';
import BookingPage from '../pages/Booking';
import OrderPage from '../pages/Order';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/admin',
        element: <AdminPage />,
      },
      {
        path: '/booking',
        element: <BookingPage />,
      },
      {
        path: '/order',
        element: <OrderPage />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);

export default function Routes() {
  return (
    <RouterProvider router={router} />
  );
}
