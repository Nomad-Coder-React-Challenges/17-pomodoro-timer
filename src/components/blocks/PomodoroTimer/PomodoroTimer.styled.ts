import { motion } from 'framer-motion';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
`;

const Alarm = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;

  svg {
    cursor: pointer;
  }
`;

const Time = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: center;
  h6 {
    font-size: 36px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.mono[400]};
    text-transform: uppercase;
  }
`;

const MinuteSecond = styled(motion.section)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 200px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.mono[100]};
  font-size: 50px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.mono.black};
`;

const ButtonList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin: 8px 0;
`;

const RoundGoalContainer = styled.div`
  width: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RoundGoal = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  align-items: center;

  h6 {
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.mono.black};
    text-transform: uppercase;
  }

  p {
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.mono[400]};
  }
`;

export {
  Container,
  Alarm,
  ButtonList,
  RoundGoalContainer,
  Time,
  MinuteSecond,
  RoundGoal,
};
