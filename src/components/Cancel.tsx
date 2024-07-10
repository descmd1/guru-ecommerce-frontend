import React, { useEffect } from 'react';
import Swal from 'sweetalert2';

const Cancel = () => {
  useEffect(() => {
    Swal.fire({
      icon: 'error',
      title: 'Payment Cancelled',
      text: 'Your payment was cancelled. Please try again.',
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Payment Cancelled</h1>
      <p>Your payment was cancelled. Please try again.</p>
    </div>
  );
};

export default Cancel;
