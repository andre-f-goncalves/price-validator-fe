import api from '../utils/network/axios'
import { setCookie } from 'cookies-next';

import { useRouter } from 'next/router';
import { useState } from 'react';

interface FormData {
  username: string;
  password: string;
}

const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
  });
  const [showRegister, setShowRegister] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.username.trim() === '' || formData.password.trim() === '') {
      setErrorMessage('Please enter both username and password.');
      return;
    }
    if (formData.password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }
    if (showRegister) {
      registerUser()
    } else {
      loginUser()
    }
  };

  const registerUser = async () => {
    try {
      const response = await api.post('/register', {
        username: formData.username,
        password: formData.password
      })
      setCookie('authCookie', response.data.token)
      router.replace('/list-products');
    } catch (err) {
    }
  }

  const loginUser = async () => {
    try {
      const response = await api.post('/loginBO', {
        username: formData.username,
        password: formData.password
      })
      setCookie('authCookie', response.data.token)
      router.replace('/list-products');
    } catch (err) {
    }
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-center font-bold mb-4">{showRegister ? 'Register' : 'Login'}</h1>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          {showRegister ? 'Register' : 'Login'}
        </button>
      </form>
      <p className="text-center mt-4">
        {showRegister ? 'Already have an account?' : "Don't have an account yet?"}{' '}
        <button
          className="text-blue-500 hover:underline focus:outline-none"
          onClick={() => setShowRegister(!showRegister)}
        >
          {showRegister ? 'Login' : 'Register'}
        </button>
      </p>
    </div>
  );
};

export default LoginPage;