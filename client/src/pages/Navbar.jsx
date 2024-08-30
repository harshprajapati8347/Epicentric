import { useState, useRef } from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/styles";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";

const navigation = [
  { name: "Admin", href: "/admin/dashboard", current: false },
  { name: "Create Event", href: "/manage/create-event", current: false },
  { name: "My Events", href: "/manage/user-events", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
``;

export default function Navbar() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const events = useSelector((state) => state.events);
  const searchRef = useRef();

  const navigate = useNavigate();
  const [eventNameResults, setEventNameResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchEvent = (e) => {
    e.preventDefault();
    const search = e.target.value;
    const searchEvent = events?.allEvents?.filter((event) => {
      return event.eventName.toLowerCase().includes(search.toLowerCase());
    });
    const searchEventName = searchEvent?.map((event) => {
      return { eventName: event.eventName, id: event._id };
    });
    setEventNameResults(searchEventName);
  };

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <a
                    className="text-2xl font-bold text-white cursor-pointer"
                    href="/"
                  >
                    Epicentric
                  </a>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    <Link
                      key="Home"
                      to="/"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                      aria-current="page"
                    >
                      Home
                    </Link>
                    {isAuthenticated && (
                      <Link
                        key="My Events"
                        to="/manage/user-events"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                        aria-current="page"
                      >
                        My Events
                      </Link>
                    )}
                    <Link
                      key="Create Event"
                      to="/manage/create-event"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                      aria-current="page"
                    >
                      Create Event
                    </Link>
                    {/* {isAuthenticated && user?.role === "admin" && (
                      <Link
                        key="Admin"
                        to="/admin/dashboard"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                        aria-current="page"
                      >
                        Admin
                      </Link>
                    )} */}
                  </div>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    <input
                      className="border-2 border-gray-300 bg-white h-10 pl-2 pr-8 rounded-lg text-sm focus:outline-none"
                      onClick={() => {
                        setIsSearchOpen(true);
                        searchRef.current.classList.add("w-96");
                      }}
                      onBlur={() => {
                        setIsSearchOpen(false);
                        searchRef.current.classList.remove("w-96");
                      }}
                      type="search"
                      name="search"
                      placeholder="Search"
                      onChange={handleSearchEvent}
                      ref={searchRef}
                    />
                  </div>
                  {isSearchOpen && eventNameResults?.length > 0 && (
                    <div className="absolute z-10 bg-white w-96 mt-2 rounded-lg shadow-xl">
                      {eventNameResults?.map((e) => {
                        return (
                          <Link
                            key={e.id}
                            to={`/manage/event/${e.id}`}
                            className="block border font-bold text-base p-4 text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900"
                            onClick={() => {
                              searchRef.current.value = "";
                              setIsSearchOpen(false);
                              setEventNameResults([]);
                            }}
                          >
                            {e.eventName}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <div className={`${styles.noramlFlex}`}>
                  <div className="relative cursor-pointer mr-[15px]">
                    {isAuthenticated ? (
                      <Link to="/profile">
                        <img
                          src={`${import.meta.env.VITE_REACT_APP_SERVER_ROOT}/${
                            user?.avatar
                          }`}
                          className="w-[45px] h-[45px] rounded-full object-cover"
                          alt=""
                        />
                      </Link>
                    ) : (
                      <Link to="/login">
                        <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
