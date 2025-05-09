'use client'
import React, { useState } from 'react'
import { Database, Code, BarChart3, Users, ArrowRight, MessageSquare, FileCode } from "lucide-react";
import BaseLayout from "../components/common/BaseLayout";

const AboutPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        role: '',
        message: ''
      });
      
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    }, 1000);
  };

  return (
    <BaseLayout>
      <div className="mx-auto px-4 py-18">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            About DataMind AI
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We're simplifying database interaction through natural language processing and visual analytics.
          </p>
        </div>

        {/* Our Mission */}
        <div className="mb-20">
          <div className="flex items-center mb-6">
            <Users className="h-8 w-8 text-blue-500 mr-3" />
            <h2 className="text-3xl font-semibold text-white">Our Mission</h2>
          </div>
          <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 md:p-8">
            <p className="text-gray-300 leading-relaxed">
              At DataMind AI, we believe that data should be accessible to everyone, regardless of their technical expertise. Our mission is to bridge the gap between natural language and database operations, making data analysis intuitive and efficient for developers, analysts, and business users alike.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-20">
          <div className="flex items-center mb-10">
            <Database className="h-8 w-8 text-blue-500 mr-3" />
            <h2 className="text-3xl font-semibold text-white">Why Choose DataMind AI</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">Accuracy</h3>
              <p className="text-gray-300">
                Our AI models are trained on millions of database queries to ensure precise and efficient query generation.
              </p>
            </div>
            <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">Versatility</h3>
              <p className="text-gray-300">
                Support for both SQL and MongoDB, with plans to expand to more database systems in the future.
              </p>
            </div>
            <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">Integration</h3>
              <p className="text-gray-300">
                Easy integration with your existing workflows through our API and developer tools.
              </p>
            </div>
          </div>
        </div>

        {/* Request Demo Form */}
        <div className="mb-20">
          <div className="flex items-center mb-10">
            <MessageSquare className="h-8 w-8 text-blue-500 mr-3" />
            <h2 className="text-3xl font-semibold text-white">Request a Demo</h2>
          </div>
          
          <div className="bg-gray-800 bg-opacity-50 rounded-lg p-8 md:p-10">
            <div className="mx-auto">
              <p className="text-gray-300 mb-6">
                Ready to see how DataMind AI can transform your data interaction experience? Fill out the form below, and our team will reach out to schedule a personalized demo.
              </p>
              
              {submitSuccess ? (
                <div className="bg-green-500 bg-opacity-20 border border-green-500 text-green-400 rounded-lg p-4 mb-6">
                  Thank you for your interest! We'll contact you shortly to schedule your demo.
                </div>
              ) : null}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="johndoe@example.com"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Company Name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-2">
                      Job Role
                    </label>
                    <select
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select your role</option>
                      <option value="developer">Developer</option>
                      <option value="data_scientist">Data Scientist</option>
                      <option value="business_analyst">Business Analyst</option>
                      <option value="executive">Executive</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tell us about your specific needs or questions"
                  ></textarea>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200 disabled:opacity-70"
                  >
                    {isSubmitting ? 'Submitting...' : 'Request Demo'}
                    {!isSubmitting && <ArrowRight className="ml-2 h-5 w-5" />}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}

export default AboutPage