import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Modal, Switch } from 'react-native';
import { db } from '../lib/powersync';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export interface InventoryFormProps {
  item?: any;
  onClose: () => void;
}

export default function InventoryForm({ item, onClose }: InventoryFormProps) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('count');
  const [useSoon, setUseSoon] = useState(false);

  useEffect(() => {
    if (item) {
      setName(item.custom_name || '');
      setQuantity(item.quantity?.toString() || '');
      setUnit(item.unit || 'count');
      setUseSoon(item.use_soon_flag === 1);
    }
  }, [item]);

  const handleSave = async () => {
    const id = item?.id || uuidv4();
    const now = new Date().toISOString();

    if (item) {
      // Update existing item
      await db.execute(
        `UPDATE inventory_items 
         SET custom_name = ?, quantity = ?, unit = ?, use_soon_flag = ?, updated_at = ? 
         WHERE id = ?`,
        [name, parseFloat(quantity) || 0, unit, useSoon ? 1 : 0, now, id]
      );
    } else {
      // Insert new item (household_id should be dynamic, using a placeholder for now)
      await db.execute(
        `INSERT INTO inventory_items (id, custom_name, quantity, unit, use_soon_flag, created_at, updated_at, entry_method) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [id, name, parseFloat(quantity) || 0, unit, useSoon ? 1 : 0, now, now, 'manual']
      );
    }
    onClose();
  };

  return (
    <Modal visible={true} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.title}>{item ? 'Edit Item' : 'Add Item'}</Text>
        <TextInput
          placeholder="Item Name (e.g. Milk)"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Quantity"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          placeholder="Unit (e.g. g, ml, count)"
          value={unit}
          onChangeText={setUnit}
          style={styles.input}
        />
        <View style={styles.row}>
          <Text>Use Soon?</Text>
          <Switch value={useSoon} onValueChange={setUseSoon} />
        </View>
        <View style={styles.actions}>
          <Button title="Save" onPress={handleSave} />
          <Button title="Cancel" color="red" onPress={onClose} />
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
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  actions: {
    gap: 10,
  },
});
