const Compass: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.93502 8.93542L7.96491 12.0366L11.0652 11.0656L12.0362 7.96438L8.93502 8.93542ZM6.90489 13.7906C6.72329 13.7906 6.54539 13.7193 6.41289 13.5877C6.23035 13.4042 6.16364 13.1346 6.24147 12.8891L7.71749 8.17378C7.78513 7.95511 7.95562 7.78555 8.17243 7.71791L12.8877 6.24189C13.1351 6.16313 13.4038 6.23077 13.5873 6.41331C13.7698 6.59677 13.8365 6.8664 13.7587 7.11194L12.2836 11.8272C12.216 12.045 12.0445 12.2155 11.8277 12.2831L7.11244 13.7591C7.04388 13.7804 6.97346 13.7906 6.90489 13.7906Z"
      fill="#965609"
    />
    <mask
      id="mask0_217_1152"
      style={{ maskType: "alpha" }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="20"
      height="20"
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M0.399994 0.400024H19.6001V19.6H0.399994V0.400024Z" fill="white" />
    </mask>
    <g mask="url(#mask0_217_1152)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.99995 1.78987C5.47276 1.78987 1.78966 5.47389 1.78966 10.0002C1.78966 14.5274 5.47276 18.2105 9.99995 18.2105C14.5272 18.2105 18.2102 14.5274 18.2102 10.0002C18.2102 5.47389 14.5272 1.78987 9.99995 1.78987ZM9.99989 19.6003C4.70642 19.6003 0.39975 15.2936 0.39975 10.0002C0.39975 4.7067 4.70642 0.400024 9.99989 0.400024C15.2934 0.400024 19.6 4.7067 19.6 10.0002C19.6 15.2936 15.2934 19.6003 9.99989 19.6003Z"
        fill="#965609"
      />
    </g>
  </svg>
);

export default Compass;