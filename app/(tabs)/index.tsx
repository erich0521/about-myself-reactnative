import { Image } from 'expo-image';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

// ─── Types & Data ─────────────────────────────────────────────────────────────

type SkillCategory = 'frontend' | 'backend' | 'language' | 'tools';

interface Skill {
  label: string;
  category: SkillCategory;
}

const SKILLS: Skill[] = [
  { label: 'React',        category: 'frontend' },
  { label: 'CSS',          category: 'frontend' },
  { label: 'HTML',         category: 'frontend' },
  { label: 'Node.js',      category: 'backend'  },
  { label: 'PHP',          category: 'backend'  },
  { label: 'TypeScript',   category: 'language' },
  { label: 'Expo',         category: 'tools'    },
  { label: 'Git',          category: 'tools'    },
  { label: 'Figma',        category: 'tools'    },
];

const CHIP_COLORS: Record<SkillCategory, { bg: string; text: string }> = {
  frontend: { bg: '#EAF3DE', text: '#3B6D11' },
  backend:  { bg: '#E6F1FB', text: '#185FA5' },
  language: { bg: '#EEEDFE', text: '#3C3489' },
  tools:    { bg: '#FAEEDA', text: '#854F0B' },
};


const PROJECTS = [
  {
    id: '1',
    title: 'SmartHR',
    description: 'An HR management system with job listings, course management, and employee features.',
    tags: ['PHP', 'MySQL', 'Bootstrap'],
    year: '2026',
    mockup: require('@/assets/images/smarthr-mockup.png'),
  },
  {
    id: '2',
    title: 'LSHS Registration',
    description: 'An online registration portal for Lian Senior High School, Region IV-A CALABARZON.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    year: '2021-2022',
    mockup: require('@/assets/images/lshs-mockup.png'),
  },
  {
    id: '3',
    title: 'Talynk-Jobs',
    description: 'A job portal app connecting talent with employers.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    year: '2026',
    mockup: require('@/assets/images/talynk.png'),
  },
];

const BRAND = '#4F46E5';

type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  year: string;
  mockup: any;
};

type ContactForm = {
  name: string;
  email: string;
  message: string;
};

