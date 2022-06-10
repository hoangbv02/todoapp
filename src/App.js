import Header from "./Header";
import Content from "./Content";
import app from './App.module.css'
function App() {
  return (
    <div className={app.wrapper}>
        <Header />
        <Content btn={app.btn}/>
    </div>
  );
}

export default App;
