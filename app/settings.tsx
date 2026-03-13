import { LinearGradient } from 'expo-linear-gradient';
import { useCallback } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import GradientScreen from '@/components/GradientScreen';
import ScreenHeader from '@/components/ScreenHeader';
import SettingItem from '@/components/SettingCard';
import { clearNotes } from '@/services/noteService';
import { COLORS } from '@/theme/colors';
import { showToast } from '@/utils/toast';

const OnlineCustomerImage = require('@/assets/images/onlineCustomer.png');
const UserAgreementImage = require('@/assets/images/userAgreement.png');
const PrivacyPolicyImage = require('@/assets/images/privacyPolicy.png');
const AboutUsImage = require('@/assets/images/aboutUs.png');

export default function Settings() {
  const handleDeleteAll = async () => {
    Alert.alert(
      'Delete All Notes',
      'Are you sure you want to delete all notes?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await clearNotes()
              showToast('All notes have been cleared')
            } catch (error) {
              Alert.alert('Error', 'Failed to delete notes.')
            }
          },
        },
      ]
    )
  }

  const onSettingItemPress = useCallback(() => {
    Alert.alert('Under Construction', 'Settings related pages are under construction.');
  }, []);

  const renderSettingItems = useCallback(() => (
    <View style={styles.settingItemContainer}>
        <SettingItem image={OnlineCustomerImage} title="Online Customer" onPress={onSettingItemPress}/>
        <SettingItem image={UserAgreementImage} title="User Agreement" onPress={onSettingItemPress}/>
        <SettingItem image={PrivacyPolicyImage} title="Privacy Policy" onPress={onSettingItemPress}/>
        <SettingItem image={AboutUsImage} title="About Us" onPress={onSettingItemPress}/>
      </View>
  ),[]);

  const renderBottomTab = useCallback(() => (
<View style={styles.bottomTab}>
          <Pressable onPress={handleDeleteAll}>
            <LinearGradient
              colors={[COLORS.BUTTON_GRADIENT_1, COLORS.BUTTON_GRADIENT_2]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.deleteButton}
            >
              <Text style={styles.deleteButtonText}>Delete All Notes</Text>
            </LinearGradient>
          </Pressable>
        </View>
  ), []);

  return (
    <GradientScreen style={styles.container}>
      <ScreenHeader title="Settings" showBack />
      {renderSettingItems()}
       {renderBottomTab()}
    </GradientScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  settingItemContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
    gap: 16,
  },
  bottomTab: {
    backgroundColor: COLORS.BOTTOM_TAB,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 100,
    paddingHorizontal: 84,
    justifyContent: 'center',
  },
  deleteButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    alignItems: 'center'
  },
  deleteButtonText: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: 14,
    fontWeight: '600'
  },
})
