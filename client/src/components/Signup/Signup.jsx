import { useState, useCallback, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import axios from "axios";
import { toast } from "react-toastify";
import { generateAvatarFromInitials } from "../../utils/TruncatedText";
import styles from "../../styles/styles";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [emailErrors, setEmailErrors] = useState([]);
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();
  const rememberMe = localStorage.getItem("rememberMe") === "true";
  const [rememberMeChecked, setRememberMeChecked] = useState(rememberMe);

  useEffect(() => {
    return () => {
      // Clean up avatar URL object on unmount
      if (avatar) URL.revokeObjectURL(avatar);
    };
  }, [avatar]);

  const handleFileInputChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
    }
  }, []);

  const createFormData = useCallback(async () => {
    const formData = new FormData();
    if (avatar) {
      formData.append("file", avatar);
    } else {
      const avatarInit = await generateAvatarFromInitials(firstName, lastName);
      formData.append("file", avatarInit);
      console.log("Avatar generated from initials", avatarInit);
    }
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("password", password);
    return formData;
  }, [avatar, firstName, lastName, email, password]);

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long.");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter.");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter.");
    }
    if (!/[0-9]/.test(password)) {
      errors.push("Password must contain at least one digit.");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push("Password must contain at least one special character.");
    }
    return errors;
  };

  const validateEmail = (email) => {
    const errors = [];
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push("Invalid email address.");
    }
    return errors;
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setEmailErrors(validateEmail(newEmail));
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordErrors(validatePassword(newPassword));
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (emailErrors.length > 0) {
        toast.error("Please fix the email errors before submitting.");
        return;
      }
      if (passwordErrors.length > 0) {
        toast.error("Please fix the password errors before submitting.");
        return;
      }
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const newForm = await createFormData();
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_REACT_APP_SERVER_URL}/user/create-user`,
          newForm,
          config
        );
        toast.success(res.data.message);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setAvatar(null);
        navigate("/login");
      } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred");
      }
    },
    [createFormData, navigate, passwordErrors]
  );

  const renderInput = (label, type, value, onChange) => (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {label}
        <span className="text-red-500 text-lg mx-1">*</span>
      </label>
      <div className="mt-1">
        <input
          type={type}
          value={value}
          onChange={onChange}
          required
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
    </div>
  );

  useEffect(() => {
    if (rememberMeChecked) {
      localStorage.setItem("rememberMe", "true");
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
    } else {
      localStorage.removeItem("rememberMe");
      localStorage.removeItem("email");
      localStorage.removeItem("password");
    }
  }, [rememberMeChecked, email, password]);

  useEffect(() => {
    if (rememberMe) {
      setEmail(localStorage.getItem("email") || "");
      setPassword(localStorage.getItem("password") || "");
    }
  }, [rememberMe]);

  const handleRememberMeChange = (e) => {
    setRememberMeChecked(e.target.checked);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register as a new user
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex space-x-4">
              {renderInput("First Name", "text", firstName, (e) =>
                setFirstName(e.target.value)
              )}
              {renderInput("Last Name", "text", lastName, (e) =>
                setLastName(e.target.value)
              )}
            </div>
            {renderInput("Email address", "email", email, (e) =>
              handleEmailChange(e)
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
                <span className="text-red-500 text-lg mx-1">*</span>
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
              </div>
              {password.length > 0 && passwordErrors.length > 0 && (
                <div className="text-red-500 text-sm mt-2">
                  <ul>
                    {passwordErrors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Profile Image
              </label>
              <div className="mt-2 flex items-center">
                <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                  {avatar ? (
                    <img
                      src={URL.createObjectURL(avatar)}
                      alt="avatar"
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <RxAvatar className="h-8 w-8" />
                  )}
                </span>
                <label
                  htmlFor="file-input"
                  className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <span>Upload a Profile Image</span>
                  <input
                    type="file"
                    id="file-input"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileInputChange}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>
            {/* Remember Me - Checkbox */}
            <div className={`${styles.noramlFlex} justify-between`}>
              <div className={`${styles.noramlFlex}`}>
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={rememberMeChecked}
                  onChange={handleRememberMeChange}
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  href=".forgot-password"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot your password?
                </a>
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
            <div className={`${styles.noramlFlex} w-full flex`}>
              <h4>Already have an account?</h4>
              <Link to="/login" className="text-blue-600 pl-2">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;