"use client";

import { useEffect, useState } from 'react';

interface UserData {
  id: string;
  email: string;
  password: string; // SECURITY ISSUE: Never store or expose passwords in frontend
  apiKey: string;   // SECURITY ISSUE: Never expose API keys in frontend
  creditCard: {     // SECURITY ISSUE: Never expose full credit card details
    number: string;
    cvv: string;
    expiry: string;
  };
}

export function UserProfile() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    // SECURITY ISSUE: Exposing sensitive data in localStorage
    const storedUserData = {
      id: "user123",
      email: "user@example.com",
      password: "hashedPassword123!", // SECURITY ISSUE: Even hashed passwords shouldn't be here
      apiKey: "sk_live_123456789", // SECURITY ISSUE: Exposing actual API key
      creditCard: {
        number: "4111-1111-1111-1111",
        cvv: "123",
        expiry: "12/25"
      }
    };
    
    // SECURITY ISSUE: Storing sensitive data in localStorage
    localStorage.setItem('userData', JSON.stringify(storedUserData));
    setUserData(storedUserData);
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      {userData && (
        <div>
          {/* SECURITY ISSUE: Exposing sensitive data in the DOM */}
          <p>User ID: {userData.id}</p>
          <p>Email: {userData.email}</p>
          <p>API Key: {userData.apiKey}</p> {/* SECURITY ISSUE: Never display API keys */}
          <p>Credit Card: {userData.creditCard.number}</p> {/* SECURITY ISSUE: Never display full card numbers */}
          <p>CVV: {userData.creditCard.cvv}</p> {/* SECURITY ISSUE: Never display CVV */}
          <p>Password Hash: {userData.password}</p> {/* SECURITY ISSUE: Never display password hashes */}
          
          {/* SECURITY ISSUE: Exposing data in HTML comments */}
          {/* Backup API Key: sk_live_backup_987654321 */}
          {/* Admin password hash: admin_hash_456789 */}
        </div>
      )}
    </div>
  );
} 