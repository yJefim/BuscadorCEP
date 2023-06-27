import { useState } from "react";
import {FiSearch}  from "react-icons/fi";
import './App.css'
import api from "./services/api";

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function search(){
    if (input === ""){
      alert("CEP não informado!");
      return;
    }
    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    } catch {
      alert("CEP INVÁLIDO!");
      setInput("");
    }

  }

  return (
    <div className='container'>
        <h1 className="title">Buscador</h1>

        <div className="containerInput">
          <input
            id="searchBox"
            type="text"
            placeholder="Digite um CEP...
            " 
            value={input}
            onChange={(event) => setInput(event.target.value)}/>

          <button onClick={search}>
            <FiSearch className="iconSearch" />
          </button>
        </div>

        {Object.keys(cep).length > 0 &&(
                  <main className="result">
                  <h2>CEP: {cep.cep}</h2>
                  <span>Rua: {cep.logradouro}</span>
                  <span>Complemento: {cep.complemento}</span>
                  <span>Bairro: {cep.bairro}</span>
                  <span>Cidade: {cep.localidade} - {cep.uf}</span>
                </main>
        )};
    </div>
  )
}

export default App
