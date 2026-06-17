import { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';


const BRAND = '#4F46E5';

type FormData = {
  name: string;
  email: string;
  message: string;
};

export default function ContactScreen() {
  const [form, setForm] = useState<FormData>({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  function updateField(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  const handleSubmit = () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      Alert.alert('Missing fields', 'Please fill in all fields before sending.');
      return;
    }
    setSubmitted(true);
  };

  const handleReset = () => {
    setForm({ name: '', email: '', message: '' });
    setSubmitted(false);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

 <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Let's work together</ThemedText>
          <ThemedText style={styles.bio}>
            Available for mobile contract work. Feel free to reach out with any questions or project inquiries!.
          </ThemedText>
          
        </ThemedView>

      {submitted ? (
        <ThemedView style={styles.section}>
          <View style={styles.successContainer}>
            <View style={styles.successIcon}>
              <ThemedText style={styles.successIconText}>✓</ThemedText>
            </View>
            <ThemedText type="subtitle" style={{ textAlign: 'center' }}>
              Message sent!
            </ThemedText>
            <ThemedText style={styles.successSub}>
              Thanks {form.name.split(' ')[0]}! I'll get back to you within 24 hours.
            </ThemedText>
            <TouchableOpacity style={styles.btnPrimary} onPress={handleReset} activeOpacity={0.85}>
              <ThemedText style={styles.btnPrimaryText}>Send another message</ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedView>
      ) : (
        <ThemedView style={styles.section}>
          <ThemedText style={styles.inputLabel}>Name</ThemedText>
          <TextInput
            style={styles.input}
            value={form.name}
            onChangeText={(v) => updateField('name', v)}
            placeholder="Your name"
            placeholderTextColor="#A0A0A0"
            autoCorrect={false}
          />

          <ThemedText style={styles.inputLabel}>Email</ThemedText>
          <TextInput
            style={styles.input}
            value={form.email}
            onChangeText={(v) => updateField('email', v)}
            placeholder="you@example.com"
            placeholderTextColor="#A0A0A0"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <ThemedText style={styles.inputLabel}>Message</ThemedText>
          <TextInput
            style={[styles.input, styles.inputMultiline]}
            value={form.message}
            onChangeText={(v) => updateField('message', v)}
            placeholder="Tell me about your project…"
            placeholderTextColor="#A0A0A0"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />

          <TouchableOpacity style={styles.btnPrimary} onPress={handleSubmit} activeOpacity={0.85}>
            <ThemedText style={styles.btnPrimaryText}>Send message</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 50,
    paddingBottom: 40,
  },
  section: {
    padding: 30,
    gap: 10,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 22,
    opacity: 0.6,
  },
  bio: {
    fontSize: 15,
    lineHeight: 22,
    color: '#666',
  },
  inputLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#999',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  input: {
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    color: '#111',
    backgroundColor: '#FAFAFA',
    marginBottom: 14,
  },
  inputMultiline: {
    height: 96,
    paddingTop: 12,
  },
  btnPrimary: {
    backgroundColor: BRAND,
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 6,
  },
  btnPrimaryText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  successContainer: {
    alignItems: 'center',
    gap: 12,
    paddingVertical: 24,
  },
  successIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#EAF3DE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successIconText: {
    fontSize: 24,
    color: '#3B6D11',
    fontWeight: '700',
  },
  successSub: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 21,
  },
});