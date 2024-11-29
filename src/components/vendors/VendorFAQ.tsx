import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  // Getting Started
  {
    category: 'Getting Started',
    question: 'How do I create a vendor account?',
    answer: 'Creating a vendor account is simple. Click on "List Your Business" at the top of the page, fill in your business details, and follow the verification process.'
  },
  {
    category: 'Getting Started',
    question: 'What documents do I need to register?',
    answer: "You will need your business license, tax ID, proof of insurance, and any relevant certifications for your industry."
  },
  {
    category: 'Getting Started',
    question: 'How long does verification take?',
    answer: "Verification typically takes 24-48 hours. We will notify you via email once your account is approved."
  },
  {
    category: 'Getting Started',
    question: 'What are the requirements to become a vendor?',
    answer: "You must have a registered business, valid insurance, and meet our quality standards. Additional requirements vary by service type."
  },

  // Pricing & Payments
  {
    category: 'Pricing & Payments',
    question: 'What are your commission rates?',
    answer: 'Our standard commission is 15% per booking. Premium vendors with high ratings enjoy reduced rates.'
  },
  {
    category: 'Pricing & Payments',
    question: 'When do I receive payment for bookings?',
    answer: 'Payments are processed within 24 hours after service completion and transferred to your account within 3-5 business days.'
  },
  {
    category: 'Pricing & Payments',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, bank transfers, and digital wallets for vendor payouts.'
  },

  // Managing Listings
  {
    category: 'Managing Listings',
    question: 'How many services can I list?',
    answer: 'Free accounts can list up to 3 services. Premium vendors can list unlimited services.'
  },
  {
    category: 'Managing Listings',
    question: 'Can I set custom availability?',
    answer: 'Yes, you can set specific availability hours, blackout dates, and buffer times between bookings.'
  },
  {
    category: 'Managing Listings',
    question: 'How do I update my pricing?',
    answer: 'You can update pricing anytime through your vendor dashboard. Changes apply to new bookings only.'
  },

  // Bookings & Calendar
  {
    category: 'Bookings & Calendar',
    question: 'How do I manage my bookings?',
    answer: 'Use the vendor dashboard to view, accept, or decline bookings. You can also message clients directly.'
  },
  {
    category: 'Bookings & Calendar',
    question: 'Can I sync my external calendar?',
    answer: 'Yes, we support integration with Google Calendar, iCal, and other major calendar services.'
  },
  {
    category: 'Bookings & Calendar',
    question: 'What is your cancellation policy?',
    answer: 'You can set your own cancellation policy within our guidelines. Standard options are flexible, moderate, or strict.'
  },

  // Reviews & Ratings
  {
    category: 'Reviews & Ratings',
    question: 'How does the rating system work?',
    answer: 'Clients rate services on a 5-star scale across multiple categories. Ratings affect your visibility and booking potential.'
  },
  {
    category: 'Reviews & Ratings',
    question: 'Can I respond to reviews?',
    answer: 'Yes, you can publicly respond to any review once within 30 days of posting.'
  },
  {
    category: 'Reviews & Ratings',
    question: 'How do I improve my rating?',
    answer: 'Focus on communication, reliability, and service quality. We provide detailed analytics to help identify areas for improvement.'
  }
  // ... Add more FAQs as needed
];

const VendorFAQ: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Getting Started');
  const [openQuestions, setOpenQuestions] = useState<Set<string>>(new Set());

  const categories = Array.from(new Set(faqs.map(faq => faq.category)));

  const toggleQuestion = (question: string) => {
    const newOpenQuestions = new Set(openQuestions);
    if (newOpenQuestions.has(question)) {
      newOpenQuestions.delete(question);
    } else {
      newOpenQuestions.add(question);
    }
    setOpenQuestions(newOpenQuestions);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg text-gray-600">
            Everything you need to know about becoming a vendor
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex overflow-x-auto scrollbar-hide space-x-4 mb-8 pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === category
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs
            .filter(faq => faq.category === activeCategory)
            .map((faq) => (
              <div
                key={faq.question}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => toggleQuestion(faq.question)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
                >
                  <span className="text-gray-900 font-medium">{faq.question}</span>
                  <ChevronDownIcon
                    className={`h-5 w-5 text-gray-500 transition-transform ${
                      openQuestions.has(faq.question) ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {openQuestions.has(faq.question) && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default VendorFAQ; 