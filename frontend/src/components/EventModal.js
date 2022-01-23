import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import api from "../services/apiSVACalendar";

const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

export default function EventModal() {
  const { setShowEventModal, daySelected, getEvents, selectedEvent } =
    useContext(GlobalContext);

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find(
          (lbl) => lbl.toLowerCase() === selectedEvent.label.toLowerCase()
        )
      : labelsClasses[0]
  );
  const [time, setTime] = useState(selectedEvent ? selectedEvent.time : "");
  const [city, setCity] = useState(selectedEvent ? selectedEvent.city : "");

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const calendarEvent = {
        title,
        description,
        label: selectedLabel,
        day: daySelected,
        id: selectedEvent ? selectedEvent.id : Date.now(),
        time,
        city,
      };
      if (selectedEvent) {
        await api.put(`/events/${calendarEvent.id}`, calendarEvent);
        getEvents();
      } else {
        await api.post(`/events`, calendarEvent);
        getEvents();
      }

      setShowEventModal(false);
    } catch (error) {
      console.log(error);
      window.alert(error?.response ? error.response.data : error.message);
    }
  }
  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form className="bg-white rounded-lg shadow-2xl w-1/4">
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span className="material-icons-outlined text-gray-400">
            drag_handle
          </span>
          <div>
            {selectedEvent && (
              <span
                onClick={async () => {
                  try {
                    await api.delete(`/events/${selectedEvent.id}`);
                    getEvents();
                    setShowEventModal(false);
                  } catch (error) {
                    console.log(error);
                    window.alert(
                      error?.response ? error.response.data : error.message
                    );
                  }
                }}
                className="material-icons-outlined text-gray-400 cursor-pointer"
              >
                delete
              </span>
            )}
            <button onClick={() => setShowEventModal(false)}>
              <span className="material-icons-outlined text-gray-400">
                close
              </span>
            </button>
          </div>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            <input
              type="text"
              name="title"
              placeholder="Add title"
              value={title}
              required
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setTitle(e.target.value)}
            />
            <span className="material-icons-outlined text-gray-400">
              <span className="material-icons-outlined">date_range</span>
            </span>
            <p>{daySelected.format("dddd, MMMM DD")}</p>
            <span className="material-icons-outlined text-gray-400">
              <span className="material-icons-outlined">schedule</span>
            </span>
            <input
              type="time"
              name="time"
              placeholder="Add a time"
              value={time}
              required
              className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setTime(e.target.value)}
            />
            <span className="material-icons-outlined text-gray-400">
              segment
            </span>
            <input
              type="text"
              name="description"
              placeholder="Add a description"
              value={description}
              required
              className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setDescription(e.target.value)}
            />
            <span className="material-icons-outlined text-gray-400">
              <span className="material-icons-outlined">
                <span className="material-icons-outlined">apartment</span>
              </span>
            </span>
            <input
              type="text"
              name="city"
              placeholder="Add a city"
              value={city}              
              className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setCity(e.target.value)}
            />
            <span className="material-icons-outlined text-gray-400">
              bookmark_border
            </span>
            <div className="flex gap-x-2">
              {labelsClasses.map((lblClass, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedLabel(lblClass)}
                  className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                >
                  {selectedLabel === lblClass && (
                    <span className="material-icons-outlined text-white text-sm">
                      check
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        <footer className="flex justify-end border-t p-3 mt-5">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
}
