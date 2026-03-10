import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Button } from 'react-native';
import { db } from '../lib/powersync';
import InventoryItem from './InventoryItem';
import InventoryForm from './InventoryForm';

export default function InventoryList() {
  const [items, setItems] = useState<any[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  useEffect(() => {
    // Watch the inventory_items table for changes
    const watcher = db.watch('SELECT * FROM inventory_items ORDER BY created_at DESC', [], {
      onResult: (result) => {
        setItems(result.rows._array || []);
      },
    });

    return () => {
      // In a real app, we'd close the watcher here
    };
  }, []);

  const handleAdd = () => {
    setEditingItem(null);
    setIsFormVisible(true);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setIsFormVisible(true);
  };

  const handleDelete = async (id: string) => {
    await db.execute('DELETE FROM inventory_items WHERE id = ?', [id]);
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
    setEditingItem(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Fridge</Text>
        <Button title="Add Item" onPress={handleAdd} />
      </View>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <InventoryItem item={item} onEdit={handleEdit} onDelete={handleDelete} />
        )}
        ListEmptyComponent={<Text style={styles.empty}>Your fridge is empty!</Text>}
      />
      {isFormVisible && (
        <InventoryForm 
          item={editingItem} 
          onClose={handleCloseForm} 
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  empty: {
    textAlign: 'center',
    marginTop: 50,
    color: '#999',
  },
});
