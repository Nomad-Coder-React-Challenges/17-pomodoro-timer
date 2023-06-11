import PomodoroTimer from '#components/blocks/PomodoroTimer';
import { Title, Wrapper } from './home.styled';

const HomePageTemplate = () => {
  return (
    <Wrapper>
      <Title>POMODORO</Title>
      <PomodoroTimer />
    </Wrapper>
  );
};

export default HomePageTemplate;
