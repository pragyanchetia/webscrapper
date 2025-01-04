"use client";

import { FormEvent, Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { addUserEmailToProduct } from "@/lib/actions";

interface Props {
  productId: string;
  checkUser: boolean;
}

const Modal = ({ productId, checkUser }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      await addUserEmailToProduct(productId);
      closeModal();
      alert("Item Tracked!");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openModal = () => {
    if (checkUser) {
      setIsOpen(true);
    } else alert("No user Found!");
  };
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button type="button" className="btn" onClick={openModal}>
        Track
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" onClose={closeModal} className="dialog-container">
          <Dialog.Panel>
            <div className="min-h-screen px-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0" />
              </Transition.Child>
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              />

              <Transition.Child
                as={Fragment}
                enter="eae-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="dialog-content">
                  <div className="dialog-content">
                    <div className="flex flex-col">
                      <div className="flex justify-between">
                        <div className="p-3 border border-gray-200 rounded-10">
                          <Image
                            src="/assets/icons/priceTag.svg"
                            alt="price-tag"
                            width={28}
                            height={28}
                          />
                        </div>

                        <Image
                          src="/assets/icons/close.svg"
                          alt="close"
                          width={26}
                          height={26}
                          className="cursor-pointer hover:scale-110 duration-300 transform"
                          onClick={closeModal}
                        />
                      </div>
                      <h3>
                        Stay updated with product pricing alerts right in your
                        inbox!
                      </h3>
                      <p>You can untrack the product at any time</p>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                      <button
                        className="dialog-btn hover:bg-slate-800"
                        type="button"
                        onClick={handleSubmit}
                      >
                        {isSubmitting ? "Tracking..." : "Are You Sure!"}
                      </button>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog.Panel>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
