import React, { useContext, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import axios from "./utils/axiosInstance";
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
import Loader from "./components/Loader/Loader";
function App() {
  const { state, dispatch } = useContext(AuthContext);

  const queryClient = new QueryClient();
  const ProtectedRoute = ({ children, isSeller }) => {
    if (state.loading === false) {
      if (!state.isAuthenticated) {
        return <Navigate to="/login" />;
      } else if (isSeller && !state.user.isSeller) {
        return <Navigate to="/register" />;
      } else {
        return children;
      }
    } else {
      return <Loader />; // You might want to show a loading spinner here
    }
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
          element: <Gigs />,
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
          element: <Success />,
        },
      ],
    },
  ]);

  const loadUser = async () => {
    try {
      dispatch({ type: "LOAD_USER_REQUEST" });
      const response = await axios.get("/api/user/me");
      dispatch({ type: "LOAD_USER_SUCCESS", payload: response.data.user });
    } catch (error) {
      dispatch({ type: "LOAD_USER_FAIL" });
    }
  };
  useEffect(() => {
    loadUser();
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
