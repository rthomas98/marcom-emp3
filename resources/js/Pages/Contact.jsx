import React from 'react';
import { Head } from '@inertiajs/react';
import MarcomLayout from '@/Layouts/MarcomLayout';

export default function Contact() {
  return (
    <MarcomLayout>
      <Head title="Contact Us | Marcom Empuls3" />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-heading font-bold text-port-gore">Contact Us</h1>
      </div>
    </MarcomLayout>
  );
}
