import React, { useState, useEffect, useMemo } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";
import api from "../services/apiSVACalendar";

export default function ContextWrapper(props) {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [labels, setLabels] = useState([]);
  const [events, setEvents] = useState([]);

  async function getEvents() {
    try {
      const result = await api.get("/events");
      if (result) setEvents(result.data);
    } catch (error) {
      console.log(error);
      window.alert(error?.response ? error.response.data : error.message);
    }
  }

  useEffect(() => {
    getEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter((evt) =>
      labels
        .filter((lbl) => lbl.checked)
        .map((lbl) => lbl.label)
        .includes(evt.label)
    );
  }, [events, labels]);

  useEffect(() => {
    setLabels((prevLabels) => {
      return [...new Set(events.map((evt) => evt.label))].map((label) => {
        const currentLabel = prevLabels.find((lbl) => lbl.label === label);
        return {
          label,
          checked: currentLabel ? currentLabel.checked : true,
        };
      });
    });
  }, [events]);

  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);

  useEffect(() => {
    if (!showEventModal) {
      setSelectedEvent(null);
    }
  }, [showEventModal]);

  function updateLabel(label) {
    setLabels(labels.map((lbl) => (lbl.label === label.label ? label : lbl)));
  }

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        smallCalendarMonth,
        setSmallCalendarMonth,
        daySelected,
        setDaySelected,
        showEventModal,
        setShowEventModal,
        selectedEvent,
        setSelectedEvent,
        setLabels,
        labels,
        updateLabel,
        filteredEvents,
        events,
        getEvents,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}
