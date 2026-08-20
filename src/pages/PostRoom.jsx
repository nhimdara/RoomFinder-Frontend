import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Building2,
  MapPin,
  DollarSign,
  CheckCircle2,
  Upload,
  Plus,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Home,
  ShieldCheck,
  Image as ImageIcon
} from 'lucide-react';
import { ROOM_TYPES, AMENITIES_LIST } from '../data/mockRooms';

const SAMPLE_PHOTO_PRESETS = [
  'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80'
];

export const PostRoom = () => {
  const { addRoom, navigateTo, addToast } = useApp();

  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    roomType: 'Studio',
    size: '25 m²',
    floor: '3rd Floor',
    description: '',
    address: '',
    city: 'City Center',
    district: 'University District',
    distanceToCampus: '5 mins walk to Tech Campus',
    price: 320,
    deposit: 320,
    utilitiesIncluded: true,
    availableFrom: 'Immediately',
    minLease: '3 Months',
    amenities: ['High-Speed Wi-Fi', 'Air Conditioning', 'Private Bathroom', 'Fully Furnished'],
    houseRules: ['Quiet hours after 10 PM', 'No indoor smoking', 'Visitors allowed with notice'],
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80'
    ]
  });

  const [newImageUrl, setNewImageUrl] = useState('');

  const toggleAmenity = (amenity) => {
    setFormData((prev) => {
      const exists = prev.amenities.includes(amenity);
      return {
        ...prev,
        amenities: exists
          ? prev.amenities.filter((a) => a !== amenity)
          : [...prev.amenities, amenity]
      };
    });
  };

  const addPhoto = (url) => {
    if (!url) return;
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, url]
    }));
    setNewImageUrl('');
    addToast('Photo added to gallery! 📸');
  };

  const removePhoto = (idx) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== idx)
    }));
  };

  const handleNext = () => {
    if (currentStep === 1 && !formData.title.trim()) {
      addToast('Please provide a listing title', 'error');
      return;
    }
    if (currentStep === 2 && !formData.address.trim()) {
      addToast('Please provide a street address', 'error');
      return;
    }
    setCurrentStep((s) => Math.min(s + 1, 5));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.images.length) {
      addToast('Please add at least 1 photo for your listing', 'error');
      return;
    }
    addRoom(formData);
  };

  return (
    <div className="post-room-page animate-fade-in">
      <div className="app-container" style={{ maxWidth: '840px' }}>
        {/* Wizard Header */}
        <div className="wizard-header text-center">
          <span className="section-tag">LIST YOUR PROPERTY</span>
          <h1 className="section-title">Post a Student Room</h1>
          <p className="section-subtitle">
            Fill in the details below to list your room for free and connect with verified university students.
          </p>
        </div>

        {/* Step Progress Tracker Bar (Figma Style) */}
        <div className="wizard-steps-tracker card">
          <div className={`wizard-step-indicator ${currentStep >= 1 ? 'active' : ''}`}>
            <div className="step-number">1</div>
            <span className="step-text">Basic Details</span>
          </div>
          <div className={`step-line ${currentStep >= 2 ? 'active' : ''}`} />
          <div className={`wizard-step-indicator ${currentStep >= 2 ? 'active' : ''}`}>
            <div className="step-number">2</div>
            <span className="step-text">Location</span>
          </div>
          <div className={`step-line ${currentStep >= 3 ? 'active' : ''}`} />
          <div className={`wizard-step-indicator ${currentStep >= 3 ? 'active' : ''}`}>
            <div className="step-number">3</div>
            <span className="step-text">Pricing</span>
          </div>
          <div className={`step-line ${currentStep >= 4 ? 'active' : ''}`} />
          <div className={`wizard-step-indicator ${currentStep >= 4 ? 'active' : ''}`}>
            <div className="step-number">4</div>
            <span className="step-text">Amenities</span>
          </div>
          <div className={`step-line ${currentStep >= 5 ? 'active' : ''}`} />
          <div className={`wizard-step-indicator ${currentStep >= 5 ? 'active' : ''}`}>
            <div className="step-number">5</div>
            <span className="step-text">Photos & Publish</span>
          </div>
        </div>

        {/* Wizard Form Card */}
        <div className="wizard-form-box card">
          {/* STEP 1: Basic Details */}
          {currentStep === 1 && (
            <div className="wizard-step-content animate-fade-in">
              <h3 className="wizard-step-title">Step 1: Basic Information</h3>
              <p className="wizard-step-sub">Describe the type and size of the room</p>

              <div className="form-group">
                <label className="form-label">Listing Title *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="e.g. Sunny Studio with Balcony near Science Campus"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="form-row" style={{ display: 'flex', gap: '16px' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Room Category *</label>
                  <select
                    className="form-select"
                    value={formData.roomType}
                    onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                  >
                    <option value="Studio">Studio Apartment</option>
                    <option value="Single">Single Bedroom</option>
                    <option value="Master">Master Bedroom w/ Ensuite</option>
                    <option value="Shared">Shared Double Room</option>
                    <option value="Apartment">Full Apartment</option>
                  </select>
                </div>

                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Room Area Size (m²)</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. 25 m²"
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row" style={{ display: 'flex', gap: '16px' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Floor Number</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. 3rd Floor (Elevator)"
                    value={formData.floor}
                    onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                  />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Minimum Lease</label>
                  <select
                    className="form-select"
                    value={formData.minLease}
                    onChange={(e) => setFormData({ ...formData, minLease: e.target.value })}
                  >
                    <option value="1 Month">1 Month</option>
                    <option value="3 Months">3 Months</option>
                    <option value="1 Semester">1 Semester (4-5 Mos)</option>
                    <option value="6 Months">6 Months</option>
                    <option value="12 Months">12 Months (1 Year)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Detailed Description</label>
                <textarea
                  rows={4}
                  className="form-textarea"
                  placeholder="Describe natural lighting, study setup, quietness, nearby shops, and transportation..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </div>
          )}

          {/* STEP 2: Location */}
          {currentStep === 2 && (
            <div className="wizard-step-content animate-fade-in">
              <h3 className="wizard-step-title">Step 2: Location & Proximity</h3>
              <p className="wizard-step-sub">Help students see how close you are to their faculty</p>

              <div className="form-group">
                <label className="form-label">Street Address *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="e.g. 142 University Avenue, District 1"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>

              <div className="form-row" style={{ display: 'flex', gap: '16px' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">City / Region</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. City Center"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">District / Zone</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. University Hub"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Distance / Transit to Campus *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. 3 mins walk to Main Tech Campus / 200m from Science Gate"
                  value={formData.distanceToCampus}
                  onChange={(e) => setFormData({ ...formData, distanceToCampus: e.target.value })}
                />
              </div>
            </div>
          )}

          {/* STEP 3: Pricing & Terms */}
          {currentStep === 3 && (
            <div className="wizard-step-content animate-fade-in">
              <h3 className="wizard-step-title">Step 3: Pricing & Financials</h3>
              <p className="wizard-step-sub">Set your monthly rental rate and deposit requirements</p>

              <div className="form-row" style={{ display: 'flex', gap: '16px' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Monthly Rent ($ USD) *</label>
                  <input
                    type="number"
                    min="50"
                    max="5000"
                    required
                    className="form-input"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Refundable Deposit ($ USD)</label>
                  <input
                    type="number"
                    min="0"
                    className="form-input"
                    value={formData.deposit}
                    onChange={(e) => setFormData({ ...formData, deposit: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Utilities (Electricity, Water, Wi-Fi)</label>
                <div className="radio-options-row">
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="utilities"
                      checked={formData.utilitiesIncluded === true}
                      onChange={() => setFormData({ ...formData, utilitiesIncluded: true })}
                    />
                    <span>✅ All Utilities Included in Rent</span>
                  </label>
                  <label className="radio-option" style={{ marginLeft: '16px' }}>
                    <input
                      type="radio"
                      name="utilities"
                      checked={formData.utilitiesIncluded === false}
                      onChange={() => setFormData({ ...formData, utilitiesIncluded: false })}
                    />
                    <span>⚡ Billed Separately (Estimate ~$30/mo)</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Amenities */}
          {currentStep === 4 && (
            <div className="wizard-step-content animate-fade-in">
              <h3 className="wizard-step-title">Step 4: Amenities & Features</h3>
              <p className="wizard-step-sub">Select all features available in the room and building</p>

              <div className="amenities-selection-grid">
                {AMENITIES_LIST.map((amenity) => {
                  const isChecked = formData.amenities.includes(amenity);
                  return (
                    <div
                      key={amenity}
                      className={`amenity-toggle-chip ${isChecked ? 'active' : ''}`}
                      onClick={() => toggleAmenity(amenity)}
                    >
                      <CheckCircle2
                        size={16}
                        color={isChecked ? '#2563EB' : '#94A3B8'}
                      />
                      <span>{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 5: Photos & Review */}
          {currentStep === 5 && (
            <div className="wizard-step-content animate-fade-in">
              <h3 className="wizard-step-title">Step 5: Photos & Publish</h3>
              <p className="wizard-step-sub">Add high-resolution photos of the room, bathroom, and building</p>

              {/* Photo Presets for quick testing */}
              <div className="preset-photos-bar">
                <span className="preset-label">
                  <Sparkles size={14} color="#F59E0B" /> Click to quickly add demo HD room photos:
                </span>
                <div className="preset-thumbs-row">
                  {SAMPLE_PHOTO_PRESETS.map((presetUrl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="preset-btn"
                      onClick={() => addPhoto(presetUrl)}
                    >
                      <img src={presetUrl} alt="preset" />
                      <span>+ Add</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Image URL input */}
              <div className="form-group" style={{ marginTop: '16px' }}>
                <label className="form-label">Or Add Custom Image URL</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="url"
                    className="form-input"
                    placeholder="https://images.unsplash.com/photo-..."
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => addPhoto(newImageUrl)}
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Uploaded Photos Gallery Preview */}
              <div className="uploaded-gallery-preview">
                <label className="form-label">Uploaded Photos ({formData.images.length})</label>
                <div className="uploaded-photos-grid">
                  {formData.images.map((imgUrl, idx) => (
                    <div key={idx} className="uploaded-photo-item">
                      <img src={imgUrl} alt={`Uploaded ${idx + 1}`} />
                      {idx === 0 && <span className="cover-badge">Primary Cover</span>}
                      <button
                        type="button"
                        className="remove-photo-btn"
                        onClick={() => removePhoto(idx)}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Wizard Controls Footer */}
          <div className="wizard-footer-buttons">
            {currentStep > 1 && (
              <button
                type="button"
                className="btn btn-secondary btn-lg"
                onClick={() => setCurrentStep((s) => s - 1)}
              >
                <ArrowLeft size={16} />
                <span>Previous Step</span>
              </button>
            )}

            {currentStep < 5 ? (
              <button
                type="button"
                className="btn btn-primary btn-lg"
                style={{ marginLeft: 'auto' }}
                onClick={handleNext}
              >
                <span>Next Step</span>
                <ArrowRight size={16} />
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary btn-lg"
                style={{ marginLeft: 'auto' }}
                onClick={handleSubmit}
              >
                <CheckCircle2 size={18} />
                <span>Publish Listing Now</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
