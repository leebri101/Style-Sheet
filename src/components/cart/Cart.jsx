"use client"

import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Dialog, Transition, DialogPanel } from "@headlessui/react";
import { ShoppingCart, Trash2, Plus, Minus, X } from "lucide-react";
import { 
  removeFromCart, 
  updateQuantity, 
  clearCart, 
  closeCart, 
  selectCartIsOpen, 
  selectCartTotalAmount, 
  selectCartItems 
} from "../../store/cartSlice.js";
import "./Cart.css";

const Cart = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)
  const totalAmount = useSelector(selectCartTotalAmount)
  const isOpen = useSelector(selectCartIsOpen)

  const handleRemoveItem = (item) => {
    dispatch(
      removeFromCart({
        id: item.id,
        size: item.size,
        color: item.color,
      }),
    )
  }

  const handleUpdateQuantity = (item, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(item)
    } else {
      dispatch(
        updateQuantity({
          id: item.id,
          size: item.size,
          color: item.color,
          quantity: newQuantity,
        }),
      )
    }
  }

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      dispatch(clearCart())
    }
  }

  const handleCheckout = () => {
    alert("Checkout functionality coming soon!")
  }

  const handleCloseCart = () => {
    dispatch(closeCart())
  }

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleCloseCart}>
        <Transition
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog className="text-lg font-medium text-gray-900">
                          Shopping Cart ({cartItems.length})
                        </Dialog>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500 transition-colors"
                            onClick={handleCloseCart}
                          >
                            <span className="sr-only">Close panel</span>
                            <X className="h-6 w-6" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        {cartItems.length === 0 ? (
                          <div className="flex flex-col items-center justify-center py-12">
                            <ShoppingCart className="h-12 w-12 text-gray-400 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                            <p className="text-gray-500 text-center mb-6">Add some products to get started!</p>
                            <Link
                              to="/"
                              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                              onClick={handleCloseCart}
                            >
                              Continue Shopping
                            </Link>
                          </div>
                        ) : (
                          <div className="flow-root">
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                              {cartItems.map((item) => (
                                <li key={`${item.id}-${item.size || 'default'}-${item.color || 'default'}`} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={item.image || "/placeholder.svg?height=96&width=96"}
                                      alt={item.name}
                                      className="h-full w-full object-cover object-center"
                                      onError={(e) => {
                                        e.target.src = "/placeholder.svg?height=96&width=96";
                                      }}
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3 className="truncate pr-2">{item.name}</h3>
                                        <p className="ml-4">£{(item.price * item.quantity).toFixed(2)}</p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">
                                        {item.size && `Size: ${item.size}`}
                                        {item.size && item.color && " | "}
                                        {item.color && `Color: ${item.color}`}
                                      </p>
                                      <p className="mt-1 text-sm text-gray-600">
                                        £{item.price.toFixed(2)} each
                                      </p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className="flex items-center space-x-2">
                                        <button
                                          className="p-1 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                          onClick={() => handleUpdateQuantity(item, item.quantity - 1)}
                                          disabled={item.quantity <= 1}
                                        >
                                          <Minus size={16} />
                                        </button>
                                        <span className="mx-2 min-w-[2rem] text-center font-medium">
                                          {item.quantity}
                                        </span>
                                        <button
                                          className="p-1 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
                                          onClick={() => handleUpdateQuantity(item, item.quantity + 1)}
                                        >
                                          <Plus size={16} />
                                        </button>
                                      </div>

                                      <div className="flex">
                                        <button
                                          type="button"
                                          className="font-medium text-red-600 hover:text-red-500 flex items-center space-x-1 transition-colors"
                                          onClick={() => handleRemoveItem(item)}
                                        >
                                          <Trash2 size={16} />
                                          <span>Remove</span>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>

                    {cartItems.length > 0 && (
                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>£{totalAmount.toFixed(2)}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                        <div className="mt-6">
                          <button
                            onClick={handleCheckout}
                            className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                          >
                            Checkout
                          </button>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            or{" "}
                            <Link
                              to="/"
                              className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                              onClick={handleCloseCart}
                            >
                              Continue Shopping
                            </Link>
                          </p>
                        </div>
                        <div className="mt-4">
                          <button
                            onClick={handleClearCart}
                            className="w-full flex justify-center items-center px-6 py-2 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                          >
                            Clear Cart
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </DialogPanel>
              </Transition>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Cart