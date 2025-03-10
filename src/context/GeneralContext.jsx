import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const GeneralContext = React.createContext();

const GeneralContextProvider = ({ children }) => {
    const [topNews, setTopNews] = useState([]);
    const [businessNews, setBusinessNews] = useState([]);
    const [technologyNews, setTechnologyNews] = useState([]);
    const [politicsNews, setPoliticsNews] = useState([]);

    const API_KEY = process.env.REACT_APP_NEWS_API_KEY;

    useEffect(() => { 
        fetchTopNews(); 
        fetchBusinessNews();
        fetchPoliticsNews();
        fetchTechnologyNews();
    }, []);

    const fetchNews = async (query, setter) => {
        try {
            const response = await axios.get(`https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`);
            setter(response.data.articles || []);
        } catch (error) {
            console.error(`Error fetching ${query} news:`, error);
        }
    };

    const fetchTopNews = () => fetchNews("popular", setTopNews);
    const fetchBusinessNews = () => fetchNews("business", setBusinessNews);
    const fetchPoliticsNews = () => fetchNews("politics", setPoliticsNews);
    const fetchTechnologyNews = () => fetchNews("technology", setTechnologyNews);

    return (
        <GeneralContext.Provider value={{ topNews, businessNews, technologyNews, politicsNews }}>
            {children}
        </GeneralContext.Provider>
    );
};

export default GeneralContextProvider;
