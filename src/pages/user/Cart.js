/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/auth/authContext";

const Cart = () => {
  const authContext = useContext(AuthContext);

  const { userToken } = authContext;
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:44307/api/carts/usercart", {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => setCartItems(response.data))
      .catch((error) => console.log(error));
  }, [userToken]);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="p-4">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Quantity
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Edit
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr
                    key={item.id}
                    className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                    >
                      {item.itemName}
                    </th>
                    <td className="px-6 py-4">{item.itemQuantity}</td>
                    <td className="px-6 py-4">$ {item.cost}</td>
                    <td className="px-6 py-4">
                      $ {item.cost * item.itemQuantity}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <a
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
