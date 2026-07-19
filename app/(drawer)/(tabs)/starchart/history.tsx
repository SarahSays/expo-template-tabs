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
  for (let i = 0; i < days; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    // placeholder: random number of uses 0..5
    const count = Math.floor(Math.random() * 6);
    out.push({ date: d, count });
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
  const days = React.useMemo(() => generatePlaceholderDays(365), []);
  const weeks = React.useMemo(() => chunkIntoWeeks(days), [days]);

  const boxSize = 14;
  const boxMargin = 4;

  // estimate width if needed in future

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Activity</ThemedText>

      <ThemedView style={styles.gridCard}>
        {/* <ThemedText type="subtitle">Contributions in the last year</ThemedText> */}

        {/* Months header + grid */}
        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
          {/* weekday labels column */}
          <View style={{ width: 40, paddingTop: 18 }}>
            {/** Show Mon, Wed, Fri labels aligned to rows (Monday at top) */}
            {['Mon', 'Wed', 'Fri'].map((label, idx) => {
              // positions: Mon -> row 0, Wed -> row 2, Fri -> row 4 (0-based)
              const top = idx * (boxSize + boxMargin) * 2;
              return (
                <View key={label} style={{ height: boxSize, marginTop: top }}>
                  <ThemedText>{label}</ThemedText>
                </View>
              );
            })}
          </View>

          <View>
            {/* months header */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={true}
              contentContainerStyle={{ paddingLeft: 2 }}
            >
              <View style={{ flexDirection: 'row', paddingRight: 16 }}>
                {weeks.map((week, colIdx) => {
                  const firstDay = week[0]?.date || week.find(Boolean)?.date;
                  const monthLabel = firstDay ? firstDay.toLocaleString(undefined, { month: 'short' }) : '';
                  // only show label when month changes or at first column
                  const prevFirst = colIdx > 0 ? (weeks[colIdx - 1][0]?.date || weeks[colIdx - 1].find(Boolean)?.date) : undefined;
                  const prevMonth = prevFirst ? prevFirst.getMonth() : -1;
                  const show = firstDay && firstDay.getMonth() !== prevMonth;
                  return (
                    <View key={colIdx} style={{ width: boxSize + boxMargin, alignItems: 'center' }}>
                      {show ? <ThemedText>{monthLabel}</ThemedText> : <View style={{ height: 16 }} />}
                    </View>
                  );
                })}
              </View>
            </ScrollView>

            {/* grid */}
            <ScrollView
              horizontal
              contentContainerStyle={{ paddingVertical: 8 }}
              showsHorizontalScrollIndicator={true}
            >
              <View style={{ flexDirection: 'row', paddingRight: 16 }}>
                {weeks.map((week, colIdx) => (
                  <View key={colIdx} style={{ marginRight: boxMargin }}>
                    {/** Render Monday..Sunday top->bottom */}
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
            </ScrollView>
          </View>
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
});