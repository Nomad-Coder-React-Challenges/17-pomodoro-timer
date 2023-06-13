import { MINUTE, PomodoroTimerState } from '#stores/timerStateStore';
import { useRef, useCallback, useEffect } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import useParseHourMinuteSecond from './useParseHourMinuteSecond';

const initialTimerData = {
  default: 25 * MINUTE,
  time: 25 * MINUTE,
  isOn: false,
  isPause: false,
  isProgress: false,
};

const startTimerData = {
  default: 25 * MINUTE,
  time: 25 * MINUTE,
  isOn: true,
  isPause: false,
  isProgress: false,
};

const usePomodoro = () => {
  const timerInterval = useRef<NodeJS.Timeout>();

  const [timerState, setTimerState] = useRecoilState(PomodoroTimerState);
  const resetTimerState = useResetRecoilState(PomodoroTimerState);

  /** 타이머 종료 여부 */
  const isTimerEnd = timerState.time === 0;

  const { minute, second } = useParseHourMinuteSecond(
    timerState.isOn ? timerState.time : timerState.default
  );

  /** 타이머 시작/초기화 */
  const handleStartResetTimerClick = useCallback(() => {
    if (timerState.isOn) {
      clearInterval(timerInterval.current);
      setTimerState(prev => ({
        ...prev,
        ...initialTimerData,
      }));
    } else {
      setTimerState(prev => ({
        ...prev,
        ...startTimerData,
      }));
    }
  }, [resetTimerState, setTimerState, timerState.default, timerState.isOn]);

  /** 타이머 일시정지/재생 */
  const handlePauseResumeClick = useCallback(() => {
    if (!timerState.isOn) return;

    setTimerState(prev => {
      return {
        ...prev,
        isPause: !prev.isPause,
        isProgress: !prev.isPause,
      };
    });
  }, [setTimerState, timerState.isOn]);

  /** 타이머 초기화 */
  const handleRemoveTimer = useCallback(() => {
    clearInterval(timerInterval.current);
    resetTimerState();
  }, [resetTimerState]);

  /** 알람 ON/OFF */
  const handleToggleSound = () => {
    setTimerState(prev => ({
      ...prev,
      isOnSound: !prev.isOnSound,
    }));
  };

  // 타이머 시작/정지/종료
  useEffect(() => {
    if (!timerState.isPause && !timerState.isProgress && timerState.isOn) {
      timerInterval.current = setInterval(() => {
        setTimerState(prev => ({
          ...prev,
          time: prev.time - 1,
        }));
      }, 1000);

      setTimerState(prev => ({
        ...prev,
        isProgress: true,
      }));
    }

    if (timerState.isPause) {
      clearInterval(timerInterval.current);
      setTimerState(prev => ({ ...prev, isProgress: false }));
    }
    if (isTimerEnd) {
      clearInterval(timerInterval.current);
    }
  }, [
    timerState.isPause,
    timerState.isProgress,
    timerState.isOn,
    timerState.time,
    setTimerState,
  ]);

  // ROUND, GOAL 업데이트
  useEffect(() => {
    if (isTimerEnd) {
      setTimerState(prev => {
        let nextRound = prev.round + 1;
        let nextGoal = prev.goal;

        if (nextRound % 4 === 0) {
          nextGoal++;
          nextRound = 0;
        }

        return {
          ...prev,
          ...initialTimerData,
          round: nextRound,
          goal: nextGoal,
        };
      });
    }
  }, [isTimerEnd]);

  // GOAL 달성 알림
  useEffect(() => {
    if (timerState.goal === 12) {
      resetTimerState();
      alert('오늘 목표 완료!');
    }
  }, [timerState.goal]);

  // 알람 소리
  useEffect(() => {
    if (isTimerEnd && timerState.isProgress && timerState.isOnSound) {
      const audio = new Audio('/alarm.mp3');
      audio.play();
      setTimeout(() => {
        audio.pause();
      }, 4500);
    }
  }, [timerState.isProgress, timerState.time, timerState.isOnSound]);

  // 타이머 초기화
  useEffect(() => {
    return () => handleRemoveTimer();
  }, [handleRemoveTimer]);

  return {
    onStartResetTimerClick: handleStartResetTimerClick,
    onPauseResumeClick: handlePauseResumeClick,
    onToggleSound: handleToggleSound,
    timerState,
    minute,
    second,
  };
};

export default usePomodoro;
