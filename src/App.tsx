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
import { Tracks } from './pages/v2/Tracks'
import { TrackDetail } from './pages/v2/TrackDetail'
import { LessonPage } from './pages/v2/LessonPage'
import { Review } from './pages/v2/Review'
import { Glossary } from './pages/v2/Glossary'
import { ShipLog } from './pages/v2/ShipLog'
import { PromptBuilder } from './pages/v2/PromptBuilder'
import { ShotAnalyzer } from './pages/v2/ShotAnalyzer'
import { ShotList } from './pages/v2/ShotList'
import { Projects } from './pages/v2/Projects'
import { Practice } from './pages/v2/Practice'
import { More } from './pages/v2/More'

export default function App() {
  return (
    <AppStateProvider>
      {/* HashRouter keeps the app fully functional when served from a static file. */}
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            {/* v2 curriculum: real, URL-addressable pages per track and lesson. */}
            <Route path="/tracks" element={<Tracks />} />
            <Route path="/track/:trackId" element={<TrackDetail />} />
            <Route path="/lesson/:lessonId" element={<LessonPage />} />
            <Route path="/review" element={<Review />} />
            <Route path="/glossary" element={<Glossary />} />
            <Route path="/ship-log" element={<ShipLog />} />
            <Route path="/tools/prompt-builder" element={<PromptBuilder />} />
            <Route path="/tools/shot-analyzer" element={<ShotAnalyzer />} />
            <Route path="/tools/shot-list" element={<ShotList />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/more" element={<More />} />
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
