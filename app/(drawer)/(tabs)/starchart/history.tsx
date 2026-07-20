/**
 * pinch-zoom.tsx
 *
 * File-level documentation comment.
 */
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import React from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    useWindowDimensions,
    View
} from 'react-native';

type DayCell = {
  date: Date;
  count: number;
};

function generatePlaceholderDays(days = 365): DayCell[] {
  const today = new Date();
  const start = new Date(today);
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - (days - 1));

  const out: DayCell[] = [];
  let streakDays = 0;
  let currentCount = 0;

  for (let i = 0; i < days; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);

    if (streakDays <= 0) {
      // start a new period: more likely to be quiet, less likely to be active
      const quietPeriod = Math.random() < 0.75;
      streakDays = quietPeriod ? 5 + Math.floor(Math.random() * 8) : 2 + Math.floor(Math.random() * 4);
      currentCount = quietPeriod ? 0 : 1 + Math.floor(Math.random() * 2);
    }

    const count = currentCount;
    out.push({ date: d, count });
    streakDays -= 1;
  }

  // Add a few scattered higher-activity days across the year
  for (let i = 0; i < 16; i++) {
    const index = Math.floor(Math.random() * days);
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    out[index] = {
      date,
      count: 2 + Math.floor(Math.random() * 3),
    };
  }

  return out;
}

function chunkIntoWeeks(days: DayCell[]) {
  const weeks: DayCell[][] = [];
  let currentWeek: DayCell[] = [];

  for (const day of days) {
    const weekday = day.date.getDay(); // 0 = Sunday, 6 = Saturday
    currentWeek.push(day);
    if (weekday === 6) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }
  if (currentWeek.length) weeks.push(currentWeek);
  return weeks;
}

const COLOR_SCALE = ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127'];

function colorForCount(count: number) {
  if (count <= 0) return COLOR_SCALE[0];
  if (count === 1) return COLOR_SCALE[1];
  if (count === 2) return COLOR_SCALE[2];
  if (count === 3) return COLOR_SCALE[3];
  return COLOR_SCALE[4];
}

export default function HistoryScreen() {
  const { width } = useWindowDimensions();
  const days = React.useMemo(() => generatePlaceholderDays(365), []);
  const weeks = React.useMemo(() => chunkIntoWeeks(days), [days]);

  const maxColumns = Math.min(weeks.length, 52);
  const boxSize = Math.max(12, Math.min(18, Math.floor((width - 72) / maxColumns)));
  const boxMargin = 4;
  const labelWidth = 36;
  const dayRowHeight = boxSize + boxMargin;
  const monthHeaderHeight = 24;

  const weekdays = ['Mon', 'Wed', 'Fri'];

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Activity</ThemedText>
      <ThemedText style={styles.description}>
        See when you reached out to a friend, and on which platform. 
        Help visualize your activity at a glance.
      </ThemedText>

      <ThemedView style={styles.gridCard}>
        {/* <ThemedText type="subtitle">Contributions in the last year</ThemedText> */}

        {/* Months header + grid */}
        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
          <View style={{ width: labelWidth, paddingTop: monthHeaderHeight }}>
            {weekdays.map((label, idx) => (
              <View key={label} style={{ height: dayRowHeight * 2, justifyContent: 'center' }}>
                <ThemedText style={styles.weekdayLabel}>{label}</ThemedText>
              </View>
            ))}
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={true}
            contentContainerStyle={{ paddingLeft: 4, paddingRight: 16 }}
          >
            <View>
              <View style={[styles.monthRow, { height: monthHeaderHeight }]}> 
                {weeks.map((week, colIdx) => {
                  const firstDay = week[0]?.date || week.find(Boolean)?.date;
                  const monthLabel = firstDay ? firstDay.toLocaleString(undefined, { month: 'short' }) : '';
                  const prevFirst = colIdx > 0 ? (weeks[colIdx - 1][0]?.date || weeks[colIdx - 1].find(Boolean)?.date) : undefined;
                  const prevMonth = prevFirst ? prevFirst.getMonth() : -1;
                  const show = firstDay && firstDay.getMonth() !== prevMonth;
                  return (
                    <View key={colIdx} style={{ width: boxSize + boxMargin, alignItems: 'center' }}>
                      {show ? <ThemedText style={styles.monthLabel}>{monthLabel}</ThemedText> : <View style={{ height: monthHeaderHeight }} />}
                    </View>
                  );
                })}
              </View>

              <View style={{ flexDirection: 'row', paddingTop: 4 }}>
                {weeks.map((week, colIdx) => (
                  <View key={colIdx} style={{ marginRight: boxMargin }}>
                    {[1, 2, 3, 4, 5, 6, 0].map((weekday) => {
                      const day = week.find((d) => d.date.getDay() === weekday);
                      const count = day ? day.count : 0;
                      const date = day ? day.date : undefined;
                      return (
                        <TouchableOpacity
                          key={weekday}
                          activeOpacity={0.8}
                          onPress={() => {
                            if (!date) return;
                            Alert.alert(
                              `${count} uses`,
                              `${date.toDateString()} — ${count} times`,
                            );
                          }}
                          style={{
                            width: boxSize,
                            height: boxSize,
                            marginBottom: boxMargin,
                            backgroundColor: colorForCount(count),
                            borderRadius: 3,
                          }}
                        />
                      );
                    })}
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>

        <View style={styles.legendRow}>
          <ThemedText>Less</ThemedText>
          <View style={styles.legendScale}>
            {COLOR_SCALE.map((c, i) => (
              <View key={i} style={[styles.legendBox, { backgroundColor: c }]} />
            ))}
          </View>
          <ThemedText>More</ThemedText>
        </View>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-start',
  },
  gridCard: {
    marginTop: 16,
    padding: 12,
    borderRadius: 10,
  },
  legendRow: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendScale: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  legendBox: {
    width: 12,
    height: 12,
    borderRadius: 2,
    marginHorizontal: 4,
  },
  weekdayLabel: {
    fontSize: 12,
    opacity: 0.8,
  },
  monthRow: {
    flexDirection: 'row',
  },
  monthLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  description: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.85,
  },
});