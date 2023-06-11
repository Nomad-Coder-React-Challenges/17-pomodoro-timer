import { atom } from 'recoil';

export type PomodoroTimerStateType = {
  /** 타이머 시간 */
  default: number;
  /** 집중 타임(초 단위) */
  time: number;
  /** 타이머 1회 완주 마다 1 증가 */
  round: number;
  /** 타이머 4회 완주 마다 1 증가 */
  goal: number;
  /** 타이머가 시작했는지 */
  isOn: boolean;
  /** 타이머가 일시정지 상태인지 */
  isPause: boolean;
  /** 진행중인지? */
  isProgress: boolean;
  /** 알림음 on/off */
  isOnSound: boolean;
};

export const MINUTE = 60;

export const PomodoroTimerState = atom<PomodoroTimerStateType>({
  key: 'pomodoroTimerState',
  default: {
    default: 25 * MINUTE,
    time: 25 * MINUTE,
    round: 0,
    goal: 0,
    isOn: false,
    isPause: false,
    isProgress: false,
    isOnSound: false,
  },
});
