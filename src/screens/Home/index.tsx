import { Alert, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { Participant } from '../../components/Participant';
import { useState } from 'react';

export function Home() {
  const [participants, setParticipants] = useState<string[]>([])
  const [participantName, setParticipantName] = useState('')
  

  function handleParticipantAdd() {
    // Verifica se o campo está vazio
    if (!participantName.trim()) {
      return Alert.alert('Campo vazio', 'Por favor, digite o nome do participante antes de adicionar.');
    }
    // Verifica se o participante já está na lista
    if(participants.includes(participantName)){
      return Alert.alert('Participante existe','Já existe um participante na lista com esse nome')
    }
    // Adiciona o participante à lista
    setParticipants(prevState => [...prevState, participantName])
    setParticipantName('')
  }

  function handleParticipantRemove(name: string) {
    // Exibe um alerta de confirmação para remover o participante
    Alert.alert('Remover', `Remover o participante ${name}?`, [
      {
        text: 'Sim', 
        onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name))

      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ])
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Rock in Rio X</Text>
      <Text style={styles.eventDate}>Sexta, 13 de setembro de 2024</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder='Nome do participante'
          placeholderTextColor='#6B6B6B'
          onChangeText={setParticipantName}
          value={participantName}
        />

        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList 
        data={participants}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Participant
            key={item}
            name={item}
            onRemove={() => handleParticipantRemove(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguém chegou no evento ainda? Adicione participantes a sua lista de presença.
          </Text>
        )}
      />

    </View>
  );
}
