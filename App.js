import { useState, useEffect } from 'react'
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native'
import CurrentPrice from './src/components/CurrentPrice'
import HistoryGraphic from './src/components/HistoryGraphic'
import QuotationList from './src/components/QuotationList'

/**
 * Function addZero – vamos utilizar essa função para formatar o zero a esquerda em datas menores ou igual a 9, deixando assim formatado
 *  corretamente conforme pede a api.
 * */
function addZero(number) {
  if (number <= 9) {
    return '0' + number
  }
  return number
}

// Function url(qtdDias) – essa função vai receber uma quantidade de dias e vai subtrair dos dias atual até a data solicitada.
function url(qtdDias) {
  const date = new Date()
  const listLastDays = qtdDias
  const end_date = `${date.getFullYear()}-${addZero(
    date.getMonth() + 1
  )}-${date.getDate()}`
  date.setDate(date.getDate() - listLastDays)
  const start_date = `${date.getFullYear()}-${addZero(
    date.getMonth() + 1
  )}-${date.getDate()}`
  //URL  GET API
  return `https://api.coindesk.com/v1/bpi/historical/close.json?start=${start_date}&end=${end_date}`
}

/**
 * A primeira função vai ser a getListCoins(url), ela irá receber nossa url como parâmetro e fazer fetch, buscando os dados da API de
 * acordo com os dias passados, depois faremos um map gerando um novo array para tratarmos os dados que vieram da API e montarmos esse
 *  novo array da forma que iremos precisar para usar em nosso FLatList.
 */
async function getListCoins(url) {
  let response = await fetch(url)
  let retunrApi = await response.json()
  let selectListQuotations = retunrApi.bpi
  const queryCoinsList = Object.keys(selectListQuotations).map(key => {
    return {
      data: key.split('-').reverse().join('/'),
      valor: selectListQuotations[key]
    }
  })
  let data = queryCoinsList.reverse()
  return data
}

/**
 * Na segunda função, iremos fazer o mesmo só que montaremos os dados conforme a documentação do gráfico nos pede, que é uma lista de
 * dados somente de valores, veja que na função podemos aproveitar a mesma, vamos adicionar um G no final de cada variável criada para
 * referenciarmos que se trata de um ” return dataG” ( dados do Gráfico).
 */
async function getPriceCoinsGraphic(url) {
  let responseG = await fetch(url)
  let returnApiG = await responseG.json()
  let selectListQuotationsG = returnApiG.bpi
  const queryCoinsListG = Object.keys(selectListQuotationsG).map(key => {
    return selectListQuotationsG[key]
  })
  let dataG = queryCoinsListG
  return dataG
}

export default function App() {
  const [coinsList, setcoinsList] = useState([])
  const [coinsGrafichList, setcoinsGrafichList] = useState([0])
  const [days, setdays] = useState(180)
  const [updateData, setupdateData] = useState(true)
  const [price, setPrice] = useState()

  // Vamos criar uma função que será responsável por alterar os dias que iremos passar para nossa chamada à api.
  function updateDay(number) {
    setdays(number)
    setupdateData(true)
  }

  function priceCotation() {
    setPrice(coinsGrafichList.pop())
  }

  // E por fim, nosso useEfect, para sempre que houver alteração ele recarregar nosso componente.
  useEffect(() => {
    getListCoins(url(days)).then(data => {
      setcoinsList(data)
    })
    getPriceCoinsGraphic(url(days)).then(dataG => {
      setcoinsGrafichList(dataG)
    })
    priceCotation()
    if (updateData) {
      setupdateData(false)
    }
  }, [updateData])

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#f50d41" barStyle="ligth-content" />
      <CurrentPrice lastCotation={price} />
      <HistoryGraphic infoDataGraphic={coinsGrafichList} />
      <QuotationList
        filterDay={updateDay}
        listTransactions={coinsList} //props
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    paddingTop: 40
  }
})

/**var value = selectLastedPrice.find(valor => {
    return (valor = 'c')
  })
  let valor = value.c 
  
  async function getLastPrice() {
  let responseF = await fetch(
    'https://fcsapi.com/api-v3/crypto/latest?id=78&access_key=vnu7giz711Yk8TBKDG3lj2MA1'
  )
  let returnApiF = await responseF.json()
  let dataF = returnApiF.response
  return dataF
}

getLastPrice().then(dataF => {
      setValorFinal(dataF)
      console.log(valorFinal)
    })
  
    const [valorFinal, setValorFinal] = useState([])
*/
