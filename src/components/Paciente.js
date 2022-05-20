import React from 'react';
import {Text, StyleSheet, View, Pressable} from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
const Paciente = ({
  item,
  setModalVisible,
  pacienteEditar,
  pacienteEliminar,
}) => {
  const {paciente, fecha, id} = item;

  const formatearFecha = fecha => {
    let nuevaFecha = new Date(fecha);
    let opciones = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return nuevaFecha.toLocaleDateString('es-MX', opciones);
  };

  // const handlePress = id => {
  //   console.log('Editando... ', id);
  // };
  return (
    <View style={styles.contenedor}>
      <Text style={styles.label}>Paciente:</Text>
      <Text style={styles.texto}>{paciente}</Text>
      <Text style={styles.fecha}>{formatearFecha(fecha)}</Text>

      <View style={styles.contenedorBtn}>
        <Pressable
          style={[styles.btn, styles.btnEditar]}
          onPress={() => {
            setModalVisible(true);
            pacienteEditar(id);
          }}>
          {/* <Icon name="pencil-outline" size={20} color="#F59E0B" /> */}
          <Text style={styles.btnTexto}>Editar</Text>
        </Pressable>
        <Pressable
          style={[styles.btn, styles.btnEliminar]}
          onPress={() => {
            pacienteEliminar(id);
          }}>
          {/* <Icon name="trash-outline" size={20} color="red" /> */}
          <Text style={styles.btnTexto}>Eliminar</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#94A3B8',
  },
  label: {
    color: '#374151',
    fontWeight: '700',
    marginBottom: 10,
    textTransform: 'uppercase',
    fontSize: 16,
  },
  texto: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#6D28D9',
    marginBottom: 10,
  },
  fecha: {
    color: '#374151',
    fontSize: 16,
  },
  contenedorBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  btn: {
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  btnEditar: {
    backgroundColor: '#F59E0B',
  },
  btnEliminar: {
    backgroundColor: '#DD0000',
  },
  btnTexto: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});

export default Paciente;
