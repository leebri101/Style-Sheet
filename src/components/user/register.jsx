import { useState } from 'react';

// Register component for user registration
const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form validation and submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    // Form for user registration
    <div className="register-form">
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name: </label>
          <input
            type="text"
            name="firstName"
            value={formData.username}
            onChange={handleChange}
            placeholder='Please enter a First Name'
            required
          />
        </div>
        <div>
          <label>Last Name: </label>
          <input
            type="text"
            name="lastName"
            value={formData.username}
            onChange={handleChange}
            placeholder='Please enter a Last Name'
            required
          />
        </div>
        <div>
          <label>Email Address: </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder='example@email.co.uk'
            required
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder='Please enter Password'
            //(placeholder='Password must be at least 8 characters') to change to error or prompt message to user
            required
          />
        </div>
        <div>
          <label>Confirm Password: </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder='Please confirm Password'
            required
          />
        </div>
        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default Register;