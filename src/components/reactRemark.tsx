import { useRemark } from 'react-remark';
import TicketCard from './cards/ticket';
import { useEffect } from 'react';

interface ExampleComponentProps {
  msg: string;
}

const ExampleComponent: React.FC<ExampleComponentProps> = ({ msg }) => {
  const [reactContent, setMarkdownSource] = useRemark();

  useEffect(() => {
    setMarkdownSource(msg)


  }, [msg])

  return (
    <>
      <h1>React Remark</h1>
      {reactContent}
      {/* <TicketCard /> */}
    </>
  );
};

export default ExampleComponent;