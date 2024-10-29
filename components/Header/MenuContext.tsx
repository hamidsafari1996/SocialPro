// context/MenuContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

interface MenuContextProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

export const MenuContext = createContext<MenuContextProps>({
  isOpen: false,
  toggleMenu: () => {},
});

export const MenuProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <MenuContext.Provider value={{ isOpen, toggleMenu }}>
      {children}
    </MenuContext.Provider>
  );
};
