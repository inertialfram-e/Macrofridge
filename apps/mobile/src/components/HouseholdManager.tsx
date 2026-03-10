import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Button } from 'react-native';
import { db } from '../lib/powersync';

export interface HouseholdManagerProps {
  onBack: () => void;
}

export default function HouseholdManager({ onBack }: HouseholdManagerProps) {
  const [household, setHousehold] = useState<any>(null);
  const [members, setMembers] = useState<any[]>([]);

  useEffect(() => {
    // Watch for the primary household (for now just taking the first one)
    const householdWatcher = db.watch(
      'SELECT h.* FROM households h JOIN household_members hm ON h.id = hm.household_id LIMIT 1',
      [],
      {
        onResult: (result) => {
          setHousehold(result.rows.item(0));
        },
      }
    );

    // Watch for members of that household
    const membersWatcher = db.watch(
      `SELECT u.email, u.name, hm.role 
       FROM users u 
       JOIN household_members hm ON u.id = hm.user_id 
       WHERE hm.household_id IN (SELECT household_id FROM household_members LIMIT 1)`,
      [],
      {
        onResult: (result) => {
          setMembers(result.rows._array || []);
        },
      }
    );

    return () => {
      // Close watchers in real app
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Household Settings</Text>
        <Button title="Back" onPress={onBack} />
      </View>
      
      {household && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Name</Text>
          <Text style={styles.value}>{household.name}</Text>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Members</Text>
        <FlatList
          data={members}
          keyExtractor={(item) => item.email}
          renderItem={({ item }) => (
            <View style={styles.memberRow}>
              <Text style={styles.memberName}>{item.name || item.email}</Text>
              <Text style={styles.memberRole}>{item.role}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 14,
    color: '#666',
    textTransform: 'uppercase',
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
  },
  memberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  memberName: {
    fontSize: 16,
  },
  memberRole: {
    fontSize: 14,
    color: '#007bff',
  },
});
