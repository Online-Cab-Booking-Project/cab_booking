import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    mobile: '',
    dob: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    const errors = {};
    const { email, password, mobile, dob } = formData;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.email = 'Please enter a valid email address.';
    }

    // Password validation
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    if (!passwordRegex.test(password)) {
      errors.password = 'Password must be at least 8 characters long and contain at least one digit, one uppercase letter, one lowercase letter, and one special character.';
    }

    // Mobile number validation
    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(mobile)) {
      errors.mobile = 'Please enter a valid 10-digit mobile number.';
    }

    // Date of birth validation
    const currentDate = new Date();
    const dobDate = new Date(dob);
    if (dobDate >= currentDate) {
      errors.dob = 'Please enter a valid date of birth.';
    } else {
      const ageDiffMs = currentDate.getTime() - dobDate.getTime();
      const ageDate = new Date(ageDiffMs);
      const age = Math.abs(ageDate.getUTCFullYear() - 1970);
      if (age <= 0) {
        errors.dob = 'You must be at least 18 years old to submit this form.';
      }
    }

    if (Object.keys(errors).length === 0) {
      // If there are no errors, submit the form
      alert('Form submitted successfully!');
      // You can add form submission logic here
    } else {
      // If there are errors, update the state with the error messages
      setErrors(errors);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
        {errors.email && <span>{errors.email}</span>}
        <br />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
        {errors.password && <span>{errors.password}</span>}
        <br />

        <label htmlFor="mobile">Mobile Number:</label>
        <input type="tel" id="mobile" name="mobile" value={formData.mobile} onChange={handleChange} />
        {errors.mobile && <span>{errors.mobile}</span>}
        <br />

        <label htmlFor="dob">Date of Birth:</label>
        <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} />
        {errors.dob && <span>{errors.dob}</span>}
        <br />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default App;
