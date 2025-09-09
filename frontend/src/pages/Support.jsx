import React, { useState } from 'react';
import PaymentSuccessModal from '../components/PaymentSuccessModal';

export default function Support() {
  const [openIndex, setOpenIndex] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: 'Can I donate via check to the OKCC?',
      answer:
        'Yes. Please make checks payable to Orlando Korean Cultural Center and mail to: 7000 Winegard Rd, Orlando, FL 32809. Include your email to receive a receipt.',
    },
    {
      question: 'Can my company sponsor the OKCC?',
      answer:
        'Yes! We welcome corporate sponsorships to help support our cultural programs, events, and community outreach. Sponsoring the Orlando Korea Culture Center is a great way to promote your business while supporting Korean culture in our community. For more details on sponsorship opportunities, please contact us at sponsorship@okcenter.com.',
    },
    {
      question: 'Do I get a receipt?',
      answer:
        "Yes, we'll send a receipt to the email address you provide when donating. The receipt will include your donation details, such as the date, amount, and any beneficiary information.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      {/* Hero */}
      <section className="text-center mb-20">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">Support the OKCC</h1>
        <p className="text-base md:text-xl text-gray-800 font-semibold mb-4">
          Thank you for considering supporting the Orlando Korean Cultural Center!
        </p>
        <p className="text-gray-600 max-w-4xl mx-auto text-lg md:text-xl leading-8">
          By making a donation to the OKCC, you support our efforts in maintaining the organization as
          well as allow us to continue providing cultural programs, language classes, and community
          events that celebrate and preserve Korean heritage in Central Florida.
        </p>
                 <button className="mt-8 px-8 py-3 bg-red-700 hover:bg-red-800 text-white rounded text-lg">
           Donate
         </button>
      </section>

      {/* Impact grid */}
      <section className="mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {[
            { title: 'Education' },
            { title: 'Travel Opportunities' },
            { title: 'Events' },
            { title: 'Outreach' },
          ].map((item, idx) => (
            <div key={idx} className="grid grid-cols-[192px_1fr] md:grid-cols-[224px_1fr] gap-8 items-start">
              <div className="w-48 h-48 md:w-56 md:h-56 bg-gray-300 rounded" />
              <div className="space-y-3">
                <h3 className="font-semibold text-2xl">{item.title}</h3>
                <p className="text-lg text-gray-700">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                  labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-red-800 mb-10">
          Frequently Asked Questions
        </h2>

        {faqs.map((faq, index) => (
          <div key={index} className="border-t border-black py-6">
            <button
              onClick={() => toggleFAQ(index)}
              className="flex justify-between items-center w-full font-semibold text-left"
            >
              <span className="text-xl md:text-2xl">{faq.question}</span>
              <span className="text-2xl md:text-3xl">{openIndex === index ? '−' : '+'}</span>
            </button>
            {openIndex === index && (
              <p className="mt-3 text-lg md:text-xl text-gray-700 leading-8">{faq.answer || 'Answer coming soon.'}</p>
            )}
          </div>
        ))}
                 <div className="border-t border-black" />
       </section>
       
       {/* Test Modal Button */}
       <div className="text-center mt-12">
         <button 
           onClick={() => setShowPaymentModal(true)}
           className="px-8 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded text-lg"
         >
           Test Payment Success Modal
         </button>
       </div>
       
       {/* Payment Success Modal */}
       <PaymentSuccessModal 
         isOpen={showPaymentModal} 
         onClose={() => setShowPaymentModal(false)} 
       />
     </div>
   );
 }
