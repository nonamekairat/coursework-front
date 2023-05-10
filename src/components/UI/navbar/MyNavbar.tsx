import React from "react";
import classes from "./MyNavbar.module.css";
import avatar from '../../../assets/avatar.png';
import {Avatar, Button, Menu, MenuHandler, MenuItem, MenuList, Navbar, Typography,} from "@material-tailwind/react";
import {
    ChevronDownIcon,
    InboxArrowDownIcon,
    LifebuoyIcon,
    PowerIcon,
    UserCircleIcon,
} from "@heroicons/react/24/outline";

import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {tokenSlice} from "../../../store/reducers/TokenSlice";
import {userAPI} from "../../../services/UserService";
import StandartButton from "../button/StandartButton";
import IconNavList from "./IconNavList";
import Search from "./Search";
import Administration from "./Administration";

function ProfileMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const navigate = useNavigate();
    const {accessToken: accessToken} = useAppSelector(state => state.tokenReducer)
    const dispatch = useAppDispatch();
    const {data: user, error, isLoading, refetch} = userAPI.useFetchUserQuery(null);


    const profileMenuItems = [
        {
            label: "профиль",
            icon: UserCircleIcon,
            onClick: () => navigate("/profile", {state: {item: 3}}),
        },
        {
            label: "Заказы",
            icon: InboxArrowDownIcon,
            onClick: () => navigate("/profile", {state: {item: 0}}),
        },
        {
            label: "Помощь",
            icon: LifebuoyIcon,
            onClick: () => navigate("/about"),
        },
        {
            label: "выйти из аккаунта",
            icon: PowerIcon,
            onClick: () => {
                logout()
                navigate("/login")
            },
        },
    ];
    const logout = () => {
        dispatch(tokenSlice.actions.tokenRemove());
    }
    const toLogin = () => {
        navigate("/login");
    }

    if(!accessToken){

        return (

            <StandartButton className={classes.msAuto} onClick={toLogin}>
                Login
            </StandartButton>

        )
    }

    return (

        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
            <MenuHandler>
                <Button
                    variant="text"
                    color="blue-gray"
                    className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
                >
                    <Avatar
                        variant="circular"
                        size="sm"
                        alt="candice wu"
                        className="border border-blue-500 p-0.5"
                        src={

                                user?.imageUrl ? user?.imageUrl : avatar
                    }
                    />
                    <ChevronDownIcon
                        strokeWidth={2.5}
                        className={`h-3 w-3 transition-transform ${
                            isMenuOpen ? "rotate-180" : ""
                        }`}
                    />
                </Button>
            </MenuHandler>
            <MenuList className="p-1">
                {profileMenuItems.map(({ label, icon, onClick}, key) => {
                    const isLastItem = key === profileMenuItems.length - 1;
                    return (
                        <MenuItem
                            key={label}
                            onClick={onClick}
                            className={`flex items-center gap-2 rounded ${
                                isLastItem
                                    ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                                    : ""
                            }`}
                        >
                            {React.createElement(icon, {
                                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                                strokeWidth: 2,
                            })}
                            <Typography
                                as="span"
                                variant="small"
                                className="font-normal"
                                color={isLastItem ? "red" : "inherit"}
                            >
                                {label}
                            </Typography>
                        </MenuItem>
                    );
                })}
            </MenuList>
        </Menu>
    );
}

const MyNavbar = () => {


    return (
        <div>
            <Navbar className="mx-auto max-w-full z-30 fixed top-0">
                <div className="relative mx-auto flex items-center text-blue-gray-900">
                    <Link to="/" className="font-semibold text-2xl hover:text-blue-400">LaptopKG</Link>

                    <div className="absolute h-10 right-1/4 w-6/12">
                        <div className="flex justify-end">
                            <Search />
                        </div>

                    </div>
                    <div className="absolute top-2 right-24" >
                        <IconNavList />
                    </div>

                    <ProfileMenu />
                </div>
            </Navbar>
            <Administration />
        </div>

    );
}


export default MyNavbar;