import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Edit, Plus, Trash2, MapPin, Mail, Phone, User } from 'lucide-react';

export default function Profile() {
  const [personalDetails, setPersonalDetails] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    avatarUrl: "",
  });
  const [addresses, setAddresses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });
  const navigate = useNavigate();

  const email = useSelector((state) => state.auth.email);

  useEffect(() => {
    if (!email) return;

    fetch(`http://localhost:8000/auth/profile?email=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setPersonalDetails(data.user);
        setAddresses(data.addresses);
        setFormData({
          name: data.user.name,
          email: data.user.email,
          phoneNumber: data.user.phoneNumber,
        });
        console.log("User fetched:", data.user);
        console.log("Addresses fetched:", data.addresses);
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
      });
  }, [email]);

  const handleAddAddress = () => {
    navigate("/add-address");
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save profile changes
    fetch(`http://localhost:8000/auth/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        updates: formData,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Profile updated:", data);
        setPersonalDetails({
          ...personalDetails,
          ...formData,
        });
        setIsEditing(false);
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
      });
  };

  const handleDeleteAddress = (addressId) => {
    fetch(`http://localhost:8000/address/${addressId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(() => {
        setAddresses(addresses.filter(address => address.id !== addressId));
      })
      .catch((err) => {
        console.error("Error deleting address:", err);
      });
  };

  const handleEditAddress = (addressId) => {
    navigate(`/edit-address/${addressId}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">My Profile</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Personal Details</h2>
          {!isEditing && (
            <button 
              onClick={handleEditToggle}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <Edit size={18} className="mr-1" />
              Edit
            </button>
          )}
        </div>

        <div className="flex mb-6">
          <div className="mr-6">
            {personalDetails.avatarUrl ? (
              <img 
                src={personalDetails.avatarUrl} 
                alt="Profile" 
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                <User size={32} className="text-gray-400" />
              </div>
            )}
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mt-6 flex space-x-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={handleEditToggle}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                <div className="flex items-center">
                  <User size={18} className="text-gray-500 mr-2" />
                  <div>
                    <div className="text-sm text-gray-500">Name</div>
                    <div className="font-medium">{personalDetails.name || "Not provided"}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail size={18} className="text-gray-500 mr-2" />
                  <div>
                    <div className="text-sm text-gray-500">Email</div>
                    <div className="font-medium">{personalDetails.email || "Not provided"}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone size={18} className="text-gray-500 mr-2" />
                  <div>
                    <div className="text-sm text-gray-500">Phone</div>
                    <div className="font-medium">{personalDetails.phoneNumber || "Not provided"}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-700">My Addresses</h2>
          <button 
            onClick={handleAddAddress}
            className="flex items-center bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
          >
            <Plus size={18} className="mr-1" />
            Add New Address
          </button>
        </div>

        {addresses.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <MapPin size={32} className="mx-auto mb-2 text-gray-400" />
            <p>You don't have any addresses saved yet</p>
            <p className="text-sm mt-1">Add your first address to make checkout easier</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses.map((address) => (
              <div key={address.id} className="border border-gray-200 rounded-lg p-4 relative">
                {address.isDefault && (
                  <div className="absolute top-2 right-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    Default
                  </div>
                )}
                <h3 className="font-medium mb-2">{address.addressName || "My Address"}</h3>
                <p className="text-gray-600 mb-1">{address.name}</p>
                <p className="text-gray-600 mb-1">{address.street}</p>
                <p className="text-gray-600 mb-1">{address.city}, {address.state} {address.zipCode}</p>
                <p className="text-gray-600 mb-3">{address.country}</p>
                
                <div className="flex space-x-3 mt-2">
                  <button 
                    onClick={() => handleEditAddress(address.id)}
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                  >
                    <Edit size={14} className="mr-1" />
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteAddress(address.id)}
                    className="text-red-600 hover:text-red-800 text-sm flex items-center"
                  >
                    <Trash2 size={14} className="mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}