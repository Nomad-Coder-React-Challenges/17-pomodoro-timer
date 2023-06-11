import { useCallback, useEffect, useRef } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';

import {
  ButtonList,
  Container,
  Alarm,
  MinuteSecond,
  Time,
  RoundGoalContainer,
  RoundGoal,
} from './PomodoroTimer.styled';

import * as Atoms from '#components/atoms';
import { MINUTE, PomodoroTimerState } from '#stores/timerStateStore';
import { useTheme } from 'styled-components';
import useParseHourMinuteSecond from '#hooks/useParseHourMinuteSecond';
import {
  IconArrowSpin,
  IconBellOff,
  IconBellOn,
  IconPause,
  IconPlay,
} from '#components/atoms/svgs';
import usePomodoro from '#hooks/usePomodoro';

const minuteSecondVarients = {
  animate: {
    scale: [0.9, 1.05, 1],
    transition: {
      duration: 0.3,
    },
  },
};

const PomodoroTimer = () => {
  const theme = useTheme();

  const {
    timerState,
    minute,
    second,
    onStartResetTimerClick,
    onPauseResumeClick,
    onToggleSound,
  } = usePomodoro();

  return (
    <Container>
      <Alarm>
        {timerState.isOnSound ? (
          <IconBellOn
            onClick={onToggleSound}
            width={24}
            height={24}
            stroke={theme.colors.second[500]}
          />
        ) : (
          <IconBellOff
            onClick={onToggleSound}
            width={24}
            height={24}
            stroke={theme.colors.mono[400]}
          />
        )}
      </Alarm>
      <Time>
        <MinuteSecond
          key={minute}
          variants={minuteSecondVarients}
          animate='animate'
        >
          {minute}
        </MinuteSecond>{' '}
        <h6>:</h6>
        <MinuteSecond
          key={second}
          variants={minuteSecondVarients}
          animate='animate'
        >
          {second}
        </MinuteSecond>
      </Time>
      <ButtonList>
        {timerState.isOn && (
          <Atoms.Button
            icon={
              timerState.isPause ? (
                <IconPlay
                  width={24}
                  height={24}
                  stroke={theme.colors.mono[400]}
                />
              ) : (
                <IconPause
                  width={24}
                  height={24}
                  stroke={theme.colors.mono[400]}
                />
              )
            }
            isRound
            onClick={onPauseResumeClick}
          />
        )}
        <Atoms.Button
          icon={
            timerState.isOn ? (
              <IconArrowSpin
                width={24}
                height={24}
                stroke={theme.colors.mono[400]}
              />
            ) : (
              <IconPlay
                width={24}
                height={24}
                stroke={theme.colors.mono[400]}
              />
            )
          }
          isRound
          onClick={onStartResetTimerClick}
        />
      </ButtonList>
      <RoundGoalContainer>
        <RoundGoal>
          <p>{timerState.round}/4</p>
          <h6>round</h6>
        </RoundGoal>
        <RoundGoal>
          <p>{timerState.goal}/12</p>
          <h6>goal</h6>
        </RoundGoal>
      </RoundGoalContainer>
    </Container>
  );
};

export default PomodoroTimer;
