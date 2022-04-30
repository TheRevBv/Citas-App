import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Pressable,
  View,
  FlatList,
} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import Formulario from './src/components/ModalFormulario';
import Paciente from './src/components/Paciente';
import {LogBox} from 'react-native';

const App = () => {
  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }, []);

  //Los Hooks son funciones que nos permiten crear estados y funciones
  //en una sola linea de codigo
  // const [clientes, setClientes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [pacientes, setPacientes] = useState([]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>
        Administrador de citas - {''}
        <Text style={styles.tituloBold}>Veterinaria</Text>
      </Text>
      <ActionButton
        // style={styles.btnNuevaCita}
        buttonColor="#6D28D9"
        onPress={() => setModalVisible(!modalVisible)}>
        <Icon name="md-add" size={30} color="white" />
      </ActionButton>
      {/* <Text style={styles.btnTextoNuevaCita}>Nueva cita</Text> */}
      {/* </Pressable> */}
      {pacientes.length === 0 ? (
        <Text style={styles.noPacientes}>No hay pacientes aún</Text>
      ) : (
        <FlatList
          style={styles.listaPacientes}
          data={pacientes}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return <Paciente item={item} />;
          }}
        />
      )}
      <Formulario
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        pacientes={pacientes}
        setPacientes={setPacientes}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  titulo: {
    textAlign: 'center',
    fontSize: 30,
    color: '#374151',
    fontWeight: '600',
    marginTop: 30,
  },
  tituloBold: {
    fontWeight: '900',
    color: '#6D28D9',
  },
  btnTextoNuevaCita: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  btnNuevaCita: {
    // marginTop: 20,
    // marginHorizontal: 30,
    // backgroundColor: '#6D28D9',
    // borderRadius: 10,
    // padding: 15,
  },
  noPacientes: {
    textAlign: 'center',
    fontSize: 24,
    color: '#000',
    fontWeight: '600',
    marginTop: 40,
  },
  listaPacientes: {
    marginTop: 50,
    marginHorizontal: 30,
  },
});

export default App;
