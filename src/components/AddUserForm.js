import React, { useState, useEffect } from 'react';
import { useUsers } from '../context/UserContext';
import './AddUserForm.css';

const AddUserForm = ({ onClose }) => {
  const { dispatch, actions } = useUsers();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    website: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
      geo: {
        lat: '',
        lng: ''
      }
    },
    company: {
      name: '',
      catchPhrase: '',
      bs: ''
    }
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  
  useEffect(() => {
    const scrollY = window.scrollY;
    
    document.body.classList.add('modal-open');
    document.body.style.top = `-${scrollY}px`;
    
    
    return () => {
      document.body.classList.remove('modal-open');
      document.body.style.top = '';
      window.scrollTo(0, scrollY);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
   
    if (name.startsWith('address.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value || ''
        }
      }));
    } else if (name.startsWith('address.geo.')) {
      const field = name.split('.')[2];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          geo: {
            ...prev.address.geo,
            [field]: value || ''
          }
        }
      }));
    } else if (name.startsWith('company.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        company: {
          ...prev.company,
          [field]: value || ''
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value || ''
      }));
    }
    
   
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    
  
    const requiredFields = ['name', 'username', 'email', 'phone', 'website'];
    const addressFields = ['street', 'city', 'zipcode'];
    const companyFields = ['name'];
    
    const simpleErrors = {};
    
 
    requiredFields.forEach(field => {
      const value = formData[field];
      if (!value || !value.trim()) {
        simpleErrors[field] = `${field} is required`;
      }
    });
    
    
    addressFields.forEach(field => {
      const value = formData.address?.[field];
      if (!value || !value.trim()) {
        simpleErrors[`address.${field}`] = `${field} is required`;
      }
    });
    
    
    companyFields.forEach(field => {
      const value = formData.company?.[field];
      if (!value || !value.trim()) {
        simpleErrors[`company.${field}`] = `${field} is required`;
      }
    });
    
    if (Object.keys(simpleErrors).length > 0) {
      setErrors(simpleErrors);
      return;
    }
    setIsSubmitting(true);
    
    try {
      const newUser = {
        id: Date.now(), 
        name: (formData.name || '').trim(),
        username: (formData.username || '').trim(),
        email: (formData.email || '').trim(),
        phone: (formData.phone || '').trim(),
        website: (() => {
          const website = (formData.website || '').trim();
          return website.startsWith('http') ? website : `https://${website}`;
        })(),
        address: {
          street: (formData.address?.street || '').trim(),
          suite: (formData.address?.suite || '').trim(),
          city: (formData.address?.city || '').trim(),
          zipcode: (formData.address?.zipcode || '').trim(),
          geo: {
            lat: (formData.address?.geo?.lat || '').trim(),
            lng: (formData.address?.geo?.lng || '').trim()
          }
        },
        company: {
          name: (formData.company?.name || '').trim(),
          catchPhrase: (formData.company?.catchPhrase || '').trim(),
          bs: (formData.company?.bs || '').trim()
        }
      };
      
     
      dispatch({
        type: actions.ADD_USER,
        payload: newUser
      });
      onClose();
      
    
      setFormData({
        name: '',
        username: '',
        email: '',
        phone: '',
        website: '',
        address: {
          street: '',
          suite: '',
          city: '',
          zipcode: '',
          geo: {
            lat: '',
            lng: ''
          }
        },
        company: {
          name: '',
          catchPhrase: '',
          bs: ''
        }
      });
      
    } catch (error) {
      console.error('Error adding user:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      username: '',
      email: '',
      phone: '',
      website: '',
      address: {
        street: '',
        suite: '',
        city: '',
        zipcode: '',
        geo: {
          lat: '',
          lng: ''
        }
      },
      company: {
        name: '',
        catchPhrase: '',
        bs: ''
      }
    });
    setErrors({});
    onClose();
  };

  return (
    <div className="add-user-modal">
      <div className="add-user-modal-content">
        <div className="add-user-header">
          <h2>Add New User</h2>
          <button 
            className="close-btn"
            onClick={handleCancel}
            type="button"
          >
            ×
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="add-user-form">
          {/* Basic Information */}
          <div className="form-section">
            <h3>Basic Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleInputChange}
                  className={errors.name ? 'error' : ''}
                  placeholder="Enter full name"
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="username">Username *</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username || ''}
                  onChange={handleInputChange}
                  className={errors.username ? 'error' : ''}
                  placeholder="Enter username"
                />
                {errors.username && <span className="error-message">{errors.username}</span>}
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleInputChange}
                  className={errors.email ? 'error' : ''}
                  placeholder="Enter email address"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleInputChange}
                  className={errors.phone ? 'error' : ''}
                  placeholder="Enter phone number"
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="website">Website *</label>
              <input
                type="text"
                id="website"
                name="website"
                  value={formData.website || ''}
                onChange={handleInputChange}
                className={errors.website ? 'error' : ''}
                placeholder="example.com (https:// will be added automatically)"
              />
              {errors.website && <span className="error-message">{errors.website}</span>}
            </div>
          </div>

          {/* Address Information */}
          <div className="form-section">
            <h3>Address Information</h3>
            <div className="form-group">
              <label htmlFor="address.street">Street *</label>
              <input
                type="text"
                id="address.street"
                name="address.street"
                value={formData.address?.street || ''}
                onChange={handleInputChange}
                className={errors['address.street'] ? 'error' : ''}
                placeholder="Enter street address"
              />
              {errors['address.street'] && <span className="error-message">{errors['address.street']}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="address.suite">Suite/Apartment</label>
              <input
                type="text"
                id="address.suite"
                name="address.suite"
                value={formData.address?.suite || ''}
                onChange={handleInputChange}
                placeholder="Enter suite or apartment number"
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="address.city">City *</label>
                <input
                  type="text"
                  id="address.city"
                  name="address.city"
                  value={formData.address?.city || ''}
                  onChange={handleInputChange}
                  className={errors['address.city'] ? 'error' : ''}
                  placeholder="Enter city"
                />
                {errors['address.city'] && <span className="error-message">{errors['address.city']}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="address.zipcode">Zipcode *</label>
                <input
                  type="text"
                  id="address.zipcode"
                  name="address.zipcode"
                  value={formData.address?.zipcode || ''}
                  onChange={handleInputChange}
                  className={errors['address.zipcode'] ? 'error' : ''}
                  placeholder="Enter zipcode"
                />
                {errors['address.zipcode'] && <span className="error-message">{errors['address.zipcode']}</span>}
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="address.geo.lat">Latitude</label>
                <input
                  type="text"
                  id="address.geo.lat"
                  name="address.geo.lat"
                  value={formData.address?.geo?.lat || ''}
                  onChange={handleInputChange}
                  placeholder="Enter latitude"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="address.geo.lng">Longitude</label>
                <input
                  type="text"
                  id="address.geo.lng"
                  name="address.geo.lng"
                  value={formData.address?.geo?.lng || ''}
                  onChange={handleInputChange}
                  placeholder="Enter longitude"
                />
              </div>
            </div>
          </div>

          {/* Company Information */}
          <div className="form-section">
            <h3>Company Information</h3>
            <div className="form-group">
              <label htmlFor="company.name">Company Name *</label>
              <input
                type="text"
                id="company.name"
                name="company.name"
                value={formData.company?.name || ''}
                onChange={handleInputChange}
                className={errors['company.name'] ? 'error' : ''}
                placeholder="Enter company name"
              />
              {errors['company.name'] && <span className="error-message">{errors['company.name']}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="company.catchPhrase">Catchphrase</label>
              <input
                type="text"
                id="company.catchPhrase"
                name="company.catchPhrase"
                value={formData.company?.catchPhrase || ''}
                onChange={handleInputChange}
                placeholder="Enter company catchphrase"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="company.bs">Business</label>
              <input
                type="text"
                id="company.bs"
                name="company.bs"
                value={formData.company?.bs || ''}
                onChange={handleInputChange}
                placeholder="Enter business description"
              />
            </div>
          </div>
          
          <div className="form-actions">
            <button
              type="button"
              onClick={handleCancel}
              className="cancel-btn"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding...' : 'Add User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserForm;
