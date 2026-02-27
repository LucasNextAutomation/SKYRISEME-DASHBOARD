"use client";

import { create } from "zustand";
import {
  clients as initialClients,
  pipelineContacts as initialPipeline,
  signals as initialSignals,
  notifications as initialNotifications,
  activityFeed as initialActivity,
  type Client,
  type PipelineContact,
  type Signal,
  type Notification,
  type ActivityItem,
  type TimelineEntry,
  type Note,
} from "./mock-data";

interface Store {
  clients: Client[];
  pipelineContacts: PipelineContact[];
  signals: Signal[];
  notifications: Notification[];
  activityFeed: ActivityItem[];

  // Pipeline
  moveContact: (id: string, stage: PipelineContact["stage"]) => void;

  // Client actions
  addNote: (clientId: string, note: Omit<Note, "id">) => void;
  addTimelineEntry: (clientId: string, entry: Omit<TimelineEntry, "id">) => void;

  // Notifications
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  // Activity
  addActivity: (activity: Omit<ActivityItem, "id">) => void;
}

export const useStore = create<Store>((set) => ({
  clients: initialClients,
  pipelineContacts: initialPipeline,
  signals: initialSignals,
  notifications: initialNotifications,
  activityFeed: initialActivity,

  moveContact: (id, stage) =>
    set((state) => ({
      pipelineContacts: state.pipelineContacts.map((c) =>
        c.id === id ? { ...c, stage } : c
      ),
    })),

  addNote: (clientId, note) =>
    set((state) => ({
      clients: state.clients.map((c) =>
        c.id === clientId
          ? { ...c, notes: [{ ...note, id: `n-${Date.now()}` }, ...c.notes] }
          : c
      ),
    })),

  addTimelineEntry: (clientId, entry) =>
    set((state) => ({
      clients: state.clients.map((c) =>
        c.id === clientId
          ? { ...c, timeline: [{ ...entry, id: `t-${Date.now()}` }, ...c.timeline] }
          : c
      ),
    })),

  markNotificationRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),

  markAllNotificationsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    })),

  addActivity: (activity) =>
    set((state) => ({
      activityFeed: [{ ...activity, id: `a-${Date.now()}` }, ...state.activityFeed],
    })),
}));
