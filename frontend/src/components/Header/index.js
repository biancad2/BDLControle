import React from 'react';
import  '../../css/bootstrap.css';
import  './styles.css';
import Logo from '../../assets/logobranco2.png';

const Header = () => (
    <header>
        <div id="acessibilidade" >  
            <ul id="atalhos">  
                <li><a href="#conteudo">Ir para o conteúdo [1]</a></li>  
                <li><a href="#menuu">Ir para o menu [2]</a></li>  
                <li><a href="#rodape">Ir para o rodapé [3]</a></li>  
            </ul>  
            <ul id="botoes">  
                <li><a href="acessibilidade.html"> Acessibilidade </a></li>         
                <li><a href="/mapa"> Mapa do site </a></li>  
            </ul>  
        </div>
</header>
);
export default Header;