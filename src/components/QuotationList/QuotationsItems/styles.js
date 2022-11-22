import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  mainContent: {
    width: '95%',
    height: 'auto',
    backgroundColor: '#000000',
    marginLeft: '3%',
    marginBottom: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  contextLeft: {
    width: '36%',
    height: '100%',
    alignItems: 'flex-start'
  },
  boxLogo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  dayCotation: {
    fontSize: 20,
    paddingLeft: 2,
    color: '#ffffff',
    fontWeight: 'bold'
  },
  logoBitcoin: {
    width: 30,
    height: 30,
    marginLeft: 2
  },
  contextRigth: {
    width: '60%',
    alignItems: 'flex-end'
  },
  price: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold'
  }
})

export default styles
