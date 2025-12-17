import { NotFound } from '@angular/core/primitives/di';
import { createActionGroup, createFeature, createReducer, on, props } from '@ngrx/store';

// 5 years they've had action creators.
export const notificationEvents = createActionGroup({
  source: 'App Notifications',
  events: {
    'display notification for all': props<{ payload: Notification }>(),
    'dismiss notification': props<{ payload: string }>(),
  },
});

type Notification = {
  message: string;
  from: string;
};

type IdentifiedNotification = Notification & { id: string };
type NotificationState = {
  notifications: IdentifiedNotification[];
  favoriteColor: string;
};

const initialState: NotificationState = {
  notifications: [],
  favoriteColor: 'green',
};

// feature creator is super awesome way for a feature
// to define it's only little corner of the global redux store.
export const notificationFeature = createFeature({
  name: 'App Notifications',
  reducer: createReducer(
    initialState,
    on(notificationEvents.displayNotificationForAll, (s, a) => {
      const n: IdentifiedNotification = {
        ...a.payload,
        id: crypto.randomUUID(),
      };
      return { ...s, notifications: [n, ...s.notifications] };
    }),
    on(notificationEvents.dismissNotification, (s, a) => ({
      ...s,
      notifications: s.notifications.filter((m) => m.id !== a.payload),
    })),
  ),
});

export const { selectNotifications, selectFavoriteColor } = notificationFeature;
