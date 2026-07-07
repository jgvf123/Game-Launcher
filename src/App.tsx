import { HashRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { AppStateProvider } from './lib/state'
import { Home } from './pages/Home'
import { Library } from './pages/Library'
import { CardDetail } from './pages/CardDetail'
import { Study } from './pages/Study'
import { Test } from './pages/Test'
import { Progress } from './pages/Progress'
import { Settings } from './pages/Settings'

export default function App() {
  return (
    <AppStateProvider>
      {/* HashRouter keeps the app fully functional when served from a static file. */}
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/library" element={<Library />} />
            <Route path="/library/:cardId" element={<CardDetail />} />
            <Route path="/study" element={<Study />} />
            <Route path="/test" element={<Test />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </HashRouter>
    </AppStateProvider>
  )
}
