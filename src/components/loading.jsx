import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import QuestionsData from "../data/questions.js";

function Loading() {
  return (
    <div
      style={{
        display: "flex",
        color: "#FEFEFE",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <FontAwesomeIcon
        icon={
          QuestionsData[Math.floor(Math.random() * QuestionsData.length)]
            .choices.right.icon
        }
        style={{ fontSize: "96px" }}
      />
      <p style={{ fontStyle: "italic", fontSize: "40px" }}>Cargando...</p>
    </div>
  );
}

export default Loading;
