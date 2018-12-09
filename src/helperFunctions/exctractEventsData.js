export let types = null
export let dates = null

export const exctractEventsData = (events) => {
    let eventsTypes = new Set();
      let eventsDates = new Set();
      events.forEach((event) => {
        event.type = event.type.replace(/,*$/,"") // remove ,,, in the end of types
        eventsTypes.add(event.type)
        eventsDates.add(event.date)
      })
      types = [...eventsTypes]    // transform set in array because of troubles in manipulating set
      dates = [...eventsDates]
}
export default exctractEventsData
