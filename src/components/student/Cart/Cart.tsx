import React, { useEffect, useState } from "react";
import { loadStripe } from '@stripe/stripe-js'

import { deleteFromCartAPI, fetchCartAPI, makePaymentAPI } from "@/api/studentAPI/studentAPI";
import ConfirmActionDialog from "@/components/ui/ConfirmationBox";

interface Category {
  name: string;
}

interface Course {
  _id: string;
  title: string;
  price: number;
  thumbnailUrl: string;
  color: string;
  size: string;
  category: Category;
}

interface Cart {
  courseId: Course;
}

const Cart: React.FC = () => {
  const [discount, setDiscount] = useState(0);
  const [cartDetails, setCartDetails] = useState<Cart[]>([]);

  const subtotal = cartDetails.reduce(
    (sum, product) => sum + product.courseId.price,
    0
  );
  const total = subtotal - discount;

  useEffect(() => {
    const fetchCartDetails = async () => {
      try {
        const response = await fetchCartAPI();
        setCartDetails(response?.data.items);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    fetchCartDetails();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteFromCartAPI(id);
      setCartDetails(response?.data.items);
    } catch (error) {

    }
  };

  const makePayment = async (cartDetails: object) => {
    try {
      const stripe_key = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
      const stripe = await loadStripe(stripe_key);
      const response  = await makePaymentAPI(cartDetails)
      const result = stripe?.redirectToCheckout({
        sessionId: response.session.id,
      });
    } catch (error) {
      console.error("Payment failed:", error);
    }
  }

  return (
    <div className="container mx-auto p-4 font-sans">
      <h1 className="text-2xl font-bold mb-4">Shopping Bag</h1>
      <p className="mb-4">{cartDetails.length} items in your bag.</p>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3">
          <div className="bg-white rounded-lg shadow-md p-6">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left pb-4">Product</th>
                  <th className="text-right pb-4">Price</th>
                  <th className="text-right pb-4">Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartDetails.map((product) => (
                  <tr
                    key={product.courseId._id}
                    className="border-b last:border-b-0"
                  >
                    <td className="py-4">
                      <div className="flex items-center">
                        <img
                          src={product.courseId.thumbnailUrl}
                          alt={product.courseId.title}
                          className="w-40 h-24 object-cover rounded mr-4"
                        />
                        <div>
                          <p className="text-sm text-gray-500">
                            {product.courseId.category.name}
                          </p>
                          <h3 className="font-semibold">
                            {product.courseId.title}
                          </h3>
                        </div>
                      </div>
                    </td>
                    <td className="text-right text-orange-400 font-semibold">
                      ₹{product.courseId.price}
                    </td>
                    <td>
                      <div className="flex justify-end">
                        <ConfirmActionDialog
                          onConfirm={() => handleDelete(product.courseId._id)}
                          triggerElement={{
                            type: "icon",
                            content: "",
                            iconName: "Trash2",
                          }}
                          title="Remove Course"
                          description="Are you sure you want to remove this course from cart?"
                          confirmText="Delete"
                          cancelText="Cancel"
                          variant="destructive"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="w-full md:w-1/3">
          <div className="bg-white shadow-md rounded-lg mb-4">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Coupon Code</h3>
              <p className="text-sm text-gray-500 mb-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <input
                placeholder="Coupon Code"
                className="w-full p-2 mb-2 border rounded-md"
              />
              <button className="w-full bg-black text-white p-2 rounded-md hover:bg-opacity-90">
                Apply
              </button>
            </div>
          </div>

          <div className="bg-yellow-100 rounded-lg shadow-md">
            <div className="p-6">
              <div className="flex justify-between mb-2">
                <span>Cart Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Coupon</span>
                <span>₹0</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Discount</span>
                <span>-₹{discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Cart Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <button 
                onClick={() => makePayment(cartDetails)}
                className="w-full bg-white text-black p-2 rounded-md mt-4 hover:bg-gray-100">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
