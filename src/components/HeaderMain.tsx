'use client';
import React from 'react';
import Image from 'next/image';
import { FaRegChartBar, FaRegUser, FaSearch } from 'react-icons/fa';
import { LuLogOut } from 'react-icons/lu';
import Button from './Button';

const HeaderMain = () => {
  return (
    <header className="bg-white border-b border-secondary-1 p-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Novacom" width={32} height={32} />
            <span className="font-semibold text-lg">КП Конструктор</span>
          </div>
          <div className="relative flex gap-2 items-center px-4 py-2">
            <FaSearch color="gray" />
            <input
              className="focus:outline-none"
              placeholder="Поиск по КП..."
            ></input>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button
            label="Аналитика"
            startIcon={<FaRegChartBar />}
            variant="ghost"
          />
          <Button
            label="Выйти"
            startIcon={<FaRegUser />}
            endIcon={<LuLogOut />}
            variant="ghost"
          />
        </div>
      </div>
    </header>
  );
};

export default HeaderMain;
