import React, { useId } from "react";

// 컴포넌트 Props 타입을 정의합니다.
interface IVisualGradientDestinationProps {
  image: string;
}

const IVisualGradientDestination: React.FC<IVisualGradientDestinationProps> = ({
  image,
}) => {
  const id = useId();
  const maskId = `mask-${id}`;
  const gradientId = `gradient-${id}`;
  const filterId = `blur-effect-${id}`;
  const bgGradientId = `bg-gradient-${id}`;
  const clipId = `clip-${id}`;

  return (
    <svg
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id={`clip-${id}`}>
          <rect width="100%" height="100%" rx="12" ry="12" />
        </clipPath>

        <mask id={maskId} x="0%" y="0%" width="100%" height="100%">
          <rect width="100%" height="100%" fill="black" />
          <rect width="100%" height="100%" fill={`url(#${gradientId})`} />
        </mask>

        <linearGradient
          id={bgGradientId}
          x1="100%"
          y1="60%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopOpacity="0" stopColor="black" />
          <stop offset="100%" stopOpacity="0.6" stopColor="black" />
        </linearGradient>

        <linearGradient id={gradientId} x1="0%" y1="0%" x2="70%" y2="0%">
          <stop offset="0%" stopOpacity="1" stopColor="white" />
          <stop offset="40%" stopOpacity="1" stopColor="white" />
          <stop offset="100%" stopOpacity="0" stopColor="white" />
        </linearGradient>

        <linearGradient id="darkenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="10%" stopColor="black" stopOpacity="0.8" />
          <stop offset="30%" stopColor="black" stopOpacity="0.3" />
          <stop offset="60%" stopColor="black" stopOpacity="0.2" />
          <stop offset="100%" stopColor="black" stopOpacity="0" />
        </linearGradient>

        <filter
          id={filterId}
          x="-80%"
          y="-80%"
          width="180%"
          height="180%"
          filterUnits="userSpaceOnUse"
        >
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation="35"
            result="blurred"
          />
          <feComponentTransfer in="blurred">
            <feFuncA type="linear" slope="1" intercept="1" />
          </feComponentTransfer>
        </filter>
      </defs>

      <image
        href={image}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
        clipPath={`url(#${clipId})`}
      />

      <g mask={`url(#${maskId})`} filter={`url(#${filterId})`}>
        <image
          href={image}
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
        />
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="url(#darkenGradient)"
        />
        <rect
          width="100%"
          height="40%"
          y="60%"
          fill={`url(#${bgGradientId})`}
        />
      </g>
    </svg>
  );
};

export default IVisualGradientDestination;
