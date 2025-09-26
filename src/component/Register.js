import React from "react";
import {useState} from "react";
import {useSnackbar} from "nostick";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {config} from "../App"
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";

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
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <Header hasHiddenAuthButtons/>

            <Box className="content">
                <Stack spacing={2} className="form">
                    <h2 className="title">Register</h2>
                    <TextField
                        id="username"
                        label="username"
                        value={formData.username}
                        onChange={change}
                        variant="outlined"
                        title="Username"
                        name="username"
                        placeholder="Enter your username"
                        fullWidth
                    />
                    
                    <TextField 
                        id="password"
                        label="password"
                        value={formData.password}
                        onChange={change}
                        variant="outlined"
                        name="password"
                        type="password"
                        helperText="Password must be atleast 6 characters length"
                        fullWidth
                        placeholder="Enter the password with minimum 6 characters"
                    />
                    
                    <TextField 
                        id="confirm-password"
                        variant="outlined"
                        value={formData.confirmPassword}
                        onChange={change}
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        fullWidth
                    />

                    {loading ? (
                        <CircularProgress size={24}/>
                    ) : (
                        <Button
                            className="button"
                            variant="contained"
                            onClick={() => register(formData)}
                            disabled={loading}
                        >Register Now</Button>
                    )}
                    <p className="secondary-action">
                        Already have an account ?{" "}
                        <Link to="/login">
                            Login Here
                        </Link>
                    </p>
                </Stack>
            </Box>

            <Footer/>
        </Box>
    )
}

export default Register;