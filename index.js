
const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json)

const cursos = [
    {
    id: 1,
    //icon: react,
    nome: 'React.js',
    author: 'Pedro Mendonça',
    describe: "Curso de React.js Avançado",
    rate: 4.5,
    conteudos: [
      {
        titulo: 'Introdução ao React',
        videos: [
          {
            titulo: 'Curso React: Introdução - #01',
            url: 'FXqX7oof0I4',
            describe:'Falando um pouco sobre o curso e os projetos'
          },
          {
            titulo: 'Curso React: Instalando o React (create-react-app) - #02',
            url: 'Jg6JaEjovJk',
            describe:'Instalação de react em todas as plataformas e suas dependencias'
          }
        ]
      },
      {
        titulo: 'Componentes e Estados',
        videos: [
          {
            titulo: 'Curso React: Entendendo o JSX - #03',
            url: '9iKNxnFJY_Q',
            describe:'Entendendo o jsx e suas vantagens'
          },
          {
            titulo: 'Curso React: Criando componentes no React - #04',
            url: '-wrsG0IGc-M',
            describe:'Nessa aula aprenderemos sobre componetização e suas utilizações'
          },
          {
            titulo: 'Video do Allan',
            url: 'm2HoMvcA2RM',
            describe:'Video do allan descrevendo sobre as paginas'
          }
        ]
      }
    ]
    },
  

  {
    id:2,
    //icon: java,
    nome: 'Java',
    author: 'Allan Keven',
    describe: "Curso de Java Intermediario",
    rate: 4.7,
    conteudos: [
      {
        titulo: 'Introdução ao React',
        videos: [
          {
            titulo: 'Curso React: Introdução - #01',
            url: 'FXqX7oof0I4',
            describe:'Falando um pouco sobre o curso e os projetos'
          },
          {
            titulo: 'Curso React: Instalando o React (create-react-app) - #02',
            url: 'Jg6JaEjovJk',
            describe:'Instalação de react em todas as plataformas e suas dependencias'
          }
        ]
      },
      {
        titulo: 'Componentes e Estados',
        videos: [
          {
            titulo: 'Curso React: Entendendo o JSX - #03',
            url: '9iKNxnFJY_Q',
            describe:'Entendendo o jsx e suas vantagens'
          },
          {
            titulo: 'Curso React: Criando componentes no React - #04',
            url: '-wrsG0IGc-M',
            describe:'Nessa aula aprenderemos sobre componetização e suas utilizações'
          }
        ]
      }
    ]
  },

  {
    id:3,
    //icon: html,
    nome: 'HTML e CSS',
    author: 'Mayra Leticia',
    describe: "Curso de HTML e Css Intermediario",
    rate: 4.5
  },

  {
    id: 4,
    //icon: typescript,
    nome: 'Typescript',
    author: 'Caio Gomes',
    describe: "Curso de Typescript Intermediario",
    rate: 4.2
  },

  {
    id: 5,
    //icon: javascript,
    nome: 'Javascript',
    author: 'Caio Gomes',
    describe: "Curso de Javascript Intermediario",
    rate: 4.0
  }, 
  
  {
    id: 6,
    //icon: python,
    nome: 'Python',
    author: 'Lucas Melo',
    describe: "Curso de Python Intermediario",
    rate: 4.0
  }
]

app.get('/cursos',(req, res) =>{
    res.json(cursos);
})

app.listen(PORT, () =>{
    console.log(`teste ${PORT}`)

})