
export const hasTimeConflict = (event1, event2) => {

  if (event1.date.day !== event2.date.day || 
      event1.date.month !== event2.date.month || 
      event1.date.year !== event2.date.year) {
    return false;
  }

  return event1.startTime < event2.endTime && event2.startTime < event1.endTime;
};

export const findConflicts = (targetEvent, allEvents) => {
  return allEvents.filter(event => 
    event.id !== targetEvent.id && hasTimeConflict(targetEvent, event)
  );
};
