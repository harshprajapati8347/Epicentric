import { useState, useCallback, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "../../styles/styles";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const rememberMe = localStorage.getItem("rememberMe") === "true";
  const [rememberMeChecked, setRememberMeChecked] = useState(rememberMe);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const validateForm = () => {
        const newErrors = {};
        if (!email.trim()) newErrors.email = "Email is required";
        if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
        if (!password) newErrors.password = "Password is required";
        if (password.length < 6)
          newErrors.password = "Password must be at least 6 characters long";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };
      if (!validateForm()) {
        toast.error("Please correct the highlighted fields.");
        return;
      }
      try {
        await axios.post(
          `${import.meta.env.VITE_REACT_APP_SERVER_URL}/user/login-user`,
          { email, password },
          { withCredentials: true }
        );
        toast.success("Login Success!");
        navigate("/");
        window.location.reload(true);
      } catch (err) {
        toast.error(err.response?.data?.message || "An error occurred");
      }
    },
    [email, password, navigate]
  );

  const renderInput = (label, type, value, onChange, error) => (
    <div>
      <label className="text-sm font-medium text-gray-700 flex items-center">
        {label}
      </label>
      <div className="mt-1">
        <input
          type={type}
          value={value}
          onChange={onChange}
          required
          className={`appearance-none block w-full px-3 py-2 border ${
            error ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
        />
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );

  useEffect(() => {
    if (localStorage.getItem("rememberMe") === "true") {
      setEmail(localStorage.getItem("email"));
      setPassword(localStorage.getItem("password"));
    }
  }, []);

  useEffect(() => {
    if (rememberMeChecked) {
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      localStorage.setItem("rememberMe", "true");
    } else {
      localStorage.setItem("email", "");
      localStorage.setItem("password", "");
      localStorage.setItem("rememberMe", "false");
    }
  }, [email, password, rememberMeChecked]);

  const handleRememberMe = () => {
    setRememberMeChecked((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Login to your account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {renderInput(
              "Email address",
              "email",
              email,
              (e) => setEmail(e.target.value),
              errors.email,
              "Enter your email address"
            )}
            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={rememberMeChecked}
                  onChange={handleRememberMe}
                />
                <label
                  htmlFor="remember_me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium text-blue-600"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
            <div className={`${styles.noramlFlex} w-full`}>
              <h4>Not have any account?</h4>
              <Link to="/sign-up" className="text-blue-600 pl-2">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
