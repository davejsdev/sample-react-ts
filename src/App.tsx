import { styled } from '@linaria/react';
import { formatDate } from './lib/utils/format';
import { useState } from 'react';

const Grid = styled.main`
  display: grid;
  --width: 80ch;
  --gutter: 1rem;
  --content: min(100% - 2 * var(--gutter), var(--width));

  column-gap: var(--gutter);
  grid-template-columns: auto [content-start] var(--content) [content-end] auto;
`;

const Content = styled.div`
  grid-area: content;
  display: flex;
  flex-direction: column;
  align-items: normal;
  gap: 2rem;
  padding: 5rem 0;
`;

const Today = () => {
  return <h1>{formatDate(new Date())}</h1>;
};

const StyledHour = styled.div`
  display: flex;
  gap: 0.25rem;
  border-bottom: 1px solid white;
  height: 3rem;
`;
type CalEvent = {
  id: number;
  startTime: number;
  endTime: number;
  name: string;
};

const EventBlock = styled.div`
  display: block;
  color: black;
  background-color: pink;
`;

// TODO add edit and delete handlers
const Hour = ({ hour, events }: { hour: number; events: CalEvent[] }) => {
  return (
    <StyledHour>
      <div>Hour {hour}</div>

      {events.map((event) => {
        const eventLength = event.endTime - event.startTime;
        return (
          <EventBlock
            key={event.id}
            style={{ height: `calc(4rem * ${eventLength})` }}
          >
            {event.name}
          </EventBlock>
        );
      })}
    </StyledHour>
  );
};

// TODO add prop for default values for editing
const Header = ({ onSubmit }: { onSubmit: (event: CalEvent) => void }) => {
  const [startTime, setStartTime] = useState<number>();
  const [endTime, setEndTime] = useState<number>();
  const [name, setName] = useState('');

  const submitHandler = (e: any) => {
    e.preventDefault();
    // TODO validation
    if (startTime === undefined || endTime === undefined) {
      return;
    }

    onSubmit({
      id: Date.now(),
      startTime,
      endTime,
      name,
    });
  };

  return (
    <form onSubmit={submitHandler}>
      {/* TODO add form labels */}
      <input
        name="startTime"
        type="number"
        required
        value={startTime}
        onChange={(e) => {
          setStartTime(parseInt(e.target.value));
        }}
      />
      <input
        name="endTime"
        type="number"
        required
        value={endTime}
        onChange={(e) => {
          setEndTime(parseInt(e.target.value));
        }}
      />
      <input
        name="name"
        type="text"
        required
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <button type="submit">Add</button>
    </form>
  );
};

function App() {
  // TODO: generate all 24 hours
  const hours = [1, 2, 3];
  const [events, setEvents] = useState<CalEvent[]>([]);

  return (
    <Grid>
      <Content>
        <Today />
        <Header
          onSubmit={(event) => {
            setEvents((prevEvents) => [...prevEvents, event]);
          }}
        />
        {hours.map((hour) => {
          const eventsForHour = events.filter(
            (event) => event.startTime === hour
          );

          return <Hour key={hour} hour={hour} events={eventsForHour} />;
        })}
        <pre>{JSON.stringify(events, null, 2)}</pre>
      </Content>
    </Grid>
  );
}

export default App;
