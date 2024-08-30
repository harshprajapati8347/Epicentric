import { useRef, useState } from "react";
import { AiOutlineCamera, AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles";
import {
  deleteUserAddress,
  loadUser,
  updatUserAddress,
  updateSocialProfiles,
  // updateSocialProfiles,
  updateUserInformation,
} from "../../redux/actions/user";
import { Country, State } from "country-state-city";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import ReactQuill from "react-quill";
import { Tooltip } from "@chakra-ui/react";
import { QuestionOutlineIcon } from "@chakra-ui/icons";
const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

const ProfileContent = ({ active }) => {
  const { inputRef } = useRef(null);
  const dispatch = useDispatch();
  const { user, error, successMessage } = useSelector((state) => state.user);
  const [firstName, setFirstName] = useState(user && user.firstName);
  const [lastName, setLastName] = useState(user && user.lastName);
  const [email, setEmail] = useState(user && user.email);
  const [aboutMe, setAboutMe] = useState(user && user.aboutMe);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [socials, setSocials] = useState({
    instagram: user && user.socialProfiles?.instagram,
    twitter: user && user.socialProfiles?.twitter,
    linkedin: user && user.socialProfiles?.linkedin,
    facebook: user && user.socialProfiles?.facebook,
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch({ type: "clearMessages" });
    }
  }, [dispatch, error, successMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateSocialProfiles(socials));
    dispatch(
      updateUserInformation(
        firstName,
        lastName,
        email,
        aboutMe,
        phoneNumber,
        password
      )
    );
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    setAvatar(file);

    const formData = new FormData();

    formData.append("image", e.target.files[0]);

    await axios
      .put(
        `${import.meta.env.VITE_REACT_APP_SERVER_URL}/user/update-avatar`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      )
      .then(() => {
        dispatch(loadUser());
        toast.success("avatar updated successfully!");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <div className="w-full">
      {/* profile */}
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={`${import.meta.env.VITE_REACT_APP_SERVER_ROOT}/${
                  user?.avatar
                }`}
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
                alt=""
              />
              <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={handleImage}
                />
                <label htmlFor="image">
                  <AiOutlineCamera />
                </label>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="w-full px-5">
            <form onSubmit={handleSubmit} aria-required={true}>
              <div className="w-full md:flex block pb-3">
                <div className=" w-[100%] md:w-[50%]">
                  <label className="block pb-2">First Name</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 md:mb-0`}
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className=" w-[100%] md:w-[50%]">
                  <label className="block pb-2">Last Name</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 md:mb-0`}
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full md:flex block pb-3">
                <div className=" w-[100%] md:w-[100%]">
                  <label className="flex items-center pb-2">
                    About You
                    <Tooltip
                      label="This about you section will be showcased on your profile
                      and events you create."
                      closeDelay={500}
                      placement="right"
                      hasArrow
                      bg={"#000"}
                      color={"#fff"}
                      borderRadius={"3px"}
                      fontWeight={"400"}
                      p={"4px 4px 4px 10px"}
                    >
                      <QuestionOutlineIcon />
                    </Tooltip>
                  </label>
                  <ReactQuill
                    type="textarea"
                    ref={inputRef}
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    style={{
                      borderBottom: "1px solid #e0e0e0",
                      backgroundColor: "#fff",
                    }}
                    value={aboutMe}
                    onChange={(e) => setAboutMe(e)}
                    name="aboutMe"
                  />
                  {/* <textarea
                    className={`${styles.input} !w-[95%] mb-4 md:mb-0`}
                    required
                    value={aboutMe}
                    onChange={(e) => setAboutMe(e.target.value)}
                  /> */}
                </div>
              </div>

              <div className="w-full md:flex block pb-3">
                <div className=" w-[100%] md:w-[50%]">
                  <label className="block pb-2">Phone Number</label>
                  <input
                    type="number"
                    className={`${styles.input} !w-[95%] mb-4 md:mb-0`}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <div className=" w-[100%] md:w-[50%]">
                  <label className="block pb-2">Enter your password</label>
                  <input
                    type="password"
                    className={`${styles.input} !w-[95%] mb-4 md:mb-0`}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              {/* Social Profiles Instagram, Twitter, Linkedin, Facebook  */}
              <div className="w-full md:flex block pb-3">
                <div className=" w-[100%] md:w-[50%]">
                  <label className="block pb-2">Instagram</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 md:mb-0`}
                    value={socials.instagram}
                    onChange={(e) =>
                      setSocials({ ...socials, instagram: e.target.value })
                    }
                  />
                </div>
                <div className=" w-[100%] md:w-[50%]">
                  <label className="block pb-2">Twitter</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 md:mb-0`}
                    value={socials.twitter}
                    onChange={(e) =>
                      setSocials({ ...socials, twitter: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="w-full md:flex block pb-3">
                <div className=" w-[100%] md:w-[50%]">
                  <label className="block pb-2">Youtube</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 md:mb-0`}
                    value={socials.linkedin}
                    onChange={(e) =>
                      setSocials({ ...socials, linkedin: e.target.value })
                    }
                  />
                </div>
                <div className=" w-[100%] md:w-[50%]">
                  <label className="block pb-2">Facebook</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 md:mb-0`}
                    value={socials.facebook}
                    onChange={(e) =>
                      setSocials({ ...socials, facebook: e.target.value })
                    }
                  />
                </div>
              </div>
              <input
                className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
                required
                value="Update"
                type="submit"
              />
            </form>
          </div>
        </>
      )}

      {/* My Events */}

      {/* Change Password */}
      {active === 6 && (
        <div>
          <ChangePassword />
        </div>
      )}

      {/*  user Address */}
      {active === 7 && (
        <div>
          <Address />
        </div>
      )}
    </div>
  );
};

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordChangeHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${
          import.meta.env.VITE_REACT_APP_SERVER_URL
        }/user/update-user-password`,
        { oldPassword, newPassword, confirmPassword },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <div className="bg-white mx-5 w-[80%] h-[60vh] px-5">
      <h1 className="block text-[25px] text-center font-[600] text-[#000000ba] pb-2">
        Change Password
      </h1>
      <div className="w-full">
        <form
          aria-required
          onSubmit={passwordChangeHandler}
          className="flex flex-col items-center"
        >
          <div className=" w-[100%] md:w-[50%] mt-5">
            <label className="block pb-2">Enter your old password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 md:mb-0`}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className=" w-[100%] md:w-[50%] mt-2">
            <label className="block pb-2">Enter your new password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 md:mb-0`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className=" w-[100%] md:w-[50%] mt-2">
            <label className="block pb-2">Enter your confirm password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 md:mb-0`}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <input
              className={`w-[95%] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
              required
              value="Update"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

const Address = () => {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState();
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressType, setAddressType] = useState("");
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const addressTypeData = [
    {
      name: "Default",
    },
    {
      name: "Home",
    },
    {
      name: "Office",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (addressType === "" || country === "" || city === "") {
      toast.error("Please fill all the fields!");
    } else {
      dispatch(
        updatUserAddress(
          country,
          city,
          address1,
          address2,
          zipCode,
          addressType
        )
      );
      setCountry("");
      setCity("");
      setAddress1("");
      setAddress2("");
      setZipCode(null);
      setAddressType("");
    }
  };

  const handleDelete = (item) => {
    const id = item._id;
    dispatch(deleteUserAddress(id));
  };

  return (
    <div className="w-full px-5">
      {/* <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center "> */}
      <div className="w-[80%] h-[80vh] bg-white rounded shadow relative overflow-y-scroll">
        <h1 className="text-center text-[25px] font-Poppins">Update Address</h1>
        <div className="w-full">
          <form aria-required onSubmit={handleSubmit} className="w-full">
            <div className="w-full block p-4">
              <div className="w-full pb-2">
                <label className="block pb-2">Address Type</label>
                <select
                  name=""
                  id=""
                  value={addressType}
                  onChange={(e) => setAddressType(e.target.value)}
                  className="w-[95%] border h-[40px] rounded-[5px]"
                >
                  <option value="" className="block border pb-2">
                    Choose your Address Type
                  </option>
                  {addressTypeData &&
                    addressTypeData.map((item) => (
                      <option
                        className="block pb-2"
                        key={item.name}
                        value={item.name}
                      >
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="w-full pb-2">
                <label className="block pb-2">Address 1</label>
                <input
                  type="address"
                  className={`${styles.input}`}
                  required
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                />
              </div>
              <div className="w-full pb-2">
                <label className="block pb-2">Address 2</label>
                <input
                  type="address"
                  className={`${styles.input}`}
                  required
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                />
              </div>
              <div className="w-full pb-2">
                <label className="block pb-2">Country</label>
                <select
                  name=""
                  id=""
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-[95%] border h-[40px] rounded-[5px]"
                >
                  <option value="" className="block border pb-2">
                    choose your country
                  </option>
                  {Country &&
                    Country.getAllCountries().map((item) => (
                      <option
                        className="block pb-2"
                        key={item.isoCode}
                        value={item.isoCode}
                      >
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="w-full pb-2">
                <label className="block pb-2">Choose your City</label>
                <select
                  name=""
                  id=""
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-[95%] border h-[40px] rounded-[5px]"
                >
                  <option value="" className="block border pb-2">
                    choose your city
                  </option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option
                        className="block pb-2"
                        key={item.isoCode}
                        value={item.isoCode}
                      >
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="w-full pb-2">
                <label className="block pb-2">Zip Code</label>
                <input
                  type="number"
                  className={`${styles.input}`}
                  required
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                />
              </div>

              <div className=" w-full pb-2">
                <input
                  type="submit"
                  className={`${styles.input} mt-5 cursor-pointer`}
                  required
                  readOnly
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* </div> */}

      {user &&
        user.address.map((item, index) => (
          <div
            className="w-full bg-white h-min md:h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10 mb-5"
            key={index}
          >
            <div className="flex items-center">
              <h5 className="pl-5 font-[600]">{item.addressType}</h5>
            </div>
            <div className="pl-8 flex items-center">
              <h6 className="text-[12px] md:text-[unset]">
                {item.address1} {item.address2}
              </h6>
            </div>
            <div className="pl-8 flex items-center">
              <h6 className="text-[12px] md:text-[unset]">
                {user && user.phoneNumber}
              </h6>
            </div>
            <div className="min-w-[10%] flex items-center justify-between pl-8">
              <AiOutlineDelete
                size={25}
                className="cursor-pointer"
                onClick={() => handleDelete(item)}
              />
            </div>
          </div>
        ))}
    </div>
  );
};
export default ProfileContent;
