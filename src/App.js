import { useState } from "react";
import Header from "./components/Header/Header";
import Home from "./components/Pages/Home/Home";
import Quiz from "./components/Pages/Quiz/Quiz";
import Result from "./components/Pages/Result/Result";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [question, setQuestion] = useState();
  const [score, setScore] = useState(0);

  const fetchQuestions = async (category = "", difficulty = "") => {
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=10${
        category && `&category=${category}`
      }${difficulty && `&difficulty=${difficulty}`}&type=multiple`
    );
    setQuestion(data.results);
  };

  return (
    <Router>
      <div className="App" style={{ backgroundImage: "url(./ques1.png)" }}>
        <Header />
        <Switch>
          <Route path="/" exact>
            <Home
              name={name}
              setName={setName}
              fetchQuestions={fetchQuestions}
            />
          </Route>
          <Route path="/quiz" exact>
            <Quiz
              name={name}
              question={question}
              setQuestion={setQuestion}
              score={score}
              setScore={setScore}
            />
          </Route>
          <Route path="/result" exact>
            <Result name={name} score={score} />
          </Route>
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
