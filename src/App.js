
import {useState, useEffect} from 'react';
import './style.css';
import firebase from "./firebaseConnection";

function App() {
const[idPost,setIdPost] = useState('');
const [titulo, setTitulo] = useState ('');
const[autor, setAutor] = useState ('');
const [posts, setPosts] = useState([]);

useEffect(()=>{
  async function loadPosts(){
    await firebase.firestore().collection('posts')
    .onSnapshot((doc)=>{
      let meusPosts =[];
      doc.forEach((item)=>{
        meusPosts.push({
          id:item.id,
          titulo:item.data().titulo,
          autor:item.data().autor,
        })
      });

      setPosts(meusPosts);
      
    })

  }

  loadPosts();
},[]);

 async function handleAdd(){

  await firebase.firestore().collection('posts')

  // ID aleatorio 

  .add({
    titulo: titulo,
    autor: autor,
  })

  //Você escolhendo o numero do ID
  //.doc('12345')
  //.set({
   // titulo:titulo,
    //autor: autor)}
  
  .then(()=>{
    console.log('Dados Cadastrados')
    setTitulo('');
    setAutor('');
  })
  .catch((error)=>{
    console.log('Gerou algum error' + error)
  });

}

async function buscaPost(){

  //Pesquisar você colocando o ID
  //await firebase.firestore().collection('posts')
 // .doc('1234')
  //.get()
  //.then((snapshot)=>{
    //setTitulo(snapshot.data().titulo);
   // setAutor(snapshot.data().autor);
 // })

  //.catch(()=>{
   // console.log('Deu algum erro')
 // })

// Pesquisando sem colocar o ID
await firebase.firestore().collection('posts')
.get()
.then((snapshot)=>{
 let lista = []

 snapshot.forEach((doc)=>{
  lista.push({
    id:doc.id,
    titulo:doc.data().titulo,
    autor:doc.data().autor
  })
 })

setPosts (lista);

})
.catch(()=>{
  console.log('Deu algum erro');
})

}

 async function editarPost(){
 await firebase.firestore().collection('posts')
 .doc(idPost)
 .update({
  titulo: titulo,
  autor: autor
 })

 .then(()=> {
  console.log('Dados Atualizados com Sucesso!');
  setIdPost('');
  setTitulo('');
  setAutor('');
 })
 .catch(()=>{
  console.log('Erro ao Atualizar!')
 })
}

function excluirPost(id){
  await firebase.firestore().collection('posts').doc(id)
}

  return (
    <div>
   <h1>  React + Firebase :0</h1> <br/>

  <div className="container">

    <label>ID: </label>
    <input type="text" value={idPost} onChange={(e)=> setIdPost(e.target.value)}></input>

   <label>Titulo:</label>
   <textarea  type = "text" value={titulo } onChange={(e)=> setTitulo(e.target.value)} ></textarea>

<label>Autor:</label>
<input type="text"  value={autor} onChange={(e)=> setAutor(e.target.value)}></input>

<button onClick={handleAdd} > Cadastrar</button>
<button onClick={buscaPost} >Buscar Post</button> 
<button onClick={editarPost} >Editar Post</button> <br/>

<ul>
  {posts.map((post)=>{
    return(
      <li key={post.id}>
        <span>ID - {post.id}</span> <br/>
        <span> Titulo: {post.titulo}</span> <br/>
        <span>Autor: {post.autor}</span> <br/> 
        <button onClick={()=> excluirPost(post.id)}>Excluir Post</button><br/> <br/>

      </li>
    )
  })}
  </ul>

</div>
</div>
    
  );
}

export default App;
