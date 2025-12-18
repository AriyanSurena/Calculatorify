import { BackIcon, BMICalculatorIcon, CircleIcon, CloseIcon, CurrencyConverterIcon, DateCalculatorIcon, DiscordIcon, DragIcon, EmailIcon, EquilateralTriangleIcon, FacebookIcon, GitHubIcon, GitHubRepoIcon, HexagonIcon, InfoIcon, InstagramIcon, InvestmentCalculatorIcon, IsoscelesTriangleIcon, LinkedInIcon, MenuIcon, MinusIcon, PentagonIcon, PlusIcon, RectangleIcon, RightTriangleIcon, RulerIcon, ScaleneTriangleIcon, ShapeCalculatorIcon, ShareIcon, SquareIcon, TelegramIcon, TwitterIcon, UnitConverterIcon, UserIcon, VolumeCalculatorIcon, WebsiteIcon, WeightIcon } from "./Icons";

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
            dateCalculator: <DateCalculatorIcon />,
            volumeCalculator: <VolumeCalculatorIcon />,
            investmentCalculator: <InvestmentCalculatorIcon /> ,
            currencyConverter: <CurrencyConverterIcon />,
            bmiCalculator: <BMICalculatorIcon />,
            shapeCalculator: <ShapeCalculatorIcon />,
            unitConverter: <UnitConverterIcon />,
            back: <BackIcon />,
            close: <CloseIcon />,
            menu: <MenuIcon />,
            share: <ShareIcon />,
            ruler: <RulerIcon />,
            weight: <WeightIcon />,
            drag: <DragIcon />,
            minus: <MinusIcon />,
            plus: <PlusIcon />,
            info: <InfoIcon />
            // repo: <RepoIcon />,
            // portfolio: <PortfolioIcon />,
            // email: <EmailIcon />,
            // linkedin: <LinkedInIcon />
        };

        return icons[icon as keyof typeof icons] || null
}

export default DynamicIcon;