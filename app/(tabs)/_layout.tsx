import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen
                name='index'
                options={{
                    headerTitle: 'Home',
                    title: 'Home',
                }
                }
            />
            <Tabs.Screen
                name='new-note'
                options={{
                    headerTitle: 'New Note',
                    title: 'New Note',
                }
                }
            />
            <Tabs.Screen
                name='summary'
                options={{
                    title: 'Summary',
                }}
            />
        </Tabs>
    );
}
