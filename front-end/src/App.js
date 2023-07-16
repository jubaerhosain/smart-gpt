import ChatInput from "./components/ChatInput/ChatInput";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'regenerator-runtime/runtime';
import CreateBook from "./pages/createBook";
import './App.css';
import FileList from "./components/FileList/fileList";
import FileSystem from "./pages/FileSystem";
import Browse from "./pages/Browse/Browse";

function App() {
 
  return (
    // <div className="homepage">
    //   {/* <div className="header">
    //     <img src="/logo192.png" alt="smart-gpt" />
    //     <h1>SMART-GPT</h1>
    //   </div> */}
    //   <div className='content'>
      <Router>
        <Routes>
          <Route path="/" element={<ChatInput />} />
          <Route path="/create-book" element={<CreateBook />} />
          <Route path="/file-share" element={<Browse />} />
          <Route path="/file-list" element={<FileList />} />
          <Route path="*" element={<>Page does not exist</>} />
        </Routes>
      </Router>
    //   </div>
    // </div>
  );
}

export default App;
