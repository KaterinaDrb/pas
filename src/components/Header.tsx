'use client';
import React from 'react';
import Button from './Button';
import { IoMdArrowBack } from 'react-icons/io';

const Header = () => {
  return (
    <header className="border-b border-secondary-1 p-4">
      <div className="flex items-center gap-4 max-w-7xl mx-auto ">
        <Button
          label="Назад"
          variant="outline"
          link="/dashboard"
          startIcon={<IoMdArrowBack />}
          className="border-0"
        />
        <span className="font-semibold text-lg">КП Конструктор</span>
      </div>
    </header>
  );
};

export default Header;
