import { useState } from "react";
import { Button, MenuItem, TextField } from "@material-ui/core";
import Category from "../../../Data/Category";
import "./Home.css";
import { useHistory } from "react-router";
import ErrorMessage from "../../ErrorMessage/ErrorMesage";

const Home = ({ name, setName, fetchQuestions }) => {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [error, setError] = useState(false);

  const history = useHistory();

  const handleSubmit = (e) => {
    // e.preventDefault();
    if (!category || !difficulty || !name) {
      setError(true);
      return;
    } else {
      setError(false);
      fetchQuestions(category, difficulty);
      history.push("/quiz");
    }
  };

  return (
    <div className="content">
      <div className="settings">
        <span style={{ fontSize: 30 }}>Quiz Settings</span>
        <div className="settings_select">
          {error && <ErrorMessage>Please fill all the fields</ErrorMessage>}

          <TextField
            style={{ marginBottom: 25 }}
            label="Enter Your Name"
            variant="outlined"
            vaule={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />

          <TextField
            select
            style={{ marginBottom: 30 }}
            label="Select Category"
            variant="outlined"
            value={category}
            onClick={(e) => setCategory(e.target.value)}
          >
            {Category.map((cat) => (
              <MenuItem key={cat.category} value={cat.value}>
                {cat.category}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            style={{ marginBottom: 30 }}
            label="Select Difficulty"
            variant="outlined"
            value={difficulty}
            onClick={(e) => setDifficulty(e.target.value)}
          >
            <MenuItem key="Easy" value="easy">
              Easy
            </MenuItem>
            <MenuItem key="Medium" value="medium">
              Medium
            </MenuItem>
            <MenuItem key="Hard" value="hard">
              Hard
            </MenuItem>
          </TextField>

          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSubmit}
          >
            Start Quiz
          </Button>
        </div>
      </div>

      <img src="/quiz2.svg" className="banner" alt="quiz img" />
    </div>
  );
};

export default Home;
