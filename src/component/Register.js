import React from "react";
import {useState} from "react";
import {useSnackbar} from "nostick";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {config} from "../App"

const Register = () => {
    const {enqueueSnackBar} = useSnackbar();
    const navigate = useNavigate();

    const [formData,setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    });

    const [loading,setLoading] = useState(false);

    const change = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value,
        })
    }

    const validateInput = (data) => {
        if(!data.username){
            enqueueSnackBar("Username required!",{
                variant: "warning",
            });
            return false;
        }

        if(data.username.length < 6){
            enqueueSnackBar("Username should contain more than 6 characters", {
                variant: "warning",
            });
            return false;
        }

        if(!data.password){
            enqueueSnackBar("Password required!", {
                variant:"warning",
            });
            return false;
        }

        if(data.password.length < 6){
            enqueueSnackBar("Password should contain more than 6 characters", {
                variant: "warning",
            })
            return false;
        }

        if(data.password !== data.confirmPassword){
            enqueueSnackBar("Passwords do not match", {
                variant: "warning",
            });
            return false;
        }

        return true;
    }

    const register = async (formData) => {
        if(!validateInput(formData)) return;

        try{
            setLoading(true);

            const response = await axios.post(`${config.endPoint}/auth/register`,{
                username: formData.username,
                password: formData.password,
            });

            if(response.status === 201 && response.data.success){
                enqueueSnackBar("Registered Successfully", {
                    variant: "success",
                });
                
                setFormData({
                    username: "",
                    password: "",
                    confirmPassword: "",
                });
                
                navigate("/login");
            }
        }catch(error){
            if(error.response && error.response.status === 400){
                enqueueSnackBar(error.response.data.message, {
                    variant: "error",
                });
            }else{
                enqueueSnackBar("Backend is down", {
                    variant: "error",
                });
            }
        }finally{
            setLoading(false);
        }
    }

    const handleRegister = () => {
        navigate("/login");
    }

    return(
        <>
        
        </>
    )
}

export default Register;