import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React, { useEffect } from 'react';
import './App.css';
import AppRouter from './components/AppRouter';
import Navbar from './components/Navbar';
import { useActions } from './hooks/useActions';
import { IUser } from './models/IUser';

function App() {
    const { setIsAuth, setUser } = useActions();

    useEffect(() => {
        if (localStorage.getItem('auth')) {
            setUser({ username: localStorage.getItem('username') } as IUser);
            setIsAuth(true);
        }
    }, []);

    return (
        <Layout className="App">
            <Navbar />
            <Content>
                <AppRouter />
            </Content>
        </Layout>
    );
}

export default App;
