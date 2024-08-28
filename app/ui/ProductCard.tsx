"use client";
import Image from "next/image";
import React, { useState } from "react";
import { ProductCardProps } from "../definitions/types";
import { useRouter } from "next/navigation";
import DeleteModal from "./DeleteModal";
import { Button } from "./Button";
import { NotificationProvider } from "../contexts";

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  price,
  category,
  imageUrl,
  onDelete,
}) => {
  const { push } = useRouter();
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  return (
    <NotificationProvider>
      <div
        onClick={() => push(`/products/${id}`)}
        className="cursor-pointer bg-white hover:bg-[rgb(232,244,252)] transition duration-300 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.05),0px_-20px_40px_0px_rgba(0,0,0,0.05)] backdrop-blur-md rounded-lg p-5 gap-4 flex flex-col justify-between"
      >
        <div className="bg-gray-200 rounded-t-md">
          <Image
            src={imageUrl}
            alt={title}
            width={200}
            height={200}
            unoptimized
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
            className="w-full h-48 p-4 object-scale-down rounded-t-lg"
          />
        </div>
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold text-heading">{title}</h3>
          <p className="text-paragraph">{category}</p>
          <p className="text-primary-600 font-semibold">
            ${Number(price).toFixed(2)}
          </p>
        </div>
        <div className="mt-2 flex justify-between">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              push(`/products/edit/${id}`);
            }}
            variant="outlined"
            className="px-2 text-primary-500 font-semibold !text-sm shadow"
          >
            Edit
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setOpenDeleteModal(true);
            }}
            variant="outlined"
            className="px-2 text-red-500 font-semibold !text-sm shadow"
          >
            Delete
          </Button>
        </div>
      </div>
      <DeleteModal
        isOpen={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onDelete={onDelete}
        id={id}
      />
    </NotificationProvider>
  );
};

export default ProductCard;
