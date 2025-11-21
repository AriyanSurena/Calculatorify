export const GitHubIcon: React.FC = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
);

export const UserIcon: React.FC = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

// SVGIcons/SocialIcons.tsx

// تلگرام
// آیکون تلگرام ساده بدون دایره
export const TelegramIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.91 3.79L20.3 20.84c-.25 1.21-.98 1.5-2 .94l-5.5-4.07-2.66 2.56c-.29.29-.54.54-1.1.54l.4-5.78 10.1-9.13c.44-.38-.1-.59-.68-.22L6.69 13.1 1.57 11.3c-1.18-.37-1.19-1.16.26-1.75l21.26-8.2c.98-.37 1.84.22 1.53 1.73z" />
    </svg>
);

// فیسبوک
export const FacebookIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
);

// اینستاگرام
export const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
);

// دیسکورد
export const DiscordIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0c.14.09.28.19.42.33a10.9 10.9 0 0 1-1.71.84 12.89 12.89 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z" />
    </svg>
);

// لینکدین
export const LinkedInIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

// توییتر (X)
export const TwitterIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

// آیکون اینترنت با طراحی مدرن
export const WebsiteIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
    </svg>
);

// ریپو گیتهاب
export const GitHubRepoIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
);

// پروفایل گیتهاب
export const GitHubProfileIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

// ایمیل
export const EmailIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

export function CircleIcon(): React.ReactElement {
    return (
        <div className="block relative w-[6rem] h-[6rem] bg-gradient-to-r from-blue-500 to-purple-500  p-2 my-2 ml-2 mr-2 rounded-full">
            <div className="border-red-500 w-1/2 border-[1px] rotate-90 absolute top-[25%] left-2/4 translate-x-[-50%] rotate-45"></div>
        </div>
    )
}

export function RectangleIcon(): React.ReactElement {
    return (
        <div className="block w-[8rem] h-[6rem] bg-gradient-to-r from-blue-500 to-purple-500  p-2 my-2 ml-2 mr-2"></div>
    )
}

export function SquareIcon(): React.ReactElement {
    return (
        <div className="block w-[6rem] h-[6rem] bg-gradient-to-r from-blue-500 to-purple-500  p-2 my-2 ml-2 mr-2"></div>
    )
}

export function PentagonIcon(): React.ReactElement {
    return (
        <div
            className="block w-[6rem] h-[6rem] bg-gradient-to-r from-blue-500 to-purple-500 my-2 mx-2 "
            style={{
                clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)'
            }}
        ></div>
    )
}

export function HexagonIcon(): React.ReactElement {
    return (
        <div
            className="block w-[6rem] h-[6rem] bg-gradient-to-r from-green-500 to-teal-500 my-2 mx-2 "
            style={{
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
            }}
        ></div>
    )
}

export function TriangleIcon(): React.ReactElement {
    return (
        <div
            className="block w-[6rem] h-[6rem] bg-gradient-to-r from-red-500 to-pink-500 my-2 mx-2 "
            style={{
                clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)'
            }}
        ></div>
    )
}

export function RightTriangleIcon(): React.ReactElement {
    return (
        <div
            className="block w-[6rem] h-[6rem] bg-gradient-to-r from-indigo-500 to-blue-500 my-2 mx-2 "
            style={{
                clipPath: 'polygon(0% 0%, 100% 100%, 0% 100%)'
            }}
        ></div>
    )
}

export function ScaleneTriangleIcon(): React.ReactElement {
    return (
        // مثلث مختلف الاضلاع
        <div
            className="block w-[6rem] h-[6rem] bg-gradient-to-r from-yellow-500 to-orange-500 my-2 mx-2 "
            style={{
                clipPath: 'polygon(50% 0%, 100% 60%, 20% 100%)'
            }}
        ></div>
    )
}

export function IsoscelesTriangleIcon(): React.ReactElement {
    return (
        // مثلث متساوی الساقین
        <div
            className="block w-[6rem] h-[6rem] bg-gradient-to-r from-green-500 to-emerald-500 my-2 mx-2 "
            style={{
                clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)'
            }}
        ></div>
    )
}

export function EquilateralTriangleIcon(): React.ReactElement {
    return (
        //  مثلث متساوی الاضلاع
        <div
            className="block w-[6rem] h-[6rem] bg-gradient-to-r from-blue-500 to-purple-500 my-2 mx-2 "
            style={{
                clipPath: 'polygon(50% 0%, 100% 86.6%, 0% 86.6%)'
            }}
        ></div>
    )
}

// مبدل واحد - خط‌کش
export const UnitConverterIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M1 21h22v2H1v-2zM5 1h14v18H5V1zm2 2v14h10V3H7zm2 2h6v2H9V5zm0 4h6v2H9V9zm0 4h6v2H9v-2z" />
    </svg>
);

// مبدل ارز - اسکناس
export const CurrencyConverterIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z" />
    </svg>
);

// ماشین حساب سرمایه‌گذاری - نمودار رشد
export const InvestmentCalculatorIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z" />
        <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.83 3.41 18.3l6-6.01 4 4L20 9.71 22 11.71V6z" />
    </svg>
);

// ماشین حساب شکل‌ها - مثلث و مربع
export const ShapeCalculatorIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M17 15h2V7H9v2h8v6z" />
        <path d="M7 17V7H5v10h2z" />
        <path d="M19 19H5V5h14v14zM19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
    </svg>
);

// ماشین حساب حجم - مکعب
export const VolumeCalculatorIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M21 7V3h-4v2H7V3H3v4h2v10H3v4h4v-2h10v2h4v-4h-2V7h2zM5 5h2v2H5V5zm2 14H5v-2h2v2zm12 0h-2v-2h2v2zm-2-4H7v-2h10v2zm0-4H7V7h10v4zm2-6h2v2h-2V5z" />
    </svg>
);

// ماشین حساب تاریخ - تقویم
export const DateCalculatorIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
    </svg>
);

// آیکون BMI - نماد ترازو و بدن
export const BMICalculatorIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {/* بدنه ترازو */}
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6h18M6 6v12m12-12v12" />
        {/* پایه ترازو */}
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v18" />
        {/* کفه‌های ترازو */}
        <circle cx="6" cy="9" r="2" strokeWidth={2} />
        <circle cx="18" cy="9" r="2" strokeWidth={2} />
        {/* نماد بدن */}
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 12h4m-2 0v4" />
    </svg>
);

// آیکون BMI - نماد ترازو و بدن
export const BackIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);

// آیکون ضربدر (Close)
export const CloseIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);