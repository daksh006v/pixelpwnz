import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, TouchableOpacity, SafeAreaView } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { Colors, Spacing, Typography, Radii, Gradients } from '../constants/theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Landing'>;

export default function LandingScreen({ navigation }: Props) {
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [floatAnim]);

  const translateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -14],
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Background Grid Illusion (simplified for mobile) */}
        <View style={styles.bgGrid} />

        {/* Hero Text */}
        <View style={styles.heroTextContainer}>
          <View style={styles.tag}>
            <Text style={styles.tagIcon}>✦</Text>
            <Text style={styles.tagText}>Your Conversations, Your AI</Text>
          </View>

          <Text style={[styles.title, { color: Colors.text }]}>Meet Your</Text>
          
          <LinearGradient
            colors={[...Gradients.primary]}
            start={Gradients.primaryStart}
            end={Gradients.primaryEnd}
            style={styles.gradientMaskContainer}
          >
            <Text style={[styles.title, styles.gradientText]}>AI Clone</Text>
          </LinearGradient>

          <Text style={styles.subtitle}>
            Signet creates a personalized AI clone from your chat history — built to reflect the way they truly talk.
          </Text>

          {/* CTA Buttons */}
          <View style={styles.ctaRow}>
            <TouchableOpacity
              style={styles.btnPrimary}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Upload')}
            >
              <Feather name="upload" size={18} color="#FFF" />
              <Text style={styles.btnPrimaryText}>Upload Your Chat</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnGhost}
              activeOpacity={0.8}
            >
              <Feather name="play" size={16} color={Colors.primarySolid} />
              <Text style={styles.btnGhostText}>Watch Demo</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.privacyNote}>
            <Feather name="shield" size={18} color={Colors.primarySolid} style={{ marginTop: 2 }} />
            <Text style={styles.privacyNoteText}>
              Your data stays private and secure.{'\n'}We never store your conversations.
            </Text>
          </View>
        </View>

        {/* 3D Orb Section */}
        <View style={styles.orbContainer}>
          {/* Concentric Platforms */}
          <View style={styles.platform1}>
            <BlurView intensity={20} tint="light" style={StyleSheet.absoluteFill} />
          </View>
          <View style={styles.platform2} />
          <View style={styles.platform3} />

          {/* Animated Orb */}
          <Animated.View style={[styles.orb, { transform: [{ translateY }] }]}>
            {/* Specular Highlight */}
            <View style={styles.orbHighlight} />
            {/* Eyes */}
            <View style={styles.orbEyes}>
              <View style={styles.orbEye} />
              <View style={styles.orbEye} />
            </View>
          </Animated.View>

          {/* Glass Cards (Positioned around Orb) */}
          <BlurView intensity={Colors.glass.intensity} tint={Colors.glass.tint} style={[styles.glassCard, { top: 20, left: -10 }]}>
            <View style={styles.glassCardIcon}><Feather name="message-circle" size={16} color={Colors.primarySolid} /></View>
            <View>
              <Text style={styles.glassCardTitle}>Your Chat</Text>
              <Text style={styles.glassCardDesc}>Upload your{'\n'}conversations</Text>
            </View>
          </BlurView>

          <BlurView intensity={Colors.glass.intensity} tint={Colors.glass.tint} style={[styles.glassCard, { bottom: 60, right: -10 }]}>
            <View style={styles.glassCardIcon}><Feather name="cpu" size={16} color={Colors.primarySolid} /></View>
            <View>
              <Text style={styles.glassCardTitle}>Smart AI</Text>
              <Text style={styles.glassCardDesc}>Analyzes tone,{'\n'}pattern & style</Text>
            </View>
          </BlurView>
        </View>

        {/* Feature Badges */}
        <View style={styles.badgeSection}>
          <BlurView intensity={Colors.glass.intensity} tint={Colors.glass.tint} style={styles.glassBadge}>
            <View style={styles.glassBadgeIcon}><Feather name="shield" size={20} color={Colors.primarySolid} /></View>
            <View>
              <Text style={styles.glassBadgeTitle}>100% Private</Text>
              <Text style={styles.glassBadgeDesc}>Your chats stay on your device.</Text>
            </View>
          </BlurView>

          <BlurView intensity={Colors.glass.intensity} tint={Colors.glass.tint} style={styles.glassBadge}>
            <View style={styles.glassBadgeIcon}><Feather name="user-check" size={20} color={Colors.primarySolid} /></View>
            <View>
              <Text style={styles.glassBadgeTitle}>AI Clone</Text>
              <Text style={styles.glassBadgeDesc}>AI that talks like your person.</Text>
            </View>
          </BlurView>

          <BlurView intensity={Colors.glass.intensity} tint={Colors.glass.tint} style={styles.glassBadge}>
            <View style={styles.glassBadgeIcon}><Feather name="lock" size={20} color={Colors.primarySolid} /></View>
            <View>
              <Text style={styles.glassBadgeTitle}>Secure & Safe</Text>
              <Text style={styles.glassBadgeDesc}>We never store your data.</Text>
            </View>
          </BlurView>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  container: {
    flexGrow: 1,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing['5xl'],
    alignItems: 'center',
  },
  bgGrid: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 400,
    opacity: 0.5,
    // Add simple gradient fallback for the complex CSS bg-grid
    backgroundColor: Colors.bgLavender,
    zIndex: -1,
  },
  heroTextContainer: {
    paddingHorizontal: Spacing.xl,
    alignItems: 'center',
    width: '100%',
    marginBottom: Spacing['2xl'],
    zIndex: 10,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(108, 92, 231, 0.08)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: 'rgba(108, 92, 231, 0.12)',
    marginBottom: Spacing.xl,
    gap: 8,
  },
  tagIcon: {
    color: Colors.primarySolid,
    fontSize: 14,
  },
  tagText: {
    color: Colors.primarySolid,
    fontWeight: '600',
    fontSize: 14,
  },
  title: {
    ...Typography.h1,
    textAlign: 'center',
  },
  gradientMaskContainer: {
    // To achieve gradient text on React Native, we can use a mask, but for simplicity here we mask a text component if using mask libraries.
    // Alternatively, just give it a nice color if masked view is not available, or wrap in mask.
    // Since we don't have react-native-masked-view, we'll give it the primary color for now,
    // but structure it to be easy to swap.
    marginTop: -4,
  },
  gradientText: {
    color: Colors.primarySolid, // Fallback since actual gradient text requires @react-native-masked-view
    textShadowColor: 'rgba(108, 92, 231, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  subtitle: {
    ...Typography.bodyLarge,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.lg,
    marginBottom: Spacing['2xl'],
    paddingHorizontal: Spacing.md,
  },
  ctaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
    width: '100%',
  },
  btnPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primarySolid,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: Radii.md,
    shadowColor: Colors.primarySolid,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
    gap: 8,
  },
  btnPrimaryText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 15,
  },
  btnGhost: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: Radii.md,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 8,
  },
  btnGhostText: {
    color: Colors.text,
    fontWeight: '600',
    fontSize: 15,
  },
  privacyNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    maxWidth: 300,
  },
  privacyNoteText: {
    fontSize: 13,
    lineHeight: 20,
    color: Colors.textSecondary,
    textAlign: 'left',
  },
  orbContainer: {
    position: 'relative',
    height: 380,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing['2xl'],
    zIndex: 5,
  },
  orb: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#7560F0', // Fallback
    zIndex: 10,
    // Emulate radial gradient with box shadow in RN
    shadowColor: Colors.primarySolid,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.45,
    shadowRadius: 40,
    elevation: 10,
    overflow: 'hidden',
  },
  orbHighlight: {
    position: 'absolute',
    top: '8%',
    left: '14%',
    width: '50%',
    height: '38%',
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    transform: [{ rotate: '-25deg' }],
  },
  orbEyes: {
    position: 'absolute',
    top: '44%',
    left: '50%',
    transform: [{ translateX: -30 }], // Half of total width (22+22+16 spacing = 60)
    flexDirection: 'row',
    gap: 16,
    zIndex: 20,
  },
  orbEye: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  platform1: {
    position: 'absolute',
    bottom: 40,
    width: 280,
    height: 60,
    borderRadius: 140, // Needs to be oval, RN handles huge borderRadius as oval if height is smaller
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderColor: 'rgba(255, 255, 255, 0.85)',
    borderWidth: 1,
    zIndex: 4,
    overflow: 'hidden',
  },
  platform2: {
    position: 'absolute',
    bottom: 50,
    width: 220,
    height: 45,
    borderRadius: 110,
    backgroundColor: 'rgba(248, 247, 255, 0.8)',
    borderColor: 'rgba(237, 237, 245, 0.9)',
    borderWidth: 1,
    zIndex: 5,
  },
  platform3: {
    position: 'absolute',
    bottom: 55,
    width: 160,
    height: 32,
    borderRadius: 80,
    backgroundColor: 'rgba(108, 92, 231, 0.08)',
    zIndex: 6,
  },
  glassCard: {
    position: 'absolute',
    backgroundColor: Colors.glass.bg,
    borderColor: Colors.glass.border,
    borderWidth: 1,
    borderRadius: Radii.card,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    zIndex: 20,
    overflow: 'hidden',
  },
  glassCardIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(108, 92, 231, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glassCardTitle: {
    fontWeight: '700',
    fontSize: 13,
    color: Colors.text,
  },
  glassCardDesc: {
    fontSize: 11,
    color: Colors.textSecondary,
    lineHeight: 14,
  },
  badgeSection: {
    width: '100%',
    paddingHorizontal: Spacing.xl,
    gap: Spacing.base,
  },
  glassBadge: {
    backgroundColor: Colors.glass.bg,
    borderColor: Colors.glass.border,
    borderWidth: 1,
    borderRadius: Radii.lg,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    overflow: 'hidden',
  },
  glassBadgeIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(108, 92, 231, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glassBadgeTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 2,
  },
  glassBadgeDesc: {
    fontSize: 13,
    color: Colors.textSecondary,
  }
});
