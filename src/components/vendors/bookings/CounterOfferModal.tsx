import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { PlusIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline';

interface CounterOfferItem {
  id: string;
  name: string;
  price: number;
  description?: string;
}

interface CounterOfferData {
  price: number;
  message: string;
  items: CounterOfferItem[];
}

interface CounterOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CounterOfferData) => void;
  bookingDetails: any;
}

const CounterOfferModal: React.FC<CounterOfferModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  bookingDetails
}) => {
  const [counterOffer, setCounterOffer] = useState<CounterOfferData>({
    price: bookingDetails.pricing.total,
    message: '',
    items: bookingDetails.selectedPackage.includes.map((item: string, index: number) => ({
      id: `existing-${index}`,
      name: item,
      price: 0,
      description: ''
    }))
  });

  const [newItem, setNewItem] = useState<Partial<CounterOfferItem>>({
    name: '',
    price: 0,
    description: ''
  });

  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  const addNewItem = () => {
    if (newItem.name) {
      setCounterOffer({
        ...counterOffer,
        items: [...counterOffer.items, {
          id: `new-${Date.now()}`,
          name: newItem.name,
          price: newItem.price || 0,
          description: newItem.description
        }]
      });
      setNewItem({ name: '', price: 0, description: '' });
    }
  };

  const removeItem = (id: string) => {
    setCounterOffer({
      ...counterOffer,
      items: counterOffer.items.filter(item => item.id !== id)
    });
  };

  const updateItem = (id: string, updates: Partial<CounterOfferItem>) => {
    setCounterOffer({
      ...counterOffer,
      items: counterOffer.items.map(item => 
        item.id === id ? { ...item, ...updates } : item
      )
    });
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium text-gray-900 mb-4"
                >
                  Send Counter Offer
                </Dialog.Title>

                <div className="space-y-6">
                  {/* Total Price */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Price
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                        $
                      </span>
                      <input
                        type="number"
                        value={counterOffer.price}
                        onChange={(e) => setCounterOffer({
                          ...counterOffer,
                          price: Number(e.target.value)
                        })}
                        className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Items List */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Package Items</h4>
                    <div className="space-y-3">
                      {counterOffer.items.map((item) => (
                        <div 
                          key={item.id}
                          className="flex items-start space-x-3 bg-gray-50 p-3 rounded-lg"
                        >
                          {editingItemId === item.id ? (
                            <div className="flex-1 space-y-2">
                              <input
                                type="text"
                                value={item.name}
                                onChange={(e) => updateItem(item.id, { name: e.target.value })}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Item name"
                              />
                              <input
                                type="number"
                                value={item.price}
                                onChange={(e) => updateItem(item.id, { price: Number(e.target.value) })}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Price"
                              />
                              <input
                                type="text"
                                value={item.description || ''}
                                onChange={(e) => updateItem(item.id, { description: e.target.value })}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Description (optional)"
                              />
                              <button
                                onClick={() => setEditingItemId(null)}
                                className="text-sm text-blue-600 hover:text-blue-700"
                              >
                                Save
                              </button>
                            </div>
                          ) : (
                            <>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">{item.name}</p>
                                {item.description && (
                                  <p className="text-sm text-gray-500">{item.description}</p>
                                )}
                                {item.price > 0 && (
                                  <p className="text-sm text-gray-600">${item.price}</p>
                                )}
                              </div>
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => setEditingItemId(item.id)}
                                  className="text-gray-400 hover:text-blue-500"
                                >
                                  <PencilIcon className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => removeItem(item.id)}
                                  className="text-gray-400 hover:text-red-500"
                                >
                                  <TrashIcon className="h-4 w-4" />
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Add New Item */}
                  <div className="border-t pt-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Add New Item</h4>
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={newItem.name}
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Item name"
                      />
                      <div className="flex space-x-2">
                        <input
                          type="number"
                          value={newItem.price}
                          onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Price (optional)"
                        />
                        <button
                          onClick={addNewItem}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center"
                        >
                          <PlusIcon className="h-4 w-4 mr-1" />
                          Add
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message to Client
                    </label>
                    <textarea
                      rows={4}
                      value={counterOffer.message}
                      onChange={(e) => setCounterOffer({
                        ...counterOffer,
                        message: e.target.value
                      })}
                      placeholder="Explain your counter offer..."
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
                    onClick={() => onSubmit(counterOffer)}
                  >
                    Send Counter Offer
                  </button>
                  <button
                    type="button"
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CounterOfferModal; 