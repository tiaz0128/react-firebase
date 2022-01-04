import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
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

const Color = ({
  colorPros,
  handleEdit,
  handleDelete,
}: {
  colorPros: Colors;
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
}) => {
  const { id, name, color } = colorPros;
  return (
    <li>
      <button onClick={() => handleEdit(id)}>edit</button>
      <Dot color={color} />
      <span>{name}</span>
      <button onClick={() => handleDelete(id)}>del</button>
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

  const nameRef = useRef<HTMLInputElement>(null);
  const colorRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    onSnapshot(collection(db, "colors"), (snapshot) => {
      setColors(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Colors[]
      );
    });
  }, []);

  const handleCreate = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const collectionRef = collection(db, "colors");
    const payload = {
      name: nameRef.current?.value,
      color: colorRef.current?.value,
    };

    try {
      await addDoc(collectionRef, payload);
    } catch {
      alert("Error");
    }
  };

  const handleEdit = async (id: string) => {
    const docRef = doc(db, "colors", id);
    const payload = {
      name: nameRef.current?.value,
      color: colorRef.current?.value,
    };

    await setDoc(docRef, payload);
  };

  const handleDelete = async (id: string) => {
    const docRef = doc(db, "colors", id);
    await deleteDoc(docRef);
  };

  return (
    <div className="App">
      <form action="post">
        <div className="box">
          <label htmlFor="">name</label>
          <input name="name" ref={nameRef} />
        </div>
        <div className="box">
          <label htmlFor="">color</label>
          <input name="color" ref={colorRef} />
        </div>
        <div className="box">
          <button type="submit" onClick={handleCreate}>
            Add
          </button>
        </div>
      </form>
      <ul>
        {colors?.map((color) => (
          <Color
            key={color.id}
            colorPros={color}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