export default function HomeScreen() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [contactVisible, setContactVisible] = useState(false);
  const [form, setForm] = useState<ContactForm>({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const updateField = (field: keyof ContactForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      Alert.alert('Missing fields', 'Please fill in all fields before sending.');
      return;
    }
    setSubmitted(true);
  };

  const handleCloseContact = () => {
    setForm({ name: '', email: '', message: '' });
    setSubmitted(false);
    setContactVisible(false);
  };

  return (
    <>
      <ScrollView style={styles.container}>

        {/* ── Hero / About ── */}
        <Image
          source={require('@/assets/images/1x1pic.jpg')}
          style={styles.headerImage}
          contentFit="cover"
        />

        <ThemedView style={styles.section}>
          <ThemedText type="title">Erich Nicole B. Castillo</ThemedText>
          <ThemedText type="subtitle">BS Information Technology BA - 3303</ThemedText>
          <ThemedText style={styles.badge}>Small Steps Lead to Great Journeys</ThemedText>
          <ThemedText type='defaultSemiBold'>About Me</ThemedText>          

          <ThemedText style={styles.bio}>
            Motivated Information Technology student with experience in software development,
            database systems, and UI/UX design. Passionate about learning new technologies and
            creating applications that improve user experiences.
          </ThemedText>
        </ThemedView>

        {/* ── Skills ── */}
<ThemedView style={styles.section}>
  <ThemedText type="subtitle">Skills</ThemedText>

  {/* Legend */}
  <View style={styles.legend}>
    {(Object.keys(CHIP_COLORS) as SkillCategory[]).map((cat) => (
      <View key={cat} style={styles.legendItem}>
        <View style={[styles.legendDot, { backgroundColor: CHIP_COLORS[cat].text }]} />
        <ThemedText style={styles.legendLabel}>{cat}</ThemedText>
      </View>
    ))}
  </View>

  {/* Chips */}
  <View style={styles.chipGrid}>
    {SKILLS.map((skill) => (
      <View key={skill.label} style={[styles.chip, { backgroundColor: CHIP_COLORS[skill.category].bg }]}>
        <ThemedText style={[styles.chipText, { color: CHIP_COLORS[skill.category].text }]}>
          {skill.label}
        </ThemedText>
      </View>
    ))}
  </View>
</ThemedView>

        {/* ── Projects ── */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Projects</ThemedText>
          {PROJECTS.map((project) => (
            <Pressable
              key={project.id}
              style={({ pressed }) => [
                styles.card,
                pressed && styles.cardPressed,
              ]}
              onPress={() => setSelectedProject(project)}
            >
              <View style={styles.cardImageWrapper}>
                <Image source={project.mockup} style={styles.cardImage} contentFit="cover" />
              </View>
              <View style={styles.cardBody}>
                <View style={styles.cardHeader}>
                  <ThemedText type="defaultSemiBold" style={styles.cardTitle}>
                    {project.title}
                  </ThemedText>
                  <ThemedText style={styles.cardYear}>{project.year}</ThemedText>
                </View>
                <ThemedText style={styles.cardDesc} numberOfLines={2}>
                  {project.description}
                </ThemedText>
                <View style={styles.tagRow}>
                  {project.tags.map((tag) => (
                    <View key={tag} style={styles.tag}>
                      <ThemedText style={styles.tagText}>{tag}</ThemedText>
                    </View>
                  ))}
                </View>
              </View>
            </Pressable>
          ))}
        </ThemedView>


      </ScrollView>

      {/* ── Project Detail Modal ── */}
      <Modal
        visible={!!selectedProject}
        animationType="slide"
        transparent
        presentationStyle="overFullScreen"
        onRequestClose={() => setSelectedProject(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            {selectedProject && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.modalImageWrapper}>
                  <Image source={selectedProject.mockup} style={styles.modalImage} contentFit="cover" />
                </View>
                <View style={styles.cardHeader}>
                  <ThemedText type="subtitle">{selectedProject.title}</ThemedText>
                  <ThemedText style={styles.cardYear}>{selectedProject.year}</ThemedText>
                </View>
                <ThemedText style={styles.modalDesc}>
                  {selectedProject.description}
                </ThemedText>
                <ThemedText style={styles.techLabel}>Technologies</ThemedText>
                <View style={[styles.tagRow, { marginBottom: 24 }]}>
                  {selectedProject.tags.map((tag) => (
                    <View key={tag} style={styles.tag}>
                      <ThemedText style={styles.tagText}>{tag}</ThemedText>
                    </View>
                  ))}
                </View>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setSelectedProject(null)}
                  activeOpacity={0.85}
                >
                  <ThemedText style={styles.closeButtonText}>Close</ThemedText>
                </TouchableOpacity>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerImage: {
    width: '100%',
    height: 250,
  },
  section: {
    padding: 16,
    gap: 10,
    marginBottom: 8,
  },
  bio: {
    fontSize: 14,
    lineHeight: 22,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#111111',
    color: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    fontSize: 13,
    fontWeight: '600',
    overflow: 'hidden',
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: '#EEEEEE',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  chipText: {
    fontSize: 12,
  },
  card: {
    borderWidth: 1.5,
    borderColor: BRAND,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    backgroundColor: '#FDFCFF',
  },
  cardPressed: {
    opacity: 0.75,
  },
  cardImageWrapper: {
    width: '100%',
    height: 160,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardBody: {
    padding: 14,
    gap: 6,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 15,
    color: '#111',
  },
  cardYear: {
    fontSize: 11,
    color: '#999',
  },
  cardDesc: {
    fontSize: 13,
    lineHeight: 20,
    color: '#555',
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 4,
  },
  tag: {
    backgroundColor: '#EFEFEF',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  tagText: {
    fontSize: 11,
    color: '#555',
  },
  ctaButton: {
    backgroundColor: BRAND,
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
  },
  ctaButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    paddingBottom: 40,
    maxHeight: '85%',
  },
  modalHandle: {
    width: 36,
    height: 4,
    backgroundColor: '#DDD',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  modalImageWrapper: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  modalImage: {
    width: '100%',
    height: '100%',
  },
  modalDesc: {
    fontSize: 14,
    lineHeight: 22,
    marginTop: 8,
    marginBottom: 16,
  },
  techLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#999',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  closeButton: {
    backgroundColor: BRAND,
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
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
    borderWidth: 1,
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
  btnGhost: {
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  btnGhostText: {
    color: '#888',
    fontSize: 15,
  },
  successContainer: {
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
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
  legend: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 10,
},
legendItem: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 5,
},
legendDot: {
  width: 8,
  height: 8,
  borderRadius: 4,
},
legendLabel: {
  fontSize: 11,
  color: '#666',
  textTransform: 'capitalize',
},
});