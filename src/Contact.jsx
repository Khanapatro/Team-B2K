import React, { useState } from 'react';
import { Send } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all fields');
      return;
    }
    
    console.log('Form submitted:', formData);
    alert('Thank you for your feedback! We\'ll get back to you soon.');
    
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-green-200 min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-green-100 p-3 rounded-lg mr-3">
              <Send className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-green-900">
              Got Feedback or Need Help?
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Have something to say? Tell us how we can help or what you think about our service.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-6">
            {/* Name Input */}
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200 text-gray-700 placeholder-gray-400"
              />
            </div>

            {/* Email Input */}
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200 text-gray-700 placeholder-gray-400"
              />
            </div>

            {/* Message Textarea */}
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Feedback or Help Request..."
                rows={6}
                className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200 text-gray-700 placeholder-gray-400 resize-vertical"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Send className="w-5 h-5 text-white" />
              <span>Submit Feedback</span>
            </button>
          </div>
        </div>

        {/* Additional Contact Info */}
        <div className="mt-8 text-center">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Other Ways to Reach Us</h3>
            <div className="space-y-2 text-gray-600">
              <div>📧 Email: support@ecoscan.app</div>
              <div>📞 Phone: +1 (555) 012-3456</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
