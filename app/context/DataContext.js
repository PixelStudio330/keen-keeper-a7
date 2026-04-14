"use client";
import { createContext, useContext, useState, useEffect } from "react";
import initialFriends from "../../app/data/friends.json";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [friends, setFriends] = useState(initialFriends);
  const [interactions, setInteractions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("keeper_interactions");
    setInteractions(saved ? JSON.parse(saved) : []);
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800); 

    return () => clearTimeout(timer);
  }, []);

  const addInteraction = (friendId, friendName, type) => {
    const newEntry = {
      id: Date.now(),
      friendId,
      friendName,
      type,
      date: new Date().toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      }),
    };
    
    setInteractions((prev) => {
      const updated = [newEntry, ...prev];
      localStorage.setItem("keeper_interactions", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <DataContext.Provider value={{ friends, interactions, addInteraction, loading }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);