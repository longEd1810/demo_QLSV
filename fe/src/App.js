import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import routes from '~/routes';

import DefaultLayout from './components/DefaultLayout';

function App() {
    let userRoutes;
    let role_symbol = Number(JSON.parse(localStorage.getItem('role_symbol')));

    switch (role_symbol) {
        case 1:
            userRoutes = routes.adminRoutes;
            break;
        case 2:
            userRoutes = routes.studentRoutes;
            break;
        case 3:
            userRoutes = routes.teacherRoutes;
            break;
        case 4:
            userRoutes = routes.department1Routes;
            break;
        case 5:
            userRoutes = routes.department2Routes;
            break;
        case 6:
            userRoutes = routes.department3Routes;
            break;
        default:
            userRoutes = routes.defaultRoutes;
    }
    return (
        <Router>
            <div className="App">
                <Routes>
                    {userRoutes.map((route, index) => {
                        const Page = route.component;
                        if (!route.defaultLayout) {
                            return <Route key={index} path={route.path} element={<Page />} />;
                        } else {
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <DefaultLayout>
                                            <Page />
                                        </DefaultLayout>
                                    }
                                />
                            );
                        }
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
