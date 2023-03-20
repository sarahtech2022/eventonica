import "./App.css";
import Events from "./components/events";

function App() {
  return (
    <div className="App">
      <span id="titlespan">
        <h1 id="title">Techonica 2023 events</h1>
      </span>
      <img
        id="eventimg"
        src="https://thenounproject.com/api/private/icons/1430241/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0&token=gAAAAABkFOdC4gDh-7H7FpdH7CupvWItWMBgUmTUqMU6ouHYsM_MLKjIK_cN64bFnqu4uufzueOD0roe95yYmst1y8vMhtI2AQ%3D%3D"
      ></img>
      <Events />
    </div>
  );
}

export default App;
