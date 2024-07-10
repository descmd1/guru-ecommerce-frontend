import React, { useEffect } from 'react';
import Swal from 'sweetalert2';

const Success = () => {
  useEffect(() => {
    Swal.fire({
      icon: 'success',
      title: 'Payment Successful',
      text: 'Thank you for your purchase!',
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Payment Successful</h1>
      <p>Thank you for your purchase!</p>
    </div>
  );
};

export default Success;
