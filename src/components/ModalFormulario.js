import React, {useState, useEffect} from 'react';
import {
  Modal,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';

import DatePicker from 'react-native-date-picker';

const ModalFormulario = ({
  modalVisible,
  setModalVisible,
  setPacientes,
  pacientes,
  paciente: pacienteObj,
  setPaciente: setPacienteApp,
}) => {
  const [id, setId] = useState('');
  const [paciente, setPaciente] = useState('');
  const [propietario, setPropietario] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [sintomas, setSintomas] = useState('');

  useEffect(() => {
    if (Object.keys(pacienteObj).length > 0) {
      setId(pacienteObj.id);
      setPaciente(pacienteObj.paciente);
      setPropietario(pacienteObj.propietario);
      setEmail(pacienteObj.email);
      setTelefono(pacienteObj.telefono);
      setSintomas(pacienteObj.sintomas);
      setFecha(pacienteObj.fecha);
    }
  }, [pacienteObj]); //aqui podria ir el pacienteObj en el array

  const handleCita = () => {
    //Validar
    if (
      [paciente, propietario, telefono, email, fecha, sintomas].includes('')
    ) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    //Guardar
    const nuevoPaciente = {
      // id: Math.random(),
      // id: Date.now(),
      paciente,
      propietario,
      telefono,
      email,
      fecha,
      sintomas,
    };

    if (id) {
      console.log('Editando... ', id);
      nuevoPaciente.id = id;
      const pacientesActualizados = pacientes.map(pacienteState =>
        pacienteState.id === nuevoPaciente.id ? nuevoPaciente : pacienteState,
      );
      setPacientes(pacientesActualizados);
      setPacienteApp({});
    } else {
      console.log('Agregando...');
      nuevoPaciente.id = Date.now();
      setPacientes([...pacientes, nuevoPaciente]);
    }

    setModalVisible(!modalVisible);
    setId('');
    setEmail('');
    setFecha(new Date());
    setPropietario('');
    setSintomas('');
    setTelefono('');
    setPaciente('');
    //Guardar en localStorage
    // localStorage.setItem('pacientes', JSON.stringify(pacientes));
  };

  return (
    <Modal animationType="slide" visible={modalVisible}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text style={styles.titulo}>
            {pacienteObj.id ? 'Editar' : 'Nueva'}{' '}
            <Text style={styles.tituloBold}>Cita</Text>
          </Text>
          <Pressable
            style={styles.btnCancelar}
            onPress={() => {
              setModalVisible(!modalVisible);
              setPacienteApp({});
              setId('');
              setEmail('');
              setFecha(new Date());
              setPropietario('');
              setSintomas('');
              setTelefono('');
              setPaciente('');
            }}>
            <Text style={styles.btnCancelarTexto}>Cancelar</Text>
          </Pressable>
          <View style={styles.formulario}>
            <Text style={styles.label}>Nombre mascota</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre mascota"
              placeholderTextColor={'#666'}
              value={paciente}
              onChangeText={text => setPaciente(text)}
            />
          </View>
          <View style={styles.formulario}>
            <Text style={styles.label}>Nombre del propietario</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre del propietario"
              placeholderTextColor={'#666'}
              value={propietario}
              onChangeText={text => setPropietario(text)}
            />
          </View>
          <View style={styles.formulario}>
            <Text style={styles.label}>Email propietario</Text>
            <TextInput
              keyboardType="email-address"
              style={styles.input}
              placeholder="Email propietario"
              placeholderTextColor={'#666'}
              value={email}
              onChangeText={text => setEmail(text)}
            />
          </View>
          <View style={styles.formulario}>
            <Text style={styles.label}>Telefono del propietario</Text>
            <TextInput
              keyboardType="phone-pad"
              style={styles.input}
              placeholder="Telefono del propietario"
              placeholderTextColor={'#666'}
              maxLength={10}
              value={telefono}
              onChangeText={text => setTelefono(text)}
            />
          </View>
          <View style={styles.formulario}>
            <Text style={styles.label}>Fecha</Text>
            <View style={styles.datePicker}>
              <DatePicker
                date={fecha}
                mode="date"
                locale="es"
                onDateChange={date => setFecha(date)}
              />
            </View>
          </View>

          <View style={styles.formulario}>
            <Text style={styles.label}>Sintomas</Text>
            <TextInput
              style={[styles.input, styles.inputMultiline]}
              multiline={true}
              numberOfLines={4}
              value={sintomas}
              onChangeText={text => setSintomas(text)}
            />
          </View>
          <Pressable style={styles.btnAgregar} onPress={handleCita}>
            <Text style={styles.btnAgregarTexto}>
              {pacienteObj.id ? 'Editar' : 'Agregar'} Paciente
            </Text>
          </Pressable>
          {/* <View style={{flex: 1, backgroundColor: '#f3f3f3'}}>
            <ActionButton buttonColor="rgba(231,76,60,1)">
             
              <Icon name="md-create" style={styles.actionButtonIcon} />
            </ActionButton>
          </View> */}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6D28D9',
  },
  titulo: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '600',
    color: '#fff',
    marginTop: 30,
  },
  tituloBold: {
    fontWeight: '900',
  },
  btnCancelar: {
    marginVertical: 30,
    marginHorizontal: 30,
    padding: 15,
    backgroundColor: '#5827A4',
    borderRadius: 10,
  },
  btnCancelarTexto: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  formulario: {
    marginHorizontal: 30,
    marginTop: 10,
  },
  label: {
    color: '#fff',
    fontWeight: '600',
    marginVertical: 10,
    fontSize: 20,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    color: '#000',
    padding: 15,
    borderRadius: 10,
  },
  datePicker: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
  },
  inputMultiline: {
    height: 100,
  },
  btnContainer: {
    marginHorizontal: 20,
    marginTop: 30,
  },
  btnAgregar: {
    marginVertical: 50,
    marginHorizontal: 30,
    backgroundColor: '#F59E0B',
    borderRadius: 10,
    padding: 15,
  },
  btnAgregarTexto: {
    fontSize: 15,
    textAlign: 'center',
    color: '#5827A4',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

export default ModalFormulario;
