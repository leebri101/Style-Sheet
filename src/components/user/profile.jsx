// to do 
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from '../../contexts/auth';
import { Link } from 'react-router-dom';
import "./Profile.css";

const ProfilePage = () => {
    const [user, setUser] = useState({
        firstName: "First Name",
        lastName: "Last Name",
        email: "exampl@email.com",
    });
}