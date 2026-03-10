import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Modal, Alert } from 'react-native';
import { db } from '../lib/powersync';
import { supabase } from '../lib/supabase';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export interface HouseholdFormProps {
  onClose: (householdId?: string) => void;
}

export default function HouseholdForm({ onClose }: HouseholdFormProps) {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter a household name');
      return;
    }

    setLoading(true);
    const householdId = uuidv4();
    const membershipId = uuidv4();
    const now = new Date().toISOString();

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      // Use a transaction to create the household and the membership
      await db.writeTransaction(async (tx) => {
        await tx.execute(
          'INSERT INTO households (id, name, created_at, updated_at) VALUES (?, ?, ?, ?)',
          [householdId, name, now, now]
        );
        await tx.execute(
          'INSERT INTO household_members (id, household_id, user_id, role, created_at) VALUES (?, ?, ?, ?, ?)',
          [membershipId, householdId, user.id, 'admin', now]
        );
      });

      onClose(householdId);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={true} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.title}>Create a Household</Text>
        <Text style={styles.subtitle}>You need a household to manage your fridge.</Text>
        <TextInput
          placeholder="Household Name (e.g. Smith Family)"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <View style={styles.actions}>
          <Button title="Create" disabled={loading} onPress={handleCreate} />
          <Button title="Cancel" color="red" onPress={() => onClose()} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  actions: {
    gap: 10,
  },
});
