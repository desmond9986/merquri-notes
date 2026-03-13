import { COLORS } from '@/theme/colors'
import { Tabs, useRouter } from 'expo-router'
import { Image, Pressable, StyleSheet, View } from 'react-native'

export default function TabsLayout() {
  const router = useRouter()
  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
          tabBarItemStyle: styles.tabBarItem,
        }}
      >
        <Tabs.Screen
          name='index'
          options={{
            title: 'Home',
            tabBarIcon: ({ focused }) => (
              <View style={styles.tabBarContainer} >
                {focused ?
                  <Image source={require('@/assets/images/homeActive.png')} style={styles.tabItem} resizeMode='contain' /> :
                  <Image source={require('@/assets/images/homeInactive.png')} style={styles.tabItem} resizeMode='contain' />
                }
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name='dummy'
          options={{
            title: 'New Note',
            tabBarButton: () => (
              <Pressable
                onPress={() => router.push('/new-note')}
                style={styles.centerButtonContaine}
              >
                <Image
                  source={require('@/assets/images/addNote.png')}
                  style={styles.centerButton}
                  resizeMode='contain'
                />
              </Pressable>
            ),
          }}
        />

        <Tabs.Screen
          name='summary'
          options={{
            title: 'Summary',
            tabBarIcon: ({ focused }) => (
              <View style={styles.tabBarContainer} >
                {
                  focused ?
                    <Image source={require('@/assets/images/summaryActive.png')} style={styles.tabItem} resizeMode='contain' /> :
                    <Image source={require('@/assets/images/summaryInactive.png')} style={styles.tabItem} resizeMode='contain' />
                }
              </View>
            ),
          }}
        />
      </Tabs>


    </View>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    height: 100,
    borderTopWidth: 0,
    paddingTop: 15,
    paddingHorizontal: 29,
    borderRadius: 20,
    backgroundColor: COLORS.BOTTOM_TAB,
  },
  tabBarContainer: {
    flex: 1,
  },
  tabItem: {
    height: 67,
    width: 58,
  },
  centerButtonContaine: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  tabBarItem: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 6,
  },
  centerButton: {
    width: 36,
    height: 36,
  },
})