import React, { useState } from "react";
import { UserData, UserModalProps } from "@/interfaces";

const UserModal: React.FC<UserModalProps> = ({ onClose, onSubmit }) => {
  const [user, setUser] = useState<UserData>({
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: { lat: "", lng: "" }
    },
    phone: "",
    website: "",
    company: {
      name: "",
      catchPhrase: "",
      bs: ""
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(user);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Add New User</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            value={user.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full border p-2 mb-2"
          />
          <input
            name="username"
            value={user.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full border p-2 mb-2"
          />
          <input
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border p-2 mb-2"
          />
          {/* Add more fields as needed... */}
          <div className="flex justify-between mt-4">
            <button onClick={onClose} className="text-gray-600">Cancel</button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add User</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
