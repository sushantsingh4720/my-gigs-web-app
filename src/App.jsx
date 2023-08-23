import React, { useContext } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./store/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Gig from "./pages/gig/Gig";
import Gigs from "./pages/gigs/Gigs";
import MyGigs from "./pages/myGigs/MyGigs";
import Orders from "./pages/orders/Orders";
import Messages from "./pages/messages/Messages";
import Message from "./pages/message/Message";
import Add from "./pages/add/Add";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Payment from "./pages/payment/Payment";
import Success from "./pages/success/Success";
import "./App.scss";
function App() {
  const { state } = useContext(AuthContext);
  console.log(state);

  const queryClient = new QueryClient();
  const ProtectedRoute = ({ children, isSeller }) => {
    if (!state.isAuthenticated) return <Navigate to="/login" />;

    if (isSeller === true && state.user.isSeller !== true)
      return <Navigate to="/Register" />;

    return children;
  };
  const Layout = () => {
    return (
      <div>
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Outlet />
          <Footer />
        </QueryClientProvider>
      </div>
    );
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        {
          path: "/gig/:id",
          element: (
            <ProtectedRoute>
              {" "}
              <Gig />
            </ProtectedRoute>
          ),
        },
        {
          path: "/gigs",
          element: (
            <ProtectedRoute>
              <Gigs />
            </ProtectedRoute>
          ),
        },
        {
          path: "/myGigs",
          element: (
            <ProtectedRoute isSeller={true}>
              <MyGigs />
            </ProtectedRoute>
          ),
        },
        {
          path: "/orders",
          element: (
            <ProtectedRoute>
              {" "}
              <Orders />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "/messages",
          element: (
            <ProtectedRoute>
              {" "}
              <Messages />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "/message/:id",
          element: (
            <ProtectedRoute>
              {" "}
              <Message />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "/add",
          element: (
            <ProtectedRoute isSeller={true}>
              <Add />
            </ProtectedRoute>
          ),
        },
        { path: "/register", element: <Register /> },
        { path: "/login", element: <Login /> },
        {
          path: "/payment/:id",
          element: (
            <ProtectedRoute>
              {" "}
              <Payment />
            </ProtectedRoute>
          ),
        },
        {
          path: "/success",
          element: (
            <ProtectedRoute>
              {" "}
              <Success />{" "}
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
