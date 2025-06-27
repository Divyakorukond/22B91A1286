import React, { createContext, useContext, useState, useEffect } from "react";

const UrlContext = createContext();

export const useUrlContext = () => useContext(UrlContext);

export const UrlProvider = ({ children }) => {
  const [urls, setUrls] = useState(() => {
    const saved = localStorage.getItem("urls");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("urls", JSON.stringify(urls));
  }, [urls]);

  const addUrl = (urlObj) => setUrls((prev) => [...prev, urlObj]);
  const updateUrl = (shortcode, updater) =>
    setUrls((prev) =>
      prev.map((u) => (u.shortcode === shortcode ? updater(u) : u))
    );

  return (
    <UrlContext.Provider value={{ urls, addUrl, updateUrl }}>
      {children}
    </UrlContext.Provider>
  );
};
  
  