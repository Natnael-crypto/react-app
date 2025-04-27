import { Route,Router,Routes } from "react-router-dom"


const AppRouter = ()=>{


    return(
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </Router>
        </div>
    )
}

export default AppRouter