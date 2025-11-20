import { BMICalculatorIcon, CircleIcon, CurrencyConverterIcon, DateCalculatorIcon, DiscordIcon, EmailIcon, EquilateralTriangleIcon, FacebookIcon, GitHubIcon, GitHubRepoIcon, HexagonIcon, InstagramIcon, InvestmentCalculatorIcon, IsoscelesTriangleIcon, LinkedInIcon, PentagonIcon, RectangleIcon, RightTriangleIcon, ScaleneTriangleIcon, ShapeCalculatorIcon, SquareIcon, TelegramIcon, TwitterIcon, UnitConverterIcon, UserIcon, VolumeCalculatorIcon, WebsiteIcon } from "./Icons";

const DynamicIcon: React.FC<
{
    icon: string
}> = ({icon}) => {
    const icons = {
            github: <GitHubIcon />,
            user: <UserIcon />,
            circle: <CircleIcon />, 
            equilateralTriangle: <EquilateralTriangleIcon />, 
            hexagon: <HexagonIcon />,
            isoscelesTriangle: <IsoscelesTriangleIcon />, 
            pentagon: <PentagonIcon />,
            rectangle: <RectangleIcon />, 
            rightTriangle: <RightTriangleIcon />, 
            scaleneTriangle: <ScaleneTriangleIcon />, 
            square: <SquareIcon />,
            telegram: <TelegramIcon />,
            facebook: <FacebookIcon />,
            instagram: <InstagramIcon />,
            discord: <DiscordIcon />,
            linkedin: <LinkedInIcon />,
            twitter: <TwitterIcon />,
            website: <WebsiteIcon />,
            repo: <GitHubRepoIcon />,
            email: <EmailIcon />,
            DateCalculator: <DateCalculatorIcon />,
            VolumeCalculator: <VolumeCalculatorIcon />,
            InvestmentCalculator: <InvestmentCalculatorIcon /> ,
            CurrencyConverter: <CurrencyConverterIcon />,
            BMICalculator: <BMICalculatorIcon />,
            ShapeCalculator: <ShapeCalculatorIcon />,
            UnitConverter: <UnitConverterIcon />
            // repo: <RepoIcon />,
            // portfolio: <PortfolioIcon />,
            // email: <EmailIcon />,
            // linkedin: <LinkedInIcon />
        };

        return icons[icon as keyof typeof icons] || null
}

export default DynamicIcon;