import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Pressable,
  View,
  FlatList,
  Alert,
} from 'react-native';
// import ActionButton from 'react-native-action-button';
// import Icon from 'react-native-vector-icons/Ionicons';
import ModalFormulario from './src/components/ModalFormulario';
import Paciente from './src/components/Paciente';
// import {LogBox} from 'react-native';

const App = () => {
  //Los Hooks son funciones que nos permiten crear estados y funciones
  //en una sola linea de codigo
  // const [clientes, setClientes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});

  const pacienteEditar = id => {
    const pacient = pacientes.filter(paciente => paciente.id === id);
    setPaciente(pacient[0]);
  };
  const pacienteEliminar = id => {
    console.log('Eliminando... ', id);
    Alert.alert(
      'Deseas eliminar esta cita de la lista?',
      'Una cita eliminada no se puede recuperar necesita agregarla de nuevo',
      [
        {text: 'No'},
        {
          text: 'Si, Eliminar',
          onPress: () => {
            const nuevosPacientes = pacientes.filter(
              pacienteState => pacienteState.id !== id,
            );
            console.log(nuevosPacientes);
            setPacientes(nuevosPacientes);
          },
        },
      ],
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>
        Administrador de citas - {''}
        <Text style={styles.tituloBold}>Veterinaria</Text>
      </Text>
      <Pressable
        onPress={() => setModalVisible(!modalVisible)}
        style={styles.btnNuevaCita}>
        <Text style={styles.btnTextoNuevaCita}>Nueva cita</Text>
      </Pressable>
      {pacientes.length === 0 ? (
        <Text style={styles.noPacientes}>No hay pacientes aún</Text>
      ) : (
        <FlatList
          style={styles.listaPacientes}
          data={pacientes}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            // console.log(item);
            return (
              <Paciente
                item={item}
                setModalVisible={setModalVisible}
                pacienteEditar={pacienteEditar}
                pacienteEliminar={pacienteEliminar}
              />
            );
          }}
        />
      )}
      <ModalFormulario
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        pacientes={pacientes}
        setPacientes={setPacientes}
        paciente={paciente}
        setPaciente={setPaciente}
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
    marginTop: 20,
    marginHorizontal: 30,
    backgroundColor: '#6D28D9',
    borderRadius: 10,
    padding: 15,
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

{
  /* <ActionButton
        // style={styles.btnNuevaCita}
        buttonColor="#6D28D9"
        renderIcon={() => <Icon name="add-outline" size={20} color="#FFF" />}
        onPress={() => setModalVisible(!modalVisible)}
      /> */
}
{
  /* <Icon name="md-add" size={30} color="white" /> */
}
{
  /* </ActionButton> */
}
