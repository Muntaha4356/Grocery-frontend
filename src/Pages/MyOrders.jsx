import React, { useEffect, useState } from 'react';
import { dummyOrders } from '../assets/greencart_assets/assets';

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    setMyOrders(dummyOrders);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-10">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        My Or
        <span className="underline decoration-[var(--color-primary-dull)] decoration-2">ders</span>
      </h2>

      {myOrders.map((order) => (
        <div key={order._id} className="border rounded-lg shadow-sm p-5 space-y-6 mb-8">
          {/* Order Metadata */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between text-sm text-gray-500">
            <p>Order ID: <span className="text-gray-700">{order._id}</span></p>
            <p>Payment: <span className="text-gray-700">{order.paymentType}</span></p>
            <p>Total Amount: <span className="text-gray-700">${order.amount}</span></p>
          </div>

          {/* Products */}
          {order.items.map((item, index) => (
            <div key={index} className="border-t pt-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              {/* Left: Image & Title */}
              <div className="flex gap-4">
                <img
                  src={item.product.image[0]}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded bg-gray-100"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{item.product.name}</h3>
                  <p className="text-sm text-gray-500">Category: {item.product.category}</p>
                </div>
              </div>

              {/* Right: Details */}
              <div className="sm:text-right text-sm text-gray-700">
                <p>Quantity: {item.quantity || '1'}</p>
                <p>Status: {order.status}</p>
                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                <p className="font-semibold text-green-600 mt-1">
                  Amount: ${item.product.offerPrice * item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MyOrders;

