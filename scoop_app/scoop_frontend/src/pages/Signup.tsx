import React from 'react';
import { Link } from 'react-router-dom';

const Signup: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-black to-slate-950 py-20">
      <div className="max-w-md mx-auto sm:px-7 px-4">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-8">
            <h2 className="text-3xl font-medium text-center mb-10">
              Join <span className="text-purple-500 font-bold" 
                style={{fontFamily: '"Nothing You Could Do", cursive'}}>Scoop</span> Today
            </h2>
            
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Sign up with</span>
                </div>
              </div>
              
              <div className="mt-6 flex flex-col gap-3 px-10">
                <button className="flex items-center justify-center px-4 py-2 border rounded-md shadow-sm bg-white text-gray-700 hover:bg-gray-50">
                  <svg className="h-5 w-5 mr-2 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
                  </svg>
                  Twitter
                </button>
                
                <button className="flex items-center justify-center px-4 py-2 border rounded-md shadow-sm bg-white text-gray-700 hover:bg-gray-50">
                  <svg className="h-5 w-5 mr-2 text-blue-700" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </button>
                
                <button className="flex items-center justify-center px-4 py-2 border rounded-md shadow-sm bg-white text-gray-700 hover:bg-gray-50">
                  <svg className="h-5 w-5 mr-2 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </button>
              </div>
            </div>
            
            <div className="mt-10 text-center text-gray-600">
              <p>
                Already have an account?{' '}
                <Link to="/login" className="text-purple-600 hover:text-purple-800 font-medium">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8 text-white">
          <p>
            By signing up, you agree to our{' '}
            <Link to="/terms" className="text-purple-300 hover:text-purple-100">Terms of Service</Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-purple-300 hover:text-purple-100">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Signup;