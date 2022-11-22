import { Fragment } from 'react'
import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  FlatList
} from 'react-native'
import QuotationItems from './QuotationsItems'
import styles from './styles'

export default function QuotationList(props) {
  const daysQuery = props.filterDay
  return (
    <Fragment>
      <View style={styles.filters}>
        <TouchableOpacity
          style={styles.buttonQuery}
          onPress={() => daysQuery(180)}
        >
          <Text style={styles.textButtonQuery}>6M</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonQuery}
          onPress={() => daysQuery(210)}
        >
          <Text style={styles.textButtonQuery}>7M</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonQuery}
          onPress={() => daysQuery(240)}
        >
          <Text style={styles.textButtonQuery}>8M</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonQuery}
          onPress={() => daysQuery(365)}
        >
          <Text style={styles.textButtonQuery}>1A</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonQuery}
          onPress={() => daysQuery(728)}
        >
          <Text style={styles.textButtonQuery}>2Y</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.listQuotationBitcoins}>
        {/*adicionar um estilo */}
        <FlatList
          data={props.listTransactions}
          renderItem={({ item }) => {
            return <QuotationItems valor={item.valor} data={item.data} />
          }}
        />
      </ScrollView>
    </Fragment>
  )
}
