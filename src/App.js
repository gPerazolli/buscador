import { useState} from 'react'
import { FiSearch } from "react-icons/fi";
import  "./styles.css"
import api from "./services/api.js";

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState('');

  async function handleChange(){

    if(input === ""){
      alert("Preencha algum CEP");
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      console.log(response);
      verification(response);
      setInput("");
    }
    catch{

    }
  }

  function verification(response){
    if(Object.keys(response.data).length ===1){
      alert("CEP não encontrado!!");
    }
    else{
      setCep(response.data);
    }
  }

  return (
    <div className="container">

      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">

        <input type="text" placeholder="Digite seu cep..." value={input} onChange={(event) => setInput(event.target.value)}>
        </input>

        <button className="buttonSearch" onClick={handleChange}>
          <FiSearch size={25} color="white"/>
        </button>

      </div>

      {Object.keys(cep).length > 1 &&(

        <main className="main">

          <h2>Cep: {cep.cep}</h2>

          <span>{cep.logradouro}</span>

          {Object.keys(cep.complemento).length > 0 &&(
            <span>Complemento: {cep.complemento}</span>
          )}
          
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>

        </main>
      )};

    </div>

  );
}

export default App;
