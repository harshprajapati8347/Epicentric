import { useState } from "react";
import styles from "../styles/styles";
import Loader from "../components/Layout/Loader";
import ProfileSideBar from "../components/Profile/ProfileSidebar";
import ProfileContent from "../components/Profile/ProfileContent";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const { loading } = useSelector((state) => state.user);
  const [active, setActive] = useState(1);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}>
            <div className="w-[50px] md:w-[335px] sticky md:mt-3 mt-[18%]">
              <ProfileSideBar active={active} setActive={setActive} />
            </div>
            <ProfileContent active={active} />
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
