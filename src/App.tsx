import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import "./App.css";
import db from "./firebase";

const Dot = ({ color }: { color: string }) => {
  const style = {
    height: 25,
    width: 25,
    display: "inline-block",
    backgroundColor: color,
  };

  return <span style={style} />;
};

const Color = ({ name, color }: Colors) => {
  return (
    <li>
      <button>edit</button>
      <Dot color={color} />
      <span>{name}</span>
      <button>del</button>
    </li>
  );
};

interface Colors {
  id: string;
  name: string;
  color: string;
}

function App() {
  const [colors, setColors] = useState<Colors[]>();

  useEffect(() => {
    onSnapshot(collection(db, "colors"), (snapshot) => {
      setColors(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Colors[]
      );
    });
  }, []);

  return (
    <div className="App">
      <div className="box">
        <label htmlFor="">name</label>
        <input type="text" />
      </div>
      <div className="box">
        <label htmlFor="">color</label>
        <input type="text" />
      </div>
      <ul>
        {colors?.map((color) => (
          <Color key={color.id} {...color} />
        ))}
      </ul>
    </div>
  );
}

export default App;
