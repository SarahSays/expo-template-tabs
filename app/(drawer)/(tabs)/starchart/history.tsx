/**
 * HistoryScreen
 *
 * This screen renders a GitHub-style contribution grid for the last 365 days.
 *
 * The current implementation is intentionally demo-oriented: it uses generated
 * placeholder data instead of a live API so the layout can be styled and
 * validated without backend dependencies. If you later swap in real activity
 * data, keep the shape of `DayCell` (`date` + `count`) and preserve the
 * weekly/monthly layout contract below.
 */
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import React from 'react';
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View
} from 'react-native';

type DayCell = {
  date: Date;
  count: number;
};

/**
 * Demo data generator for the activity grid.
 *
 * Keep this deterministic in spirit but randomized enough to resemble a real
 * person's sparse usage pattern: quiet stretches, occasional bursts, and a
 * few scattered high-activity days. If future changes need this to be driven
 * by real data, replace the body of this function with a fetch/transform step
 * that still returns the same `DayCell[]` shape.
 */
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

/**
 * Groups a flat list of days into weekly columns.
 *
 * The layout expects one `week` array to correspond to one vertical column in
 * the grid. Each week is later rendered as seven cells (Sunday through
 * Saturday), but the day order is intentionally normalized by the weekday map
 * used in the JSX below.
 */
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

// Visual scale used by the contribution cells.
// Keep the order stable: empty -> low -> medium -> high -> peak.
const COLOR_SCALE = ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127'];

/**
 * Converts an activity count into the grid color.
 *
 * `count` is a placeholder proxy for reach-outs or interactions. If the real
 * data source changes semantics, update this mapping rather than rewriting the
 * rendering logic.
 */
function colorForCount(count: number) {
  if (count <= 0) return COLOR_SCALE[0];
  if (count === 1) return COLOR_SCALE[1];
  if (count === 2) return COLOR_SCALE[2];
  if (count === 3) return COLOR_SCALE[3];
  return COLOR_SCALE[4];
}

export default function HistoryScreen() {
  const { width } = useWindowDimensions();

  // The grid is currently driven by demo placeholder data for one year.
  // When real data is introduced, keep this `useMemo` shape so the screen
  // stays responsive and the chunks don't recompute on every render.
  const days = React.useMemo(() => generatePlaceholderDays(365), []);
  const weeks = React.useMemo(() => chunkIntoWeeks(days), [days]);
  const [selectedDay, setSelectedDay] = React.useState<DayCell | null>(null);
  const [hoveredDay, setHoveredDay] = React.useState<number | null>(null);
  const [focusedDay, setFocusedDay] = React.useState<number | null>(null);

  // Responsive sizing rules:
  // - cap the number of visible columns to a single year of weekly buckets
  // - keep the cell size between a minimum and maximum range
  // - leave room for weekday labels and horizontal scrolling
  const maxColumns = Math.min(weeks.length, 52);
  const boxSize = Math.max(12, Math.min(18, Math.floor((width - 72) / maxColumns)));
  const boxMargin = 4;
  const monthLabelWidth = Math.max(boxSize + boxMargin + 10, 32);
  const labelWidth = 36;
  const dayRowHeight = boxSize + boxMargin;
  const monthHeaderHeight = 28;

  const weekdays = ['Mon', 'Wed', 'Fri'];

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Activity</ThemedText>
      <ThemedText style={styles.description}>
        See when you reached out to a friend, and on which platform. 
        Help visualize your activity at a glance.
      </ThemedText>

      <ThemedView style={styles.gridCard}>
        {/*
          The calendar grid is composed of two stacked layers:
          1) a month header row across the top
          2) a horizontally scrollable body with weekday labels on the left

          If you make layout changes here, keep the weekday labels and month
          headers aligned with the same `boxSize`/`boxMargin` math below.
        */}

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
                    <View key={colIdx} style={{ width: monthLabelWidth, alignItems: 'center' }}>
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
                      const dateKey = date?.getTime() ?? null;
                      return (
                        <Pressable
                          key={weekday}
                          accessible={Boolean(date)}
                          accessibilityRole="button"
                          accessibilityLabel={date
                            ? `${date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}, ${count} ${count === 1 ? 'use' : 'uses'}`
                            : undefined}
                          accessibilityHint={date ? 'Activate to view activity for this day.' : undefined}
                          focusable={Boolean(date)}
                          disabled={!date}
                          onPress={() => {
                            if (!day) return;
                            if (Platform.OS === 'web') {
                              setSelectedDay(day);
                            } else {
                              Alert.alert(
                                `${count} uses`,
                                `${day.date.toDateString()} — ${count} times`,
                              );
                            }
                          }}
                          onHoverIn={() => setHoveredDay(dateKey)}
                          onHoverOut={() => setHoveredDay(null)}
                          onFocus={() => setFocusedDay(dateKey)}
                          onBlur={() => setFocusedDay(null)}
                          style={({ pressed }) => [
                            styles.activityCell,
                            {
                              width: boxSize,
                              height: boxSize,
                              marginBottom: boxMargin,
                              backgroundColor: colorForCount(count),
                            },
                            dateKey !== null && hoveredDay === dateKey && styles.activityCellHovered,
                            dateKey !== null && focusedDay === dateKey && styles.activityCellFocused,
                            pressed && styles.activityCellPressed,
                          ]}
                        />
                      );
                    })}
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>

        {selectedDay && Platform.OS === 'web' && (
          <View accessibilityLiveRegion="polite">
            <ThemedText style={styles.selectedDay}>
              {selectedDay.date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              {' — '}
              {selectedDay.count} {selectedDay.count === 1 ? 'use' : 'uses'}
            </ThemedText>
          </View>
        )}

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
  activityCell: {
    borderRadius: 3,
  },
  activityCellHovered: {
    opacity: 0.72,
  },
  activityCellFocused: {
    borderWidth: 2,
    borderColor: '#2563eb',
  },
  activityCellPressed: {
    opacity: 0.55,
  },
  selectedDay: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: '600',
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
    lineHeight: 20,
    fontWeight: '600',
    paddingBottom: 2,
  },
  description: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 24,
    opacity: 0.85,
    paddingBottom: 2,
  },
});