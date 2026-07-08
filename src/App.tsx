import { HashRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { AppStateProvider } from './lib/state'
import { Home } from './pages/Home'
import { Library } from './pages/Library'
import { CardDetail } from './pages/CardDetail'
import { Study } from './pages/Study'
import { Test } from './pages/Test'
import { Storyboard } from './pages/Storyboard'
import { StoryPlayer } from './pages/StoryPlayer'
import { Drills } from './pages/Drills'
import { LabLayout } from './pages/lab/components'
import { LabLearn, LabLessonDetail } from './pages/lab/LabLearn'
import { LabRecipes } from './pages/lab/LabRecipes'
import { LabBuilder } from './pages/lab/LabBuilder'
import { LabQuiz } from './pages/lab/LabQuiz'
import { LabLog } from './pages/lab/LabLog'
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
            <Route path="/storyboard" element={<Storyboard />} />
            <Route path="/storyboard/:storyId" element={<StoryPlayer />} />
            <Route path="/drills" element={<Drills />} />
            <Route path="/lab" element={<LabLayout />}>
              <Route index element={<LabLearn />} />
              <Route path="learn/:lessonId" element={<LabLessonDetail />} />
              <Route path="recipes" element={<LabRecipes />} />
              <Route path="builder" element={<LabBuilder />} />
              <Route path="quiz" element={<LabQuiz />} />
              <Route path="log" element={<LabLog />} />
            </Route>
            <Route path="/progress" element={<Progress />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </HashRouter>
    </AppStateProvider>
  )
}
