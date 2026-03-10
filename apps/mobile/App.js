import 'react-native-get-random-values';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, SafeAreaView } from 'react-native';
import { supabase } from './src/lib/supabase';
import { setupPowerSync, db } from './src/lib/powersync';
import Auth from './src/components/Auth';
import InventoryList from './src/components/InventoryList';
import HouseholdManager from './src/components/HouseholdManager';
import HouseholdForm from './src/components/HouseholdForm';

export default function App() {
  const [session, setSession] = useState(null);
  const [isDbReady, setIsDbReady] = useState(false);
  const [hasHousehold, setHasHousehold] = useState<boolean | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    setupPowerSync().then(() => {
      setIsDbReady(true);
    }).catch(err => {
      console.error('Failed to setup PowerSync:', err);
    });
  }, []);

  // Watch for household membership changes
  useEffect(() => {
    if (isDbReady && session?.user) {
      const watcher = db.watch(
        'SELECT count(*) as count FROM household_members WHERE user_id = ?',
        [session.user.id],
        {
          onResult: (result) => {
            setHasHousehold(result.rows.item(0).count > 0);
          },
        }
      );
    }
  }, [isDbReady, session]);

  if (!isDbReady) {
    return (
      <View style={styles.container}>
        <Text>Initializing Database...</Text>
      </View>
    );
  }

  if (session && session.user && hasHousehold === false) {
    return <HouseholdForm onClose={() => {}} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {session && session.user ? (
        <View style={styles.fullWidth}>
          <View style={styles.authHeader}>
            <Text style={styles.userEmail}>{session.user.email}</Text>
            <View style={styles.headerButtons}>
              <Button title="Settings" onPress={() => setShowSettings(true)} />
              <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
            </View>
          </View>
          {showSettings ? (
            <HouseholdManager onBack={() => setShowSettings(false)} />
          ) : (
            <InventoryList />
          )}
        </View>
      ) : (
        <Auth />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    flex: 1,
    width: '100%',
  },
  authHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  userEmail: {
    fontSize: 12,
    color: '#666',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 5,
  },
});
