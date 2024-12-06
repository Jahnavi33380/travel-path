import React, { useState } from 'react';
import { auth, googleProvider } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { Button } from '../ui/button';

function LoginSignupPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      // Handle successful login/signup
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      // Handle successful Google login
    } catch (error) {
      console.error('Google authentication error:', error);
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl font-bold mb-5">{isSignUp ? 'Sign Up' : 'Log In'}</h2>
      <form onSubmit={handleAuth} className="w-full max-w-sm">
        {isSignUp && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <Button type="submit" className="w-full mb-4">
          {isSignUp ? 'Sign Up' : 'Log In'}
        </Button>
      </form>
      <Button onClick={handleGoogleAuth} className="w-full max-w-sm mb-4">
        Sign In with Google
      </Button>
      <p>
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-blue-500 ml-2"
        >
          {isSignUp ? 'Log In' : 'Sign Up'}
        </button>
      </p>
    </div>
  );
}

export default LoginSignupPage;