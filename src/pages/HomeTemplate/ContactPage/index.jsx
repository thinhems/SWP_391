import React from 'react';
import ContactHeader from './ContactHeader';
import ContactInfo from './ContactInfo';
import ContactForm from './ContactForm';
import ContactMap from './ContactMap';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50">
      <ContactHeader />
      <ContactInfo />
      <ContactForm />
      <ContactMap />
    </div>
  );
}
