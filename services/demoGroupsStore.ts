import { useSyncExternalStore } from 'react';

export const GROUP_CADENCES = ['Every week', 'Every 2 weeks', 'Every month', 'Every 3 months'] as const;
export type GroupCadence = (typeof GROUP_CADENCES)[number];
export const GROUP_MEMBER_SYMBOLS = ['🛰️', '☄️', '🌠'] as const;
export type GroupMemberSymbol = (typeof GROUP_MEMBER_SYMBOLS)[number];

export type CheckInMember = {
  id: string;
  name: string;
  context: string;
  symbol: GroupMemberSymbol;
};

export type DemoCheckInGroup = {
  id: string;
  name: string;
  cadence: GroupCadence;
  members: CheckInMember[];
  nextMemberIndex: number;
  nextDueAt: string;
  lastCheckIn: {
    memberId: string;
    memberName: string;
    completedAt: string;
  } | null;
};

const starterMembers: CheckInMember[] = [
  { id: 'new-moms-emily', name: 'Emily', context: 'College friend', symbol: '🛰️' },
  { id: 'new-moms-elise', name: 'Elise', context: 'Chicago', symbol: '☄️' },
  { id: 'new-moms-kaitlin', name: 'Kaitlin', context: 'High school', symbol: '🌠' },
  { id: '8', name: 'Holly', context: 'College friend', symbol: '🛰️' },
];

let groups: DemoCheckInGroup[] = [
  {
    id: 'new-moms',
    name: 'New Moms',
    cadence: 'Every week',
    members: starterMembers,
    nextMemberIndex: 0,
    nextDueAt: new Date().toISOString(),
    lastCheckIn: null,
  },
];

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

function addCadence(date: Date, cadence: GroupCadence) {
  const nextDate = new Date(date);
  if (cadence === 'Every week') nextDate.setDate(nextDate.getDate() + 7);
  if (cadence === 'Every 2 weeks') nextDate.setDate(nextDate.getDate() + 14);
  if (cadence === 'Every month') nextDate.setMonth(nextDate.getMonth() + 1);
  if (cadence === 'Every 3 months') nextDate.setMonth(nextDate.getMonth() + 3);
  return nextDate;
}

export function subscribeToDemoGroups(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getDemoGroupsSnapshot() {
  return groups;
}

export function useDemoGroups() {
  return useSyncExternalStore(subscribeToDemoGroups, getDemoGroupsSnapshot, getDemoGroupsSnapshot);
}

export function getNextGroupMember(group: DemoCheckInGroup) {
  if (!group.members.length) return undefined;
  return group.members[group.nextMemberIndex] ?? group.members[0];
}

export function createDemoGroup(name: string, cadence: GroupCadence) {
  const group: DemoCheckInGroup = {
    id: `group-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name,
    cadence,
    members: [],
    nextMemberIndex: 0,
    nextDueAt: new Date().toISOString(),
    lastCheckIn: null,
  };
  groups = [...groups, group];
  notify();
  return group;
}

export function updateDemoGroup(groupId: string, name: string, cadence: GroupCadence) {
  groups = groups.map((group) => (group.id === groupId ? { ...group, name, cadence } : group));
  notify();
}

export function addDemoGroupMembers(groupId: string, members: CheckInMember[]) {
  groups = groups.map((group) => {
    if (group.id !== groupId) return group;
    const existingIds = new Set(group.members.map((member) => member.id));
    const additions = members.filter((member) => !existingIds.has(member.id));
    return additions.length ? { ...group, members: [...group.members, ...additions] } : group;
  });
  notify();
}

export function removeDemoGroupMember(groupId: string, memberId: string) {
  groups = groups.map((group) => {
    if (group.id !== groupId) return group;
    const memberIndex = group.members.findIndex((member) => member.id === memberId);
    if (memberIndex < 0) return group;
    const members = group.members.filter((member) => member.id !== memberId);
    const nextMemberIndex = members.length
      ? (memberIndex < group.nextMemberIndex ? group.nextMemberIndex - 1 : group.nextMemberIndex) % members.length
      : 0;
    return { ...group, members, nextMemberIndex };
  });
  notify();
}

export function updateDemoGroupMemberSymbol(groupId: string, memberId: string, symbol: GroupMemberSymbol) {
  groups = groups.map((group) => {
    if (group.id !== groupId) return group;
    return {
      ...group,
      members: group.members.map((member) => (member.id === memberId ? { ...member, symbol } : member)),
    };
  });
  notify();
}

export function completeDemoGroupCheckIn(groupId: string, memberId: string) {
  groups = groups.map((group) => {
    if (group.id !== groupId) return group;
    const memberIndex = group.members.findIndex((member) => member.id === memberId);
    if (memberIndex < 0 || !group.members.length) return group;
    const member = group.members[memberIndex];
    const completedAt = new Date();
    return {
      ...group,
      nextMemberIndex: (memberIndex + 1) % group.members.length,
      nextDueAt: addCadence(completedAt, group.cadence).toISOString(),
      lastCheckIn: {
        memberId: member.id,
        memberName: member.name,
        completedAt: completedAt.toISOString(),
      },
    };
  });
  notify();
}

export function deleteDemoGroup(groupId: string) {
  groups = groups.filter((group) => group.id !== groupId);
  notify();
}
