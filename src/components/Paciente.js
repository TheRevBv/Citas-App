import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
const Paciente = ({item}) => {
  const {paciente, fecha} = item;

  const formatearFecha = fecha => {
    let nuevaFecha = new Date(fecha);
    // const day = date.getDate();
    // const month = date.getMonth() + 1;
    // const year = date.getFullYear();
    // return `${day}/${month}/${year}`;
    let opciones = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return nuevaFecha.toLocaleDateString('es-MX', opciones);
  };
  return (
    <View style={styles.contenedor}>
      <Text style={styles.label}>Paciente</Text>
      <Text style={styles.texto}>{paciente}</Text>
      <Text style={styles.fecha}>{formatearFecha(fecha)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    // flex: 1,
    backgroundColor: '#FFF',
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
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
  },
  texto: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6D28D9',
    marginBottom: 10,
  },
  fecha: {
    color: '#374151',
  },
});

export default Paciente;
