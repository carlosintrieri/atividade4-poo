import React, { useEffect, useState } from 'react';
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css";
import api from "../services/api";

// Definindo tipos para os dados
type Cliente = {
  id: number;
  nome: string;
  cpf: string;
  telefone: string;
  valorConsumido: number;
  qtdConsumida: number;
};

type ProdutoServico = {
  id: number;
  nome: string;
  valor: number;
};

type ConsumoGenero = {
  id: number;
  nome: string;
  produto: string;
  valor: number;
};

const Listagens: React.FC = () => {
  const [clientesValor, setClientesValor] = useState<Cliente[]>([]);
  const [clientesQtd, setClientesQtd] = useState<Cliente[]>([]);
  const [clientesMenorConsumo, setClientesMenorConsumo] = useState<Cliente[]>([]);
  const [produtosServicos, setProdutosServicos] = useState<ProdutoServico[]>([]);
  const [consumoFeminino, setConsumoFeminino] = useState<ConsumoGenero[]>([]);
  const [consumoMasculino, setConsumoMasculino] = useState<ConsumoGenero[]>([]);

  useEffect(() => {
    M.AutoInit();
    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Simulating API calls. Replace these with actual API calls in your implementation
      const responseClientesValor = await fetch('/api/clientes-valor');
      const clientesValorData = await responseClientesValor.json();
      setClientesValor(clientesValorData);

      const responseClientesQtd = await fetch('/api/clientes-qtd');
      const clientesQtdData = await responseClientesQtd.json();
      setClientesQtd(clientesQtdData);

      const responseClientesMenorConsumo = await fetch('/api/clientes-menor-consumo');
      const clientesMenorConsumoData = await responseClientesMenorConsumo.json();
      setClientesMenorConsumo(clientesMenorConsumoData);

      const responseProdutosServicos = await fetch('/api/produtos-servicos');
      const produtosServicosData = await responseProdutosServicos.json();
      setProdutosServicos(produtosServicosData);

      const responseConsumoFeminino = await fetch('/api/consumo-feminino');
      const consumoFemininoData = await responseConsumoFeminino.json();
      setConsumoFeminino(consumoFemininoData);

      const responseConsumoMasculino = await fetch('/api/consumo-masculino');
      const consumoMasculinoData = await responseConsumoMasculino.json();
      setConsumoMasculino(consumoMasculinoData);

    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  // Estilos (mantenha os estilos existentes)
  const containerStyle = { display: "flex" };
  const navStyle = {
    width: "200px",
    backgroundColor: "#000000",
    padding: "10px",
    height: "100vh",
    display: "flex",
    flexDirection: "column" as "column",
    justifyContent: "flex-start",
    position: "fixed" as "fixed",
    top: "0",
    left: "0",
    bottom: "0",
  };
  const logoStyle = {
    fontSize: "large",
    fontFamily: "Arial, sans-serif",
    color: "#FFFFFF",
    marginBottom: "20px",
    textAlign: "center" as "center",
  };
  const menuLinksStyle = {
    display: "flex",
    flexDirection: "column" as "column",
    gap: "10px",
  };
  const botaoStyle = {
    padding: "8px 16px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#333333",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "5px",
    textAlign: "center" as "center",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    textDecoration: "none",
  };

  return (
    <div style={containerStyle}>
      {/* Menu de Navegação à Esquerda */}
      <nav style={navStyle}>
        <a style={logoStyle}>World Beauty</a>
        <div style={menuLinksStyle}>
          <a style={botaoStyle} href="/cadServico">Cadastros</a>
          <a style={botaoStyle} href="/listaCliente">Cliente</a>
          <a style={botaoStyle} href="/listaProduto">Produto</a>
          <a style={botaoStyle} href="/listaPedidos">Consumo</a>
          <a style={botaoStyle} href="/listaServicos">Serviços</a>
          <a style={botaoStyle} href="/Listagens">Listagens</a>
        </div>
      </nav>

      {/* Conteúdo principal */}
      <div className="container" style={{ marginLeft: "270px", width: "calc(100% - 270px)", justifyContent: "center", alignItems: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100px" }}>
          <h5>Listagens por Consumo</h5>
        </div>

        <div className="row">
          <div className="">
            <ul className="tabs-swipe-demo tabs tabsConsumo">
              <li className="tab col s3"><a href="#1" style={{ color: "black", fontSize: "10px" }}>Cliente Consumo Valor</a></li>
              <li className="tab col s2"><a href="#2" style={{ color: "black", fontSize: "10px" }}>Cliente Maior Qtd</a></li>
              <li className="tab col s3"><a href="#3" style={{ color: "black", fontSize: "10px" }}>Cliente Menor Consumo</a></li>
              <li className="tab col s2"><a href="#4" style={{ color: "black", fontSize: "10px" }}>Prod/Serv Consumo</a></li>
              <li className="tab col s2"><a href="#5" style={{ color: "black", fontSize: "10px" }}>Consumo Gênero</a></li>
            </ul>
          </div>

          {/* Cliente Consumo Valor */}
          <div id="1" className="col s12">
            <form>
              <div>
                <table className="responsive-table centered">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Nome</th>
                      <th>CPF</th>
                      <th>Telefone</th>
                      <th>Valor Consumido</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientesValor.map(cliente => (
                      <tr key={cliente.id}>
                        <td>{cliente.id}</td>
                        <td>{cliente.nome}</td>
                        <td>{cliente.cpf}</td>
                        <td>{cliente.telefone}</td>
                        <td>R$ {cliente.valorConsumido.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </form>
          </div>

          {/* Cliente Maior Qtd */}
          <div id="2" className="col s12">
            <form>
              <div>
                <table className="responsive-table centered">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Nome</th>
                      <th>CPF</th>
                      <th>Telefone</th>
                      <th>Quantidade Consumida</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientesQtd.map(cliente => (
                      <tr key={cliente.id}>
                        <td>{cliente.id}</td>
                        <td>{cliente.nome}</td>
                        <td>{cliente.cpf}</td>
                        <td>{cliente.telefone}</td>
                        <td>{cliente.qtdConsumida}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </form>
          </div>

          {/* Cliente Menor Consumo */}
          <div id="3" className="col s12">
            <form>
              <div>
                <table className="responsive-table centered">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Nome</th>
                      <th>CPF</th>
                      <th>Telefone</th>
                      <th>Valor Consumido</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientesMenorConsumo.map(cliente => (
                      <tr key={cliente.id}>
                        <td>{cliente.id}</td>
                        <td>{cliente.nome}</td>
                        <td>{cliente.cpf}</td>
                        <td>{cliente.telefone}</td>
                        <td>R$ {cliente.valorConsumido.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </form>
          </div>

          {/* Produto/Serviço Consumo */}
          <div id="4" className="col s12">
            <form>
              <div>
                <table className="responsive-table centered">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Nome do Produto/Serviço</th>
                      <th>Valor do Produto/Serviço</th>
                    </tr>
                  </thead>
                  <tbody>
                    {produtosServicos.map(item => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.nome}</td>
                        <td>R$ {item.valor.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </form>
          </div>

          {/* Consumo por Gênero */}
          <div id="5" className="col s12">
            <form>
              <h5 className="generoConsumoFont center-align">Feminino</h5>
              <div>
                <table className="responsive-table centered">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Nome da Cliente</th>
                      <th>Produto/Serviço Consumido</th>
                      <th className="valor-column">Valor do Produto/Serviço</th>
                    </tr>
                  </thead>
                  <tbody>
                    {consumoFeminino.map(item => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.nome}</td>
                        <td>{item.produto}</td>
                        <td className="valor-column">R$ {item.valor.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <br />
              <h5 className="generoConsumoFont center-align">Masculino</h5>
              <div>
                <table className="responsive-table centered">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Nome do Cliente</th>
                      <th>Produto/Serviço Consumido</th>
                      <th className="valor-column">Valor do Produto/Serviço</th>
                    </tr>
                  </thead>
                  <tbody>
                    {consumoMasculino.map(item => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.nome}</td>
                        <td>{item.produto}</td>
                        <td className="valor-column">R$ {item.valor.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <br />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};



export default Listagens;
