import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export interface InventoryItemProps {
  item: {
    id: string;
    custom_name: string;
    quantity: number;
    unit: string;
    expiration_date?: string;
    use_soon_flag: number;
  };
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
}

export default function InventoryItem({ item, onEdit, onDelete }: InventoryItemProps) {
  return (
    <View style={[styles.container, item.use_soon_flag === 1 && styles.useSoon]}>
      <View style={styles.info}>
        <Text style={styles.name}>{item.custom_name}</Text>
        <Text style={styles.details}>
          {item.quantity} {item.unit}
          {item.expiration_date ? ` • Exp: ${new Date(item.expiration_date).toLocaleDateString()}` : ''}
        </Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onEdit(item)} style={styles.button}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(item.id)} style={[styles.button, styles.deleteButton]}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  useSoon: {
    backgroundColor: '#fff3cd',
    borderLeftWidth: 5,
    borderLeftColor: '#ffc107',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
  },
  button: {
    padding: 8,
    marginLeft: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
  },
});
