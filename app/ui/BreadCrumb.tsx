import React from 'react';
import Link from 'next/link';
import { BreadcrumbProps } from '../definitions/types';

const Breadcrumb: React.FC<BreadcrumbProps> = ({ links }) => {
  return (
    <nav aria-label="breadcrumb" className='h-16 container mx-auto flex items-center border-b px-4'>
      <ol className="flex items-center">
        {links.map((link, index) => (
          <li key={index} className="flex items-center text-xs sm:text-sm font-semibold">
            <Link href={link.url} className='text-paragraph hover:text-primary-300 transition duration-200'>
              {link.label}
            </Link>
            {index < links.length - 1 && (
              <span className="mx-1 text-paragraph">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
