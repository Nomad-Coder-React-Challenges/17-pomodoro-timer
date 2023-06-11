const useParseHourMinuteSecond = (time: number) => {
  const hour =
    Math.floor(time / 3600) >= 10
      ? String(Math.floor(time / 3600))
      : `0${Math.floor(time / 3600)}`;
  const minute =
    Math.floor(time / 60) >= 10
      ? String(Math.floor(time / 60))
      : `0${Math.floor(time / 60)}`;
  const second = time % 60 >= 10 ? String(time % 60) : `0${time % 60}`;

  return { hour, minute, second };
};

export default useParseHourMinuteSecond;
