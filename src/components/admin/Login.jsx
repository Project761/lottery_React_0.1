import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Form, Button, Card, Spinner, InputGroup } from "react-bootstrap";
import { FiLock } from "react-icons/fi";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { showSuccess, showError, showWarning } from "../../utils/toast";

// Set your base URL
axios.defaults.baseURL = "https://lotteryapi.arustu.com/api/";

const Login = (props) => {

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/admin/dashboard";
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    // const [remember, setRemember] = useState(false);
    const [show, setShow] = useState(false);
    // Toast notification functions are imported from utils/toast.js

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            showWarning('Please enter both username and password');
            return;
        }

        setLoading(true);

        try {
            // ✅ Call your API
            const response = await axios.post("AppUser/LOGIN_AppUser", {
                UserName: username,
                Password: password,
                grant_type: "password",
            });

            const data = response.data;
            console.log(data, "data");

            // ✅ Successful login check
            if (data && data.access_token) {
                // Save important info in localStorage

                localStorage.setItem('access_token', response.data.access_token);
                localStorage.setItem('FullName', response.data.FullName);

                localStorage.setItem('AdminUserID', response.data.UserID);
                localStorage.setItem('CompanyID', response.data.CompanyID);
                showSuccess('Login successful!');

                // Call the onLogin prop if it exists
                if (props.onLogin) {
                    props.onLogin();
                }

                // navigate(from, { replace: true });
                navigate("/admin/dashboard");

            } else {
                showError(data.error_description || 'Invalid credentials!');

            }
        } catch (error) {
            console.error("Login error:", error);
            if (error.response) {
                showError(`Login failed: ${error.response.data.error_description || 'Invalid credentials'}`);

            } else {
                showError('Unable to connect to the server. Please check the API or network.');

            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-bg d-flex justify-content-center align-items-center vh-100">
            <Card className="login-card shadow-lg border-0">
                <Card.Header className="text-center login-header">
                    <h4 className="mb-0 text-white fw-bold">Sign in</h4>
                </Card.Header>
                <Card.Body className="p-4">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <InputGroup>
                                <Form.Control
                                    type={show ? "text" : "password"}
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />

                                {/* Eye Icon */}
                                <InputGroup.Text
                                    onClick={() => setShow(!show)}
                                    style={{
                                        cursor: "pointer",
                                        background: "#eef4ff",
                                        color: "#6b7280",
                                        border: "1px solid #ced4da",
                                    }}
                                >
                                    {show ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                                </InputGroup.Text>
                            </InputGroup>
                        </Form.Group>

                        {/* <div className="d-flex align-items-center mb-3">
                            <Form.Check type="switch" id="remember" label="Remember me" checked={remember} onChange={() => setRemember(!remember)} /> </div> */}

                        <Button
                            variant="danger"
                            type="submit"
                            className="w-100 py-2 login-btn"
                            disabled={loading}
                        >
                            {loading ? <Spinner animation="border" size="sm" /> : "LOGIN"}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>

            {/* <footer className="login-footer text-center text-light mt-3">
                © 2025, made with ❤️ by{" "}
                <a
                    href="https://arustutechnology.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-info fw-semibold text-decoration-none"
                >
                    Arustu Technology
                </a>{" "}
                for a better web.
            </footer> */}
        </div>
    );
};

export default Login;
