const ClearpoolIcon = () => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      // xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <circle cx="16" cy="16" r="16" fill="#DEEAF6" />
      <rect x="7" y="8" width="17" height="17" fill="url(#pattern0)" />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_1755_4761" transform="scale(0.0125)" />
        </pattern>
        <image
          id="image0_1755_4761"
          width="80"
          height="80"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};

export default ClearpoolIcon;
