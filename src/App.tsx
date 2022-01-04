import "./App.css";

const Dot = ({ color }: { color: string }) => {
  const style = {
    height: 25,
    width: 25,
    display: "inline-block",
    backgroundColor: color,
  };

  return <span style={style} />;
};

function App() {
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
        <li>
          <button>edit</button>
          <Dot color={"#000"} />
          <span>black</span>
          <button>del</button>
        </li>
      </ul>
    </div>
  );
}

export default App;
