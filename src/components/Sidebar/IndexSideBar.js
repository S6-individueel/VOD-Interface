import React, {useState} from "react";
import {Link} from "react-router-dom";

// import NotificationDropdown from "../../components/Dropdowns/NotificationDropdown.js";
import UserDropdown from "../Dropsdowns/UserDropdown.js";

const activeLink = (path) => {
    return window.location.href.indexOf(`${path}`) !== -1
        ? "text-lightBlue-500 hover:text-lightBlue-600"
        : "text-blueGray-600 hover:text-blueGray-500"
};

const activeIcon = (path) => {
    return window.location.href.indexOf(`${path}`) !== -1
        ? "opacity-75"
        : "text-blueGray-300 hover:text-blueGray-500"
};

export default function IndexSideBar(props) {
    const [collapseShow, setCollapseShow] = useState("hidden");
    const {width} = props;
    const collapseIcon = width === "md:w-64" ? "fas fa-angle-double-left hover:text-blueGray-500 " : "fas fa-angle-double-right hover:text-blueGray-500 ";

    return (
        <>
            <nav
                className={"relative transition-nav md:left-0 md:block md:fixed md:top-80 md:bottom-0 md:overflow-y-hidden md:flex-row md:flex-nowrap md:overflow-hidden bg-black-200 flex flex-wrap items-center justify-between fixed z-10 py-4 px-6 " + width}>
                <div
                    className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
                    {/* Toggler */}
                    <button
                        className="cursor-pointer text-white opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid"
                        type="button"
                        onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
                    >
                        <i className="fas fa-bars"/>
                    </button>
                    <div className={" items-center py-3 font-bold block flex flex-row md:max-hidden "}>
                        <i
                            className={
                                "mr-2 text-lg cursor-pointer hover:text-blueGray-500 " +
                                collapseIcon
                            }
                            onClick={props.onClick}
                        />
                    </div>
                    {/* User */}
                    <ul className="md:hidden items-center flex flex-wrap list-none">
                        {/*<li className="inline-block relative">*/}
                        {/*    <NotificationDropdown />*/}
                        {/*</li>*/}
                        <li className="inline-block relative">
                            <UserDropdown/>
                        </li>
                    </ul>
                    {/* Collapse */}
                    <div
                        className={
                            "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
                            collapseShow
                        }
                    >
                        {/* Collapse header */}
                        <div
                            className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
                            <div className="flex flex-wrap">
                                <div className="w-6/12">
                                    <Link
                                        className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                                        to="/"
                                    >
                                        Notus React
                                    </Link>
                                </div>
                                <div className="w-6/12 flex justify-end">
                                    <button
                                        type="button"
                                        className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                                        onClick={() => setCollapseShow("hidden")}
                                    >
                                        <i className="fas fa-times"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Form */}
                        <form className="mt-6 mb-4 md:hidden">
                            <div className="mb-3 pt-0">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="border-0 px-3 py-2 h-12 border border-solid  border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                                />
                            </div>
                        </form>
                        {/* Navigation */}
                        <ul className="md:flex-col md:min-w-full flex flex-col list-none ">
                            <li className="items-center ">
                                <Link
                                    className={
                                        "text-xs uppercase py-3 font-bold block flex flex-row " +
                                        activeLink("/dashboard/main")
                                    }
                                    to="/dashboard/main"
                                >

                                    <i
                                        className={
                                            "fas fa-tv mr-2 text-base " +
                                            activeIcon("/dashboard/main")
                                        }
                                    > </i>{" "}
                                    <div className="mt-1">
                                        Dashboard
                                    </div>
                                </Link>
                            </li>
                            <li className="items-center">
                                <Link
                                    className={
                                        "text-xs uppercase py-3 font-bold block flex flex-row " +
                                        activeLink("/dashboard/data")
                                    }
                                    to="/dashboard/data"
                                >
                                    <i
                                        className={
                                            "fas fa-chart-line mr-2 text-base " +
                                            activeIcon("/dashboard/data")
                                        }
                                    />{" "}
                                    <div className="mt-1">
                                        Data
                                    </div>
                                </Link>
                            </li>
                            <li className="items-center">
                                <Link
                                    className={
                                        "text-xs uppercase py-2 font-bold block flex flex-row " +
                                        activeLink("/dashboard/map")
                                    }
                                    to="/dashboard/map"
                                >
                                    <i
                                        className={
                                            "fas fa-map-marked mr-2 text-base " +
                                            activeIcon("/dashboard/map")
                                        }
                                    />{" "}
                                    <div className="mt-1">
                                        Map
                                    </div>
                                </Link>
                            </li>
                            <li className="items-center">
                                <Link
                                    className={
                                        "text-xs uppercase py-3 font-bold block flex flex-row " +
                                        activeLink("/admin/dashboard")
                                    }
                                    to="/admin/dashboard"
                                >
                                    <i
                                        className={
                                            "fas fa-user-secret mr-2 text-base " +
                                            activeIcon("/admin/dashboard")
                                        }
                                    />{" "}
                                    <div className="mt-1">
                                        Admin
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
