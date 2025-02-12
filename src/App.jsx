import { useState, useEffect, useRef } from 'react'
import { db } from './services/firebaseConnection'
import { addDoc, collection, getDocs, getDoc, doc } from 'firebase/firestore'

const listRef = collection(db, 'teste')


function App() {
  const [texto, setTexto] = useState('')
  const [resp, setResp] = useState('')
  const [loja, setLoja] = useState('MS FILINTO')
  const hChange = (e) => {
    setLoja(e.target.value)
  }
  const [categoria, setCategoria] = useState('Acessorios')
  const categoriaChange = (e) => {
    setCategoria(e.target.value)
  }
  const [texts, setTexts] = useState([])
  let lista = []

  useEffect(() => {
    async function loadTexts() {
      const querySnapshot = await getDocs(listRef)
        .then((snapshot) => {
          snapshot.forEach(doc => {
            lista.push({
              id: doc.id,
              data: doc.data().data,
              resp: doc.data().resp,
              categoria: doc.data().categoria,
              loja: doc.data().loja,
              text: doc.data().texto
            })
          })
          if (snapshot.docs.size === 0) {
            console.log('Vazio')
            return
          }
          setTexts(lista)
        })
        .catch((err) => {
          console.log('Erro ao ler', err)
        })
    }
    loadTexts()
  }, [])

  async function adicionar(e) {
    e.preventDefault()

    if (texto !== '') {
      await addDoc(collection(db, 'teste'), {
        data: new Date(),
        resp: resp,
        categoria: categoria,
        loja: loja,
        texto: texto
      })
        .then(() => {
          setResp('')
          setTexto('')
          document.getElementById('resp').focus()
          document.getElementById('text').value = ''
          alert('Cadastrado com sucesso')
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      alert('Campo vazio não será cadastrado')
    }
  }

  function setarResp(e) {
    setResp(e.target.value)
  }


  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;

    const handleCopy = (e) => {
      e.preventDefault();
    };

    const handleCut = (e) => {
      e.preventDefault();
    };

    const handlePaste = (e) => {
      e.preventDefault();
    };

    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'v' || e.key === 'x')) {
        e.preventDefault();
      }
    };

    if (textarea) {
      textarea.addEventListener('copy', handleCopy);
      textarea.addEventListener('cut', handleCut);
      textarea.addEventListener('paste', handlePaste);
      textarea.addEventListener('keydown', handleKeyDown);
    }

    // Cleanup function to remove event listeners when the component unmounts
    return () => {
      if (textarea) {
        textarea.removeEventListener('copy', handleCopy);
        textarea.removeEventListener('cut', handleCut);
        textarea.removeEventListener('paste', handlePaste);
        textarea.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, []);


  return (
    <>
      <h1>Cadastro</h1>
      <form onSubmit={adicionar}>
        <p>Responsável:</p>
        <input placeholder='Seu nome' autoFocus type="text" name="resp" id="resp" value={resp} onChange={setarResp} />
        <p>Loja:</p>
        <select name="loja" id="loja" value={loja} onChange={hChange}>
          <option value="MS FILINTO">Filinto</option>
          <option value="MS ROI LLA">Rondonópolis</option>
          <option value="MS COMODORO">Comodoro</option>
          <option value="MS LUCAS">Lucas</option>
          <option value="MS CÁCERES">Cáceres</option>
          <option value="MS SORRISO">Sorriso</option>
          <option value="MS VG Shopping">VG Shopping</option>
          <option value="MS BARRA DO GARÇAS">Barra do Garças</option>
          <option value="MS COUTO">Couto</option>
          <option value="MS PRIMAVERA DO LESTE">Privamera do Leste</option>
          <option value="MS PONTES E LACERDA">Pontes e Lacerda</option>
          <option value="MS COLIDER">Colider</option>
          <option value="MS MIRASSOL">Mirassol</option>
          <option value="MS GUARANTÃ DO NORTE">Gurantã do Norte</option>
          <option value="MS JACIARA">Jaciara</option>
          <option value="MS ALTO ARAGUAIA">Alto Araguaia</option>
          <option value="MS ARIQUEMES">Ariquemes</option>
          <option value="MS QUERÊNCIA">Querência</option>
          <option value="MS JARU">Jaru</option>
          <option value="MS JI-PARANA">Ji-Parana</option>
          <option value="MS PEIXOTO DE AZEVEDO">Peixoto de Azevedo</option>
          <option value="MS ROLIM DE MOURA">Rolim de Moura</option>
          <option value="MS PIMENTA BUENO">Pimenta Bueno</option>
          <option value="MS VILHENA">Vilhena</option>
          <option value="MS CACOAL">Cacoal</option>
          <option value="MS PV - 07 SETEMBRO">07 de Setembro</option>
          <option value="MS PV - JATUARANA">Jatuarana</option>
          <option value="MS PV - JOSE AMADOR">Jose Amador</option>
          <option value="MS CONFRESA">Confresa</option>
          <option value="MS NOVA XAVANTINA">Nova Xavantina</option>
          <option value="MS GO - 24 OUTUBRO">24 de Outubro</option>
          <option value="MS GO - PLAZA DORO">Plaza Doro</option>
        </select>
        <p>Categoria</p>
        <select name="categoria" id="categoria" value={categoria} onChange={categoriaChange}>
          <option value="Acessorios">Acessórios</option>
          <option value="Outros">Outros</option>
        </select>
        <p></p>
        <textarea ref={textareaRef} placeholder='Apenas um item por linha&#10;2222222&#10;3333333&#10;4444444&#10;5555555' name="text" id="text" cols="30" rows="10" onChange={(e) => { setTexto((e.target.value).split('\n')) }}></textarea>

        <button type='submit'>Salvar</button>
      </form>
    </>
  )
}

export default App
