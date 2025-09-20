import React, { useState } from "react";
import Box from "@mui/material/Box";
import Buttons from "@mui/material/Buttons";
import hero from "../assets/hero_image.png"
import {useNavigate} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Header = ({ hasHiddenButtons, children }) => {
    const navigate = useNavigate();

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
                    ) : ()
                    }
                </Box>
            </Box>
        </>
    )
}

export default Header;