import React, { useState, useEffect } from 'react';
import { assets } from '../assets/greencart_assets/assets';
import { useAppContext } from '../Context/AppContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// ✅ Reusable InputField component
const InputField = ({ type, placeholder, name, handleChange, value }) => (
  <input
    className='w-full px-2 py-2.5 border border-gray-500 rounded outline-none 
    text-gray-500 focus:border-primary transition'
    type={type}
    placeholder={placeholder}
    name={name}
    value={value}
    onChange={handleChange}
    required
  />
);

const AddAdress = () => {
  const { axios, user } = useAppContext();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/address/add', { address });

      if (data.success) {
        toast.success(data.message);
        navigate('/cart');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/cart');
    }
  }, [user, navigate]);

  return (
    <div className='mt-16 pb-16'>
      <p className='text-2xl md:text-3xl text-gray-500'>
        Add Shipping <span className='font-semibold text-primary'>Address</span>
      </p>
      <div className="flex flex-col-reverse md:flex-row justify-between mt-10">
        <div className="flex-1 max-w-md">
          <form onSubmit={onSubmitHandler} className='space-y-3 mt-6 text-sm'>
            <div className="grid grid-cols-2 gap-4">
              <InputField
                name='firstName'
                type='text'
                placeholder='First Name'
                handleChange={handleChange}
                value={address.firstName}
              />
              <InputField
                name='lastName'
                type='text'
                placeholder='Last Name'
                handleChange={handleChange}
                value={address.lastName}
              />
            </div>

            <InputField
              name='email'
              type='email'
              placeholder='Email address'
              handleChange={handleChange}
              value={address.email}
            />

            <InputField
              name='street'
              type='text'
              placeholder='Street'
              handleChange={handleChange}
              value={address.street}
            />

            <div className="grid grid-cols-2 gap-4">
              <InputField
                name='city'
                type='text'
                placeholder='Enter City'
                handleChange={handleChange}
                value={address.city}
              />
              <InputField
                name='state'
                type='text'
                placeholder='Enter State'
                handleChange={handleChange}
                value={address.state}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InputField
                name='zipcode'
                type='number'
                placeholder='Enter ZipCode'
                handleChange={handleChange}
                value={address.zipcode}
              />
              <InputField
                name='country'
                type='text'
                placeholder='Enter Country'
                handleChange={handleChange}
                value={address.country}
              />
            </div>

            <InputField
              name='phone'
              type='text'
              placeholder='Enter Phone'
              handleChange={handleChange}
              value={address.phone}
            />

            <button
              style={{ background: 'var(--color-primary)' }}
              className='w-full mt-6 bg-primary py-3 transition cursor-pointer uppercase'
            >
              Save Address
            </button>
          </form>
        </div>

        <img
          className='md:mr-16 mb-16 md:mt-0'
          src={assets.add_address_iamge}
          alt='AddAddress'
        />
      </div>
    </div>
  );
};

export default AddAdress;

