import React, { useState } from "react";
import { AlertIcon } from "../assets/svg";
import { Button } from "./Button";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../utils/localStorage";
import { useNotification } from "../contexts";

const DeleteModal: React.FC<{
  isOpen: boolean;
  onClose: (value: React.SetStateAction<boolean>) => void;
  onDelete: (id: number) => void;
  id: number;
}> = ({ isOpen, onClose, id, onDelete }) => {
  const [loading, setLoading] = useState(false);
  const { notify } = useNotification();

  const handleDelete = async () => {
    setLoading(true);
    try {
      // the response is not going to be okay because there's no database yet.
      // const res = await fetch(`/api/products/${id}`, {
      //   method: 'DELETE',
      // });

      // if (!res.ok) {
      //   throw new Error('Failed to delete product');
      // }

      // Simulate an API call delay with setTimeout
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Call the onDelete function passed as a prop to delete in real time
      onDelete(id);

      // Update localStorage after deletion
      const currentProducts = loadFromLocalStorage() || [];
      const updatedProducts = currentProducts.filter(
        (product: any) => product.id !== id
      );
      saveToLocalStorage(updatedProducts);

      // Simulate a delay for notifying the user
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Notify the user of success
      notify("Product deleted successfully", "success");
      // Simulate a delay for closing the modal
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // Close the modal
      onClose(false);
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50`}>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-md"
        onClick={() => onClose(false)}
      ></div>
      <div className="z-10 bg-white rounded-lg flex flex-col justify-center items-center w-full max-w-[500px] h-fit pt-5 mx-4">
        <div className="flex justify-center items-center w-[100px] h-[100px] mx-auto border-[16px] border-red-50 rounded-full bg-red-100 p-5">
          <AlertIcon className="w-[50px] h-[50px]" />
        </div>
        <div className="my-5">
          <h2 className="text-center text-2xl font-medium text-[#1F1D22]">
            Delete Product
          </h2>
          <p className="text-center text-sm text-[#555459]">
            Are you sure you want to delete this product?
          </p>
        </div>
        <div className="flex justify-between py-5 px-8 w-full border-t border-[#F0F0F0]">
          <Button variant="outlined" onClick={() => onClose(false)}>
            Cancel
          </Button>
          <Button variant="primary" loading={loading} onClick={handleDelete}>
            Yes, Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
