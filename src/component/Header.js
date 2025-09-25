import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import hero from "../assets/hero_image.png"
import {useNavigate} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";


const Header = ({ hasHiddenButtons, children }) => {
    const navigate = useNavigate();
    const userName = localStorage.getItem("username");

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <>
            <Box className="navbar">

                <div className="logo">
                    <img src={hero} />
                </div>

                <Box className="search">{children}</Box>

                <Box className="buttons">
                    {hasHiddenButtons ? (
                        <Button
                            className="explore-button"
                            startIcon={<ArrowBackIcon/>}
                            variant="text"
                            onClick={() => {
                                navigate("/")
                            }}
                        >
                            Back to Explore
                        </Button>
                    ) : (<Stack direction="row" spacing={2} alignItems="center">
                        {userName ? (
                            <>
                                <Avatar src="../assets/avatar.svg" alt={userName} />
                                <span>{userName}</span>  
                                <Button variant="contained" onClick={handleLogout}>
                                    LOGOUT
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    variant="contained"
                                    onClick={() => navigate("/login")}
                                >
                                    LOGIN
                                </Button>

                                <Button
                                    variant="contained"
                                    onClick={() => navigate("/register")}
                                >
                                    REGISTER
                                </Button>
                            </>
                        )}
                    </Stack>)
                    }
                </Box>
            </Box>
        </>
    )
}

export default Header;