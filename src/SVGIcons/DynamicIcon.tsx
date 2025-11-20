import { CircleIcon, DiscordIcon, EmailIcon, EquilateralTriangleIcon, FacebookIcon, GitHubIcon, GitHubRepoIcon, HexagonIcon, InstagramIcon, IsoscelesTriangleIcon, LinkedInIcon, PentagonIcon, RectangleIcon, RightTriangleIcon, ScaleneTriangleIcon, SquareIcon, TelegramIcon, TwitterIcon, UserIcon, WebsiteIcon } from "./Icons";

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
            email: <EmailIcon />
            // repo: <RepoIcon />,
            // portfolio: <PortfolioIcon />,
            // email: <EmailIcon />,
            // linkedin: <LinkedInIcon />
        };

        return icons[icon as keyof typeof icons] || null
}

export default DynamicIcon;