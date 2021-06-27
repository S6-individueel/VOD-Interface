import React, {useCallback} from "react";
import { createPopper } from "@popperjs/core";
import {Link, useHistory} from "react-router-dom";
import jwt from "jsonwebtoken";

const UserDropdown = () => {
    // dropdown props
    const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
    const btnDropdownRef = React.createRef();
    const popoverDropdownRef = React.createRef();

    const history = useHistory();
    const handleOnClick = useCallback(() => history.push("/"), [history]);

    const token = localStorage.getItem("token");
    const secret = "Y2F0Y2hlciUyMHdvbmclMjBsb3ZlJTIwLm5ldA==";
    const decodedId = token !== null ? jwt.verify(token.split("Bearer ").pop(), secret).id : null;

    const openDropdownPopover = () => {
        createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
            placement: "bottom-start",
        });
        setDropdownPopoverShow(true);
    };
    const closeDropdownPopover = () => {
        setDropdownPopoverShow(false);
    };
    return (
        <>
    <span className=" h-9 text-sm text-blueGray-400  inline-flex items-center justify-center  rounded-full mr-2">
                {decodedId}
          </span>
            <a
                className="text-blueGray-500 block"
                href="#pablo"
                ref={btnDropdownRef}
                onClick={(e) => {
                    e.preventDefault();
                    dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
                }}
            >
                <div className="items-center flex">
          <span className="w-9 h-9 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            <img
                alt="..."
                className="w-full rounded-full align-middle border-none shadow-lg"
                src={require("../../assets/img/default-avatar.png").default}
            />
          </span>
                </div>
            </a>
            <div
                ref={popoverDropdownRef}
                className={
                    (dropdownPopoverShow ? "block " : "hidden ") +
                    "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
                }
            >
                <Link to="/config/profile" >
                <a
                    href="#pablo"
                    className={
                        "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                    }

                >
                    Profile
                </a>
                </Link>
                <div className="h-0 my-2 border border-solid border-blueGray-100" />
                <a
                    href=""
                    className={
                        "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                    }
                    onClick={() => {
                        localStorage.removeItem('authentication');
                        localStorage.removeItem("token");
                        handleOnClick()
                    }}
                >
                    Sign out
                </a>
            </div>
        </>
    );
};

export default UserDropdown;
