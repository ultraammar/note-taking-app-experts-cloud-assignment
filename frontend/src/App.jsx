import { Layout, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Sidebar from "./components/Sidebar/Sidebar";
import NotesList from "./components/Notes/NotesList/NotesList";
import Login from "./Pages/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import axios from "axios";
import Signup from "./Pages/Signup.jsx/Signup";
import NotesAdd from "./components/Notes/NotesAdd/NotesAdd";

axios.defaults.baseURL = "http://localhost:8081"; 

function App() {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const isLoggedIn = useSelector((state) => state.session.isLoggedIn);
  console.log(isLoggedIn);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <BrowserRouter>
      <Layout 
        style={{
          minHeight: "100vh",
        }}
      >
        <Navbar />
        <Layout
          style={{
            background: "linear-gradient(180deg, #000f2e 0%, #001f4b 100%)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          {!isMobile && (
            <Sider
              collapsible
              collapsed={collapsed}
              onCollapse={(value) => setCollapsed(value)}
            >
              <div className="demo-logo-vertical" />
              <Sidebar />
            </Sider>
          )}
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route
              path="/teachers/"
              exact
              element={<Navigate to="/teachers/manage-courses" replace />}
            />

            <Route
              path="/login"
              exact
              element={
                // <RedirectIfLoggedIn>
                <Login />
                // </RedirectIfLoggedIn>
              }
            />

            <Route
              path="/signup"
              exact
              element={
                // <RedirectIfLoggedIn>
                <Signup />
                // </RedirectIfLoggedIn>
              }
            />
            <Route
              path="/notes"
              exact
              element={
                // <ProtectedRoute>
                <NotesList />
                // </ProtectedRoute>
              }
            />
            <Route
              path="/notes/new"
              exact
              element={
                // <ProtectedRoute>
                <NotesAdd />
                // </ProtectedRoute>
              }
            />
          </Routes>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
