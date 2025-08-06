import { lazy, useEffect, Suspense } from "react"
import { Routes, Route } from "react-router"
import { useDispatch } from "react-redux";

import RootLayout from "./pages/RootLayout"
import { autoLoginAction } from "./store/token.js";
import LoadingCard from "./Component/UI/LoadingCard.jsx";

const Home = lazy(() => import("./pages/Home"))
const Profile = lazy(() => import("./pages/Profile"))
const Auth = lazy(() => import("./pages/Auth"))
const NotFound = lazy(() => import("./Component/UI/NotFound.jsx"))

const SuspenseContainer = ({ children }) => {
  return <Suspense fallback={<LoadingCard />}>{children}</Suspense>
}

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(autoLoginAction())
  }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={<SuspenseContainer><RootLayout /></SuspenseContainer>}>
          <Route index element={<SuspenseContainer><Home /></SuspenseContainer>} />
          <Route path="auth" element={<SuspenseContainer><Auth /></SuspenseContainer>} />
          <Route path="profile/:userName" element={<Profile />} />
          <Route path="*" element={<SuspenseContainer><NotFound /></SuspenseContainer>} />
        </Route>
      </Routes>
    </>
  )
}

export default App